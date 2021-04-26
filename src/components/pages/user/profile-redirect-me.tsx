import { NextPage } from 'next'
import { useEffect } from 'react'

import { useAuthentication } from '@/auth/use-authentication'
import { LoadingSpinner } from '@/components/loading/loading-spinner'

//fallback for legacy routes /user/me and /user/public

export const ProfileRedirectMe: NextPage = () => {
  const auth = useAuthentication()

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
