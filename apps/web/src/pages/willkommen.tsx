import { GetStaticProps } from 'next/types'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { LenabiWelcome } from '@/components/pages/lenabi/lenabi-welcome'
import { isProduction } from '@/helper/is-production'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => (
  <FrontendClientBase>
    <LenabiWelcome />
  </FrontendClientBase>
))

export const getStaticProps: GetStaticProps = async () => {
  if (isProduction) return { notFound: true }
  return { props: {} }
}
