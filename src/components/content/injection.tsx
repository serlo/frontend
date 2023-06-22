import { useState, useEffect } from 'react'

import { LoadingSpinner } from '../loading/loading-spinner'
import { useInstanceData } from '@/contexts/instance-context'
import { SlugProps } from '@/data-types'
import { FrontendContentNode, FrontendNodeType } from '@/frontend-node-types'
import type { RenderNestedFunction } from '@/schema/article-renderer'

export interface InjectionProps {
  href: string
  renderNested: RenderNestedFunction
}

export function Injection({ href, renderNested }: InjectionProps) {
  const [content, setContent] = useState<FrontendContentNode[] | undefined>(
    undefined
  )

  const [id, setId] = useState<number | undefined>(undefined)
  const { strings, lang } = useInstanceData()

  useEffect(() => {
    const errorMessage = [
      {
        type: FrontendNodeType.P,
        children: [
          {
            type: FrontendNodeType.Text,
            text: strings.errors.defaultMessage,
          },
        ],
      },
    ] as FrontendContentNode[]

    const buildInfo = document.getElementById('__NEXT_DATA__')?.textContent
    const buildId =
      buildInfo && (JSON.parse(buildInfo) as { buildId: string }).buildId

    if (!buildId) {
      setContent(errorMessage)
      return
    }

    const encodedHref = encodeURI(href.startsWith('/') ? href : `/${href}`)
    const fetchUrl = `${window.location.protocol}//${window.location.host}/_next/data/${buildId}/${lang}${encodedHref}.json`
    try {
      void fetch(fetchUrl)
        .then((res) => res.json())
        .then((json) => {
          const pageData = (json as { pageProps: SlugProps }).pageProps.pageData
          if (pageData.kind === 'single-entity') {
            setId(pageData.entityData.id)
            setContent(pageData.entityData.content)
          } else {
            setContent(errorMessage)
          }
        })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
      setContent(errorMessage)
    }
  }, [href, lang, strings])

  if (!content) return <LoadingSpinner />

  //Show only video without description when injecting
  const unwrappedContent = content[0].type === 'video' ? [content[0]] : content

  return (
    <div className="mb-4 border-b-4 border-brand-300 text-gray-900">
      {renderNested(unwrappedContent, `injection${id ?? ''}`)}
    </div>
  )
}
