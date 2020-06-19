import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import styled from 'styled-components'

import {
  PrettyLinksProvider,
  PrettyLinksContextValue,
} from '../../contexts/pretty-links-context'
import { renderArticle, EditorState } from '../../schema/article-renderer'
import { StyledP } from '../tags/styled-p'
import { EntityProps } from './entity'
import { LicenseNotice, LicenseNoticeData } from './license-notice'

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
    void fetch(
      `${protocol}//${origin}/api/frontend${encodeURI(
        href.startsWith('/') ? href : `/${href}`
      )}`
    )
      .then((res) => {
        if (res.headers.get('content-type')!.includes('json')) return res.json()
        else return res.text()
      })
      .then((data: EntityProps) => {
        if (data.contentType && data.data) {
          setValue(data.data.value)
          if (data.data.license) {
            setLicense(data.data.license)
          }
          if (data.prettyLinks) {
            setPrettyLinks(data.prettyLinks)
          }
        }
      })
  }, [href])
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
