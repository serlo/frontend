import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import styled from 'styled-components'

import { StyledP } from '../tags/styled-p'
import { LicenseNotice } from './license-notice'
import { useOrigin } from '@/contexts/origin-context'
import {
  PrettyLinksProvider,
  PrettyLinksContextValue,
} from '@/contexts/pretty-links-context'
import { LicenseData } from '@/data-types'
import { renderArticle, FrontendContentValue } from '@/schema/article-renderer'

export interface InjectionProps {
  href: string
}

// TODO: Give injection a separate fetched data type

export function Injection({ href }: InjectionProps) {
  const [value, setValue] = React.useState<FrontendContentValue | undefined>(
    undefined
  )
  const [license, setLicense] = React.useState<undefined | LicenseData>(
    undefined
  )
  const [prettyLinks, setPrettyLinks] = React.useState<PrettyLinksContextValue>(
    {}
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
      .then((fetchedData: any) => {
        dataToState(fetchedData)

        if (fetchedData.contentType && fetchedData.data) {
          try {
            sessionStorage.setItem(encodedHref, JSON.stringify(fetchedData))
          } catch (e) {
            //
          }
        }
      })
  }, [href, origin])

  function dataToState(fetchedData: any) {
    if (fetchedData.contentType && fetchedData.data) {
      setValue(fetchedData.data.value)
      if (fetchedData.data.license) {
        setLicense(fetchedData.data.license)
      }
      if (fetchedData.prettyLinks) {
        setPrettyLinks(fetchedData.prettyLinks)
      }
    }
  }

  if (value) {
    return (
      <PrettyLinksProvider value={prettyLinks}>
        {renderArticle(value.children, false)}
        {license !== undefined && <LicenseNotice data={license} />}
      </PrettyLinksProvider>
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
