import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import styled from 'styled-components'

import { StyledP } from '../tags/styled-p'
import { LicenseNotice } from './license-notice'
import { useOrigin } from '@/contexts/origin-context'
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

  const origin = useOrigin()

  useEffect(() => {
    const encodedHref = encodeURI(href.startsWith('/') ? href : `/${href}`)

    try {
      const cachedData = sessionStorage.getItem(encodedHref)
      if (cachedData) {
        dataToState(JSON.parse(cachedData))
        return
      }
    } catch (e) {
      //
    }

    void fetch(`${origin}/api/frontend${encodedHref}`)
      .then((res) => {
        if (res.headers.get('content-type')!.includes('json')) return res.json()
        else return res.text()
      })
      .then((pageData: PageData) => {
        dataToState(pageData)

        if (pageData.kind === 'single-entity') {
          try {
            sessionStorage.setItem(
              'injection' + encodedHref,
              JSON.stringify(pageData)
            )
          } catch (e) {
            //
          }
        }
      })
  }, [href, origin])

  function dataToState(pageData: PageData) {
    if (pageData.kind === 'single-entity') {
      setValue(pageData.entityData.content)
      if (pageData.entityData.licenseData) {
        setLicense(pageData.entityData.licenseData)
      }
    }
  }

  if (value) {
    return (
      <>
        {renderArticle(value, false)}
        {license && <LicenseNotice data={license} />}
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
