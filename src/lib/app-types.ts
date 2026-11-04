import type { WalletProvider } from "@/lib/withdrawal"
import type { VipPackage } from "@/lib/app-data"
export type DashboardTransaction = {
  id: number
  label: string
  amount: number
  type: "credit" | "debit"
  date: string
}

export type FixedDeposit = {
  principal: number
  profitRate: number
  profit: number
  maturityAmount: number
  startedAt: string
  expiresAt: string
  maturesAt: number
}

export type SavedWallet = {
  id: number
  provider: WalletProvider
  account: string
  password: string
}

export type WithdrawalRecord = {
  id: number
  amount: number
  fee: number
  net: number
  provider: WalletProvider
  account: string
  date: string
  status: string
}

export type ActiveInvestment = {
  package: VipPackage
  amount: number
  startedAt: string
  expiresAt: string
}

