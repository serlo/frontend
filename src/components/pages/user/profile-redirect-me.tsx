import { NextPage } from 'next'
import { useEffect } from 'react'

import { useAuthentication } from '@/auth/use-authentication'
import { LoadingSpinner } from '@/components/loading/loading-spinner'

//fallback for legacy routes /user/me and /user/public

export const ProfileRedirectMe: NextPage = () => {
  const auth = useAuthentication()

  useEffect(() => {
    if (auth.current) {
      const url = `/user/${auth.current.id}/${auth.current.username}`
      const isChanged = document.referrer.endsWith('/user/settings')

      setTimeout(
        () => {
          window.location.replace(url)
        },
        isChanged ? 6000 : 0 // hack until we have a mutation
      )
    } else {
      window.location.replace('/api/auth/login')
    }
  }, [auth])

  return <LoadingSpinner noText />
}
