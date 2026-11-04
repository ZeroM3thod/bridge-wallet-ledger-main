import { Outlet, useLocation } from "@tanstack/react-router"
import Icon from "@/components/app/Icon"
import { AppLink } from "@/components/app/AppLink"
import { useAppState } from "@/components/app/AppState"
import { pagePaths, type Page } from "@/lib/app-navigation"
function AppHeader({
  page,
  onNotice,
  onProfile,
}: {
  page: Page
  onNotice: () => void
  onProfile: () => void
}) {
  const pageLabel = navItems.find((item) => item.id === page)?.label

  if (page !== "profile") {
    return (
      <header className="page-title-header">
        <h1>{pageLabel}</h1>
      </header>
    )
  }

  return (
    <header className="app-header">

      <AppLink page="profile" label="আমার পরিসর খুলুন" className="header-profile">
        <span className="avatar">
          <Icon name="user" size={41} strokeWidth={1.7} />
          <i />
        </span>
        <span className="identity">
          <small>{pageLabel}</small>
          <strong>বরজাজ</strong>
          <span>
            <b>আইডি ৫৮৯৯৬৩৮০</b>
            <em>
              <Icon name="shield" size={12} /> বিশিষ্ট স্তর ০
            </em>
          </span>
        </span>
      </AppLink>
      <div className="header-actions">
        <span className="header-balance">
          <small>অ্যাকাউন্ট</small>
          <strong>সক্রিয়</strong>
        </span>
        <button
          className="notice-button"
          aria-label="নোটিফিকেশন"
          onClick={onNotice}
        >
          <Icon name="bell" size={30} />
          <b />
        </button>
      </div>
    </header>
  )
}

const navItems: { id: Page; icon: string; label: string }[] = [
  { id: "home", icon: "home", label: "মূল অফিস" },
  { id: "work", icon: "work", label: "কর্মক্ষেত্র" },
  { id: "earn", icon: "chart", label: "অর্জনের পথ" },
  { id: "team", icon: "handshake", label: "সাফল্যের সঙ্গী" },
  { id: "profile", icon: "user", label: "আমার পরিসর" },
]

export default function BorojajApp() {
 const { pathname } = useLocation()
 const { showToast, changePage } = useAppState()
 const page: Page = (Object.entries(pagePaths).find(([, path]) => path === pathname)?.[0] as Page | undefined) ?? "home"
 const activePage = pathname.startsWith("/profile") ? "profile" : pathname.startsWith("/team") ? "team" : page
 return <div className="app blue-header">
  <AppHeader page={page} onNotice={() => showToast("নতুন নোটিফিকেশন নেই")} onProfile={() => changePage("profile")} />
  <Outlet />
  <nav className="bottom-nav" aria-label="প্রধান নেভিগেশন">{navItems.map(item => <AppLink key={item.id} page={item.id} plain className={activePage === item.id ? "active" : ""}><Icon name={item.icon} size={27} /><span>{item.label}</span></AppLink>)}</nav>
 </div>
}
