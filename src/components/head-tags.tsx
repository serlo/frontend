import Head from 'next/head'

import { useInstanceData } from '@/contexts/instance-context'
import { BreadcrumbsData, HeadData } from '@/data-types'
import { testAreaUrlStart } from '@/fetcher/testArea'
import { serloDomain } from '@/helper/urls/serlo-domain'

interface HeadTagsProps {
  data: HeadData
  breadcrumbsData?: BreadcrumbsData
  noindex?: boolean
}

export function HeadTags({ data, breadcrumbsData, noindex }: HeadTagsProps) {
  const { title, contentType, metaDescription, metaImage } = data
  const { lang } = useInstanceData()
  //const router = useRouter()

  const urlSlugArray = ['x'] /* Array.isArray(router.query.slug)
    ? router.query.slug
    : [router.query.slug]*/
  const canonicalHref = `https://${lang}.serlo.org/` + urlSlugArray.join('/')

  return null
  return (
    <Head>
      <title>{title}</title>
      {contentType && <meta name="content_type" content={contentType} />}
      {metaDescription && <meta name="description" content={metaDescription} />}
      <meta property="og:title" content={title} />
      <link rel="canonical" href={canonicalHref} />
      {renderNoIndexMeta()}
      <meta
        name="image"
        property="og:image"
        content={
          metaImage
            ? metaImage
            : `https://${lang}.${serloDomain}/_assets/img/meta/serlo.png`
        }
      />
    </Head>
  )

  function renderNoIndexMeta() {
    // hide search, trashed and content of the "Testbereich" in instance de
    const filteredBreadcrumbs = breadcrumbsData?.filter((entry) =>
      entry.url?.startsWith(testAreaUrlStart)
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
