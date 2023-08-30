import { notFound } from 'next/navigation'

import { Entity } from '@/components/content/entity'
import { EntityBase } from '@/components/entity-base'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { Topic } from '@/components/taxonomy/topic'
import { InstanceData } from '@/data-types'
import { Instance } from '@/fetcher/graphql-types/operations'
import { prettifyLinks } from '@/fetcher/prettify-links'
import { requestPage } from '@/fetcher/request-page'
import { getInstanceDataByLang } from '@/helper/feature-i18n'

export default async function Page({
  params: { lang, slug },
}: {
  params: { lang: Instance; slug: string[] }
}) {
  const alias = slug.join('/')
  // quite stupid to use fetchPageData here, why not calling requestPage directly?
  const pageData = await requestPage('/' + alias, lang)

  // we only support theses three kinds - 404 for everything else
  if (
    pageData.kind !== 'taxonomy' &&
    pageData.kind !== 'redirect' &&
    pageData.kind !== 'single-entity'
  ) {
    notFound()
  }

  await prettifyLinks(pageData)

  //fallback, should be handled by CFWorker, (useful for localhost only)
  if (pageData.kind === 'redirect') {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        window.location.href = pageData.target!
      }, 1000)
    }
    return (
      <FrontendClientBase
        locale={lang}
        instanceData={getInstanceDataByLang(lang) as InstanceData}
      >
        <LoadingSpinner noText />
      </FrontendClientBase>
    )
  }

  const page =
    pageData.kind === 'single-entity' ? (
      <Entity data={pageData.entityData} />
    ) : (
      <Topic data={pageData.taxonomyData} />
    )
  const entityId =
    pageData.kind === 'single-entity'
      ? pageData.entityData.id
      : pageData.taxonomyData.id

  return (
    <FrontendClientBase
      noContainers
      entityId={entityId}
      authorization={pageData.authorization}
      locale={lang}
      instanceData={getInstanceDataByLang(lang) as InstanceData}
    >
      <EntityBase page={pageData} entityId={entityId}>
        {page}
      </EntityBase>
    </FrontendClientBase>
  )
}
