import { createFileRoute } from "@tanstack/react-router"
import PageContent from "@/components/pages/ProfileSettingsPage"
export const Route = createFileRoute("/profile_/settings")({
 head: () => ({ meta: [
 { title: "বরজাজ — প্রোফাইল সেটিংস" },
 { name: "description", content: "বরজাজ: প্রোফাইল সেটিংস। আপনার সঞ্চয় ও আয়ের হিসাব।" },
 { property: "og:title", content: "বরজাজ — প্রোফাইল সেটিংস" },
 { property: "og:description", content: "বরজাজ: প্রোফাইল সেটিংস। আপনার সঞ্চয় ও আয়ের হিসাব।" },
 { property: "og:type", content: "website" },
 { name: "twitter:card", content: "summary_large_image" }
 ] }), component: PageContent
})
