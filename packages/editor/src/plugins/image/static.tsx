import { useStaticStrings } from '@editor/i18n/static-strings-provider'
import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import { EditorImageDocument } from '@editor/types/editor-plugins'

import { ImageRenderer } from './renderer'
import { getAltOrFallback } from './utils/get-alt-or-fallback'
import { isEmptyTextDocument } from '../text/utils/static-is-empty'

export function ImageStaticRenderer({
  state,
  pathNameBase,
}: EditorImageDocument & { pathNameBase?: string }) {
  const { caption, src: fileSrc, link, alt, maxWidth: maxWidthNumber } = state

  const altFallbackString = useStaticStrings().plugins.image.altFallback
  const altOrFallback = getAltOrFallback(altFallbackString, caption, alt)

  const src = String(fileSrc)
  if (!src) return null

  const hasVisibleCaption = caption && !isEmptyTextDocument(caption)

  return (
    <ImageRenderer
      image={{
        src: getSemanticSource(),
        href: link?.href,
        alt: altOrFallback,
        maxWidth: maxWidthNumber,
      }}
      caption={hasVisibleCaption ? <StaticRenderer document={caption} /> : null}
    />
  )

  function getSemanticSource() {
    if (
      !src.startsWith('https://assets.serlo.org/') ||
      !src.includes('/image.')
    )
      return src

    const semanticBase = alt && alt.length > 3 ? alt : pathNameBase
    const semanticName = semanticBase?.replace(/[^\w+]/g, '') ?? ''

    if (semanticName?.length < 4 && semanticName.match(/^[0-9]+$/)) return src

    const dot = src.lastIndexOf('.')

    return `${src.substring(0, dot)}/${semanticName}${src.substring(
      dot
    )}`.replace('/image', '')
  }
}
