import { createFileRoute } from "@tanstack/react-router"
import PageContent from "@/components/pages/LedgerPage"
export const Route = createFileRoute("/profile_/ledger")({
 head: () => ({ meta: [
 { title: "বরজাজ — সাধারণ হিসাবপত্র" },
 { name: "description", content: "বরজাজ: সাধারণ হিসাবপত্র। আপনার সঞ্চয় ও আয়ের হিসাব।" },
 { property: "og:title", content: "বরজাজ — সাধারণ হিসাবপত্র" },
 { property: "og:description", content: "বরজাজ: সাধারণ হিসাবপত্র। আপনার সঞ্চয় ও আয়ের হিসাব।" },
 { property: "og:type", content: "website" },
 { name: "twitter:card", content: "summary_large_image" }
 ] }), component: PageContent
})
