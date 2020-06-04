import React from 'react'

import { PrettyLinksContext } from '../pretty-links-context'
import { StyledA } from '../tags/styled-a'
import { ExternalLink } from './external-link'

export interface LinkProps {
  element: {
    href: string
  }
  attributes: any
  children: React.ReactNode
}

export function Link({
  element,
  attributes = {},
  children = null,
}: // wrapExtInd = nowrap
LinkProps) {
  const prettyLinks = React.useContext(PrettyLinksContext)

  if (!element.href)
    return <React.Fragment {...attributes}>{children}</React.Fragment>

  const isExternal = element.href.indexOf('//') > -1
  const prettyLink = prettyLinks[element.href.replace('/', 'uuid')]?.alias

  return (
    <StyledA href={prettyLink ? prettyLink : element.href} {...attributes}>
      {children}
      {isExternal && <ExternalLink />}
      {/* {isExternal && wrapExtInd(<ExternalLink />)} */}
    </StyledA>
  )
}

// not used currently?
// const nowrap = (comp: any) => comp
