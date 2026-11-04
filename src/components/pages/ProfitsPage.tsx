import { useAppState } from "@/components/app/AppState"
import RecordList from "@/components/app/RecordList"
export default function ProfitsPage() {
 const { balance, changePage } = useAppState()
 return (
        <RecordList
          title="লাভের রেকর্ড"
          onNavigate={changePage}
          summary={[["আজকের লাভ", "৳ ৪০"], ["এই মাসে", "৳ ৮২০"], ["মোট লাভ", "৳ ১,৪০০"]]}
          rows={[
            ["ভিআইপি ১ দৈনিক লাভ", "০৩ নভেম্বর ২০২৬", "+৳ ৪০", true],
            ["ভিআইপি ১ দৈনিক লাভ", "০২ নভেম্বর ২০২৬", "+৳ ৪০", true],
            ["দলীয় কমিশন", "০২ নভেম্বর ২০২৬", "+৳ ২৪.৫০", true],
            ["ভিআইপি ১ দৈনিক লাভ", "০১ নভেম্বর ২০২৬", "+৳ ৪০", true],
            ["২% নিশ্চিত লাভ", "৩১ অক্টোবর ২০২৬", "+৳ ২০", true],
          ]}
        />
 )
}
