import { default as NextLink } from 'next/link'
import * as React from 'react'

import { StyledA } from '../tags/styled-a'
import { UrlClicks } from '../url-clicks'
import { ExternalLink } from './external-link'
import { useInstanceData } from '@/contexts/instance-context'

export interface LinkProps {
  href?: string
  children: React.ReactNode
  className?: string
  noExternalIcon?: boolean
  title?: string
  noCSR?: boolean
  fixColor?: boolean
}

//TODO: Should come from cloudflare worker https://github.com/serlo/frontend/issues/328
const legacyLinks = [
  '/privacy',
  '/datenschutz',
  '/imprint',
  '/terms',
  '/disable-frontend',
  '/enable-frontend',
  '/beitreten',
  '/user/settings',
]

export function isLegacyLink(_href: string) {
  // compat: this is a special frontend route or force frontend use
  if (_href == '/user/notifications') return false
  if (_href.startsWith('/user/profile/')) return false
  if (_href.startsWith('/entity/repository/history')) return false
  if (_href.startsWith('/entity/repository/compare')) return false

  return (
    legacyLinks.indexOf(_href) > -1 ||
    _href.startsWith('/auth/') ||
    _href.startsWith('/event/history') ||
    _href.startsWith('/api/auth') ||
    _href.startsWith('/entity') ||
    _href.startsWith('/page') ||
    _href.startsWith('/taxonomy') ||
    _href.startsWith('/discussions') ||
    _href.startsWith('/subscription/update') ||
    _href.startsWith('/unsubscribe') ||
    _href.indexOf('.serlo.org') > -1 //e.g. community.serlo.org or different language
  )
}

export function Link({
  href,
  children,
  className,
  noExternalIcon,
  title,
  noCSR,
  fixColor,
}: LinkProps) {
  const { lang } = useInstanceData()

  if (!href || href === undefined || href === '')
    return (
      <a className={className} title={title}>
        {children}
      </a>
    )

  const isAbsolute = href.indexOf('//') > -1
  const isExternal = isAbsolute && !href.includes('.serlo.org')
  const isAnchor = href.startsWith('#') || href.startsWith('/#')
  const isMailto = href.startsWith('mailto:')

  if (isExternal || noCSR || isAnchor || isMailto) return renderLink(href)

  //at this point only internal links should be left

  const internalLink = normalizeSerloLink(href)

  if (!isLegacyLink(internalLink)) return renderClientSide(internalLink)

  //fallback
  return renderLink(href)

  function normalizeSerloLink(_href: string) {
    // compat: some user are typing \1234 instead of /1234
    if (/^\\[\d]+$/.test(_href)) {
      return _href.replace('\\', '/')
    }

    return _href.startsWith(`https://${lang}.serlo.org/`)
      ? _href.replace(`https://${lang}.serlo.org`, '')
      : _href.startsWith('/')
      ? _href
      : '/' + _href
  }

  function renderClientSide(_href: string) {
    return (
      <NextLink prefetch={false} href={_href}>
        {renderLink(_href)}
      </NextLink>
    )
  }

  function renderLink(_href: string) {
    return (
      <StyledA href={_href} className={className} title={title}>
        {children}
        {isExternal && !noExternalIcon && <ExternalLink />}
        <UrlClicks href={_href} fixColor={fixColor} />
      </StyledA>
    )
  }
}
