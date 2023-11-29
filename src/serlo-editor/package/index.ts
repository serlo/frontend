import IconBox from '@/serlo-editor/editor-ui/assets/plugin-icons/icon-box.svg'
import IconEquation from '@/serlo-editor/editor-ui/assets/plugin-icons/icon-equation.svg'
import IconGeogebra from '@/serlo-editor/editor-ui/assets/plugin-icons/icon-geogebra.svg'
import IconHighlight from '@/serlo-editor/editor-ui/assets/plugin-icons/icon-highlight.svg'
import IconMultimedia from '@/serlo-editor/editor-ui/assets/plugin-icons/icon-multimedia.svg'
import IconSpoiler from '@/serlo-editor/editor-ui/assets/plugin-icons/icon-spoiler.svg'
import IconTable from '@/serlo-editor/editor-ui/assets/plugin-icons/icon-table.svg'
import IconText from '@/serlo-editor/editor-ui/assets/plugin-icons/icon-text.svg'
import IconVideo from '@/serlo-editor/editor-ui/assets/plugin-icons/icon-video.svg'

export * from './editor'

export { editorPlugins } from '@/serlo-editor/plugin/helpers/editor-plugins'
export { editorRenderers } from '@/serlo-editor/plugin/helpers/editor-renderer'

export { EditorPluginType } from '@/serlo-editor/types/editor-plugin-type'
export * from '@/serlo-editor/types/editor-plugins'
export * from '@/serlo-editor/types/plugin-type-guards'
export type { PluginsWithData } from '@/serlo-editor/plugin/helpers/editor-plugins'

// default strings
export {
  instanceData as instanceDataDe,
  loggedInData as loggedInDataDe,
} from '@/data/de'
export {
  instanceData as instanceDataEn,
  loggedInData as loggedInDataEn,
} from '@/data/en'

// renderers
export { BoxStaticRenderer } from '@/serlo-editor/plugins/box/static'
export { GeogebraStaticRenderer } from '@/serlo-editor/plugins/geogebra/static'
export { ImageStaticRenderer } from '@/serlo-editor/plugins/image/static'
export { MultimediaStaticRenderer } from '@/serlo-editor/plugins/multimedia/static'
export { RowsStaticRenderer } from '@/serlo-editor/plugins/rows/static'
export { SerloTableStaticRenderer } from '@/serlo-editor/plugins/serlo-table/static'
export { SpoilerStaticRenderer } from '@/serlo-editor/plugins/spoiler/static'
export type { MathElement } from '@/serlo-editor/plugins/text'
export { TextStaticRenderer } from '@/serlo-editor/plugins/text/static'
export { VideoStaticRenderer } from '@/serlo-editor/plugins/video/static'
export { StaticMath } from '@/serlo-editor/plugins/text/static-components/static-math'

// plugins
export { createBoxPlugin } from '@/serlo-editor/plugins/box'
export { equationsPlugin } from '@/serlo-editor/plugins/equations'
export { geoGebraPlugin } from '@/serlo-editor/plugins/geogebra'
export { createHighlightPlugin } from '@/serlo-editor/plugins/highlight'
export { createMultimediaPlugin } from '@/serlo-editor/plugins/multimedia'
export { createRowsPlugin } from '@/serlo-editor/plugins/rows'
export { createSerloTablePlugin } from '@/serlo-editor/plugins/serlo-table'
export { createSpoilerPlugin } from '@/serlo-editor/plugins/spoiler'
export { createTextPlugin } from '@/serlo-editor/plugins/text'
export { unsupportedPlugin } from '@/serlo-editor/plugins/unsupported'
export { videoPlugin } from '@/serlo-editor/plugins/video'

// icons
export {
  IconBox,
  IconEquation,
  IconGeogebra,
  IconHighlight,
  IconMultimedia,
  IconSpoiler,
  IconTable,
  IconText,
  IconVideo,
}
