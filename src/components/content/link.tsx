import { default as NextLink } from 'next/link'
import React from 'react'

import { StyledA } from '../tags/styled-a'
import { ExternalLink } from './external-link'
import { useInstanceData } from '@/contexts/instance-context'

export interface LinkProps {
  href?: string
  children: React.ReactNode
  className?: string
  noExternalIcon?: boolean
  title?: string
  noCSR?: boolean
}

//TODO: Should come from cloudflare worker https://github.com/serlo/frontend/issues/328
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
  '/beitreten',
  '/event/history',
]

export function Link({
  href,
  children,
  className,
  noExternalIcon,
  title,
  noCSR,
}: LinkProps) {
  //const prettyLinks = {}
  const { lang } = useInstanceData()

  if (!href || href === undefined || href === '')
    return (
      <a className={className} title={title}>
        {children}
      </a>
    )

  //const prettyLink = getPrettyLink(href)
  let displayHref = href //prettyLink ? prettyLink : href
  if (displayHref.startsWith(`https://${lang}.serlo.org/`)) {
    displayHref = displayHref.replace(`https://${lang}.serlo.org`, '')
  }

  const isAbsolute = href.indexOf('//') > -1
  const isExternal = isAbsolute && !href.includes('.serlo.org')

  const isLegacyLink =
    legacyLinks.indexOf(displayHref) > -1 ||
    displayHref.startsWith('/user/profile/') ||
    displayHref.startsWith('user/profile/') ||
    displayHref.indexOf('.serlo.org') > -1 //e.g. community.serlo.org or different language

  if (isExternal || noCSR) return renderLink()

  if (!isLegacyLink /* || prettyLink*/) return renderClientSide()

  //fallback
  return renderLink()

  /*function getPrettyLink(href: string): string | undefined {
    if (prettyLinks === undefined || prettyLinks === {}) return undefined

    const prettyLink = prettyLinks[href.replace('/', 'uuid')]?.alias
    if (hasSpecialUrlChars(prettyLink)) {
      return undefined
    }
    if (prettyLink !== undefined) return prettyLink

    //fallback for wrong absolute links
    return prettyLinks['uuid' + href.split('de.serlo.org/')[1]]?.alias
  }*/

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
