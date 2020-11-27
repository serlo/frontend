import Head from 'next/head'
import { useRouter } from 'next/router'

import { useOrigin } from '@/contexts/origin-context'
import { HeadData } from '@/data-types'

interface HeadTagsProps {
  data: HeadData
}

export function HeadTags({ data }: HeadTagsProps) {
  const { title, contentType, metaDescription, metaImage } = data
  const origin = useOrigin()
  const router = useRouter()

  return (
    <Head>
      <title>{title}</title>
      {contentType && <meta name="content_type" content={contentType} />}
      {metaDescription && <meta name="description" content={metaDescription} />}
      <meta property="og:title" content={title} />
      <link rel="canonical" href={origin + router.asPath} />
      <meta
        property="og:image"
        content={metaImage ? metaImage : origin + '/_assets/img/meta/serlo.jpg'}
      />
    </Head>
  )
}
