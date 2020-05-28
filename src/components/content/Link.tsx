import React from 'react'
import StyledA from '../tags/StyledA'
import ExternalLink from './ExternalLink'

const nowrap = comp => comp

export default function Link({
  element,
  attributes = {},
  children = null,
  wrapExtInd = nowrap,
  prettyLinks = []
}) {
  if (!element.href)
    return <React.Fragment {...attributes}>{children}</React.Fragment>

  const isExternal = element.href.indexOf('//') > -1
  const prettyLink = prettyLinks[element.href.replace('/', 'uuid')]?.alias

  return (
    <StyledA href={prettyLink ? prettyLink : element.href} {...attributes}>
      {children}
      {isExternal && wrapExtInd(<ExternalLink />)}
    </StyledA>
  )
}
