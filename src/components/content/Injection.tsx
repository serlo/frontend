import React, { useEffect } from 'react'
import StyledP from '../tags/StyledP'
import { renderArticle } from '../../schema/articleRenderer'

export default function Injection({ href }) {
  const [value, setValue] = React.useState(undefined)
  useEffect(() => {
    const origin = window.location.host
    const protocol = window.location.protocol
    fetch(`${protocol}//${origin}/api${encodeURI(href)}`)
      .then(res => {
        if (res.headers.get('content-type').includes('json')) return res.json()
        else return res.text()
      })
      .then(data => {
        if (data.contentType) {
          setValue(data.data.value)
        }
      })
  }, [href])
  if (value) {
    return <>{renderArticle(value.children, false)}</>
  }
  return <StyledP>Lade: {href}</StyledP>
}
