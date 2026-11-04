import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react"
import { useNavigate } from "@tanstack/react-router"
import { pagePaths, type Page } from "@/lib/app-navigation"
import type { DashboardTransaction, FixedDeposit, SavedWallet, WithdrawalRecord, ActiveInvestment } from "@/lib/app-types"
import type { VipPackage } from "@/lib/app-data"
import { money, bengaliDate, expiryDateFromToday } from "@/lib/app-format"
type AppState = {
 balance: number; investment: ActiveInvestment | null; fixedDeposit: FixedDeposit | null; wallets: SavedWallet[]; withdrawals: WithdrawalRecord[]; transactions: DashboardTransaction[];
 showToast: (message: string) => void; changePage: (page: Page) => void; deposit: (amount: number) => void; withdraw: (amount: number) => void;
 addWallet: (wallet: Omit<SavedWallet, "id">) => void;
 confirmWithdrawal: (amount: number, fee: number, net: number, wallet: SavedWallet) => void;
 activateFixedDeposit: () => void; purchase: (pkg: VipPackage) => void;
 setBalance: React.Dispatch<React.SetStateAction<number>>;
 claimedTier: number | null; setClaimedTier: React.Dispatch<React.SetStateAction<number | null>>;
}
const AppContext = createContext<AppState | null>(null)
export function useAppState() { const state = useContext(AppContext); if (!state) throw new Error("AppStateProvider missing"); return state }
export function AppStateProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const [toast, setToast] = useState("")
  const [balance, setBalance] = useState(2500)
  const [investment, setInvestment] = useState<ActiveInvestment | null>(null)
  const [fixedDeposit, setFixedDeposit] = useState<FixedDeposit | null>(null)
  const [wallets, setWallets] = useState<SavedWallet[]>([])
  const [withdrawals, setWithdrawals] = useState<WithdrawalRecord[]>([])
  const [transactions, setTransactions] = useState<DashboardTransaction[]>([
    {
      id: 1,
      label: "প্রারম্ভিক সঞ্চয়",
      amount: 2500,
      type: "credit",
      date: "আজ",
    },
  ])

  useEffect(() => {
    if (!fixedDeposit) return

    const releaseDeposit = () => {
      setBalance((current) => current + fixedDeposit.maturityAmount)
      setTransactions((current) => [
        {
          id: Date.now(),
          label: "স্থির সঞ্চয়ের মেয়াদপূর্তি",
          amount: fixedDeposit.maturityAmount,
          type: "credit",
          date: bengaliDate(new Date()),
        },
        ...current,
      ])
      setFixedDeposit(null)
      showToast("লাভ সঞ্চয়ে যুক্ত")
    }

    const remaining = fixedDeposit.maturesAt - Date.now()
    if (remaining <= 0) {
      releaseDeposit()
      return
    }

    const timer = window.setTimeout(releaseDeposit, remaining)
    return () => window.clearTimeout(timer)
  }, [fixedDeposit])

  const toastTimer = useRef<number | null>(null)
  const showToast = (message: string) => {
    setToast(message)
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(""), 2200)
  }

  const changePage = (next: Page) => {
    void navigate({ to: pagePaths[next] })
  }

  const addTransaction = (
    label: string,
    amount: number,
    type: DashboardTransaction["type"],
  ) => {
    setTransactions((current) => [
      {
        id: Date.now(),
        label,
        amount,
        type,
        date: bengaliDate(new Date()),
      },
      ...current,
    ])
  }

  const deposit = (amount: number) => {
    setBalance((current) => current + amount)
    addTransaction("সঞ্চয় জমা", amount, "credit")
    showToast(`${money(amount)} জমা হয়েছে`)
  }

  const withdraw = (amount: number) => {
    setBalance((current) => current - amount)
    addTransaction("অর্থ উত্তোলন", amount, "debit")
    showToast(`${money(amount)} উত্তোলন হয়েছে`)
  }

  const addWallet = (wallet: Omit<SavedWallet, "id">) => {
    setWallets((current) => [{ id: Date.now(), ...wallet }, ...current])
    showToast("ওয়ালেট সংরক্ষিত হয়েছে")
  }

  const confirmWithdrawal = (
    amount: number,
    fee: number,
    net: number,
    wallet: SavedWallet,
  ) => {
    setBalance((current) => current - amount)
    addTransaction("অর্থ উত্তোলন", amount, "debit")
    setWithdrawals((current) => [
      {
        id: Date.now(),
        amount,
        fee,
        net,
        provider: wallet.provider,
        account: wallet.account,
        date: bengaliDate(new Date()),
        status: "প্রক্রিয়াধীন",
      },
      ...current,
    ])
  }

  const activateFixedDeposit = () => {
    if (balance <= 0 || fixedDeposit) return

    const principal = balance
    const profit = principal * 0.02
    setBalance(0)
    setFixedDeposit({
      principal,
      profitRate: 2,
      profit,
      maturityAmount: principal + profit,
      startedAt: bengaliDate(new Date()),
      expiresAt: expiryDateFromToday(7),
      maturesAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    })
    addTransaction("স্থির সঞ্চয় স্থানান্তর", principal, "debit")
    showToast("সঞ্চয় নিরাপদে আবদ্ধ")
  }

  const purchase = (selectedPackage: VipPackage) => {
    setBalance(current => current - selectedPackage.price)
    addTransaction(`${selectedPackage.name} প্যাকেজ ক্রয়`, selectedPackage.price, "debit")
    setInvestment({ package: selectedPackage, amount: selectedPackage.price, startedAt: bengaliDate(new Date()), expiresAt: expiryDateFromToday(selectedPackage.durationDays) })
    showToast(`${selectedPackage.name} সক্রিয় হয়েছে`)
    changePage("work")
  }
  const [claimedTier, setClaimedTier] = useState<number | null>(null)
  const value = { balance, investment, fixedDeposit, wallets, withdrawals, transactions, showToast, changePage, deposit, withdraw, addWallet, confirmWithdrawal, activateFixedDeposit, purchase, setBalance, claimedTier, setClaimedTier }
  return <AppContext.Provider value={value}>{children}{toast && <div className="toast" role="status">{toast}</div>}</AppContext.Provider>
}
