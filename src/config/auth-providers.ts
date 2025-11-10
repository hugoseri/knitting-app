export const authProviders = {
  google: {
    id: "google",
    name: "Google",
  },
} as const

export type AuthProviderId = keyof typeof authProviders
