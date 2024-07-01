import Head from 'next/head'
import { useRouter } from 'next/router'

import { useInstanceData } from '@/contexts/instance-context'
import { BreadcrumbsData, HeadData } from '@/data-types'
import { testAreaId } from '@/fetcher/testArea'
import { serloDomain } from '@/helper/urls/serlo-domain'

interface HeadTagsProps {
  data: HeadData
  breadcrumbsData?: BreadcrumbsData
  noindex?: boolean
}

export function HeadTags({ data, breadcrumbsData, noindex }: HeadTagsProps) {
  const { title, contentType, metaDescription, metaImage, canonicalUrl } = data
  const { strings, lang } = useInstanceData()
  const router = useRouter()

  const canonicalHref =
    canonicalUrl ?? `https://${lang}.serlo.org` + router.asPath.split('?')[0]

  return (
    <Head>
      <title>{title}</title>
      <link rel="canonical" href={canonicalHref} />
      {contentType && <meta name="content_type" content={contentType} />}
      {metaDescription && <meta name="description" content={metaDescription} />}

      <meta property="og:site_name" content="serlo.org" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={canonicalHref} />
      <meta
        property="og:description"
        content={metaDescription ?? strings.header.slogan}
      />
      {renderNoIndexMeta()}
      <meta
        property="og:image"
        name="image"
        content={
          metaImage
            ? metaImage
            : `https://${lang}.${serloDomain}/_assets/img/meta/serlo.png`
        }
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
    </Head>
  )

  function renderNoIndexMeta() {
    // hide search, trashed and content of the "Testbereich" in instance de
    const filteredBreadcrumbs = breadcrumbsData?.filter(
      (entry) => entry.id === testAreaId
    )
    if (
      noindex ||
      (filteredBreadcrumbs && filteredBreadcrumbs.length > 0) ||
      data.title.startsWith('Testbereich')
    ) {
      return <meta name="robots" content="noindex" />
    }

    return null
  }
}
