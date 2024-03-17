export const isValidMonth = (value: string): boolean => {
  const [month] = value.split('/')
  const monthNumber = parseInt(month, 10)
  return monthNumber >= 1 && monthNumber <= 12
}

export const isFutureDate = (value: string): boolean => {
  const today = new Date()
  const [month, year] = value.split('/')
  const expirationDate = new Date(
    parseInt('20' + year, 10),
    parseInt(month, 10) - 1,
    1,
  )
  return expirationDate > today
}
