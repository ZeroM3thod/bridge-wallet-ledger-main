import { createFileRoute } from "@tanstack/react-router"
import PageContent from "@/components/pages/TeamMembersPage"
export const Route = createFileRoute("/team_/members")({
 head: () => ({ meta: [
 { title: "বরজাজ — সদস্য ও কমিশন" },
 { name: "description", content: "বরজাজ: সদস্য ও কমিশন। আপনার সঞ্চয় ও আয়ের হিসাব।" },
 { property: "og:title", content: "বরজাজ — সদস্য ও কমিশন" },
 { property: "og:description", content: "বরজাজ: সদস্য ও কমিশন। আপনার সঞ্চয় ও আয়ের হিসাব।" },
 { property: "og:type", content: "website" },
 { name: "twitter:card", content: "summary_large_image" }
 ] }), component: PageContent
})
