'use client'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { InstanceData } from '@/data-types'
import { Instance } from '@/fetcher/graphql-types/operations'
import { getInstanceDataByLang } from '@/helper/feature-i18n'

export default function Page({
  params: { lang },
}: {
  params: { lang: Instance }
}) {
  return (
    <FrontendClientBase
      locale={lang}
      instanceData={getInstanceDataByLang(lang) as InstanceData}
    >
      Hello world from App Direcotry
    </FrontendClientBase>
  )
}
