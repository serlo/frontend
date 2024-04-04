import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { loginUrl } from '../auth/utils'
import { useAuthentication } from '@/auth/use-authentication'

//fallback for legacy routes /user/me and /user/public

export const ProfileRedirectMe: NextPage = () => {
  const auth = useAuthentication()
  const router = useRouter()

  useEffect(() => {
    const url = auth
      ? `/user/${auth.id}/${auth.username}${window.location.hash}`
      : loginUrl
    void router.replace(url)
  }, [auth, router])

  return null
}
