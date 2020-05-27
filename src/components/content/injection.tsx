import React, { useEffect } from 'react'

import { renderArticle } from '../../schema/render-article'
import { StyledP } from '../tags/styled-p'
import { LicenseNotice } from './license-notice'

// TODO: needs type declaration
export type InjectionProps = any

export function Injection({ href }: InjectionProps) {
  // TODO: needs type declaration
  const [value, setValue] = React.useState<any>(undefined)
  const [license, setLicense] = React.useState(undefined)
  useEffect(() => {
    const origin = window.location.host
    const protocol = window.location.protocol
    void fetch(
      `${protocol}//${origin}/api/frontend${encodeURI(
        href.startsWith('/') ? href : `/${href as string}`
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
