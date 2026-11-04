import { createFileRoute } from "@tanstack/react-router"
import PageContent from "@/components/pages/ProfilePage"
export const Route = createFileRoute("/profile")({
 head: () => ({ meta: [
 { title: "বরজাজ — আমার পরিসর" },
 { name: "description", content: "বরজাজ: আমার পরিসর। আপনার সঞ্চয় ও আয়ের হিসাব।" },
 { property: "og:title", content: "বরজাজ — আমার পরিসর" },
 { property: "og:description", content: "বরজাজ: আমার পরিসর। আপনার সঞ্চয় ও আয়ের হিসাব।" },
 { property: "og:type", content: "website" },
 { name: "twitter:card", content: "summary_large_image" }
 ] }), component: PageContent
})
