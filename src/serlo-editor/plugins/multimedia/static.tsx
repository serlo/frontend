import { MultimediaRenderer } from './renderer'
import { isEmptyRowsPlugin } from '../rows/utils/static-is-empty'
import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import {
  EditorAudioPlugin,
  EditorGeogebraPlugin,
  EditorImagePlugin,
  EditorMultimediaPlugin,
  EditorVideoPlugin,
} from '@/serlo-editor-integration/types/editor-plugins'

type MultimediaChild =
  | EditorImagePlugin
  | EditorVideoPlugin
  | EditorAudioPlugin
  | EditorGeogebraPlugin

export function MultimediaStaticRenderer({
  state,
  setOpen,
}: EditorMultimediaPlugin & { setOpen?: (arg: boolean) => void }) {
  const { explanation, multimedia, width: mediaWidth } = state

  if (isEmptyMedia() && isEmptyRowsPlugin(explanation)) return null

  return (
    <MultimediaRenderer
      media={<StaticRenderer state={multimedia} />}
      explanation={<StaticRenderer state={explanation} />}
      mediaWidth={mediaWidth ?? 50}
      onClick={setOpen ? () => setOpen(true) : undefined}
      extraImageClass={setOpen ? 'mobile:cursor-zoom-in' : ''}
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
