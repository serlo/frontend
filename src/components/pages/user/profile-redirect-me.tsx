import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useAuthentication } from '@/auth/use-authentication'

//fallback for legacy routes /user/me and /user/public

export const ProfileRedirectMe: NextPage = () => {
  const auth = useAuthentication()
  const router = useRouter()

  useEffect(() => {
    if (auth) {
      // hack until we have a mutation
      // TODO: probably not needed any more, test
      const isChanged = document.referrer.endsWith('/user/settings')
      const hash = isChanged ? '#profile-refresh' : window.location.hash
      const url = `/user/${auth.id}/${auth.username}${hash}`
      void router.replace(url)
    } else {
      void router.replace('/auth/login')
    }
  }, [auth, router])

  return null
}
