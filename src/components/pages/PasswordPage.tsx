import PasswordForm from "@/components/app/PasswordForm"
import { useAppState } from "@/components/app/AppState"
export default function PasswordPage() { const { showToast, changePage } = useAppState(); return <PasswordForm title="পাসওয়ার্ড পরিবর্তন"  action={showToast} onNavigate={changePage} /> }
