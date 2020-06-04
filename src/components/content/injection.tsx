import React, { useEffect } from 'react'

import { renderArticle } from '../../schema/article-renderer'
import { StyledP } from '../tags/styled-p'
import { LicenseNotice } from './license-notice'

export interface InjectionProps {
  href: string
}

export function Injection({ href }: InjectionProps) {
  //TODO: define and export data types somewhere
  const [value, setValue] = React.useState<any>(undefined)
  const [license, setLicense] = React.useState(undefined)
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
      .then((data) => {
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
        {license && <LicenseNotice data={license} />}
      </>
    )
  }
  return <StyledP>Lade: {href}</StyledP>
}
