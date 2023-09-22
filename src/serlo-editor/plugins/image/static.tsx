import { ImageRenderer } from './renderer'
import { useInstanceData } from '@/contexts/instance-context'
import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import { EditorImagePlugin } from '@/serlo-editor-integration/types/editor-plugins'

// compats:
// frontend version uses router atm.

// if alt is not set construct plain string from caption
// const alt = node.state.alt
//   ? node.state.alt
//   : caption
//     ? captionTexts && captionTexts.length > 0
//       ? captionTexts
//         .map((textPlugin) => {
//           return textPlugin.type === FrontendNodeType.Text
//             ? textPlugin.text
//             : ''
//         })
//         .join('')
//       : ''
//     : ''

export function ImageStaticRenderer({ state }: EditorImagePlugin) {
  //const router = useRouter()
  const { caption, src, link, alt, maxWidth: maxWidthNumber } = state
  const altFallback = useInstanceData().strings.content.imageAltFallback

  if (!src) return null

  return (
    <ImageRenderer
      image={{
        src: getSemanticSource(),
        href: link?.href,
        alt: alt ?? altFallback,
        maxWidth: maxWidthNumber,
      }}
      caption={caption ? <StaticRenderer state={caption} /> : null}
      // caption && hasVisibleContent(caption) ? (
      //   <>{renderNested(caption, 'caption')}</>
      // ) : null
    />
  )

  function getSemanticSource() {
    if (!src) return String(src)
    // const semanticNameSource =
    //   alt && alt.length > 3 ? alt : router.asPath.split('/').pop()
    // const semanticName = semanticNameSource?.replace(/[^\w+]/g, '')
    // return semanticName && semanticName.length > 3
    //   ? src.replace('/image.', `/${semanticName}.`)
    //   : src
    return String(src)
  }
}
