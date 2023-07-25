import clsx from 'clsx'

import { Link } from '@/components/content/link'
import { useInstanceData } from '@/contexts/instance-context'
import { tw } from '@/helper/tw'

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
      className="serlo-image-centered"
      itemScope
      itemType="http://schema.org/ImageObject"
    >
      <div style={{ maxWidth }} className="mx-auto">
        {wrapWithLink(
          placeholder ?? (
            <img
              className={clsx(
                'serlo-img',
                tw`
                  relative
                  min-h-[100px] min-w-[100%]
                  before:absolute
                  before:left-0 before:top-[50%] before:h-full
                  before:w-full before:translate-y-[-50%]
                  before:border-2
                  before:border-editor-primary-100 before:bg-slate-100
                  before:content-['']
                  after:absolute
                  after:left-0 after:top-1 after:block
                  after:h-full after:w-full after:content-[':(_'attr(alt)]
                `
              )}
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
        <a href={href} target="_blank" rel="noreferrer">
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
