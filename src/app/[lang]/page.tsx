'use client'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { LandingDE } from '@/components/pages/landing-de'
import { InstanceData } from '@/data-types'
import { Instance } from '@/fetcher/graphql-types/operations'
import { getInstanceDataByLang, getLandingData } from '@/helper/feature-i18n'

export default function Page({
  params: { lang },
}: {
  params: { lang: Instance }
}) {
  return (
    <FrontendClientBase
      locale={lang}
      instanceData={getInstanceDataByLang(lang) as InstanceData}
      noContainers
      noHeaderFooter
    >
      <LandingDE data={getLandingData('de')} />
    </FrontendClientBase>
  )
}
