import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
// import { default as NextLink } from 'next/link'
import { useRouter } from 'next/router'
import { ForwardedRef, forwardRef, ReactNode, MouseEvent } from 'react'

import { FaIcon } from '../fa-icon'
import { cn } from '@/helper/cn'

export interface LinkProps {
  href?: string
  id?: string
  children: ReactNode
  className?: string
  noExternalIcon?: boolean
  forceNoCSR?: boolean //
  unreviewed?: boolean // e.g. user profiles or comments
  title?: string
  onClick?: (e: MouseEvent) => void
}

// imported from cf worker redirects.ts
export const cfWorkerLinks = [
  '/imprint',
  '/datenschutz',
  '/nutzungsbedingungen',
  '/impressum',
  '/disable-frontend',
  '/enable-frontend',
  '/labschool',
  '/ecec',
  '/chancenwerk',
  '/hochschule',
  '/neuerechtsform',
  '/beitreten',
  '/global',
  '/mathe-pruefungen', // make sure we use redirect from cf-worker here
]

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
  id,
  children,
  className,
  noExternalIcon,
  // forceNoCSR,
  onClick,
  unreviewed,
  ref,
  title,
}: LinkProps & { ref?: ForwardedRef<HTMLAnchorElement> }) {
  const router = useRouter()

  const { parsedHref, /* clientSide,*/ isExternal, isContentOnly } = parseLink()

  if (parsedHref === '') renderEmptyLink()

  // return forceNoCSR || !clientSide
  return renderDefaultLink(parsedHref)
  // : renderClientSideLink(parsedHref)

  function parseLink() {
    if (!href || href === undefined || href === '' || !router.locale)
      return { parsedHref: '', clientSide: false }

    const _href = href.replace(`https://${router.locale}.serlo.org`, '')

    const isAbsolute = _href.includes('//')
    const isSerloSubdomain = isAbsolute && _href.includes('.serlo.org') //e.g. community.serlo.org
    const isExternal = isAbsolute && !isSerloSubdomain
    const isAnchor = _href.startsWith('#') || _href.startsWith('/#')
    const isMailto = _href.startsWith('mailto:')
    // pathname maps to the page that rendered the site, this is more reliable
    const isContentOnly = router.pathname.startsWith('/content-only/')

    if (isAnchor || isMailto || isSerloSubdomain || isExternal || isContentOnly)
      return { parsedHref: href, clientSide: false, isExternal, isContentOnly }

    //at this point only internal links should be left
    const internalHref = /^\\[\d]+$/.test(_href) // compat: e.g. \1234
      ? _href.replace('\\', '/')
      : _href.startsWith('/')
        ? _href
        : '/' + _href

    // do not use CSR for redirects that are handled in the cf-worker
    const clientSide = !cfWorkerLinks.includes(internalHref)

    return {
      parsedHref: internalHref,
      clientSide,
    }
  }

  function renderEmptyLink() {
    return (
      <a className={className} ref={ref} title={title} onClick={onClick}>
        {children}
      </a>
    )
  }

  function renderDefaultLink(_href: string) {
    const isOnProfile = router.pathname.startsWith('/user/')
    const openBlank = (unreviewed || isOnProfile) && isExternal
    return (
      // eslint-disable-next-line react/jsx-no-target-blank
      <a
        id={id}
        href={_href}
        className={cn(className, 'serlo-link')}
        rel={openBlank ? 'ugc nofollow noreferrer' : undefined}
        target={openBlank || isContentOnly ? '_blank' : undefined}
        title={title}
        onClick={onClick}
      >
        {children}
        {isExternal && !noExternalIcon && (
          <FaIcon
            icon={faUpRightFromSquare}
            className="ml-1 align-baseline text-xs"
          />
        )}
      </a>
    )
  }

  /*function renderClientSideLink(_href: string) {
    return (
      <NextLink
        id={id}
        prefetch={false}
        href={_href}
        className={cn(className, 'serlo-link')}
        title={title}
        onClick={onClick}
      >
        {children}
      </NextLink>
    )
  }*/
}
