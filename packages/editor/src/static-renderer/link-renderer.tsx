import { sanitizeHref } from '@editor/utils/sanitize-href'

export function LinkRenderer({
  href,
  children,
}: {
  href?: string
  children: JSX.Element | string
}) {
  // quick check, does not have to work 100%
  const isAbsolute = href?.includes('//')

  return (
    <a
      className="serlo-link cursor-pointer"
      href={sanitizeHref(href)}
      target={isAbsolute ? '_blank' : undefined}
      rel={isAbsolute ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  )
}
