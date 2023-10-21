import { ImageRenderer } from './renderer'
import { extractStringFromTextDocument } from '../text/utils/static-extract-text'
import { isEmptyTextDocument } from '../text/utils/static-is-empty'
import { useInstanceData } from '@/contexts/instance-context'
import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import { EditorImageDocument } from '@/serlo-editor-integration/types/editor-plugins'

export function ImageStaticRenderer({
  state,
  pathNameBase,
}: EditorImageDocument & { pathNameBase?: string }) {
  const { caption, src: fileSrc, link, alt, maxWidth: maxWidthNumber } = state
  const altFallback = useInstanceData().strings.content.imageAltFallback

  const src = String(fileSrc)
  if (!src) return null

  const hasVisibleCaption = caption && !isEmptyTextDocument(caption)

  const altOrFallbacks = alt
    ? alt
    : hasVisibleCaption
    ? extractStringFromTextDocument(caption)
    : altFallback

  return (
    <ImageRenderer
      image={{
        src: getSemanticSource(),
        href: link?.href,
        alt: altOrFallbacks,
        maxWidth: maxWidthNumber,
      }}
      caption={hasVisibleCaption ? <StaticRenderer document={caption} /> : null}
    />
  )

  function getSemanticSource() {
    if (!src.startsWith('https://assets.serlo.org/')) return src

    const semanticName = (alt && alt.length > 3 ? alt : pathNameBase)?.replace(
      /[^\w+]/g,
      ''
    )
    if (
      !semanticName ||
      semanticName.length < 4 ||
      semanticName.match(/^[0-9]+$/)
    )
      return src

    const dot = src.lastIndexOf('.')
    return `${src.substring(0, dot)}/${semanticName}${src.substring(
      dot
    )}`.replace('/image', '')
  }
}
