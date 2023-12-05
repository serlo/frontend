import { GetStaticProps } from 'next'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { DataWallet } from '@/components/pages/data-wallet'
import { isProduction } from '@/helper/is-production'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => (
  <FrontendClientBase noHeaderFooter noContainers>
    <DataWallet />
  </FrontendClientBase>
))

export const getStaticProps: GetStaticProps<object> = async () => {
  return isProduction ? { notFound: true } : { props: {} }
}
