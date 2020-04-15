import React, { useEffect } from 'react'
import StyledP from '../tags/StyledP'
import { renderArticle } from '../../schema/articleRenderer'

export default function Injection({ href }) {
  const [value, setValue] = React.useState(undefined)
  useEffect(() => {
    const origin = window.location.host
    const protocol = window.location.protocol
    fetch(`${protocol}//${origin}/api${encodeURI(href)}`)
      .then(res => res.json())
      .then(data => {
        if (data.contentType) {
          setValue(data.data.value)
        }
      })
  }, [])
  if (value) {
    return <>{renderArticle(value, false)}</>
  }
  return <StyledP>Lade: {href}</StyledP>
}
