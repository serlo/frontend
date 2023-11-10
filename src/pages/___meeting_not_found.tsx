import { NextPage } from 'next'
import Head from 'next/head'

import { FrontendClientBase } from '@/components/frontend-client-base'

const ContentPage: NextPage = () => {
  return (
    <FrontendClientBase
      noHeaderFooter
      noContainers
      showNav={false}
      authorization={{}}
    >
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <h1 className="serlo-h1 mt-12 p-2 text-center">
        Das Meeting gibt&#39;s leider nicht. 😶‍🌫️
      </h1>
    </FrontendClientBase>
  )
}
export default ContentPage
