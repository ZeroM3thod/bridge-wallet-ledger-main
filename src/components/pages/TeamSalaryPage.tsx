import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogPortal, DialogOverlay, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Content as DialogPrimitiveContent } from "@radix-ui/react-dialog"
import Icon from "@/components/app/Icon"
import { useAppState } from "@/components/app/AppState"
import { AppLink } from "@/components/app/AppLink"
import { teamData, salaryTiers, levelTotals } from "@/lib/app-data"
import { bengaliNumber, money } from "@/lib/app-format"
export default function TeamSalaryPage() {
 const { showToast: action, setBalance, claimedTier, setClaimedTier } = useAppState()
 const level = 1
  const [salarySuccess, setSalarySuccess] = useState<{
    rank: string
    amount: number
  } | null>(null)
  const claimSalary = (tierIndex: number, rank: string, salary: number) => {
    if (claimedTier !== null) return
    setClaimedTier(tierIndex)
    setBalance(current => current + salary)
    setSalarySuccess({ rank, amount: salary })
  }
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

 return <main className="team-page page-content"><AppLink page="team" className="sub-back">← মাসিক বেতন</AppLink>
        <section className="salary-dash">
          <section className="salary-hero">
            <div className="salary-hero-top">
              <div className="salary-hero-title">
                <span className="salary-hero-badge">টিম লিডারশিপ ড্যাশবোর্ড</span>
                <h2>আপনার বর্তমান অর্জন</h2>
              </div>
              <span className="salary-hero-trophy" aria-hidden="true">🏆</span>
            </div>
            <div className="salary-hero-stats main">
              <div>
                <small>বর্তমান স্যালারি র‍্যাংক</small>
                <strong>
                  {bestTier ? `${bestTier.icon} ${bestTier.rank}` : "লিডার নন"}
                </strong>
              </div>
              <div>
                <small>অর্জিত মাসিক বেতন</small>
                <strong className="gain">
                  {bestTier ? `${money(bestTier.amount)} / মাস` : "—"}
                </strong>
              </div>
            </div>
            <div className="salary-hero-stats three">
              <div>
                <small>মোট রেফারেল</small>
                <strong>{bengaliNumber(teamMemberTotal)} জন</strong>
              </div>
              <div>
                <small>ভিআইপি ১+ সক্রিয়</small>
                <strong className="amber">
                  {bengaliNumber(liveStats.l1 + liveStats.l2 + liveStats.l3)} জন
                </strong>
              </div>
              <div>
                <small>টিম ডিপোজিট</small>
                <strong className="gain">{money(teamDepositTotal)}</strong>
              </div>
            </div>
          </section>

          <aside className="salary-notice">
            <b aria-hidden="true">💡</b>
            <p>
              <strong>বেতনের নিয়ম:</strong> স্যালারি কাউন্টে কেবল{" "}
              <strong>ভিআইপি ১ বা তার ওপরের</strong> সদস্যরা গণ্য হবেন।{" "}
              <em>(ভিআইপি ০ গ্রহণযোগ্য নয়)</em>।
            </p>
          </aside>

          <div className="salary-head">
            <h3>মাসিক বেতন স্কেল ও শর্তাবলী</h3>
            <span>মোট {bengaliNumber(salaryTiers.length)}টি স্কেল</span>
          </div>

          <div className="salary-tiers">
            {salaryTiers.map((tier, index) => {
              const l1Pass = liveStats.l1 >= tier.req.l1
              const l2Pass = liveStats.l2 >= tier.req.l2
              const l3Pass = liveStats.l3 >= tier.req.l3
              const canClaim = l1Pass && l2Pass && l3Pass
              const isClaimed = claimedTier === index
              return (
                <article
                  className={canClaim ? "salary-tier unlocked" : "salary-tier"}
                  key={tier.rank}
                >
                  <div className="salary-tier-top">
                    <div>
                      <b>
                        {tier.icon} {tier.rank}
                      </b>
                      <strong>
                        {money(tier.amount)} <small>/ মাস</small>
                      </strong>
                    </div>
                    {canClaim ? (
                      <button
                        className="salary-claim"
                        disabled={claimedTier !== null}
                        onClick={() => claimSalary(index, tier.rank, tier.amount)}
                      >
                        {isClaimed ? "নেওয়া হয়েছে" : "দাবি করুন"}
                      </button>
                    ) : (
                      <button className="salary-locked" disabled>
                        🔒 অপূর্ণাঙ্গ
                      </button>
                    )}
                  </div>
                  <div className="salary-tier-reqs">
                    <span>শর্তাবলী:</span>
                    <span className={`req-pill ${l1Pass ? "pass" : ""}`}>
                      লেভেল ১: {bengaliNumber(liveStats.l1)}/
                      {bengaliNumber(tier.req.l1)} {l1Pass ? "✓" : ""}
                    </span>
                    {tier.req.l2 > 0 && (
                      <span className={`req-pill ${l2Pass ? "pass" : ""}`}>
                        লেভেল ২: {bengaliNumber(liveStats.l2)}/
                        {bengaliNumber(tier.req.l2)} {l2Pass ? "✓" : ""}
                      </span>
                    )}
                    {tier.req.l3 > 0 && (
                      <span className={`req-pill ${l3Pass ? "pass" : ""}`}>
                        লেভেল ৩: {bengaliNumber(liveStats.l3)}/
                        {bengaliNumber(tier.req.l3)} {l3Pass ? "✓" : ""}
                      </span>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      <Dialog open={salarySuccess !== null}
        onOpenChange={(open) => {
          if (!open) setSalarySuccess(null)
        }}
      >
        <DialogPortal>
          <DialogOverlay className="withdraw-success-overlay" />
          <DialogPrimitiveContent className="withdraw-success-dialog">
            <span className="withdraw-success-icon" aria-hidden="true">
              <Icon name="check" size={25} strokeWidth={3} />
            </span>
            <DialogTitle className="withdraw-success-title">
              আবেদন সফল হয়েছে!
            </DialogTitle>
            <DialogDescription className="withdraw-success-description">
              বেতনের আবেদন সফলভাবে গৃহীত হয়েছে। এডমিন ভেরিফিকেশন শেষে আপনার
              ওয়ালেটে জমা হবে।
            </DialogDescription>
            {salarySuccess && (
              <dl className="withdraw-success-details">
                <div>
                  <dt>লিডার র‍্যাংক:</dt>
                  <dd>{salarySuccess.rank}</dd>
                </div>
                <div className="net">
                  <dt>অর্জিত মাসিক বেতন:</dt>
                  <dd>{money(salarySuccess.amount)}</dd>
                </div>
              </dl>
            )}
            <Button
              className="withdraw-success-home"
              onClick={() => setSalarySuccess(null)}
            >
              ঠিক আছে
            </Button>
          </DialogPrimitiveContent>
        </DialogPortal>
      </Dialog>
</main>
}
