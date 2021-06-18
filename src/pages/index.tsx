import { GetStaticProps } from 'next'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { LandingDE } from '@/components/pages/landing-de'
import { LandingInternational } from '@/components/pages/landing-international'
import { LandingProps } from '@/data-types'
import { getLandingData } from '@/helper/feature-i18n'
import { renderedPageNoHooks } from '@/helper/rendered-page'
import refreshToken from './api/auth/refresh-token'
import { useAuthentication } from '@/auth/use-authentication'

function RefreshToken() {
  const auth = useAuthentication()
  return (
    <>
      <button onClick={() => {
        console.log('refreshing token')
        auth.current?.refreshToken()
      }}>Refresh Token</button>
      </>
  )
}

export default renderedPageNoHooks<LandingProps>(({ pageData }, { router }) => (
  <FrontendClientBase noContainers>
    {router.locale == 'de' ? (
      <>
      <RefreshToken />
      <LandingDE data={pageData.landingData} />
      </>
    ) : (
      <LandingInternational data={pageData.landingData} />
    )}
  </FrontendClientBase>
))

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
