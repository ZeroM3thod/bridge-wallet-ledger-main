import { useEffect, useState, type ReactNode } from "react"
import { AppLink } from "@/components/app/AppLink"

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRe = /^0?1\d{9}$/
const toBanglaDigits = (value: string) => value.replace(/[0-9]/g, (digit) => "০১২৩৪৫৬৭۸৯"[Number(digit)] ?? digit)
const toEnglishDigits = (value: string) => value.replace(/[০-৯]/g, (digit) => String("০১২৩৪৫৬৭৮৯".indexOf(digit)))
const isBanglaName = (value: string) => /^[\u0980-\u09FF\s.'’-]+$/.test(value.trim()) && /[\u0980-\u09FF]/.test(value)
const sv = { width: 21, height: 21, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
const icons: Record<string, ReactNode> = {
  user: <svg {...sv}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" /></svg>,
  phone: <svg {...sv}><rect x="6" y="2" width="12" height="20" rx="3" /><path d="M11 18h2" /></svg>,
  mail: <svg {...sv}><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m3.5 7 8.5 6 8.5-6" /></svg>,
  shield: <svg {...sv}><path d="M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6l-8-3z" /><path d="m9 12 2 2 4-4" /></svg>,
  lock: <svg {...sv}><rect x="4" y="10" width="16" height="11" rx="2.5" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>,
  gift: <svg {...sv}><rect x="3" y="8" width="18" height="13" rx="2" /><path d="M12 8v13M3 13h18M12 8c-2 0-4-1-4-3s2-2.5 4 1c2-3.5 4-3 4-1s-2 3-4 3z" /></svg>,
}

function Logo() {
  return (
    <svg className="auth-logo" viewBox="0 0 64 64" role="img" aria-label="লোগো">
      <defs>
        <linearGradient id="alg1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#0053db" /><stop offset="1" stopColor="#002d78" /></linearGradient>
        <linearGradient id="alg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffe08a" /><stop offset="1" stopColor="#f2a93b" /></linearGradient>
      </defs>
      <path d="M32 3 56 17v30L32 61 8 47V17z" fill="url(#alg1)" />
      <path d="M32 3 56 17v30L32 61 8 47V17z" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="1.5" />
      <path d="M18 40 27 30l7 6 12-14" fill="none" stroke="url(#alg2)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M40 21h7v7" fill="none" stroke="url(#alg2)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Field({ icon, invalid, children }: { icon: string; invalid?: boolean; children: ReactNode }) {
  return <div className={`auth-field${invalid ? " invalid" : ""}`}><span className="auth-ico">{icons[icon]}</span>{children}</div>
}

function PwInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  const [show, setShow] = useState(false)
  return <>
    <input type={show ? "text" : "password"} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    <button type="button" className="auth-eye" onClick={() => setShow(!show)} aria-label="পাসওয়ার্ড দেখান">
      <svg {...sv} width={23} height={23}><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" /><circle cx="12" cy="12" r="3" /></svg>
    </button>
  </>
}

function Shell({ title, sub, children }: { title: string; sub: string; children: ReactNode }) {
  return <main className="auth-page"><div className="auth-inner"><h1>{title}</h1><p className="auth-sub">{sub}</p><Logo /><div className="auth-brand">বরজাজ</div>{children}</div></main>
}

export function SignupPage() {
  const [f, setF] = useState({ name: "", phone: "", email: "", otp: "", pw: "", pw2: "", invite: "" })
  const [bad, setBad] = useState("")
  const [msg, setMsg] = useState({ text: "", ok: false })
  const [timer, setTimer] = useState(0)
  const [sentTo, setSentTo] = useState("")
  const set = (k: keyof typeof f) => (v: string) => { setF({ ...f, [k]: v }); if (bad === k) setBad("") }
  useEffect(() => { if (timer <= 0) return; const t = setTimeout(() => setTimer(timer - 1), 1000); return () => clearTimeout(t) }, [timer])
  const fail = (k: string, text: string) => { setBad(k); setMsg({ text, ok: false }) }
  const level = !f.pw ? 0 : Math.max(1, (f.pw.length >= 6 ? 1 : 0) + (/[A-Za-z]/.test(f.pw) && /\d/.test(f.pw) ? 1 : 0) + (f.pw.length >= 10 && /[^A-Za-z0-9]/.test(f.pw) ? 1 : 0))
  const sendCode = async () => {
    if (!emailRe.test(f.email.trim())) return fail("email", "সঠিক ইমেইল ঠিকানা দিন")
    try {
      const response = await fetch("/api/auth/send-code", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: f.email.trim() }) })
      const data = await response.json()
      if (!response.ok) return fail("email", data.error ?? "কোড পাঠানো যায়নি")
      setBad(""); setSentTo(f.email.trim()); setTimer(60); setMsg({ text: "ইমেইলে যাচাইকরণ কোড পাঠানো হয়েছে", ok: true })
    } catch { fail("email", "সার্ভারের সঙ্গে সংযোগ করা যায়নি") }
  }
  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isBanglaName(f.name)) return fail("name", "বাংলায় পূর্ণ নাম লিখুন")
    if (!phoneRe.test(toEnglishDigits(f.phone.trim()))) return fail("phone", "সঠিক ফোন নম্বর দিন")
    if (!emailRe.test(f.email.trim())) return fail("email", "সঠিক ইমেইল ঠিকানা দিন")
    if (!/^\d{6}$/.test(toEnglishDigits(f.otp.trim()))) return fail("otp", "ইমেইলে পাঠানো ৬ সংখ্যার কোড দিন")
    if (f.pw.length < 6) return fail("pw", "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে")
    if (f.pw2 !== f.pw) return fail("pw2", "পাসওয়ার্ড নিশ্চিতকরণ মিলছে না")
    try {
      const response = await fetch("/api/auth/signup", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name:f.name, phone:f.phone, email:f.email, code:toEnglishDigits(f.otp), password:f.pw, confirmPassword:f.pw2, referralCode:f.invite }) })
      const data = await response.json()
      if (!response.ok) return fail("otp", data.error ?? "নিবন্ধন করা যায়নি")
      window.location.assign("/")
    } catch { fail("otp", "সার্ভারের সঙ্গে সংযোগ করা যায়নি") }
  }
  return (
    <Shell title="নিবন্ধন" sub="নতুন অ্যাকাউন্ট তৈরি করুন">
      <form onSubmit={submit} noValidate>
        <Field icon="user" invalid={bad === "name"}><input value={f.name} onChange={(e) => set("name")(e.target.value.replace(/[^\u0980-\u09FF\s.'’-]/g, ""))} placeholder="পূর্ণ নাম (বাংলা)" maxLength={100} autoComplete="name" /></Field>
        <Field icon="phone" invalid={bad === "phone"}><span className="auth-prefix">+880</span><input type="tel" inputMode="numeric" value={f.phone} onChange={(e) => set("phone")(toBanglaDigits(e.target.value).replace(/[^০-৯]/g, ""))} placeholder="ফোন নম্বর" maxLength={11} /></Field>
        <Field icon="mail" invalid={bad === "email"}><input type="email" value={f.email} onChange={(e) => set("email")(e.target.value)} placeholder="ইমেইল ঠিকানা" maxLength={255} /></Field>
        <Field icon="shield" invalid={bad === "otp"}>
          <input inputMode="numeric" value={f.otp} onChange={(e) => set("otp")(toBanglaDigits(e.target.value).replace(/[^০-৯]/g, ""))} placeholder="ইমেইল যাচাই কোড (OTP)" maxLength={6} autoComplete="one-time-code" />
          <button type="button" className="auth-send" onClick={sendCode} disabled={timer > 0}>{timer > 0 ? `${timer}s` : "কোড পাঠান"}</button>
        </Field>
        <p className={`auth-hint${sentTo ? " ok" : ""}`}>{sentTo ? `${sentTo} ঠিকানায় কোড পাঠানো হয়েছে` : "আপনার ইমেইলে ৬ সংখ্যার কোড পাঠানো হবে"}</p>
        <Field icon="lock" invalid={bad === "pw"}><PwInput value={f.pw} onChange={set("pw")} placeholder="লগইন পাসওয়ার্ড" /></Field>
        <div className="auth-strength" data-level={level}><i /><i /><i /></div>
        <Field icon="lock" invalid={bad === "pw2"}><PwInput value={f.pw2} onChange={set("pw2")} placeholder="পাসওয়ার্ড নিশ্চিত করুন" /></Field>
        <Field icon="gift"><input value={f.invite} onChange={(e) => set("invite")(e.target.value)} placeholder="আমন্ত্রণ কোড" maxLength={20} autoComplete="off" /></Field>
        <button type="submit" className="auth-submit">নিবন্ধন</button>
        <AppLink page="signin" plain className="auth-login">ইতিমধ্যে নিবন্ধিত</AppLink>
        <p className={`auth-msg${msg.ok ? " ok" : ""}`} role="alert">{msg.text}</p>
      </form>
    </Shell>
  )
}

export function SigninPage() {
  const [id, setId] = useState("")
  const [pw, setPw] = useState("")
  const [bad, setBad] = useState("")
  const [msg, setMsg] = useState({ text: "", ok: false })
  const fail = (k: string, text: string) => { setBad(k); setMsg({ text, ok: false }) }
  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const v = id.trim()
    if (!emailRe.test(v) && !phoneRe.test(toEnglishDigits(v))) return fail("id", "সঠিক ইমেইল বা ফোন নম্বর দিন")
    if (!pw) return fail("pw", "পাসওয়ার্ড দিন")
    try {
      const response = await fetch("/api/auth/signin", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ identifier:v, password:pw }) })
      const data = await response.json()
      if (!response.ok) return fail("id", data.error ?? "লগইন করা যায়নি")
      window.location.assign("/")
    } catch { fail("id", "সার্ভারের সঙ্গে সংযোগ করা যায়নি") }
  }
  return (
    <Shell title="লগইন" sub="আপনার অ্যাকাউন্টে প্রবেশ করুন">
      <form onSubmit={submit} noValidate>
        <Field icon="user" invalid={bad === "id"}><input value={id} onChange={(e) => { setId(e.target.value); setBad("") }} placeholder="ইমেইল বা ফোন নম্বর" maxLength={255} autoComplete="username" /></Field>
        <Field icon="lock" invalid={bad === "pw"}><PwInput value={pw} onChange={(v) => { setPw(v); setBad("") }} placeholder="লগইন পাসওয়ার্ড" /></Field>
        <button type="submit" className="auth-submit">লগইন</button>
        <AppLink page="signup" plain className="auth-login">নতুন অ্যাকাউন্ট তৈরি করুন</AppLink>
        <p className={`auth-msg${msg.ok ? " ok" : ""}`} role="alert">{msg.text}</p>
      </form>
    </Shell>
  )
}
