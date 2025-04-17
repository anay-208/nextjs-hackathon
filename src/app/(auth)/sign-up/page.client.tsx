'use client'

import { useState } from 'react'
import { authClient } from '@/auth/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { route } from '@/app/routes'

export default function SignUpPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  //   setError('')
    setIsLoading(true)

  //   try {
  //     await authClient.signUp.email({ name, email, password })
  //     router.push('/') // Redirect to home page after successful sign up
  //   } catch {
  //     setError('Failed to sign up. Please try again.')
  //   } finally {
  //     setIsLoading(false)
  //   }
  }

  const handleAnonymousSignIn = async () => {
    try {
      await authClient.signIn.anonymous()
      router.push('/')
    } catch {
      setError('Failed to sign in anonymously. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-main-4/5 py-12 px-4 sm:px-6 lg:px-8 text-fg">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl border border-border-strong shadow-md">
        <div>
          <h2 className="mt-2 text-4xl font-semibold  tracking-tighter">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">
                Full name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email-address">
                Email address
              </Label>
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
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
                autoComplete="new-password"
                required
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
              disabled={true}
            >
              {isLoading ? 'Creating account...' : 'Sign up'}
            </Button>

            <Button
              variant="outline" className="bg-white"
              type="button"
              onClick={handleAnonymousSignIn}
              disabled={isLoading}
            >
              Preview app anonymously
            </Button>
          </div>

          <Link href={route.signin()} className="text-sm text-main-3 hover:text-main-4">
            Already have an account? Sign in
          </Link>
        </form>
      </div>
    </div>
  )
}
