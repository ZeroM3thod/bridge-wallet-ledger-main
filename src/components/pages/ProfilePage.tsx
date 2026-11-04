import { Button } from "@/components/ui/button"
import Icon from "@/components/app/Icon"
import { useAppState } from "@/components/app/AppState"
import { AppLink } from "@/components/app/AppLink"
import type { Page } from "@/lib/app-navigation"
export default function ProfilePage() {
  const { showToast: action, changePage: onNavigate } = useAppState()

  const stats = [
    ["coins", "কর্মক্ষেত্রের আয়", "৳ ২,৭২৬.৩৭"],
    ["gift", "দলীয় প্রাপ্ত", "৳ ২৮০.০০"],
    ["users", "দলীয় লভ্যাংশ", "৳ ২৪.৫০"],
    ["chart", "আজকের অর্জন", "৳ ১,৪০০.৭৫"],
    ["gift", "মোট জমা", "৳ ২,৬০০.০০"],
    ["wallet", "মোট উত্তোলন", "৳ ২০০.০০"],
  ]
  const menu = [
    "সাধারণ হিসাবপত্র",
    "প্রোফাইল সেটিংস",
    "পাসওয়ার্ড পরিবর্তন",
    "উত্তোলন পাসওয়ার্ড",
    "টেলিগ্রাম অফিসিয়াল চ্যানেল",
    "লাভের রেকর্ড",
    "অ্যাপ ডাউনলোড",
    "লগ আউট",
  ]

  const subPages: Record<string, Page> = {
    "সাধারণ হিসাবপত্র": "ledger",
    "প্রোফাইল সেটিংস": "settings",
    "পাসওয়ার্ড পরিবর্তন": "password",
    "উত্তোলন পাসওয়ার্ড": "wpassword",
    "লাভের রেকর্ড": "profits",
    "অ্যাপ ডাউনলোড": "download",
  }

  return (
    <main className="home-page page-content">
      <section className="balance-card">
        <div className="wallet-mark">
          <Icon name="wallet" size={37} />
        </div>
        <div>
          <span>মোট সঞ্চয়</span>
          <strong>৳ ১০২.০৩</strong>
        </div>
      </section>

      <section className="stats-grid">
        {stats.map(([icon, title, value]) => (
          <div className="stat-cell" key={title}>
            <span className="small-icon">
              <Icon name={icon ?? ""} size={23} />
            </span>
            <div>
              <span>{title}</span>
              <strong>{value}</strong>
            </div>
          </div>
        ))}
      </section>

      <section className="quick-grid">
        <Button variant="ghost" onClick={() => action("জমা করুন নির্বাচিত হয়েছে")}><span><Icon name="deposit" size={34} /></span><b>জমা করুন</b></Button>
        <AppLink page="withdraw"><span><Icon name="withdraw" size={34} /></span><b>উত্তোলন</b></AppLink>
        <Button variant="ghost" onClick={() => action("সঙ্গীগণ নির্বাচিত হয়েছে")}><span><Icon name="users" size={34} /></span><b>সঙ্গীগণ</b></Button>
        <AppLink page="work"><span><Icon name="work" size={34} /></span><b>কর্মক্ষেত্র</b></AppLink>
      </section>

      <section className="menu-list">
        {menu.map((item) =>
          item === "টেলিগ্রাম অফিসিয়াল চ্যানেল" ? (
            <a
              key={item}
              className="telegram-channel-link"
              href="https://t.me/borojaj_official"
              target="_blank"
              rel="noreferrer"
            >
              <span>{item}</span>
              <b>›</b>
            </a>
          ) : subPages[item] ? (
            <AppLink key={item} page={subPages[item]}><span>{item}</span><b>›</b></AppLink>
          ) : (
            <Button variant="ghost"
              key={item}
              className={item === "লগ আউট" ? "logout-row" : undefined}
              onClick={() =>
                subPages[item]
                  ? onNavigate(subPages[item])
                  : action(item === "লগ আউট" ? "লগ আউট সফল হয়েছে (ডেমো)" : `${item} নির্বাচিত হয়েছে`)
              }
            >
              <span>{item}</span>
              <b>›</b>
            </Button>
          ),
        )}
      </section>
      <div className="chat-buttons">
        <button
          className="chat-button telegram"
          aria-label="টেলিগ্রাম সহায়তা"
          onClick={() => action("টেলিগ্রাম সহায়তা খোলা হয়েছে")}
        >
          <span>
            <svg viewBox="0 0 448 512" width="18" height="18" aria-hidden="true">
              <path fill="currentColor" d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z" />
            </svg>
          </span>
        </button>
        <button
          className="chat-button whatsapp"
          aria-label="হোয়াটসঅ্যাপ সহায়তা"
          onClick={() => action("হোয়াটসঅ্যাপ সহায়তা খোলা হয়েছে")}
        >
          <span>
            <svg viewBox="0 0 448 512" width="18" height="18" aria-hidden="true">
              <path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.8 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
            </svg>
          </span>
        </button>
      </div>
    </main>
  )
}

