import React, { useEffect } from 'react'
import StyledP from '../tags/StyledP'
import { renderArticle } from '../../schema/articleRenderer'
import LicenseNotice from './LicenseNotice'

export default function Injection({ href }) {
  const [value, setValue] = React.useState(undefined)
  const [license, setLicense] = React.useState(undefined)
  useEffect(() => {
    const origin = window.location.host
    const protocol = window.location.protocol
    fetch(
      `${protocol}//${origin}/api/frontend${encodeURI(
        href.startsWith('/') ? href : '/' + href
      )}`
    )
      .then((res) => {
        if (res.headers.get('content-type').includes('json')) return res.json()
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
