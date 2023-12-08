import { useState, useEffect, ReactNode } from 'react'

import { useAuthentication } from '@/auth/use-authentication'
import { LoadingError } from '@/components/loading/loading-error'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { PleaseLogIn } from '@/components/user/please-log-in'

export interface GuardProps {
  data?: any
  error?: object
  needsAuth?: boolean
  children: ReactNode
}

export function Guard({ children, data, error, needsAuth }: GuardProps) {
  const auth = useAuthentication()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (needsAuth) setMounted(true)
  }, [needsAuth])

  if (needsAuth && !mounted) return null

  if (needsAuth && auth === null) return <PleaseLogIn />

  if (!data && !error) return <LoadingSpinner noText />
  if (error) return <LoadingError error={JSON.stringify(error)} />
  if (data && children) return <>{children}</>
  return null
}
