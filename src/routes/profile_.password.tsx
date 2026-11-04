import { createFileRoute } from "@tanstack/react-router"
import PageContent from "@/components/pages/PasswordPage"
export const Route = createFileRoute("/profile_/password")({
 head: () => ({ meta: [
 { title: "বরজাজ — পাসওয়ার্ড পরিবর্তন" },
 { name: "description", content: "বরজাজ: পাসওয়ার্ড পরিবর্তন। আপনার সঞ্চয় ও আয়ের হিসাব।" },
 { property: "og:title", content: "বরজাজ — পাসওয়ার্ড পরিবর্তন" },
 { property: "og:description", content: "বরজাজ: পাসওয়ার্ড পরিবর্তন। আপনার সঞ্চয় ও আয়ের হিসাব।" },
 { property: "og:type", content: "website" },
 { name: "twitter:card", content: "summary_large_image" }
 ] }), component: PageContent
})
