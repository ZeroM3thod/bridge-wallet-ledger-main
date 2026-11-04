import { useState } from "react"
import Icon from "@/components/app/Icon"
import { useAppState } from "@/components/app/AppState"
import { AppLink } from "@/components/app/AppLink"
import { bengaliNumber, money, expiryDateFromToday } from "@/lib/app-format"
export default function WorkPage() {
  const { showToast: action, balance, investment, fixedDeposit, transactions, activateFixedDeposit: onFixedDeposit, changePage } = useAppState()

  const onExplore = () => changePage("earn")
  const [showFixedDeposit, setShowFixedDeposit] = useState(false)

  const confirmFixedDeposit = () => {
    if (balance <= 0) {
      action("সঞ্চয় নেই")
      return
    }
    onFixedDeposit()
    setShowFixedDeposit(false)
  }

  const dailyRate = investment ? investment.package.dailyRate / 100 : 0
  const dailyRows = investment
    ? Array.from({ length: investment.package.durationDays }, (_, index) => {
        const openingBalance =
          investment.amount * Math.pow(1 + dailyRate, index)
        const profit = openingBalance * dailyRate
        return {
          day: index + 1,
          openingBalance,
          profit,
          closingBalance: openingBalance + profit,
        }
      })
    : []
  const firstDayProfit = dailyRows[0]?.profit ?? 0
  const termProfit = investment
    ? investment.amount *
        Math.pow(1 + dailyRate, investment.package.durationDays) -
      investment.amount
    : 0
  const fixedDepositHistory = transactions.filter((item) =>
    item.label.includes("স্থির সঞ্চয়"),
  )

  return (
    <main className="earn-page work-investment-page page-content">
      <section className="earn-hero">
        <div className="earn-hero-icon">
          <Icon name="work" size={38} />
        </div>
        <div>
          <span className="earn-kicker">দৈনিক আয়</span>
          <h1>আপনার কর্মক্ষেত্র</h1>
          <p>প্যাকেজের দৈনিক হিসাব</p>
        </div>
        <div className="earn-overview">
          <div>
            <small>সক্রিয় প্যাকেজ</small>
            <strong>{investment ? investment.package.name : "এখনও নেই"}</strong>
          </div>
          <div>
            <small>দৈনিক লাভ</small>
            <strong>{investment ? money(firstDayProfit) : money(0)}</strong>
          </div>
        </div>
      </section>

      <section className="work-savings-card">
        <div className="package-heading">
          <div>
            <span>
              <Icon name="shield" size={21} />
            </span>
            <div>
              <h2>২% নিশ্চিত লাভ</h2>
              <p>সঞ্চয়ের মেয়াদি হিসাব</p>
            </div>
          </div>
          <b>{fixedDeposit ? "চলমান" : "ইতিহাস"}</b>
        </div>

        {fixedDeposit ? (
          <article className="work-savings-active">
            <div className="work-savings-status">
              <span>
                <Icon name="check" size={24} />
              </span>
              <div>
                <small>৭ দিনের সঞ্চয়</small>
                <strong>সঞ্চয় নিরাপদে আবদ্ধ</strong>
                <p>শুরুর দিন {fixedDeposit.startedAt}</p>
              </div>
            </div>
            <div className="work-savings-metrics">
              <div>
                <small>আবদ্ধ মূলধন</small>
                <strong>{money(fixedDeposit.principal)}</strong>
              </div>
              <div>
                <small>নিশ্চিত লাভ</small>
                <strong>+ {money(fixedDeposit.profit)}</strong>
              </div>
              <div>
                <small>মেয়াদশেষে মোট</small>
                <strong>{money(fixedDeposit.maturityAmount)}</strong>
              </div>
              <div>
                <small>মেয়াদ ফুরোবে</small>
                <strong>{fixedDeposit.expiresAt}</strong>
              </div>
            </div>
          </article>
        ) : (
          <div className="work-savings-empty">
            <Icon name="calendar" size={30} />
            <div>
              <strong>স্থির সঞ্চয় নেই</strong>
              <p>সাপ্তাহিক ২% লাভ</p>
            </div>
            <button onClick={() => setShowFixedDeposit(true)}>
              বিস্তারিত দেখুন
            </button>
          </div>
        )}

        {fixedDepositHistory.length > 0 && (
          <div className="work-savings-history">
            <div className="work-history-title">
              <h3>সঞ্চয় ইতিহাস</h3>
              <span>{bengaliNumber(fixedDepositHistory.length)}টি রেকর্ড</span>
            </div>
            {fixedDepositHistory.map((item) => (
              <article key={item.id}>
                <span className={item.type}>
                  <Icon
                    name={item.type === "credit" ? "deposit" : "lock"}
                    size={19}
                  />
                </span>
                <div>
                  <strong>{item.label}</strong>
                  <small>{item.date}</small>
                </div>
                <b className={item.type}>
                  {item.type === "credit" ? "+" : "−"} {money(item.amount)}
                </b>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="package-section">
        <div className="package-heading">
          <div>
            <span>
              <Icon name="wallet" size={21} />
            </span>
            <div>
                <h2>সক্রিয় প্যাকেজ</h2>
              <p>পুঁজি ও লাভ</p>
            </div>
          </div>
          {investment && <b>চলমান</b>}
        </div>

        {investment ? (
          <>
            <article className="active-package-card">
              <div className="active-package-head">
                <span>
                  <Icon name="check" size={21} />
                </span>
                <div>
                  <h3>{investment.package.name}</h3>
                  <small>
                    {bengaliNumber(investment.package.durationDays)} দিনের মেয়াদ
                  </small>
                </div>
                <b>সক্রিয়</b>
              </div>
              <div className="active-package-metrics">
              {[
                ["প্যাকেজ মূল্য", money(investment.amount)],
                [
                  "দৈনিক হার",
                  `${bengaliNumber(investment.package.dailyRate)}%`,
                ],
                ["দৈনিক লাভ", money(firstDayProfit)],
                ["মোট লাভ", money(termProfit)],
              ].map(([label, value]) => (
                <div key={label}>
                  <small>{label}</small>
                  <strong>{value}</strong>
                </div>
              ))}
              </div>
              <div className="active-package-dates">
                <div>
                  <small>শুরুর তারিখ</small>
                  <strong>{investment.startedAt}</strong>
                </div>
                <div>
                  <small>শেষ তারিখ</small>
                  <strong>{investment.expiresAt}</strong>
                </div>
              </div>
            </article>
          </>
        ) : (
          <div className="investment-empty">
            <span>
              <Icon name="work" size={42} />
            </span>
            <h2>প্যাকেজ সক্রিয় নয়</h2>
            <p>প্যাকেজ বেছে নিন</p>
            <AppLink page="earn">প্যাকেজ বেছে নিন</AppLink>
          </div>
        )}
      </section>

      {investment && (
        <section className="daily-ledger">
          <div className="package-heading">
            <div>
              <span>
                <Icon name="calendar" size={21} />
              </span>
              <div>
                <h2>দৈনিক লাভের হিসাব</h2>
                <p>লাভ ও ব্যালেন্স</p>
              </div>
            </div>
            <b>দৈনিক</b>
          </div>
          <div className="daily-profit-list">
            {dailyRows.map((row, index) => (
              <article key={row.day}>
                <span>{bengaliNumber(index + 1)}</span>
                <div>
                  <strong>
                    {bengaliNumber(row.day)}তম দিনের লাভ
                  </strong>
                  <small>
                    {money(row.openingBalance)} → {money(row.closingBalance)}
                  </small>
                </div>
                <b>+ {money(row.profit)}</b>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="earn-note">
        <span>
          <Icon name="check" size={20} />
        </span>
        <div>
          <h2>হিসাবের নিয়ম</h2>
          <p>দৈনিক চক্রবৃদ্ধি হিসাব</p>
        </div>
      </section>

      {showFixedDeposit && !fixedDeposit && (
        <div
          className="purchase-modal-backdrop"
          onClick={() => setShowFixedDeposit(false)}
        >
          <section
            aria-modal="true"
            className="purchase-modal fixed-deposit-modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <div className="purchase-modal-head">
              <div>
                <span>
                  <Icon name="calendar" size={22} />
                </span>
                <div>
                  <small>৭ দিনের সঞ্চয়</small>
                  <h2>সঞ্চয় স্থির করুন</h2>
                </div>
              </div>
              <button
                aria-label="বন্ধ করুন"
                onClick={() => setShowFixedDeposit(false)}
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            <div className="fixed-deposit-balance">
              <small>আবদ্ধ হবে</small>
              <strong>{money(balance)}</strong>
              <span>সম্পূর্ণ সঞ্চয়</span>
            </div>

            <div className="fixed-deposit-projection">
              <div>
                <small>সাত দিনে লাভ</small>
                <strong>{money(balance * 0.02)}</strong>
              </div>
              <div>
                <small>মেয়াদশেষে মোট প্রাপ্য</small>
                <strong>{money(balance * 1.02)}</strong>
              </div>
              <div>
                <small>মেয়াদ ফুরোনোর দিন</small>
                <strong>{expiryDateFromToday(7)}</strong>
              </div>
            </div>

            <div className="fixed-deposit-rules">
              <h3>স্থির সঞ্চয়ের নিয়মাবলি</h3>
              <ol>
              <li>সঞ্চয় আবদ্ধ হবে</li>
              <li>আগে উত্তোলন নয়</li>
              <li>২% লাভ যুক্ত</li>
              <li>নতুন জমা উত্তোলনযোগ্য</li>
              <li>পরে বাতিল নয়</li>
              </ol>
            </div>

            <div className="purchase-actions">
              <button
                className="cancel"
                onClick={() => setShowFixedDeposit(false)}
              >
                এখন নয়
              </button>
              <button
                className="confirm"
                disabled={balance <= 0}
                onClick={confirmFixedDeposit}
              >
                সঞ্চয় স্থির করুন
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  )
}

