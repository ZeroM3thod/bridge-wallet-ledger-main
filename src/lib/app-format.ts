export const bengaliNumber = (value: number) =>
  value.toLocaleString("bn-BD", { maximumFractionDigits: 1 })

export const toBengaliDigits = (value: number | string) =>
  String(value).replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)] ?? digit)

export const parseBengaliNumber = (value: string) => {
  const normalized = value
    .replace(/[০-৯]/g, (digit) => String("০১২৩৪৫৬৭৮৯".indexOf(digit)))
    .replace(/[^\d]/g, "")

  return normalized ? Number(normalized) : 0
}

export const money = (value: number) =>
  `৳ ${value.toLocaleString("bn-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`

export const bengaliDate = (date: Date) =>
  date.toLocaleDateString("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

export const expiryDateFromToday = (durationDays: number) => {
  const expiry = new Date()
  expiry.setDate(expiry.getDate() + durationDays)
  return bengaliDate(expiry)
}

