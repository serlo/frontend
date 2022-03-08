import { useState, useEffect } from 'react'

import { LoadingSpinner } from '../loading/loading-spinner'
import { useInstanceData } from '@/contexts/instance-context'
import { RequestPageData, FrontendContentNode, SlugProps } from '@/data-types'
import type { RenderNestedFunction } from '@/schema/article-renderer'

export interface InjectionProps {
  href: string
  renderNested: RenderNestedFunction
}

export function Injection({ href, renderNested }: InjectionProps) {
  const [value, setValue] = useState<FrontendContentNode[] | undefined>(
    undefined
  )

  const [id, setId] = useState<number | undefined>(undefined)
  const { strings, lang } = useInstanceData()

  useEffect(() => {
    const encodedHref = encodeURI(href.startsWith('/') ? href : `/${href}`)
    const buildId =
      (
        JSON.parse(
          document.getElementById('__NEXT_DATA__')?.textContent ?? '{}'
        ) as { buildId: string }
      ).buildId ?? ''

    void fetch(
      `${window.location.protocol}//${window.location.host}/_next/data/${buildId}/${lang}${encodedHref}.json`
    )
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        const pageData = (json as { pageProps: SlugProps }).pageProps.pageData
        dataToState(pageData)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [href, lang])

  function dataToState(pageData: SlugProps['pageData']) {
    if (pageData.kind === 'single-entity') {
      setId(pageData.entityData.id)
      setValue(pageData.entityData.content)
      return
    }
    setValue([
      {
        type: 'p',
        children: [{ type: 'text', text: strings.errors.defaultMessage }],
      },
    ])
  }

  if (value) {
    //Show only video without description when injecting
    const renderValue = value[0].type === 'video' ? [value[0]] : value
    return (
      <div className="text-truegray-900 border-brand-300 border-b-4 mb-4">
        {renderNested(renderValue, `injection${id ?? ''}`)}
      </div>
    )
  }
  return <LoadingSpinner />
}
