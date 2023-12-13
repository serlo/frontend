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

export { ROOT } from '@/serlo-editor/store/root/constants'
export {
  redo,
  undo,
  selectHasPendingChanges,
  useAppDispatch,
  useAppSelector,
  store,
  selectPendingChanges,
  selectHasUndoActions,
  selectHasRedoActions,
  persistHistory,
  selectDocuments,
  selectStaticDocument,
} from '@/serlo-editor/store'

export { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'

export { string, object, optional, number } from '@/serlo-editor/plugin'
export type {
  EditorPlugin,
  EditorPluginProps,
  PrettyStaticState,
} from '@/serlo-editor/plugin'

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

export { FaIcon } from '@/components/fa-icon'

export { EditorInput, PreviewOverlay } from '@/serlo-editor/editor-ui'
export { PluginToolbar } from '@/serlo-editor/editor-ui/plugin-toolbar'
export { PluginDefaultTools } from '@/serlo-editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
export { createRenderers } from '@/serlo-editor-integration/create-renderers'
