import { useState } from "react"
import type { Page } from "@/lib/app-navigation"
import SubPageShell from "./SubPageShell"
export default function PasswordForm({ title, withdrawal, action, onNavigate }: { title: string; withdrawal?: boolean; action: (m: string) => void; onNavigate: (page: Page) => void }) {
  const [oldPw, setOldPw] = useState("")
  const [pw, setPw] = useState("")
  const [pw2, setPw2] = useState("")
  const submit = () => {
    if (!oldPw || !pw || !pw2) return action("সব ঘর পূরণ করুন")
    if (pw.length < 6) return action("নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে")
    if (pw !== pw2) return action("নতুন পাসওয়ার্ড মিলছে না")
    setOldPw(""); setPw(""); setPw2("")
    action(`${title} সফলভাবে পরিবর্তন হয়েছে`)
  }
  return (
    <SubPageShell title={title} onNavigate={onNavigate}>
      <section className="ps-card">
        <label className="ps-field"><span>{withdrawal ? "বর্তমান উত্তোলন পাসওয়ার্ড" : "বর্তমান পাসওয়ার্ড"}</span>
          <input type="password" value={oldPw} onChange={(e) => setOldPw(e.target.value)} placeholder="বর্তমান পাসওয়ার্ড লিখুন" /></label>
        <label className="ps-field"><span>নতুন পাসওয়ার্ড</span>
          <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="কমপক্ষে ৬ অক্ষর" /></label>
        <label className="ps-field"><span>নতুন পাসওয়ার্ড নিশ্চিত করুন</span>
          <input type="password" value={pw2} onChange={(e) => setPw2(e.target.value)} placeholder="আবার লিখুন" /></label>
        <p className="ps-note">{withdrawal ? "উত্তোলনের সময় এই পাসওয়ার্ড প্রয়োজন হবে। কারো সাথে শেয়ার করবেন না।" : "নিরাপত্তার জন্য শক্তিশালী পাসওয়ার্ড ব্যবহার করুন।"}</p>
      </section>
      <button className="ps-save" onClick={submit}>পরিবর্তন করুন</button>
    </SubPageShell>
  )
}

