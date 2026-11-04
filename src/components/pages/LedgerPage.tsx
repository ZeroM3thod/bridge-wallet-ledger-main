import { useAppState } from "@/components/app/AppState"
import RecordList from "@/components/app/RecordList"
export default function LedgerPage() {
 const { balance, changePage } = useAppState()
 return (
        <RecordList
          title="সাধারণ হিসাবপত্র"
          onNavigate={changePage}
          summary={[["বর্তমান ব্যালেন্স", `৳ ${balance.toLocaleString("bn-BD")}`], ["মোট জমা", "৳ ২,৬০০"], ["মোট উত্তোলন", "৳ ২০০"]]}
          rows={[
            ["জমা (বিকাশ)", "০১ নভেম্বর ২০২৬", "+৳ ১,০০০", true],
            ["প্যাকেজ ক্রয়", "৩০ অক্টোবর ২০২৬", "-৳ ৫০০", false],
            ["দৈনিক লাভ", "২৯ অক্টোবর ২০২৬", "+৳ ৪০", true],
            ["উত্তোলন (নগদ)", "২৫ অক্টোবর ২০২৬", "-৳ ২০০", false],
            ["জমা (নগদ)", "২০ অক্টোবর ২০২৬", "+৳ ১,৬০০", true],
          ]}
        />
 )
}
