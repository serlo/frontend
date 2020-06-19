import { GetServerSideProps } from 'next'
// import { useRouter } from 'next/router'
import * as React from 'react'

import { useAuth } from '@/auth/use-auth'

export interface LoginProps {
  referer: string
}

export default function Login(props: LoginProps) {
  // const router = useRouter()
  const auth = useAuth()

  React.useEffect(() => {
    setTimeout(() => {
      sessionStorage.setItem('serlo-toast', `👋 Willkommen ${auth!.username}!`)
    }, 1)

    location.href = props.referer.replace(document.location.origin, '')

    //This code also triggers reload of page:
    // void router.replace(props.referer.replace(document.location.origin, ''))

    // code above should work without refresh, but then we need to check for non [...slug] pages manually
    // void router.replace(
    //   '/[...slug]',
    //   props.referer.replace(document.location.origin, '')
    // )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}

/* eslint-disable @typescript-eslint/require-await */
export const getServerSideProps: GetServerSideProps<LoginProps> = async ({
  query,
}) => {
  const referer = query.referer as string
  return {
    props: {
      referer,
    },
  }
}
/* eslint-enable @typescript-eslint/require-await */
