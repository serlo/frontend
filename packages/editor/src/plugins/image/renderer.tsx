import { Link } from '@serlo/frontend/src/components/content/link'
import { useInstanceData } from '@serlo/frontend/src/contexts/instance-context'

interface ImageProps {
  image: {
    src: string
    href?: string
    alt?: string
    maxWidth?: number
  }
  placeholder?: JSX.Element | null
  caption: JSX.Element | null
  forceNewTab?: boolean
}

export function ImageRenderer({
  image,
  caption,
  placeholder,
  forceNewTab,
}: ImageProps) {
  const altFallback = useInstanceData().strings.content.imageAltFallback
  const { src, href, alt, maxWidth: maxWidthNumber } = image
  const maxWidth = maxWidthNumber ? `${maxWidthNumber}px` : undefined

  return (
    <figure
      className="serlo-image-centered bg-white"
      itemScope
      itemType="http://schema.org/ImageObject"
    >
      <div style={{ maxWidth }} className="mx-auto">
        {wrapWithLink(
          placeholder ?? (
            <img
              className="serlo-img"
              src={src}
              alt={alt ? alt : altFallback}
              itemProp="contentUrl"
              loading="lazy"
            />
          )
        )}
        <figcaption className="mt-3 italic">{caption}</figcaption>
      </div>
    </figure>
  )

  function wrapWithLink(children: JSX.Element) {
    if (!href) return children
    if (forceNewTab)
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          data-qa="plugin-image-link"
        >
          {children}
        </a>
      )
    return (
      <Link className="block w-full" href={href} noExternalIcon>
        {children}
      </Link>
    )
  }
}
