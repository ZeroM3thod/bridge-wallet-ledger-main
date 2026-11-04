import { createFileRoute } from "@tanstack/react-router"
import PageContent from "@/components/pages/EarnPage"
export const Route = createFileRoute("/earn")({
 head: () => ({ meta: [
 { title: "বরজাজ — অর্জনের পথ" },
 { name: "description", content: "বরজাজ: অর্জনের পথ। আপনার সঞ্চয় ও আয়ের হিসাব।" },
 { property: "og:title", content: "বরজাজ — অর্জনের পথ" },
 { property: "og:description", content: "বরজাজ: অর্জনের পথ। আপনার সঞ্চয় ও আয়ের হিসাব।" },
 { property: "og:type", content: "website" },
 { name: "twitter:card", content: "summary_large_image" }
 ] }), component: PageContent
})
