import { GetServerSideProps } from 'next'
// import { useRouter } from 'next/router'
import * as React from 'react'
// import { ToastContext } from '@/contexts/toast-context'

export interface LogoutProps {
  referer: string
}

export default function Logout(props: LogoutProps) {
  // const router = useRouter()
  // const setToastContext = React.useContext(ToastContext)[1]

  React.useEffect(() => {
    setTimeout(() => {
      sessionStorage.setItem('serlo-toast', `👋 Bis bald!`)
    }, 1)

    location.href = props.referer.replace(document.location.origin, '')

    //also reloads
    //void router.replace(props.referer.replace(document.location.origin, ''))

    // code above should work without refresh, but then we need to check for non [...slug] pages manually
    // void router.replace(
    //   '/[...slug]',
    //   props.referer.replace(document.location.origin, '')
    // )

    // Should only be called on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}

/* eslint-disable @typescript-eslint/require-await */
export const getServerSideProps: GetServerSideProps<LogoutProps> = async ({
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
