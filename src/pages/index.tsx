import { GetStaticProps } from 'next'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { LandingDE } from '@/components/pages/landing-de'
import { LandingInternational } from '@/components/pages/landing-international'
import { LandingProps } from '@/data-types'
import { getLandingData } from '@/helper/feature-i18n'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks<LandingProps>(({ pageData }, { router }) => {
  if (router.locale == 'de') {
    return (
      <FrontendClientBase noContainers noHeaderFooter>
        <LandingDE data={pageData.landingData} />
      </FrontendClientBase>
    )
  }

  return (
    <FrontendClientBase noContainers>
      <LandingInternational data={pageData.landingData} />
    </FrontendClientBase>
  )
})

export const getStaticProps: GetStaticProps<LandingProps> = async (context) => {
  return {
    props: {
      pageData: {
        kind: 'landing',
        landingData: getLandingData(context.locale!),
      },
    },
  }
}
