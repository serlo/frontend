import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import styled from 'styled-components'

import { StyledP } from '../tags/styled-p'
import { EntityProps } from './entity'
import { LicenseNotice, LicenseNoticeData } from './license-notice'
import {
  PrettyLinksProvider,
  PrettyLinksContextValue,
} from '@/contexts/pretty-links-context'
import { renderArticle, EditorState } from '@/schema/article-renderer'

export interface InjectionProps {
  href: string
}

export function Injection({ href }: InjectionProps) {
  const [value, setValue] = React.useState<EditorState | undefined>(undefined)
  const [license, setLicense] = React.useState<undefined | LicenseNoticeData>(
    undefined
  )
  const [prettyLinks, setPrettyLinks] = React.useState<PrettyLinksContextValue>(
    {}
  )

  useEffect(() => {
    const origin = window.location.host
    const protocol = window.location.protocol
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

    void fetch(`${protocol}//${origin}/api/frontend${encodedHref}`)
      .then((res) => {
        if (res.headers.get('content-type')!.includes('json')) return res.json()
        else return res.text()
      })
      .then((fetchedData: EntityProps) => {
        dataToState(fetchedData)

        if (fetchedData.contentType && fetchedData.data) {
          try {
            sessionStorage.setItem(encodedHref, JSON.stringify(fetchedData))
          } catch (e) {
            //
          }
        }
      })
  }, [href])

  function dataToState(fetchedData: EntityProps) {
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
