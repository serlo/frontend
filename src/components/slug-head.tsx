import Head from 'next/head'

// eslint-disable-next-line import/extensions
import { PageViewProps } from '@/pages/[...slug]'

interface SlugHeadProps {
  fetchedData: PageViewProps['fetchedData']
  title: string
  origin: string
  alias?: string
}

export function SlugHead({ fetchedData, title, origin, alias }: SlugHeadProps) {
  function getMetaContentType() {
    const { contentType } = fetchedData
    //match legacy content types that are used by google custom search
    if (contentType === undefined) return ''
    if (contentType === 'Exercise') return 'text-exercise'
    if (contentType === 'CoursePage') return 'course-page'
    if (fetchedData.type === 'topicFolder') return 'topic-folder'
    if (contentType === 'TaxonomyTerm') return 'topic'
    //Article, Video, Applet, Page
    return contentType.toLowerCase()
  }

  function getMetaImage() {
    const subject = alias ? alias.split('/')[1] : 'default'
    let imageSrc = 'serlo.jpg'

    switch (subject) {
      case 'mathe':
        imageSrc = 'mathematik.jpg'
        break
      case 'nachhaltigkeit':
        imageSrc = 'nachhaltigkeit.jpg'
        break
      case 'biologie':
        imageSrc = 'biologie.jpg'
        break
    }

    return `${origin}/_assets/img/meta/${imageSrc}`
  }

  function getMetaDescription() {
    if (fetchedData.contentType === 'TaxonomyTerm') return
    const { data } = fetchedData

    if (!data) return false

    const hasDescription =
      data.metaDescription && data.metaDescription.length > 10
    if (hasDescription) return data.metaDescription

    if (data.value === undefined || data.value.children === undefined)
      return false

    const slice = data.value.children.slice(0, 10)
    const stringified = JSON.stringify(slice)
    const regexp = /"text":"(.)*?"/g
    const matches = stringified.match(regexp)
    const longFallback = matches
      ? matches.map((str) => str.substring(8, str.length - 1)).join('')
      : ''
    if (longFallback.length < 50) return false

    const softCutoff = 135
    const fallback =
      longFallback.substr(
        0,
        softCutoff + longFallback.substr(softCutoff).indexOf(' ')
      ) + ' …'
    const description = hasDescription ? data.metaDescription : fallback
    return description
  }
  const metaDescription = getMetaDescription()
  return (
    <Head>
      <title>{title ? title : 'Serlo.org'}</title>
      <meta name="content_type" content={getMetaContentType()} />
      {metaDescription && <meta name="description" content={metaDescription} />}
      <meta property="og:title" content={title} />
      <meta property="og:image" content={getMetaImage()} />
    </Head>
  )
}
