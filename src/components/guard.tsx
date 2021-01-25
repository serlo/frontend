import React from 'react'

import { useAuth } from '@/auth/use-auth'
import { LoadingError } from '@/components/loading/loading-error'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { PleaseLogIn } from '@/components/user/please-log-in'
import { shouldUseNewAuth } from '@/helper/feature-auth'

export interface GuardProps {
  data?: any
  error?: object
  needsAuth?: boolean
  children: React.ReactElement
}

export function Guard({ children, data, error, needsAuth }: GuardProps) {
  const auth = useAuth()
  const [mounted, setMounted] = React.useState(!shouldUseNewAuth())

  React.useEffect(() => {
    if (needsAuth) setMounted(true)
  }, [needsAuth])

  if (needsAuth && !mounted) return null

  if (needsAuth && auth.current === null) return <PleaseLogIn />

  if (!data && !error) return <LoadingSpinner noText />
  if (error) return <LoadingError error={error} />
  if (data && children) return children
  return null
}
