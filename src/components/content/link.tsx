import { default as NextLink } from 'next/link'
import React from 'react'

import { StyledA } from '../tags/styled-a'
import { ExternalLink } from './external-link'
import { PrettyLinksContext } from '@/contexts/pretty-links-context'
import { hasSpecialUrlChars } from '@/helper/check-special-url-chars'

export interface LinkProps {
  href?: string
  children: React.ReactNode
  className?: string
  noExternalIcon?: boolean
  title?: string
}

//TODO: Should come from cloudflare worker
const legacyLinks = [
  '/entity/unrevised',
  '/auth/login',
  '/auth/logout',
  '/privacy',
  '/datenschutz',
  '/imprint',
  '/terms',
  '/disable-frontend',
  '/enable-frontend',
  '/api/auth/login',
  '/api/auth/logout',
  '/user/public',
  '/user/settings',
  '/auth/password/change',
  '/event/history/user/me',
]

export function Link({
  href,
  children,
  className,
  noExternalIcon,
  title,
}: LinkProps) {
  const prettyLinks = React.useContext(PrettyLinksContext)

  if (!href || href === undefined || href === '')
    return (
      <a className={className} title={title}>
        {children}
      </a>
    )

  const prettyLink = getPrettyLink(href)
  const displayHref = prettyLink ? prettyLink : href

  const isAbsolute = href.indexOf('//') > -1
  const isExternal = isAbsolute && !href.includes('.serlo.org')
  const isLegacyLink =
    legacyLinks.indexOf(displayHref) > -1 ||
    displayHref.startsWith('/user/profile/') ||
    displayHref.startsWith('user/profile/')

  if (isExternal || (isAbsolute && prettyLink === undefined))
    return renderLink()

  if (!isLegacyLink || prettyLink) return renderClientSide()

  //fallback
  return renderLink()

  function getPrettyLink(href: string): string | undefined {
    if (prettyLinks === undefined || prettyLinks === {}) return undefined

    const prettyLink = prettyLinks[href.replace('/', 'uuid')]?.alias
    if (hasSpecialUrlChars(prettyLink)) {
      return undefined
    }
    if (prettyLink !== undefined) return prettyLink

    //fallback for wrong absolute links
    return prettyLinks['uuid' + href.split('de.serlo.org/')[1]]?.alias
  }

  function renderClientSide() {
    return (
      <NextLink href="/[[...slug]]" as={decodeURIComponent(displayHref)}>
        {renderLink()}
      </NextLink>
    )
  }

  function renderLink() {
    return (
      <StyledA href={displayHref} className={className} title={title}>
        {children}
        {isExternal && !noExternalIcon && <ExternalLink />}
      </StyledA>
    )
  }
}
