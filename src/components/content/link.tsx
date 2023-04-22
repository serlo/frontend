import clsx from 'clsx'
import { default as NextLink } from 'next/link'
import { useRouter } from 'next/router'
import { ForwardedRef, forwardRef, ReactNode } from 'react'

import { ExternalLink } from './external-link'
import { useInstanceData } from '@/contexts/instance-context'

export interface LinkProps {
  href?: string
  children: ReactNode
  className?: string
  noExternalIcon?: boolean
  forceNoCSR?: boolean //
  unreviewed?: boolean // e.g. user profiles or comments
  title?: string
}

// imported from cf worker redirects.ts
const cfWorkerLinks = [
  '/privacy',
  '/imprint',
  '/terms',
  '/datenschutz',
  '/nutzungsbedingungen',
  'impressum',
  '/disable-frontend',
  '/enable-frontend',
  '/labschool',
  '/ecec',
  '/chancenwerk',
  '/hochschule',
  '/neuerechtsform',
  '/beitreten',
  '/global',
]

export function shouldUseCSR(href: string) {
  // do not use CSR for redirects that are handled in the cf-worker
  // or for serlo subdomains like community.serlo.org or es.serlo.org
  return !cfWorkerLinks.includes(href) && !href.includes('.serlo.org')
}

// warning: forwarding ref is crucial for dropdowns to work
export const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  return InternalLink({
    ...props,
    ref,
  })
})

Link.displayName = 'Link'

// don't use this outside this component
function InternalLink({
  href,
  children,
  className,
  noExternalIcon,
  forceNoCSR,
  unreviewed,
  ref,
  title,
}: LinkProps & { ref?: ForwardedRef<HTMLAnchorElement> }) {
  const { lang } = useInstanceData()
  const router = useRouter()

  if (!href || href === undefined || href === '')
    return (
      <a className={className} ref={ref} title={title}>
        {children}
      </a>
    )

  const isAbsolute = href.indexOf('//') > -1
  const isExternal = isAbsolute && !href.includes('.serlo.org')
  const isAnchor = href.startsWith('#') || href.startsWith('/#')
  const isMailto = href.startsWith('mailto:')
  // pathname maps to the page that rendered the site, this is more reliable
  const isContentOnly = router.pathname.startsWith('/content-only/')

  if (isAnchor || isMailto || isExternal || forceNoCSR || isContentOnly)
    return renderDefaultLink(href)

  //at this point only internal links should be left
  const internalLink = normalizeSerloHref(href)

  if (shouldUseCSR(internalLink)) return renderClientSideLink(internalLink)

  //fallback
  return renderDefaultLink(internalLink)

  function normalizeSerloHref(_href: string) {
    // compat: some user use \1234 instead of /1234
    if (/^\\[\d]+$/.test(_href)) {
      return _href.replace('\\', '/')
    }

    return _href.startsWith(`https://${lang}.serlo.org/`)
      ? _href.replace(`https://${lang}.serlo.org`, '')
      : _href.startsWith('/')
      ? _href
      : '/' + _href
  }

  function renderClientSideLink(_href: string) {
    return (
      <NextLink
        prefetch={false}
        href={_href}
        className={clsx(className, 'serlo-link')}
        title={title}
      >
        {children}
      </NextLink>
    )
  }

  function renderDefaultLink(_href: string) {
    const openBlank = unreviewed && isExternal
    return (
      // eslint-disable-next-line react/jsx-no-target-blank
      <a
        href={_href}
        className={clsx(className, 'serlo-link')}
        rel={openBlank ? 'ugc nofollow noreferrer' : undefined}
        target={openBlank || isContentOnly ? '_blank' : undefined}
        title={title}
      >
        {children}
        {isExternal && !noExternalIcon && <ExternalLink />}
      </a>
    )
  }
}
