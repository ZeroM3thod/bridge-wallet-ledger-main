import { Link } from "@tanstack/react-router"
import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { pagePaths, type Page } from "@/lib/app-navigation"
export function AppLink({ page, children, className, label, plain }: { page: Page; children: ReactNode; className?: string; label?: string; plain?: boolean }) {
 if (plain) return <Link to={pagePaths[page]} aria-label={label} className={className}>{children}</Link>
 return <Button asChild variant="ghost" className={className}><Link to={pagePaths[page]} aria-label={label}>{children}</Link></Button>
}
