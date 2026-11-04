import { createFileRoute } from "@tanstack/react-router"
import PageContent from "@/components/pages/WithdrawalPasswordPage"
export const Route = createFileRoute("/profile_/withdrawal-password")({
 head: () => ({ meta: [
 { title: "বরজাজ — উত্তোলন পাসওয়ার্ড" },
 { name: "description", content: "বরজাজ: উত্তোলন পাসওয়ার্ড। আপনার সঞ্চয় ও আয়ের হিসাব।" },
 { property: "og:title", content: "বরজাজ — উত্তোলন পাসওয়ার্ড" },
 { property: "og:description", content: "বরজাজ: উত্তোলন পাসওয়ার্ড। আপনার সঞ্চয় ও আয়ের হিসাব।" },
 { property: "og:type", content: "website" },
 { name: "twitter:card", content: "summary_large_image" }
 ] }), component: PageContent
})
