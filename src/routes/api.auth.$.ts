import { createFileRoute } from "@tanstack/react-router"
import { handleAuthRequest, type AuthEnv } from "@/lib/auth-api"

const handler = (ctx: { request: Request; context?: unknown }) => {
  const context = (ctx.context ?? {}) as { cloudflare?: { env?: AuthEnv }; env?: AuthEnv }
  return handleAuthRequest(ctx.request, context.cloudflare?.env ?? context.env ?? {})
}

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      POST: handler,
    },
  },
})
