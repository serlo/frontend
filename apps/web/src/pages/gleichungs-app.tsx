/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import { NextPage } from 'next'
import Script from 'next/script'

import { EquationsAppV2 } from '@/components/equations-app/equations-app-v2'
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
      <EquationsAppV2 />
      <HeadTags
        data={{
          title: 'Serlo Gleichungs-App',
          metaDescription:
            'Löse Gleichung interaktiv mit Feedback für deinen individuellen Rechenweg',
        }}
      />
      <Script
        src="/_assets/mathlive/mathlive.min.js"
        strategy="beforeInteractive"
      ></Script>
      <style jsx global>{`
        math-field::part(content) {
          cursor: text;
        }
        math-field::part(menu-toggle) {
          display: none;
        }
        math-field::part(virtual-keyboard-toggle) {
          display: none;
        }
        html {
          background: white !important;
        }
      `}</style>
    </FrontendClientBase>
  )
}

export default ContentPage
