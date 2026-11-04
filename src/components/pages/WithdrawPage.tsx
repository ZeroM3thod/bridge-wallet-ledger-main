import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogPortal, DialogOverlay, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Content as DialogPrimitiveContent } from "@radix-ui/react-dialog"
import Icon from "@/components/app/Icon"
import { useAppState } from "@/components/app/AppState"
import { walletLogos } from "@/lib/wallet-logos"
import { normalizeDigits, validWalletNumber, validWithdrawal, walletProviders, withdrawalTotals, type WalletProvider } from "@/lib/withdrawal"
import { toBengaliDigits, parseBengaliNumber, money } from "@/lib/app-format"
import type { WithdrawalRecord } from "@/lib/app-types"
export default function WithdrawPage() {
  const { showToast: action, balance, wallets, withdrawals, addWallet: onAddWallet, confirmWithdrawal: onWithdraw, changePage: onNavigate } = useAppState()

  const [showAddWallet, setShowAddWallet] = useState(false)
  const [provider, setProvider] = useState<WalletProvider>("bkash")
  const [account, setAccount] = useState("")
  const [walletPassword, setWalletPassword] = useState("")
  const [selectedWallet, setSelectedWallet] = useState<number | null>(null)
  const [amount, setAmount] = useState(500)
  const [password, setPassword] = useState("")
  const [confirmation, setConfirmation] = useState<Pick<WithdrawalRecord, "amount" | "fee" | "net" | "provider" | "account"> | null>(null)

  const selected =
    wallets.find((wallet) => wallet.id === selectedWallet) ?? wallets[0]
  const totals = withdrawalTotals(amount)

  const submitWallet = () => {
    if (!validWalletNumber(provider, account)) {
      action("সঠিক অ্যাকাউন্ট নম্বর লিখুন")
      return
    }
    if (walletPassword.length < 4) {
      action("উত্তোলন পাসওয়ার্ড লিখুন")
      return
    }
    onAddWallet({
      provider,
      account: normalizeDigits(account),
      password: walletPassword,
    })
    setShowAddWallet(false)
    setAccount("")
    setWalletPassword("")
  }

  const submitWithdrawal = () => {
    if (!selected) {
      action("আগে একটি ওয়ালেট যোগ করুন")
      return
    }
    if (!validWithdrawal(amount, balance)) {
      action(
        amount > balance
          ? "পর্যাপ্ত সঞ্চয় নেই"
          : "সর্বনিম্ন ৳৫০০ উত্তোলন করতে হবে",
      )
      return
    }
    if (password !== selected.password) {
      action("উত্তোলন পাসওয়ার্ড সঠিক নয়")
      return
    }
    onWithdraw(amount, totals.fee, totals.net, selected)
    setConfirmation({ amount, fee: totals.fee, net: totals.net, provider: selected.provider, account: selected.account })
    setPassword("")
    setAmount(500)
  }

  return (
    <main className="home-page office-page page-content withdraw-page">
      <section className="office-hero withdraw-hero">
        <div className="office-welcome">
          <span>অর্থ উত্তোলন</span>
          <h1>আপনার ওয়ালেটে টাকা পাঠান</h1>
          <p>বিকাশ, নগদ, রকেট ও উপায়ে উত্তোলন করুন</p>
        </div>
        <div className="office-balance">
          <span>
            <Icon name="wallet" size={26} />
          </span>
          <div>
            <small>ব্যবহারযোগ্য সঞ্চয়</small>
            <strong>{money(balance)}</strong>
          </div>
        </div>
      </section>

      <section className="withdraw-wallets">
        <div className="withdraw-section-head">
          <h2>সংরক্ষিত ওয়ালেট</h2>
          <button onClick={() => setShowAddWallet(true)}>
            <Icon name="deposit" size={15} />
            ওয়ালেট যোগ করুন
          </button>
        </div>
        {wallets.length === 0 ? (
          <button
            className="withdraw-empty"
            onClick={() => setShowAddWallet(true)}
          >
            <Icon name="wallet" size={28} />
            <b>কোনো ওয়ালেট সংরক্ষিত নেই</b>
            <small>উত্তোলনের জন্য আগে একটি ওয়ালেট যোগ করুন</small>
          </button>
        ) : (
          <div className="withdraw-wallet-list">
            {wallets.map((wallet) => {
              const meta = walletProviders.find(
                (item) => item.id === wallet.provider,
              )
              if (!meta) return null
              const active = selected?.id === wallet.id
              return (
                <button
                  className={active ? "withdraw-wallet active" : "withdraw-wallet"}
                  key={wallet.id}
                  onClick={() => setSelectedWallet(wallet.id)}
                >
                  <span className={`wallet-provider ${wallet.provider}`}>
                    <img src={walletLogos[wallet.provider]} alt={`${meta.english} লোগো`} />
                  </span>
                  <div>
                    <strong>{meta.name}</strong>
                    <small>{toBengaliDigits(wallet.account)}</small>
                  </div>
                  {active && (
                    <span className="wallet-check">
                      <Icon name="check" size={15} />
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        )}
      </section>

      <section className="withdraw-form">
        <label className="office-amount-field">
          <span>উত্তোলনের পরিমাণ</span>
          <div>
            <b>৳</b>
            <input
              inputMode="numeric"
              onChange={(event) =>
                setAmount(parseBengaliNumber(event.target.value))
              }
              type="text"
              value={toBengaliDigits(amount)}
            />
          </div>
        </label>
        <div className="office-amount-presets">
          {[500, 1000, 2500].map((preset) => (
            <button key={preset} onClick={() => setAmount(preset)}>
              {money(preset)}
            </button>
          ))}
        </div>
        <div className="withdraw-totals">
          <div>
            <span>উত্তোলনের পরিমাণ</span>
            <b>{money(amount)}</b>
          </div>
          <div>
            <span>সার্ভিস চার্জ (৬%)</span>
            <b>{money(totals.fee)}</b>
          </div>
          <div className="net">
            <span>ওয়ালেটে পাবেন</span>
            <b>{money(totals.net)}</b>
          </div>
        </div>
        <label className="office-amount-field">
          <span>উত্তোলন পাসওয়ার্ড</span>
          <div>
            <input
              onChange={(event) => setPassword(event.target.value)}
              placeholder="উত্তোলন পাসওয়ার্ড লিখুন"
              type="password"
              value={password}
            />
          </div>
        </label>
        <button className="withdraw-submit" onClick={submitWithdrawal}>
          উত্তোলন নিশ্চিত করুন
        </button>
        <small className="withdraw-note">
          সর্বনিম্ন উত্তোলন ৳৫০০ • ৬% সার্ভিস চার্জ প্রযোজ্য
        </small>
        <div className="withdraw-rules">
          <h3>
            <Icon name="clock" size={13} />
            <span>উত্তোলনের নিয়ম</span>
          </h3>
          <ul>
            <li>
              <span>উত্তোলন সময়</span>
              <b>সকাল ১০টা – দুপুর ৩টা</b>
            </li>
            <li>
              <span>প্রসেসিং সময়</span>
              <b>১ ঘণ্টা – ২৪ ঘণ্টা</b>
            </li>
            <li>
              <span>সর্বনিম্ন উত্তোলন</span>
              <b>৳ ৫০০.০০</b>
            </li>
            <li>
              <span>সার্ভিস চার্জ</span>
              <b>৬%</b>
            </li>
            <li>
              <span>দৈনিক সীমা</span>
              <b>৩ টি আবেদন</b>
            </li>
          </ul>
        </div>
      </section>

      {withdrawals.length > 0 && (
        <section className="withdraw-history">
          <h2>উত্তোলনের রেকর্ড</h2>
          {withdrawals.map((record) => {
            const meta = walletProviders.find(
              (item) => item.id === record.provider,
            )
            if (!meta) return null
            return (
              <article key={record.id}>
                <span className={`wallet-provider ${record.provider}`}>
                  <img src={walletLogos[record.provider]} alt={`${meta.english} লোগো`} />
                </span>
                <div>
                  <strong>
                    {meta.name} • {toBengaliDigits(record.account)}
                  </strong>
                  <small>{record.date}</small>
                </div>
                <div className="withdraw-record-amount">
                  <b>{money(record.net)}</b>
                  <small>{record.status}</small>
                </div>
              </article>
            )
          })}
        </section>
      )}

      <Dialog open={confirmation !== null} onOpenChange={(open) => { if (!open) setConfirmation(null) }}>
        <DialogPortal>
          <DialogOverlay className="withdraw-success-overlay" />
          <DialogPrimitiveContent className="withdraw-success-dialog">
            <span className="withdraw-success-icon" aria-hidden="true"><Icon name="check" size={25} strokeWidth={3} /></span>
            <DialogTitle className="withdraw-success-title">আবেদন সফলভাবে গৃহীত হয়েছে!</DialogTitle>
            <DialogDescription className="withdraw-success-description">আপনার উত্তোলনের অনুরোধটি প্রক্রিয়াধীন রয়েছে, খুব শীঘ্রই অর্থ একাউন্টে পৌঁছাবে।</DialogDescription>
            {confirmation && (
              <dl className="withdraw-success-details">
                <div><dt>পেমেন্ট মাধ্যম:</dt><dd>{walletProviders.find((item) => item.id === confirmation.provider)?.name}</dd></div>
                <div><dt>উত্তোলনের পরিমাণ:</dt><dd>{money(confirmation.amount)}</dd></div>
                <div className="fee"><dt>প্রসেসিং ফি (৬%):</dt><dd>{money(confirmation.fee)}</dd></div>
                <div className="net"><dt>প্রাপ্ত নিট অর্থ:</dt><dd>{money(confirmation.net)}</dd></div>
                <div className="account"><dt>গ্রাহক নম্বর:</dt><dd>{toBengaliDigits(confirmation.account)}</dd></div>
              </dl>
            )}
            <Button className="withdraw-success-home" onClick={() => { setConfirmation(null); onNavigate("home") }}>মূল পাতায় ফিরে যান</Button>
          </DialogPrimitiveContent>
        </DialogPortal>
      </Dialog>

      {showAddWallet && (
        <div
          className="purchase-modal-backdrop"
          onClick={() => setShowAddWallet(false)}
        >
          <section
            aria-modal="true"
            className="purchase-modal office-money-modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <div className="purchase-modal-head">
              <div>
                <span>
                  <Icon name="wallet" size={22} />
                </span>
                <div>
                  <small>নিরাপদ উত্তোলনের জন্য</small>
                  <h2>ওয়ালেট যোগ করুন</h2>
                </div>
              </div>
              <button
                aria-label="বন্ধ করুন"
                onClick={() => setShowAddWallet(false)}
              >
                <Icon name="close" size={20} />
              </button>
            </div>
            <div className="withdraw-provider-grid">
              {walletProviders.map((item) => (
                <Button
                  variant="ghost"
                  aria-pressed={provider === item.id}
                  className={provider === item.id ? "active" : ""}
                  key={item.id}
                  onClick={() => setProvider(item.id)}
                >
                  <span className="wallet-provider">
                    <img src={walletLogos[item.id]} alt={`${item.english} লোগো`} />
                  </span>
                  <b>{item.name}</b>
                </Button>
              ))}
            </div>
            <p className="wallet-personal-rule">শুধুমাত্র বিকাশ, নগদ, রকেট ও উপায়ের ব্যক্তিগত (পার্সোনাল) নম্বর গ্রহণযোগ্য। এজেন্ট বা মার্চেন্ট নম্বর গ্রহণযোগ্য নয়।</p>
            <label className="office-amount-field">
              <span>অ্যাকাউন্ট নম্বর</span>
              <div>
                <input
                  inputMode="numeric"
                  onChange={(event) => setAccount(event.target.value)}
                  placeholder="01XXXXXXXXX"
                  type="text"
                  value={account}
                />
              </div>
            </label>
            <label className="office-amount-field">
              <span>উত্তোলন পাসওয়ার্ড</span>
              <div>
                <input
                  onChange={(event) => setWalletPassword(event.target.value)}
                  placeholder="উত্তোলন পাসওয়ার্ড লিখুন"
                  type="password"
                  value={walletPassword}
                />
              </div>
            </label>
            <p className="wallet-personal-rule">এখানো নতুন উত্তোলন পাসওয়ার্ড সেট করবেন না — আগে থেকেই থাকা উত্তোলন পাসওয়ার্ড লিখুন।</p>
            <div className="purchase-actions">
              <button
                className="cancel"
                onClick={() => setShowAddWallet(false)}
              >
                বাতিল করুন
              </button>
              <button className="confirm" onClick={submitWallet}>
                সংরক্ষণ করুন
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  )
}
