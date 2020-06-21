import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import * as React from 'react'

export interface LogoutProps {
  referer: string
}

export default function Logout(props: LogoutProps) {
  const router = useRouter()
  React.useEffect(() => {
    setTimeout(() => {
      void router.replace(props.referer.replace(document.location.origin, ''))
    }, 5000)
    // Should only be called on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>Bye</>
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
