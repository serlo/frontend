import { NextPage } from 'next'
import { useEffect } from 'react';

import { useAuth } from '@/auth/use-auth'
import { LoadingSpinner } from '@/components/loading/loading-spinner'

//fallback for legacy routes /user/me and /user/public

export const ProfileRedirectMe: NextPage = () => {
  const auth = useAuth()

  useEffect(() => {
    if (auth.current) {
      window.location.replace(
        `/user/${auth.current.id}/${auth.current.username}`
      )
    } else {
      window.location.replace('/api/auth/login')
    }
  }, [auth])

  return <LoadingSpinner noText />
}
