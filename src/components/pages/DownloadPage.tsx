import { useAppState } from "@/components/app/AppState"
import SubPageShell from "@/components/app/SubPageShell"
export default function DownloadPage() {
 const { showToast: action, changePage: onNavigate } = useAppState()
  return (
    <SubPageShell title="অ্যাপ ডাউনলোড" onNavigate={onNavigate}>
      <section className="ps-card sp-download">
        <div className="sp-app-icon">ব</div>
        <strong>বড়োজাজ অ্যাপ</strong>
        <small>সংস্করণ ১.০.০ • ১৮ MB</small>
        <p className="ps-note">দ্রুত ও নিরাপদে আপনার হিসাব পরিচালনা করতে অ্যাপটি ডাউনলোড করুন।</p>
      </section>
      <button className="ps-save" onClick={() => action("অ্যান্ড্রয়েড অ্যাপ ডাউনলোড শুরু হয়েছে (ডেমো)")}>অ্যান্ড্রয়েড ডাউনলোড</button>
      <button className="ps-save sp-secondary" onClick={() => action("iOS সংস্করণ শীঘ্রই আসছে")}>iOS ডাউনলোড</button>
    </SubPageShell>
  )
}

