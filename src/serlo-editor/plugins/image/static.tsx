import { ImageRenderer } from './renderer'
import { extractStringFromTextPlugin } from '../text/utils/static-extract-text'
import { isTextPluginEmpty } from '../text/utils/static-is-empty'
import { useInstanceData } from '@/contexts/instance-context'
import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import { EditorImagePlugin } from '@/serlo-editor-integration/types/editor-plugins'

export function ImageStaticRenderer({
  state,
  pathNameBase,
}: EditorImagePlugin & { pathNameBase?: string }) {
  const { caption, src: fileSrc, link, alt, maxWidth: maxWidthNumber } = state
  const altFallback = useInstanceData().strings.content.imageAltFallback

  const src = String(fileSrc)
  if (!src) return null

  const hasVisibleCaption = caption && !isTextPluginEmpty(caption)

  const altOrFallbacks = alt
    ? alt
    : hasVisibleCaption
    ? extractStringFromTextPlugin(caption)
    : altFallback

  // TODO: test extractStringFromTextPlugin with some more complex examples

  return (
    <ImageRenderer
      image={{
        src: getSemanticSource(),
        href: link?.href,
        alt: altOrFallbacks,
        maxWidth: maxWidthNumber,
      }}
      caption={hasVisibleCaption ? <StaticRenderer state={caption} /> : null}
    />
  )

  function getSemanticSource() {
    const semanticName = (alt && alt.length > 3 ? alt : pathNameBase)?.replace(
      /[^\w+]/g,
      ''
    )
    return semanticName && semanticName.length > 3
      ? src.replace(/\/[0-9]+\./, `/${semanticName}.`)
      : src
  }
}
