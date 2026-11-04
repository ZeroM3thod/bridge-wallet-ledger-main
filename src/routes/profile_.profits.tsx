import { createFileRoute } from "@tanstack/react-router"
import PageContent from "@/components/pages/ProfitsPage"
export const Route = createFileRoute("/profile_/profits")({
 head: () => ({ meta: [
 { title: "বরজাজ — লাভের রেকর্ড" },
 { name: "description", content: "বরজাজ: লাভের রেকর্ড। আপনার সঞ্চয় ও আয়ের হিসাব।" },
 { property: "og:title", content: "বরজাজ — লাভের রেকর্ড" },
 { property: "og:description", content: "বরজাজ: লাভের রেকর্ড। আপনার সঞ্চয় ও আয়ের হিসাব।" },
 { property: "og:type", content: "website" },
 { name: "twitter:card", content: "summary_large_image" }
 ] }), component: PageContent
})
