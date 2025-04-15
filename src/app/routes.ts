export const route = {
  signin: (redirectTo?: string) => `/sign-in${redirectTo ? `?redirectTo=${redirectTo}` : ""}`,
  signup: "/sign-up",
  dashboard: "/dashboard",
  journal: "/journal",
  journalID: (id: string) => `/journal/${ id }`,
  finance: "/finance",
  financeIncome: "/finance/income",
  financeExpense: "/finance/expense",
  goals: "/goals",
}