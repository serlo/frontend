import { default as NextLink } from 'next/link'
import React from 'react'

import { PrettyLinksContext } from '../pretty-links-context'
import { StyledA } from '../tags/styled-a'
import { ExternalLink } from './external-link'

export interface LinkProps {
  href?: string
  children: React.ReactNode
  clientside?: boolean
  className?: string
  noExternalIcon?: boolean
}

export function Link({
  href,
  clientside,
  children = null,
  className,
  noExternalIcon,
}: LinkProps) {
  const prettyLinks = React.useContext(PrettyLinksContext)

  // if (debug) {
  //   console.log(prettyLinks)
  //   console.log(href.replace('/', 'uuid'))
  //   console.log(clientside)
  // }

  if (!href || href === undefined || href === '') return <>{children}</>

  const isExternal =
    href.indexOf('//') > -1 && href.indexOf('//de.serlo.org') === -1

  const prettyLink =
    prettyLinks !== undefined
      ? prettyLinks[href.replace('/', 'uuid')]?.alias
      : undefined

  const displayHref = prettyLink ? prettyLink : href

  if (isExternal) return renderLink()
  if (clientside || prettyLink) return renderClientSide()

  //for legacy links
  return renderLink()

  function renderClientSide() {
    return (
      <NextLink href="/[...slug]" as={decodeURIComponent(displayHref)}>
        {renderLink()}
      </NextLink>
    )
  }

  function renderLink() {
    return (
      <StyledA href={displayHref} className={className}>
        {children}
        {isExternal && !noExternalIcon && <ExternalLink />}
      </StyledA>
    )
  }
}
