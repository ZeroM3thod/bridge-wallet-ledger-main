import { createFileRoute } from "@tanstack/react-router"
import PageContent from "@/components/pages/TeamPage"
export const Route = createFileRoute("/team")({
 head: () => ({ meta: [
 { title: "বরজাজ — সাফল্যের সঙ্গী" },
 { name: "description", content: "বরজাজ: সাফল্যের সঙ্গী। আপনার সঞ্চয় ও আয়ের হিসাব।" },
 { property: "og:title", content: "বরজাজ — সাফল্যের সঙ্গী" },
 { property: "og:description", content: "বরজাজ: সাফল্যের সঙ্গী। আপনার সঞ্চয় ও আয়ের হিসাব।" },
 { property: "og:type", content: "website" },
 { name: "twitter:card", content: "summary_large_image" }
 ] }), component: PageContent
})
