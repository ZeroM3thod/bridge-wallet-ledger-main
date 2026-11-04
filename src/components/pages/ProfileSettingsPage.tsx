import { useState } from "react"
import { useAppState } from "@/components/app/AppState"
import { AppLink } from "@/components/app/AppLink"
export default function ProfileSettingsPage() {
  const { showToast: action, changePage: onNavigate } = useAppState()

  const [name, setName] = useState("রাকিবুল হাসান")
  const [gender, setGender] = useState("পুরুষ")
  const [photo, setPhoto] = useState<string | null>(null)
  const onPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setPhoto(URL.createObjectURL(file))
  }
  return (
    <main className="home-page page-content profile-settings">
      <AppLink page="profile" className="ps-back">‹ ফিরে যান</AppLink>
      <h1 className="ps-title">প্রোফাইল সেটিংস</h1>
      <section className="ps-card ps-avatar-wrap">
        <label className="ps-avatar">
          {photo ? <img src={photo} alt="প্রোফাইল ছবি" /> : <span>{name.trim().charAt(0) || "?"}</span>}
          <input type="file" accept="image/*" onChange={onPhoto} hidden />
          <b>ছবি পরিবর্তন</b>
        </label>
      </section>
      <section className="ps-card">
        <label className="ps-field">
          <span>নাম</span>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="আপনার নাম" />
        </label>
        <div className="ps-field">
          <span>লিঙ্গ</span>
          <div className="ps-gender">
            {["পুরুষ", "মহিলা", "অন্যান্য"].map((g) => (
              <button key={g} className={gender === g ? "active" : undefined} onClick={() => setGender(g)}>{g}</button>
            ))}
          </div>
        </div>
        <label className="ps-field">
          <span>জিমেইল</span>
          <input value="rakibul.demo@gmail.com" readOnly disabled />
        </label>
        <label className="ps-field">
          <span>মোবাইল নম্বর</span>
          <input value="০১৭১২-৩৪৫৬৭৮" readOnly disabled />
        </label>
        <p className="ps-note">জিমেইল ও মোবাইল নম্বর পরিবর্তন করা যাবে না।</p>
      </section>
      <button
        className="ps-save"
        onClick={() => (name.trim() ? action("প্রোফাইল সংরক্ষিত হয়েছে") : action("নাম লিখুন"))}
      >সংরক্ষণ করুন</button>
    </main>
  )
}

