import { useContentStrings } from '@editor/utils/use-content-strings'

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
  const altFallback = useContentStrings().imageAltFallback
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

  // only for old content, new image can't have hrefs
  function wrapWithLink(children: JSX.Element) {
    if (!href) return children
    return (
      <a
        href={href}
        target={forceNewTab ? '_blank' : undefined}
        rel={forceNewTab ? 'noreferrer' : undefined}
        data-qa="plugin-image-link"
      >
        {children}
      </a>
    )
  }
}
