import { default as NextLink } from 'next/link'
import React from 'react'

import { PrettyLinksContext } from '../../contexts/pretty-links-context'
import { StyledA } from '../tags/styled-a'
import { ExternalLink } from './external-link'

export interface LinkProps {
  element: {
    href: string
  }
  children: React.ReactNode
}

export function Link({ element, children = null }: LinkProps) {
  const prettyLinks = React.useContext(PrettyLinksContext)

  if (!element.href) return <>{children}</>

  const isExternal = element.href.indexOf('//') > -1
  const prettyLink =
    prettyLinks !== undefined
      ? prettyLinks[element.href.replace('/', 'uuid')]?.alias
      : undefined

  if (isExternal || !prettyLink) {
    return (
      <StyledA href={prettyLink ? prettyLink : element.href}>
        {children}
        {isExternal && <ExternalLink />}
      </StyledA>
    )
  } else {
    return (
      <NextLink href="/[...slug]" as={decodeURIComponent(prettyLink)}>
        <StyledA href={prettyLink}>{children}</StyledA>
      </NextLink>
    )
  }
}
