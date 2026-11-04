import { createFileRoute } from "@tanstack/react-router"
import PageContent from "@/components/pages/WithdrawPage"
export const Route = createFileRoute("/withdraw")({
 head: () => ({ meta: [
 { title: "বরজাজ — অর্থ উত্তোলন" },
 { name: "description", content: "বরজাজ: অর্থ উত্তোলন। আপনার সঞ্চয় ও আয়ের হিসাব।" },
 { property: "og:title", content: "বরজাজ — অর্থ উত্তোলন" },
 { property: "og:description", content: "বরজাজ: অর্থ উত্তোলন। আপনার সঞ্চয় ও আয়ের হিসাব।" },
 { property: "og:type", content: "website" },
 { name: "twitter:card", content: "summary_large_image" }
 ] }), component: PageContent
})
