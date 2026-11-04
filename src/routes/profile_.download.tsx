import { createFileRoute } from "@tanstack/react-router"
import PageContent from "@/components/pages/DownloadPage"
export const Route = createFileRoute("/profile_/download")({
 head: () => ({ meta: [
 { title: "বরজাজ — অ্যাপ ডাউনলোড" },
 { name: "description", content: "বরজাজ: অ্যাপ ডাউনলোড। আপনার সঞ্চয় ও আয়ের হিসাব।" },
 { property: "og:title", content: "বরজাজ — অ্যাপ ডাউনলোড" },
 { property: "og:description", content: "বরজাজ: অ্যাপ ডাউনলোড। আপনার সঞ্চয় ও আয়ের হিসাব।" },
 { property: "og:type", content: "website" },
 { name: "twitter:card", content: "summary_large_image" }
 ] }), component: PageContent
})
