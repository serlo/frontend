import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import styled from 'styled-components'

import { StyledP } from '../tags/styled-p'
import { LicenseNotice } from './license-notice'
import { useInstanceData } from '@/contexts/instance-context'
import { LicenseData, PageData, FrontendContentNode } from '@/data-types'
import { renderArticle } from '@/schema/article-renderer'

export interface InjectionProps {
  href: string
}

// TODO: Give injection a separate fetched data type

export function Injection({ href }: InjectionProps) {
  const [value, setValue] = React.useState<FrontendContentNode[] | undefined>(
    undefined
  )
  const [license, setLicense] = React.useState<undefined | LicenseData>(
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
        const pageData: PageData = json.pageProps.pageData
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

  function dataToState(pageData: PageData) {
    if (pageData.kind === 'single-entity') {
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
        {renderArticle(renderValue, false)}
        {license && !license.default && (
          <StyledP>
            <LicenseNotice minimal data={license} type="video" />
          </StyledP>
        )}
      </>
    )
  }
  return (
    <StyledP>
      <ColoredIcon>
        <FontAwesomeIcon icon={faSpinner} spin size="1x" />
      </ColoredIcon>{' '}
      Lade: {href}
    </StyledP>
  )
}

const ColoredIcon = styled.span`
  color: ${(props) => props.theme.colors.brand};
`
