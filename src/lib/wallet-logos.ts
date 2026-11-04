import bkashLogo from "@/assets/bkash-logo.png.asset.json"
import nagadLogo from "@/assets/nagad-logo.png.asset.json"
import rocketLogo from "@/assets/rocket-logo.png.asset.json"
import upayLogo from "@/assets/upay-logo.png.asset.json"
import type { WalletProvider } from "@/lib/withdrawal"
export const walletLogos: Record<WalletProvider, string> = {
  bkash: bkashLogo.url,
  nagad: nagadLogo.url,
  rocket: rocketLogo.url,
  upay: upayLogo.url,
}

