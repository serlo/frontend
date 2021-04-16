import Head from 'next/head'
import { useRouter } from 'next/router'

import { useInstanceData } from '@/contexts/instance-context'
import { BreadcrumbsData, HeadData } from '@/data-types'
import { serloDomain } from '@/helper/serlo-domain'

interface HeadTagsProps {
  data: HeadData
  breadcrumbsData?: BreadcrumbsData
  noindex?: boolean
}

export function HeadTags({ data, breadcrumbsData, noindex }: HeadTagsProps) {
  const { title, contentType, metaDescription, metaImage } = data
  const { lang } = useInstanceData()
  const router = useRouter()

  const canonicalHref = `https://${lang}.serlo.org${router.asPath.replace(
    new RegExp('^/' + lang),
    ''
  )}`

  return (
    <Head>
      <title>{title}</title>
      {contentType && <meta name="content_type" content={contentType} />}
      {metaDescription && <meta name="description" content={metaDescription} />}
      <meta property="og:title" content={title} />
      <link rel="canonical" href={canonicalHref} />
      {renderNoIndexMeta()}
      <meta
        property="og:image"
        content={
          metaImage
            ? metaImage
            : `https://${lang}.${serloDomain}/_assets/img/meta/serlo.jpg`
        }
      />
    </Head>
  )

  function renderNoIndexMeta() {
    // hide search, trashed and sandkasten content in instance de
    const filteredBreadcrumbs = breadcrumbsData?.filter(
      (entry) => entry.url == '/community/106082/sandkasten'
    )
    if (
      noindex ||
      (filteredBreadcrumbs && filteredBreadcrumbs.length > 0) ||
      data.title.startsWith('Sandkasten')
    ) {
      return <meta name="robots" content="noindex" />
    }

    return null
  }
}
