'use client'

import { useState } from 'react'
import { authClient } from '@/auth/client'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { route } from '@/app/routes'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const sp = useSearchParams()
  const redirectTo = (() => {
    const url = sp.get('redirectTo')
    if (!url) return '/'
    if (!url.startsWith('/')) return '/'
    return url
  })()

  // useEffect(() => {
  //   // TODO: remove
  //   authClient.getSession().then(console.log)
  //   updateCurrency("INR")
  //   test().then(console.log)
  // }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    //   setError('')
    setIsLoading(true)

    //   try {
    //     await authClient.signIn.email({ email, password })
    //     router.push(redirectTo) // Redirect to home page after successful sign in
    //   } catch {
    //     setError('Failed to sign in. Please check your credentials.')
    //   } finally {
    //     setIsLoading(false)
    //   }
  }

  const handleAnonymousSignIn = async () => {
    try {
      const res = await authClient.signIn.anonymous()
      console.log(res)
      router.push(redirectTo)
    } catch (err) {
      setError('Failed to sign in anonymously. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-main-4/5 py-12 px-4 sm:px-6 lg:px-8 tracking-tight text-fg">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl border border-border-strong shadow-md">
        <div>
          <h2 className="mt-2 text-4xl font-semibold  tracking-tighter">
            Sign in to your account
          </h2>
          <span className='mt-2'>Since the project is part of a hackathon, only anonymous sign in is enabled now.</span>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email-address">
                Email address
              </Label>
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                // required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                // required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <div className="flex flex-col gap-4">
            <Button
              type="submit"
              disabled
            // disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>

            <Button variant="outline" className="bg-white" onClick={handleAnonymousSignIn} disabled={isLoading}>
              Preview app anonymously
            </Button>
          </div>

          <Link href={route.signup} className="text-sm text-main-3 hover:text-main-4">
            Don't have an account? Sign up
          </Link>
        </form>
      </div>
    </div>
  )
}
