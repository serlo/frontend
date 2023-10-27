import { MultimediaRenderer } from './renderer'
import { isEmptyRowsDocument } from '../rows/utils/static-is-empty'
import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import {
  EditorAudioDocument,
  EditorGeogebraDocument,
  EditorImageDocument,
  EditorMultimediaDocument,
  EditorVideoDocument,
} from '@/serlo-editor-integration/types/editor-plugins'

type MultimediaChild =
  | EditorImageDocument
  | EditorVideoDocument
  | EditorAudioDocument
  | EditorGeogebraDocument

export function MultimediaStaticRenderer({
  state,
  setOpen,
}: EditorMultimediaDocument & { setOpen?: (arg: boolean) => void }) {
  const { explanation, multimedia, width: mediaWidth } = state

  if (isEmptyMedia() && isEmptyRowsDocument(explanation)) return null

  return (
    <MultimediaRenderer
      media={<StaticRenderer document={multimedia} />}
      explanation={<StaticRenderer document={explanation} />}
      mediaWidth={mediaWidth ?? 50}
      onClick={({ target }: React.MouseEvent<HTMLDivElement>) => {
        if (!setOpen || (target as HTMLElement).tagName !== 'IMG') return
        setOpen(true)
      }}
      extraImageClass={setOpen ? 'mobile:[&_img]:cursor-zoom-in' : ''}
    />
  )

  function isEmptyMedia() {
    const media = multimedia as MultimediaChild
    const src = String(
      media.plugin === 'geogebra' ? media.state : media.state?.src
    )
    return !src || src.length < 10
  }
}
