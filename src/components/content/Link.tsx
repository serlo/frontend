import React from 'react'
import { request } from 'graphql-request'
import { idQuery } from '../../fetcher/query'
import { endpoint } from '../../fetcher/serlo-api'
import StyledA from '../tags/StyledA'
import ExternalLink from './ExternalLink'

const nowrap = comp => comp

export default function Link({
  element,
  attributes = {},
  children = null,
  wrapExtInd = nowrap
}) {
  const [prettyHref, setPrettyHref] = React.useState('')

  if (!element.href)
    return <React.Fragment {...attributes}>{children}</React.Fragment>

  const isExternal = element.href.indexOf('//') > -1
  const isId = /^\/[\d]+$/.test(element.href)

  if (isId) {
    request(endpoint, idQuery(element.href.substring(1))).then(res => {
      if (res && res.uuid && res.uuid.alias) setPrettyHref(res.uuid.alias)
    })
  }

  return (
    <StyledA href={prettyHref ? prettyHref : element.href} {...attributes}>
      {children}
      {isExternal && wrapExtInd(<ExternalLink />)}
    </StyledA>
  )
}
