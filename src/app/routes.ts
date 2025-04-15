export const route = {
  signin: "/auth/sign-in",
  signup: "/auth/sign-up",
  dashboard: "/dashboard",
  journal: "/journal",
  journalID: (id: string) => `/journal/${ id }`,
  finance: "/finance",
}