import { useState, useEffect } from 'react'

import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { StaticInfoPanel } from '@/components/static-info-panel'
import { useInstanceData } from '@/contexts/instance-context'
import { SlugProps } from '@/data-types'
import { FrontendContentNode, FrontendNodeType } from '@/frontend-node-types'
import type { RenderNestedFunction } from '@/schema/article-renderer'

export interface InjectionRendererProps {
  href: string
  renderNested: RenderNestedFunction
}

export function InjectionRenderer({
  href,
  renderNested,
}: InjectionRendererProps) {
  // false for error
  const [content, setContent] = useState<FrontendContentNode[] | false>([])

  const [id, setId] = useState<number | undefined>(undefined)
  const { strings, lang } = useInstanceData()

  useEffect(() => {
    const buildInfo = document.getElementById('__NEXT_DATA__')?.textContent
    const buildId =
      buildInfo && (JSON.parse(buildInfo) as { buildId: string }).buildId

    if (!buildId) {
      setContent(false)
      return
    }

    const encodedHref = encodeURI(href.startsWith('/') ? href : `/${href}`)
    const fetchUrl =
      window.location.hostname === 'localhost'
        ? `${window.location.protocol}//${window.location.host}/api/frontend/${encodedHref}`
        : `${window.location.protocol}//${window.location.host}/_next/data/${buildId}/${lang}${encodedHref}.json`
    try {
      void fetch(fetchUrl)
        .then((res) => res.json())
        .then((json) => {
          const pageData = (json as SlugProps['pageData']).kind
            ? (json as SlugProps['pageData'])
            : (json as { pageProps: SlugProps }).pageProps?.pageData
          if (pageData && pageData.kind === 'single-entity') {
            setId(pageData.entityData.id)
            setContent(pageData.entityData.content ?? false)
          } else {
            setContent(false)
          }
        })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
      setContent(false)
    }
  }, [href, lang, strings])

  if (content && content.length === 0) return <LoadingSpinner />

  if (content === false)
    return <StaticInfoPanel>{strings.errors.defaultMessage}</StaticInfoPanel>

  //Show only video without description when injecting
  const unwrappedContent =
    content[0].type === FrontendNodeType.Video ? [content[0]] : content

  return (
    <div className="mb-4 border-b-4 border-brand-300 text-gray-900">
      {renderNested(unwrappedContent, `injection${id ?? ''}`)}
    </div>
  )
}
