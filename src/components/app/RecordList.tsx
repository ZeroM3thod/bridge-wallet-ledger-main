import type { Page } from "@/lib/app-navigation"
import SubPageShell from "./SubPageShell"
export default function RecordList({ title, summary, rows, onNavigate }: { title: string; summary: [string, string][]; rows: [string, string, string, boolean][]; onNavigate: (page: Page) => void }) {
  return (
    <SubPageShell title={title} onNavigate={onNavigate}>
      <section className="ps-card sp-summary">
        {summary.map(([k, v]) => (<div key={k}><span>{k}</span><b>{v}</b></div>))}
      </section>
      <section className="ps-card sp-list">
        {rows.map(([name, date, amt, plus], i) => (
          <div className="sp-row" key={i}>
            <div><strong>{name}</strong><small>{date}</small></div>
            <b className={plus ? "plus" : "minus"}>{amt}</b>
          </div>
        ))}
      </section>
    </SubPageShell>
  )
}

