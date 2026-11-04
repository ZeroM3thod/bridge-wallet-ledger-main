import { createFileRoute } from "@tanstack/react-router"
import PageContent from "@/components/pages/HomePage"
export const Route = createFileRoute("/")({
 head: () => ({ meta: [
 { title: "বরজাজ — মূল অফিস" },
 { name: "description", content: "বরজাজ: মূল অফিস। আপনার সঞ্চয় ও আয়ের হিসাব।" },
 { property: "og:title", content: "বরজাজ — মূল অফিস" },
 { property: "og:description", content: "বরজাজ: মূল অফিস। আপনার সঞ্চয় ও আয়ের হিসাব।" },
 { property: "og:type", content: "website" },
 { name: "twitter:card", content: "summary_large_image" }
 ] }), component: PageContent
})
