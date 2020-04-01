import React, { useEffect } from 'react'
import { StyledP } from '../tags/StyledP'
import Article from '../../schema/articleRenderer'
import fetchContentQL from '../../content-api/fetchContentFromSerloOrg'

export default function Injection({ href }) {
  const [value, setValue] = React.useState(undefined)
  useEffect(() => {
    /*fetchContentQL(href).then(data => {
      console.log(data)
    })*/
  }, [])
  if (value) {
    return <Article value={value} />
  }
  return <StyledP>Loading: {href}</StyledP>
}
