import React, { useEffect } from 'react'

import { renderArticle } from '../../schema/article-renderer'
import { StyledP } from '../tags/styled-p'
import { EntityProps, EditorState } from './entity'
import { LicenseNotice, LicenseNoticeData } from './license-notice'

export interface InjectionProps {
  href: string
}

export function Injection({ href }: InjectionProps) {
  const [value, setValue] = React.useState<EditorState | undefined>(undefined)
  const [license, setLicense] = React.useState<undefined | LicenseNoticeData>(
    undefined
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
        }
      })
  }, [href])
  if (value) {
    return (
      <>
        {renderArticle(value.children, false)}
        {license !== undefined && <LicenseNotice data={license} />}
      </>
    )
  }
  return <StyledP>Lade: {href}</StyledP>
}
