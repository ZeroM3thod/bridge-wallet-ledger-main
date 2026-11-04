import { createFileRoute } from "@tanstack/react-router"
import { SigninPage } from "@/components/pages/AuthPages"
export const Route = createFileRoute("/signin")({
 head: () => ({ meta: [
 { title: "বরজাজ — লগইন" },
 { name: "description", content: "জিমেইল বা মোবাইল নম্বর দিয়ে বরজাজে লগইন করুন।" },
 { property: "og:title", content: "বরজাজ — লগইন" },
 { property: "og:description", content: "জিমেইল বা মোবাইল নম্বর দিয়ে বরজাজে লগইন করুন।" },
 { property: "og:type", content: "website" },
 { name: "twitter:card", content: "summary_large_image" }
 ] }), component: SigninPage
})
