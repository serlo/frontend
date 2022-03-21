import clsx from 'clsx'
import { default as NextLink } from 'next/link'
import { ReactNode } from 'react'

import { ExternalLink } from './external-link'
import { useInstanceData } from '@/contexts/instance-context'
import { NodePath } from '@/schema/article-renderer'

export interface LinkProps {
  href?: string
  children: ReactNode
  className?: string
  noExternalIcon?: boolean
  title?: string
  forceNoCSR?: boolean
  path?: NodePath
  unreviewed?: boolean // e.g. user profiles or comments
  tabIndex?: number // menu
  unstyled?: boolean // don't add serlo-link class
}

// note: Previous discussion about fetching this dynamically https://github.com/serlo/frontend/issues/328
const legacyLinks = [
  '/privacy',
  '/datenschutz',
  '/imprint',
  '/terms',
  '/disable-frontend',
  '/enable-frontend',
  '/beitreten',
  '/user/register',
]

export function isLegacyLink(_href: string) {
  // compat: this is a special frontend route or force frontend use
  if (_href == '/user/notifications') return false
  if (_href == '/user/settings') return false
  if (_href == '/entity/unrevised') return false
  if (_href.startsWith('/entity/repository/history')) return false
  if (_href.startsWith('/entity/repository/compare')) return false

  // exerimental feature: useLegacyEditor
  if (
    _href.startsWith('/entity/repository/add-revision/') ||
    _href.startsWith('/taxonomy/term/update/')
  ) {
    return (
      typeof window !== 'undefined' &&
      document.cookie.includes('useLegacyEditor=1')
    )
  }

  return (
    legacyLinks.includes(_href) ||
    _href.startsWith('/auth/') ||
    _href.startsWith('/api/auth') ||
    _href.startsWith('/discussions') ||
    _href.startsWith('/entity') ||
    _href.startsWith('/math/wiki/') || //temporary
    _href.startsWith('/ref/') || // temporary
    _href.startsWith('/page') ||
    _href.startsWith('/taxonomy') ||
    _href.startsWith('/unsubscribe') ||
    _href.startsWith('/user/profile/') ||
    _href.startsWith('/subscription/update') ||
    _href.startsWith('/entity/repository/add-revision-old/') ||
    _href.includes('.serlo.org') // e.g. community.serlo.org or different language
  )
}

export function Link({
  href,
  children,
  className,
  noExternalIcon,
  title,
  forceNoCSR,
  unreviewed,
  tabIndex,
  unstyled,
}: LinkProps) {
  const { lang } = useInstanceData()

  if (!href || href === undefined || href === '')
    return (
      <a className={className} title={title} tabIndex={tabIndex}>
        {children}
      </a>
    )

  const isAbsolute = href.indexOf('//') > -1
  const isExternal = isAbsolute && !href.includes('.serlo.org')
  const isAnchor = href.startsWith('#') || href.startsWith('/#')
  const isMailto = href.startsWith('mailto:')

  if (isAnchor || isMailto) return renderLink(href)
  if (isExternal || forceNoCSR) return renderLink(href)

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
      // eslint-disable-next-line react/jsx-no-target-blank
      <a
        href={_href}
        className={unstyled ? className : clsx(className, 'serlo-link')}
        title={title}
        rel={unreviewed && isExternal ? 'ugc nofollow noreferrer' : undefined}
        target={unreviewed && isExternal ? '_blank' : undefined}
        tabIndex={tabIndex}
      >
        {children}
        {isExternal && !noExternalIcon && <ExternalLink />}
      </a>
    )
  }
}
