import { NextPage } from 'next'
import { useEffect } from 'react'

import { useAuthentication } from '@/auth/use-authentication'

//fallback for legacy routes /user/me and /user/public

export const ProfileRedirectMe: NextPage = () => {
  const auth = useAuthentication()

  useEffect(() => {
    if (auth.current) {
      // hack until we have a mutation
      const isChanged = document.referrer.endsWith('/user/settings')
      const url = `/user/${auth.current.id}/${auth.current.username}${
        isChanged ? '#profile-refresh' : ''
      }`
      window.location.replace(url)
    } else {
      window.location.replace('/api/auth/login')
    }
  }, [auth])

  return null
}
