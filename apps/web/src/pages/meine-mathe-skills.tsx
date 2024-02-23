/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import { NextPage } from 'next'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { HeadTags } from '@/components/head-tags'

const ContentPage: NextPage = () => {
  return (
    <FrontendClientBase
      noHeaderFooter
      noContainers
      showNav={false}
      authorization={{}}
    >
      <HeadTags
        data={{
          title: 'Meine Mathe-Skills',
          metaDescription: 'Zeige deine mathematischen Skills',
        }}
      />
      <div>Test</div>
    </FrontendClientBase>
  )
}

export default ContentPage
