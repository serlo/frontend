import { useRouter } from 'next/router'

import { EditorImagePlugin } from '../types/editor-plugins'
import { ImageStaticRenderer } from '@/serlo-editor/plugins/image/static'

// TODO: revision extra info
// extraInfo={
//   isRevisionView ? (
//     <ExtraRevisionViewInfo element={element} />
//   ) : undefined
// }

export function ImageSerloStaticRenderer(props: EditorImagePlugin) {
  const pathNameBase = useRouter().asPath.split('/').pop()
  return <ImageStaticRenderer {...props} pathNameBase={pathNameBase} />
}
