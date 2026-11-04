import { createFileRoute } from "@tanstack/react-router"
import PageContent from "@/components/pages/TeamSalaryPage"
export const Route = createFileRoute("/team_/salary")({
 head: () => ({ meta: [
 { title: "বরজাজ — মাসিক বেতন" },
 { name: "description", content: "বরজাজ: মাসিক বেতন। আপনার সঞ্চয় ও আয়ের হিসাব।" },
 { property: "og:title", content: "বরজাজ — মাসিক বেতন" },
 { property: "og:description", content: "বরজাজ: মাসিক বেতন। আপনার সঞ্চয় ও আয়ের হিসাব।" },
 { property: "og:type", content: "website" },
 { name: "twitter:card", content: "summary_large_image" }
 ] }), component: PageContent
})
