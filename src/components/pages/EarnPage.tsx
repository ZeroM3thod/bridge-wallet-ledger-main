import { useState } from "react"
import Icon from "@/components/app/Icon"
import { useAppState } from "@/components/app/AppState"
import { vipPackages, type VipPackage } from "@/lib/app-data"
import { bengaliNumber, money, expiryDateFromToday } from "@/lib/app-format"
export default function EarnPage() {
  const { showToast: action, balance, purchase: onPurchase } = useAppState()

  const [selectedPackage, setSelectedPackage] = useState<
    (typeof vipPackages)[number] | null
  >(null)
  const suggestedPackage = [...vipPackages]
    .reverse()
    .find((item) => balance >= item.price)
  const amountError = selectedPackage
    ? balance < selectedPackage.price
      ? "পর্যাপ্ত সঞ্চয় নেই"
      : ""
    : ""
  const selectedExpiry = selectedPackage
    ? expiryDateFromToday(selectedPackage.durationDays)
    : ""

  const openPackage = (item: VipPackage) => {
    setSelectedPackage(item)
  }

  const confirmPurchase = () => {
    if (!selectedPackage) return
    if (amountError) {
      action(amountError)
      return
    }

    onPurchase(selectedPackage)
    setSelectedPackage(null)
  }

  return (
    <>
      <main className="earn-page page-content">
        <section className="earn-hero">
          <div className="earn-hero-icon">
            <Icon name="chart" size={38} />
          </div>
          <div>
            <span className="earn-kicker">বিনিয়োগ পরিকল্পনা</span>
            <h1>আপনার অর্জনের পথ</h1>
            <p>প্যাকেজ বেছে নিন</p>
          </div>
          <div className="earn-overview">
            <div>
              <small>মোট প্যাকেজ</small>
              <strong>৬টি</strong>
            </div>
            <div>
              <small>দৈনিক সম্ভাব্য লাভ</small>
              <strong>০.৮% – ১.৮%</strong>
            </div>
          </div>
        </section>

        <section className="package-section">
          <div className="package-heading">
            <div>
              <span>
                <Icon name="wallet" size={21} />
              </span>
              <div>
                <h2>ভিআইপি প্যাকেজসমূহ</h2>
                <p>মূল্য ও লাভ</p>
              </div>
            </div>
            <b>৬টি স্তর</b>
          </div>

          {suggestedPackage && (
            <div className="package-recommendation">
              <span>
                <Icon name="target" size={20} />
              </span>
              <div>
                <small>প্রস্তাবিত প্যাকেজ</small>
                <strong>{suggestedPackage.name}</strong>
              </div>
            </div>
          )}

          <div className="package-list" aria-label="ভিআইপি প্যাকেজের তালিকা">
            {vipPackages.map((item, index) => (
              <article
                className={
                  suggestedPackage?.name === item.name
                    ? "tier-package-card suggested-package"
                    : "tier-package-card"
                }
                key={item.name}
              >
                <div className="tier-package-head">
                  <div className="package-number">{bengaliNumber(index)}</div>
                  <div className="package-name">
                    <span>{item.name}</span>
                    <small>
                      {suggestedPackage?.name === item.name
                        ? "প্রস্তাবিত প্যাকেজ"
                        : "বিনিয়োগ স্তর"}
                    </small>
                  </div>
                  {suggestedPackage?.name === item.name && (
                    <b className="tier-package-tag">সেরা পছন্দ</b>
                  )}
                </div>
                <div className="tier-package-metrics">
                  <div>
                    <small>প্যাকেজ মূল্য</small>
                    <strong>{money(item.price)}</strong>
                  </div>
                  <div>
                    <small>দৈনিক লাভ</small>
                    <strong>{bengaliNumber(item.dailyRate)}%</strong>
                  </div>
                  <div>
                    <small>মেয়াদ</small>
                    <strong>{bengaliNumber(item.durationDays)} দিন</strong>
                  </div>
                </div>
                <button onClick={() => openPackage(item)}>
                  প্যাকেজ কিনুন
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="earn-note">
          <span>
            <Icon name="check" size={20} />
          </span>
          <div>
            <h2>গুরুত্বপূর্ণ তথ্য</h2>
            <p>লাভ ব্যালেন্সে যুক্ত</p>
          </div>
        </section>
      </main>

      {selectedPackage && (
        <div
          className="purchase-modal-backdrop"
          onClick={() => setSelectedPackage(null)}
        >
          <section
            aria-labelledby="purchase-modal-title"
            aria-modal="true"
            className="purchase-modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <div className="purchase-modal-head">
              <div>
                <span>
                  <Icon name="wallet" size={22} />
                </span>
                <div>
                  <small>প্যাকেজ কেনার অনুমোদন</small>
                  <h2 id="purchase-modal-title">{selectedPackage.name}</h2>
                </div>
              </div>
              <button
                aria-label="বন্ধ করুন"
                onClick={() => setSelectedPackage(null)}
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            <div className="purchase-package-summary">
              <div>
                <small>প্যাকেজের নির্ধারিত মূল্য</small>
                <strong>{money(selectedPackage.price)}</strong>
              </div>
              <div>
                <small>দৈনিক সম্ভাব্য লাভ</small>
                <strong>
                  {bengaliNumber(selectedPackage.dailyRate)}%
                </strong>
              </div>
              <div>
                <small>প্যাকেজের মেয়াদ</small>
                <strong>
                  {bengaliNumber(selectedPackage.durationDays)} দিন
                </strong>
              </div>
              <div>
                <small>মেয়াদ ফুরোনোর দিন</small>
                <strong>{selectedExpiry}</strong>
              </div>
            </div>

            <div className="purchase-balance">
              <div>
                <span>
                  <Icon name="wallet" size={21} />
                </span>
                <div>
                  <small>আপনার সম্পূর্ণ ব্যালেন্স</small>
                  <strong>{money(balance)}</strong>
                </div>
              </div>
              <div>
                <small>প্যাকেজের নির্ধারিত মূল্য</small>
                <strong>{money(selectedPackage.price)}</strong>
              </div>
            </div>

            {amountError && <p className="balance-warning">{amountError}</p>}

            <div className="purchase-rules">
              <h3>প্যাকেজ কেনার নিয়ম</h3>
              <ol>
                <li>মূল্য কাটা হবে</li>
                <li>প্যাকেজ তাৎক্ষণিক সক্রিয়</li>
                <li>লাভ দৈনিক হিসাব</li>
                <li>মেয়াদে প্যাকেজ শেষ</li>
              </ol>
            </div>

            <div className="purchase-actions">
              <button
                className="cancel"
                onClick={() => setSelectedPackage(null)}
              >
                বাতিল করুন
              </button>
              <button className="confirm" onClick={confirmPurchase}>
                ক্রয় নিশ্চিত করুন
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  )
}

