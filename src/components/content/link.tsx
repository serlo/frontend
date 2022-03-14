import clsx from 'clsx'
import { default as NextLink } from 'next/link'
import {
  ReactNode,
  forwardRef,
  ForwardedRef,
  useContext,
  MouseEvent,
} from 'react'

import { ExternalLink } from './external-link'
import { EntityIdContext } from '@/contexts/entity-id-context'
import { useInstanceData } from '@/contexts/instance-context'
import { serloDomain } from '@/helper/serlo-domain'
import { submitEvent } from '@/helper/submit-event'
import { NodePath } from '@/schema/article-renderer'

export interface LinkProps {
  href?: string
  children: ReactNode
  className?: string
  noExternalIcon?: boolean
  title?: string
  noCSR?: boolean
  path?: NodePath
  unreviewed?: boolean // e.g. user profiles or comments
  tabIndex?: number // menu
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
  if (_href.startsWith('/entity/repository/add-revision')) {
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
    _href.includes('.serlo.org') // e.g. community.serlo.org or different language
  )
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  return UnstyledLink({
    ...props,
    className: clsx(props.className, 'serlo-link'),
    ref,
  })
})

Link.displayName = 'Link'

export function UnstyledLink({
  href,
  children,
  className,
  noExternalIcon,
  title,
  noCSR,
  path,
  unreviewed,
  tabIndex,
  ref,
}: LinkProps & { ref?: ForwardedRef<HTMLAnchorElement> }) {
  const { lang } = useInstanceData()
  const entityId = useContext(EntityIdContext)

  if (!href || href === undefined || href === '')
    return (
      <a className={className} title={title} tabIndex={tabIndex} ref={ref}>
        {children}
      </a>
    )

  const isAbsolute = href.indexOf('//') > -1
  const isExternal = isAbsolute && !href.includes('.serlo.org')
  const isAnchor = href.startsWith('#') || href.startsWith('/#')
  const isMailto = href.startsWith('mailto:')

  let key = ''

  if (entityId) {
    if (!path) {
      // uncomment this line to search for missing links
      //console.log('!!! !!! link has no path', href)
    } else if (path.length == 0) {
      // ignore
    } else {
      key = `clicklink_${entityId}_${path
        .filter((x) => x !== undefined)
        .map((x) => x.toString())
        .join('_')}`
      //console.log('key:', key)
    }
  }

  if (isAnchor || isMailto) return renderLink(href, false)
  if (isExternal || noCSR) return renderLink(href, true)

  //at this point only internal links should be left

  const internalLink = normalizeSerloLink(href)
  if (!isLegacyLink(internalLink)) return renderClientSide(internalLink)

  //fallback
  return renderLink(href, true)

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
        {renderLink(_href, false)}
      </NextLink>
    )
  }

  function renderLink(_href: string, outbound: boolean) {
    const clickHandler = key
      ? (e: MouseEvent) => {
          if (!outbound) {
            submitEvent(key)
          } else {
            let sent = false

            const callback = function () {
              //console.log('debug - callback', sent)
              if (!sent) {
                //console.log('debug - navigate now to', _href)
                window.location.href = _href
              }
              sent = true
            }
            try {
              const result = submitEvent(key, callback)

              //console.log('debug - sending event')

              if (result === false) {
                //console.log('debug - fallback')
                callback()
              }

              window.setTimeout(callback, 1000)

              e.preventDefault()
              return false
            } catch (e) {
              //
              callback()
            }
          }
        }
      : undefined

    return (
      // eslint-disable-next-line react/jsx-no-target-blank
      <a
        href={_href}
        className={className}
        title={title}
        onClick={clickHandler}
        rel={unreviewed && isExternal ? 'ugc nofollow noreferrer' : undefined}
        target={unreviewed && isExternal ? '_blank' : undefined}
        tabIndex={tabIndex}
        ref={ref}
      >
        {children}
        {isExternal && !noExternalIcon && <ExternalLink />}
      </a>
    )
  }
}
