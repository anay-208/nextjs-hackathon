import { anonymousClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
// has methods like signIn, signUp
export const authClient = createAuthClient({
    plugins: [anonymousClient()]
})


