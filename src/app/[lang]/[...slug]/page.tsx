import type { Metadata } from 'next'
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
import { testAreaId } from '@/fetcher/testArea'
import { getInstanceDataByLang } from '@/helper/feature-i18n'
import { serloDomain } from '@/helper/urls/serlo-domain'

interface SlugProps {
  params: { lang: Instance; slug: string[] }
}

export async function generateMetadata({
  params: { lang, slug },
}: SlugProps): Promise<Metadata> {
  const alias = slug.join('/')
  // quite stupid to use fetchPageData here, why not calling requestPage directly?
  const pageData = await requestPage('/' + alias, lang)

  if (
    (pageData.kind !== 'single-entity' && pageData.kind !== 'taxonomy') ||
    !pageData.metaData
  ) {
    return {}
  }

  const { breadcrumbsData, metaData } = pageData
  const { title, contentType, metaDescription, metaImage } = metaData

  const strings = getInstanceDataByLang(lang).strings

  // TODO: hook can't be called from function
  // const pathname = usePathname()
  const pathname = '123'
  const canonical = `https://${lang}.serlo.org` + pathname

  // hide search, trashed and content of the "Testbereich"
  const noIndex =
    (Object.hasOwn(pageData, 'entityData') && pageData.entityData.trashed) ||
    breadcrumbsData?.some((entry) => entry.id === testAreaId) ||
    title.startsWith('Testbereich')

  return {
    title,
    description: metaDescription,
    alternates: { canonical },
    other: contentType
      ? {
          content_type: contentType,
        }
      : undefined,
    robots: {
      index: noIndex ? false : true,
      googleBot: {
        'max-image-preview': 'large',
      },
    },
    openGraph: {
      title,
      siteName: 'serlo.org',
      type: 'website',
      url: canonical,
      description: metaDescription ?? strings.header.slogan,
      images: [
        {
          url: metaImage
            ? metaImage
            : `https://${lang}.${serloDomain}/_assets/img/meta/serlo.png`,
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}

export default async function Page({ params: { lang, slug } }: SlugProps) {
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
