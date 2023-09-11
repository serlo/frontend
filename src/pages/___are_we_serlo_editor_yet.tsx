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
      <div className="h-[100vh] w-[100vw] bg-brandgreen text-center">
        <p className="mx-auto block pt-12 text-lg font-bold">
          Are we <s>Edtr-io</s>Serlo-Editor yet?{' '}
        </p>
        <h1 className="mx-auto mt-40 text-8xl font-extrabold leading-tight tracking-tight">
          Yeaaaah! 🎉
        </h1>
      </div>
    </FrontendClientBase>
  )
}
export default ContentPage
