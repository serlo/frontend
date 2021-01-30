import { useState, useEffect } from 'react';

import { LoadingSpinner } from '../loading/loading-spinner'
import { StyledP } from '../tags/styled-p'
import { LicenseNotice } from './license-notice'
import { useInstanceData } from '@/contexts/instance-context'
import { LicenseData, SlugPageData, FrontendContentNode } from '@/data-types'
import type { RenderNestedFunction } from '@/schema/article-renderer'

export interface InjectionProps {
  href: string
  renderNested: RenderNestedFunction
}

// TODO: Give injection a separate fetched data type

export function Injection({ href, renderNested }: InjectionProps) {
  const [value, setValue] = useState<FrontendContentNode[] | undefined>(
    undefined
  )

  const [id, setId] = useState<number | undefined>(undefined)

  const [license, setLicense] = useState<undefined | LicenseData>(
    undefined
  )

  const { lang } = useInstanceData()

  useEffect(() => {
    const encodedHref = encodeURI(href.startsWith('/') ? href : `/${href}`)

    /*try {
      const cachedData = sessionStorage.getItem(
        'injection' + lang + encodedHref
      )
      if (cachedData) {
        //dataToState(JSON.parse(cachedData))
        //return
      }
    } catch (e) {
      //
    }*/

    const { buildId } = JSON.parse(
      document.getElementById('__NEXT_DATA__')?.textContent ?? '{}'
    )

    void fetch(
      `${window.location.protocol}//${window.location.host}/_next/data/${buildId}/${lang}${encodedHref}.json`
    )
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        const pageData: SlugPageData = json.pageProps.pageData
        dataToState(pageData)

        /*if (pageData.kind === 'single-entity') {
          try {
            sessionStorage.setItem(
              'injection' + lang + encodedHref,
              JSON.stringify(pageData)
            )
          } catch (e) {
            //
          }
        }*/
      })
  }, [href, lang])

  function dataToState(pageData: SlugPageData) {
    if (pageData.kind === 'single-entity') {
      setId(pageData.entityData.id)
      setValue(pageData.entityData.content)
      if (pageData.entityData.licenseData) {
        setLicense(pageData.entityData.licenseData)
      }
    }
    if (pageData.kind === 'error') {
      if (pageData.errorData.message) {
        setValue([
          {
            type: 'p',
            children: [{ type: 'text', text: pageData.errorData.message }],
          },
        ])
      }
    }
  }

  if (value) {
    //Show only video without description when injecting
    const renderValue = value[0].type === 'video' ? [value[0]] : value

    return (
      <>
        {renderNested(renderValue, `injection${id}`)}
        {license && !license.default && (
          <StyledP>
            <LicenseNotice minimal data={license} type="video" />
          </StyledP>
        )}
      </>
    )
  }
  return <LoadingSpinner />
}
