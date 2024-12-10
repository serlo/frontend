import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import {
  EditorAudioDocument,
  EditorGeogebraDocument,
  EditorImageDocument,
  EditorMultimediaDocument,
  EditorVideoDocument,
} from '@editor/types/editor-plugins'

import { MultimediaRenderer } from './renderer'
import { isEmptyRowsDocument } from '../rows/utils/static-is-empty'

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
      extraMediaClasses={setOpen ? 'mobile:[&_img]:cursor-zoom-in' : ''}
      onClick={({ target }: React.MouseEvent<HTMLDivElement>) => {
        if (!setOpen || (target as HTMLElement).tagName !== 'IMG') return
        setOpen(true)
      }}
    />
  )

  function isEmptyMedia() {
    const media = multimedia
    const src = String(
      media.plugin === 'geogebra'
        ? media.state
        : // @ts-expect-error not sure…
          (media as MultimediaChild).state?.src
    )
    return !src
  }
}
