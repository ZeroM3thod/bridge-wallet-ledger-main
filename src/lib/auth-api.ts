export type AuthEnv = { DB?: D1Database; RESEND_API_KEY?: string; AUTH_PEPPER?: string; APP_ORIGIN?: string; RESEND_FROM?: string }
type Env = AuthEnv
type D1Database = { prepare(sql: string): { bind(...values: unknown[]): { first<T>(): Promise<T | null>; run(): Promise<unknown> } } }
const json = (data: unknown, status = 200, headers?: HeadersInit) => Response.json(data, headers ? { status, headers } : { status })
const digits = (value: string) => value.replace(/[০-৯]/g, d => String("০১২৩৪৫৬৭৮৯".indexOf(d)))
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const hex = (bytes: Uint8Array) => [...bytes].map(b => b.toString(16).padStart(2, "0")).join("")
async function digest(value: string) { return hex(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)))) }
async function passwordHash(password: string, pepper: string) {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"])
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations: 210000, hash: "SHA-256" }, key, 256)
  return `${hex(salt)}:${hex(new Uint8Array(bits))}:${await digest(pepper)}`
}
async function verifyPassword(password: string, stored: string, pepper: string) {
  const [saltHex, expected, pepperHash] = stored.split(":")
  if (!saltHex || !expected || pepperHash !== await digest(pepper)) return false
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"])
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt: Uint8Array.from(saltHex.match(/.{2}/g)!.map(x => parseInt(x, 16))), iterations: 210000, hash: "SHA-256" }, key, 256)
  return expected === hex(new Uint8Array(bits))
}
function validEnv(env: Env): env is Env & { DB: D1Database; RESEND_API_KEY: string; AUTH_PEPPER: string; RESEND_FROM: string } {
  return !!(env.DB && env.RESEND_API_KEY && env.AUTH_PEPPER && env.RESEND_FROM)
}
function missingEnv(env: Env) {
  return [!env.DB && "D1 binding DB", !env.RESEND_API_KEY && "secret RESEND_API_KEY", !env.AUTH_PEPPER && "secret AUTH_PEPPER", !env.RESEND_FROM && "variable RESEND_FROM"].filter(Boolean)
}
async function sendCode(request: Request, env: Env) {
  if (!validEnv(env)) return json({ error: `Auth service missing: ${missingEnv(env).join(", ")}` }, 503)
  const body = await request.json() as { email?: string }
  const email = body.email?.trim().toLowerCase() ?? ""
  if (!emailPattern.test(email) || email.length > 255) return json({ error: "Invalid email" }, 400)
  const existing = await env.DB.prepare("SELECT id FROM users WHERE email = ?").bind(email).first<{id:string}>()
  if (existing) return json({ error: "Email already registered" }, 409)
  const now = Date.now(), attempt = await env.DB.prepare("SELECT count,window_start FROM email_code_attempts WHERE email=?").bind(email).first<{count:number;window_start:number}>()
  if (attempt && now - attempt.window_start < 60 * 60_000 && attempt.count >= 5) return json({ error: "Too many code requests; try again later" }, 429)
  await env.DB.prepare("INSERT INTO email_code_attempts(email,count,window_start) VALUES(?,1,?) ON CONFLICT(email) DO UPDATE SET count=CASE WHEN ?-window_start>=3600000 THEN 1 ELSE count+1 END,window_start=CASE WHEN ?-window_start>=3600000 THEN ? ELSE window_start END").bind(email,now,now,now,now).run()
  const code = String((crypto.getRandomValues(new Uint32Array(1))[0] ?? 0) % 1_000_000).padStart(6, "0")
  const expires = now + 10 * 60_000
  await env.DB.prepare("INSERT INTO email_codes(email,code_hash,expires_at,attempts) VALUES(?,?,?,0) ON CONFLICT(email) DO UPDATE SET code_hash=excluded.code_hash,expires_at=excluded.expires_at,attempts=0").bind(email, await digest(`${code}:${env.AUTH_PEPPER}`), expires).run()
  const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" }, body: JSON.stringify({ from: env.RESEND_FROM, to: [email], subject: "Your verification code", text: `Your verification code is ${code}. It expires in 10 minutes.` }) })
  if (!response.ok) { await env.DB.prepare("DELETE FROM email_codes WHERE email=?").bind(email).run(); return json({ error: "Could not send verification email" }, 502) }
  return json({ ok: true })
}
async function signup(request: Request, env: Env) {
  if (!validEnv(env)) return json({ error: `Auth service missing: ${missingEnv(env).join(", ")}` }, 503)
  const b = await request.json() as { name?:string; phone?:string; email?:string; password?:string; confirmPassword?:string; code?:string; referralCode?:string }
  const name = b.name?.trim() ?? "", phone = digits(b.phone ?? "").replace(/^0/, ""), email = b.email?.trim().toLowerCase() ?? "", password = b.password ?? ""
  if (!/^[\u0980-\u09FF\s.'’-]{2,100}$/.test(name) || !/[\u0980-\u09FF]/.test(name)) return json({ error: "Enter your full name in Bangla" }, 400)
  if (!/^1\d{9}$/.test(phone)) return json({ error: "Enter a valid Bangladesh phone number" }, 400)
  if (!emailPattern.test(email) || email.length > 255 || password.length < 8 || password.length > 128 || password !== b.confirmPassword) return json({ error: "Check email and password fields" }, 400)
  const row = await env.DB.prepare("SELECT code_hash,expires_at,attempts FROM email_codes WHERE email=?").bind(email).first<{code_hash:string;expires_at:number;attempts:number}>()
  if (!row || row.expires_at < Date.now() || row.attempts >= 5) return json({ error: "Invalid or expired verification code" }, 400)
  if (row.code_hash !== await digest(`${digits(b.code ?? "")}:${env.AUTH_PEPPER}`)) {
    await env.DB.prepare("UPDATE email_codes SET attempts=attempts+1 WHERE email=?").bind(email).run()
    return json({ error: "Invalid or expired verification code" }, 400)
  }
  const userId = crypto.randomUUID(), hash = await passwordHash(password, env.AUTH_PEPPER)
  try { await env.DB.prepare("INSERT INTO users(id,name,phone,email,password_hash,referral_code,created_at) VALUES(?,?,?,?,?,?,?)").bind(userId,name,phone,email,hash,b.referralCode?.trim() || null,Date.now()).run() }
  catch { return json({ error: "Email or phone already registered" }, 409) }
  await env.DB.prepare("DELETE FROM email_codes WHERE email=?").bind(email).run()
  return sessionResponse(env, userId)
}
async function signin(request: Request, env: Env) {
  if (!validEnv(env)) return json({ error: `Auth service missing: ${missingEnv(env).join(", ")}` }, 503)
  const b = await request.json() as { identifier?:string; password?:string }
  const identifier = b.identifier?.trim() ?? ""
  if (!identifier || !b.password || b.password.length > 128) return json({ error: "Invalid credentials" }, 400)
  const emailLogin = emailPattern.test(identifier)
  const phone = digits(identifier).replace(/^0/, "")
  const user = await env.DB.prepare("SELECT id,password_hash FROM users WHERE email=? COLLATE NOCASE OR phone=?").bind(emailLogin ? identifier.toLowerCase() : "", emailLogin ? "" : phone).first<{id:string;password_hash:string}>()
  if (!user || !await verifyPassword(b.password,user.password_hash,env.AUTH_PEPPER)) return json({ error: "Invalid email/phone or password" }, 401)
  return sessionResponse(env,user.id)
}
async function sessionResponse(env: Env & { DB:D1Database }, userId: string) {
  const token = hex(crypto.getRandomValues(new Uint8Array(32))), expires = Date.now() + 30 * 24 * 60 * 60_000
  await env.DB.prepare("INSERT INTO sessions(token_hash,user_id,expires_at) VALUES(?,?,?)").bind(await digest(token),userId,expires).run()
  return json({ ok: true }, 200, { "set-cookie": `session=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=2592000` })
}
export async function handleAuthRequest(request: Request, rawEnv: unknown) {
  const url = new URL(request.url), env = (rawEnv ?? {}) as Env
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405, { allow:"POST" })
  if (env.APP_ORIGIN && request.headers.get("origin") !== env.APP_ORIGIN) return json({ error:"Forbidden" },403)
  try {
    if (url.pathname === "/api/auth/send-code") return await sendCode(request,env)
    if (url.pathname === "/api/auth/signup") return await signup(request,env)
    if (url.pathname === "/api/auth/signin") return await signin(request,env)
    return json({ error:"Not found" },404)
  } catch (error) {
    console.error("Auth API failure:", error)
    return json({ error: "Authentication request failed", detail: error instanceof Error ? error.message : "Unknown server error" },500)
  }
}
