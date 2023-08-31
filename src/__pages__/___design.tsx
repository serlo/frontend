import { NextPage } from 'next'
import Head from 'next/head'

import DesignGuideSVG from '@/assets-webkit/img/design-guide/design-guide.svg'
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
      <DesignGuideSVG className="design-guide mx-auto h-auto max-w-5xl" />
      <style jsx global>{`
        .design-guide text {
          white-space: normal !important;
        }
      `}</style>
    </FrontendClientBase>
  )
}
export default ContentPage
