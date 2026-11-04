import { createFileRoute } from "@tanstack/react-router"
import PageContent from "@/components/pages/WorkPage"
export const Route = createFileRoute("/work")({
 head: () => ({ meta: [
 { title: "বরজাজ — কর্মক্ষেত্র" },
 { name: "description", content: "বরজাজ: কর্মক্ষেত্র। আপনার সঞ্চয় ও আয়ের হিসাব।" },
 { property: "og:title", content: "বরজাজ — কর্মক্ষেত্র" },
 { property: "og:description", content: "বরজাজ: কর্মক্ষেত্র। আপনার সঞ্চয় ও আয়ের হিসাব।" },
 { property: "og:type", content: "website" },
 { name: "twitter:card", content: "summary_large_image" }
 ] }), component: PageContent
})
