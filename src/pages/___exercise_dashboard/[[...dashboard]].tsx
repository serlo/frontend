import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { FrontendClientBase } from '@/components/frontend-client-base'

const Page: NextPage = () => {
  const router = useRouter()
  useEffect(() => {
    const dateStr = new Date()
      .toLocaleDateString('de-DE', {
        timeZone: 'Europe/Berlin',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
      .replace(/\./g, '-')
    void router.push(`/___exercise_dashboard/${dateStr}`)
  })
  return (
    <FrontendClientBase authorization={{}}>
      <Head>
        <meta name="robots" content="noindex" />
        <title>Statistik gelöste Aufgaben</title>
      </Head>
      <div>Wird weitergeleitet ...</div>
    </FrontendClientBase>
  )
}

export default Page
