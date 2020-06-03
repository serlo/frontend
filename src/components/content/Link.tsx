import React from 'react'
import StyledA from '../tags/StyledA'
import ExternalLink from './ExternalLink'
import PrettyLinksContext from '../PrettyLinksContext'

// TODO: needs type declaration
const nowrap = (comp: any) => comp

// TODO: needs type declaration
type LinkProps = any

export default function Link({
  element,
  attributes = {},
  children = null,
  wrapExtInd = nowrap,
}: LinkProps) {
  if (!element.href)
    return <React.Fragment {...attributes}>{children}</React.Fragment>

  const prettyLinks = React.useContext(PrettyLinksContext)

  const isExternal = element.href.indexOf('//') > -1
  const prettyLink = prettyLinks[element.href.replace('/', 'uuid')]?.alias

  return (
    <StyledA href={prettyLink ? prettyLink : element.href} {...attributes}>
      {children}
      {isExternal && wrapExtInd(<ExternalLink />)}
    </StyledA>
  )
}
