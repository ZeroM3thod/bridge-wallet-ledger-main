export const vipPackages = [
  {
    name: "ভিআইপি ০",
    price: 500,
    dailyRate: 0.8,
    durationDays: 5,
  },
  {
    name: "ভিআইপি ১",
    price: 1500,
    dailyRate: 1,
    durationDays: 10,
  },
  {
    name: "ভিআইপি ২",
    price: 5000,
    dailyRate: 1.2,
    durationDays: 20,
  },
  {
    name: "ভিআইপি ৩",
    price: 10000,
    dailyRate: 1.4,
    durationDays: 30,
  },
  {
    name: "ভিআইপি ৪",
    price: 20000,
    dailyRate: 1.6,
    durationDays: 40,
  },
  {
    name: "ভিআইপি ৫",
    price: 35000,
    dailyRate: 1.8,
    durationDays: 50,
  },
]

export type VipPackage = (typeof vipPackages)[number]

export type TeamMember = {
  mobile: string
  id?: string
  vipLevel?: number
  date: string
  deposit: number
  profit: number
  active: boolean
}

export const teamRates = { 1: 5, 2: 2, 3: 1 } as const
export const teamData: Record<keyof typeof teamRates, {
  title: string
  members: number
  active: number
  teamDeposit: number
  teamProfit: number
  list: TeamMember[]
}> = {
  1: {
    title: "লেভেল ১ দল",
    members: 25,
    active: 18,
    teamDeposit: 52000,
    teamProfit: 4800,
    list: [
      {
        mobile: "০১৭৮***৯০১২",
        date: "২৪ অক্টো, ২০২৬",
        deposit: 5000,
        profit: 250,
        active: true,
      },
      {
        mobile: "০১৮১***৪৫৬৭",
        date: "২২ অক্টো, ২০২৬",
        deposit: 2000,
        profit: 100,
        active: true,
      },
      {
        mobile: "০১৯২***১১২২",
        date: "২০ অক্টো, ২০২৬",
        deposit: 0,
        profit: 0,
        active: false,
      },
      {
        mobile: "০১৫৫***৩৩৪৪",
        date: "১৮ অক্টো, ২০২৬",
        deposit: 10000,
        profit: 500,
        active: true,
      },
    ],
  },
  2: {
    title: "লেভেল ২ দল",
    members: 15,
    active: 10,
    teamDeposit: 34000,
    teamProfit: 2900,
    list: [
      {
        mobile: "০১৬৭***৮৮৯৯",
        date: "২৫ অক্টো, ২০২৬",
        deposit: 3000,
        profit: 150,
        active: true,
      },
      {
        mobile: "০১৭৬***০০১১",
        date: "২১ অক্টো, ২০২৬",
        deposit: 10000,
        profit: 500,
        active: true,
      },
      {
        mobile: "০১৩৩***৭৭৬৬",
        date: "১৯ অক্টো, ২০২৬",
        deposit: 0,
        profit: 0,
        active: false,
      },
    ],
  },
  3: {
    title: "লেভেল ৩ দল",
    members: 8,
    active: 4,
    teamDeposit: 16000,
    teamProfit: 1500,
    list: [
      {
        mobile: "০১৯৯***৫৫৪৪",
        date: "২৬ অক্টো, ২০২৬",
        deposit: 5000,
        profit: 250,
        active: true,
      },
      {
        mobile: "০১৭৪***২৩২৩",
        date: "২৩ অক্টো, ২০২৬",
        deposit: 6318.5,
        profit: 300,
        active: true,
      },
      {
        mobile: "০১৮৮***৯৯০০",
        date: "২০ অক্টো, ২০২৬",
        deposit: 0,
        profit: 0,
        active: false,
      },
    ],
  },
}

export const levelTotals = (level: keyof typeof teamRates) => {
  const data = teamData[level]
  const deposit = (data.teamDeposit * teamRates[level]) / 100
  const profit = (data.teamProfit * teamRates[level]) / 100
  return { deposit, profit, total: deposit + profit }
}

export const salaryTiers = [
  { rank: "ব্রোঞ্জ লিডার", icon: "🥉", amount: 300, req: { l1: 3, l2: 0, l3: 0 } },
  { rank: "সিলভার লিডার", icon: "🥈", amount: 700, req: { l1: 5, l2: 0, l3: 0 } },
  { rank: "গোল্ড লিডার", icon: "🥇", amount: 1200, req: { l1: 7, l2: 3, l3: 0 } },
  { rank: "প্লাটিনাম লিডার", icon: "💎", amount: 2500, req: { l1: 10, l2: 5, l3: 0 } },
  { rank: "ডায়মন্ড লিডার", icon: "👑", amount: 5000, req: { l1: 15, l2: 10, l3: 5 } },
  { rank: "ক্রাউন ডিরেক্টর", icon: "⭐", amount: 10000, req: { l1: 30, l2: 20, l3: 10 } },
  { rank: "এম্বাসেডর", icon: "🚀", amount: 25000, req: { l1: 60, l2: 40, l3: 20 } },
  { rank: "প্রেসিডেন্সিয়াল লিডার", icon: "🏛️", amount: 50000, req: { l1: 120, l2: 80, l3: 50 } },
]

