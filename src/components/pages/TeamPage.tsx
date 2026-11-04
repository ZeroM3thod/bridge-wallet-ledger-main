import Icon from "@/components/app/Icon"
import { useAppState } from "@/components/app/AppState"
import { AppLink } from "@/components/app/AppLink"
import { teamData, salaryTiers, levelTotals } from "@/lib/app-data"
import { bengaliNumber, money } from "@/lib/app-format"
export default function TeamPage() {
 const { showToast: action, changePage } = useAppState()
 const level = 1
  const liveStats = {
    l1: teamData[1].active,
    l2: teamData[2].active,
    l3: teamData[3].active,
  }
  const teamDepositTotal = ([1, 2, 3] as const).reduce(
    (sum, item) => sum + teamData[item].teamDeposit,
    0,
  )
  const teamMemberTotal = ([1, 2, 3] as const).reduce(
    (sum, item) => sum + teamData[item].members,
    0,
  )
  const bestTier = [...salaryTiers]
    .reverse()
    .find(
      (tier) =>
        liveStats.l1 >= tier.req.l1 &&
        liveStats.l2 >= tier.req.l2 &&
        liveStats.l3 >= tier.req.l3,
    )
  const data = teamData[level]
  const totals = levelTotals(level)
  const summary = ([1, 2, 3] as const).reduce(
    (result, item) => {
      const itemTotals = levelTotals(item)
      result.deposit += itemTotals.deposit
      result.profit += itemTotals.profit
      result.members += teamData[item].members
      result.active += teamData[item].active
      return result
    },
    { deposit: 0, profit: 0, members: 0, active: 0 },
  )

  const copyText = async (text: string, message: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const input = document.createElement("input")
      input.value = text
      document.body.appendChild(input)
      input.select()
      document.execCommand("copy")
      input.remove()
    }
    action(message)
  }

 return <main className="team-page page-content">
        <>
      <section className="team-summary">
        <div className="team-summary-mark">
          <Icon name="users" size={74} strokeWidth={1.4} />
        </div>
        <div className="team-badges">
          <span>রেফারেল প্রোগ্রাম</span>
          <small>৩ স্তরের দল</small>
        </div>
        <h1>সাফল্যের সঙ্গী</h1>
        <p>আমন্ত্রণে বোনাস পান</p>
        <div className="team-summary-grid main">
          <div>
            <small>মোট রেফার ইনকাম</small>
            <strong className="amber">
              {money(summary.deposit + summary.profit)}
            </strong>
          </div>
          <div>
            <small>মোট সদস্য</small>
            <strong>{bengaliNumber(summary.members)} জন</strong>
          </div>
          <div>
            <small>সক্রিয় সদস্য</small>
            <strong className="green">
              {bengaliNumber(summary.active)} জন
            </strong>
          </div>
          <div>
            <small>ডিপোজিট বোনাস</small>
            <strong>{money(summary.deposit)}</strong>
          </div>
          <div>
            <small>প্রফিট কমিশন</small>
            <strong>{money(summary.profit)}</strong>
          </div>
        </div>
      </section>

      <section className="invite-card team-card">
        <div className="team-card-heading">
          <span>
            <Icon name="share" size={20} />
          </span>
          <div>
            <h2>আমন্ত্রণ লিংক</h2>
            <p>নতুন সদস্য আনুন</p>
          </div>
        </div>
        <label>আমন্ত্রণ কোড</label>
        <div className="copy-field">
          <strong>BOROJAJ8996</strong>
          <button
            onClick={() => copyText("BOROJAJ8996", "কোড কপি হয়েছে")}
          >
            <Icon name="copy" size={15} /> কপি
          </button>
        </div>
        <label>আমন্ত্রণ লিংক</label>
        <div className="copy-field link-field">
          <span>https://borojaj.app/ref/BOROJAJ8996</span>
          <button
            onClick={() =>
              copyText(
                "https://borojaj.app/ref/BOROJAJ8996",
                "লিংক কপি হয়েছে",
              )
            }
          >
            <Icon name="link" size={15} /> কপি লিংক
          </button>
        </div>
      </section>

      <section className="team-links">
        <AppLink className="team-card" page="members">
          <Icon name="users" size={20} />
          <span>সদস্য ও কমিশন</span>
          <em>›</em>
        </AppLink>
        <AppLink className="team-card" page="salary">
          <Icon name="wallet" size={20} />
          <span>মাসিক বেতন</span>
          <em>›</em>
        </AppLink>
      </section>
        </>
</main>
}
