import PasswordForm from "@/components/app/PasswordForm"
import { useAppState } from "@/components/app/AppState"
export default function WithdrawalPasswordPage() { const { showToast, changePage } = useAppState(); return <PasswordForm title="উত্তোলন পাসওয়ার্ড" withdrawal action={showToast} onNavigate={changePage} /> }
