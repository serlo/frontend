import { GetStaticProps } from 'next'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { LandingInformatik } from '@/components/pages/landing-informatik'
import { LandingProps } from '@/data-types'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks<LandingProps>(() => {
  return (
    <FrontendClientBase noContainers noHeaderFooter>
      <LandingInformatik />
    </FrontendClientBase>
  )
})

export const getStaticProps: GetStaticProps<{}> = async () => {
  return {
    props: {},
  }
}
