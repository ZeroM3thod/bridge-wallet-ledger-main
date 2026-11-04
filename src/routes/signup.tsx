import { createFileRoute } from "@tanstack/react-router"
import { SignupPage } from "@/components/pages/AuthPages"
export const Route = createFileRoute("/signup")({
 head: () => ({ meta: [
 { title: "বরজাজ — রেজিস্ট্রেশন" },
 { name: "description", content: "বরজাজে নতুন অ্যাকাউন্ট খুলুন।" },
 { property: "og:title", content: "বরজাজ — রেজিস্ট্রেশন" },
 { property: "og:description", content: "বরজাজে নতুন অ্যাকাউন্ট খুলুন।" },
 { property: "og:type", content: "website" },
 { name: "twitter:card", content: "summary_large_image" }
 ] }), component: SignupPage
})
