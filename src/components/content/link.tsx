import React from 'react'

import { PrettyLinksContext } from '../pretty-links-context'
import { StyledA } from '../tags/styled-a'
import { ExternalLink } from './external-link'

// TODO: needs type declaration
const nowrap = (comp: any) => comp

// TODO: needs type declaration
type LinkProps = any

export function Link({
  element,
  attributes = {},
  children = null,
  wrapExtInd = nowrap,
}: LinkProps) {
  const prettyLinks = React.useContext(PrettyLinksContext)

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
