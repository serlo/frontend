import { ReactElement, useState, useEffect } from 'react'

import { useAuthentication } from '@/auth/use-authentication'
import { LoadingError } from '@/components/loading/loading-error'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { PleaseLogIn } from '@/components/user/please-log-in'
import { shouldUseNewAuth } from '@/helper/feature-auth'

export interface GuardProps {
  data?: any
  error?: object
  needsAuth?: boolean
  children: ReactElement | null
}

export function Guard({ children, data, error, needsAuth }: GuardProps) {
  const auth = useAuthentication()
  const [mounted, setMounted] = useState(!shouldUseNewAuth())

  useEffect(() => {
    if (needsAuth) setMounted(true)
  }, [needsAuth])

  if (needsAuth && !mounted) return null

  if (needsAuth && auth.current === null) return <PleaseLogIn />

  if (!data && !error) return <LoadingSpinner noText />
  if (error) return <LoadingError error={error.toString()} />
  if (data && children) return children
  return null
}
