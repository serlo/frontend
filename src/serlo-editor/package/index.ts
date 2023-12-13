export { SerloEditor, type SerloEditorProps } from './editor'

export { editorPlugins } from '@/serlo-editor/plugin/helpers/editor-plugins'
export { editorRenderers } from '@/serlo-editor/plugin/helpers/editor-renderer'

export { EditorPluginType } from '@/serlo-editor/types/editor-plugin-type'
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

export { FaIcon } from '@/components/fa-icon'

export { EditorInput, PreviewOverlay } from '@/serlo-editor/editor-ui'
export { PluginToolbar } from '@/serlo-editor/editor-ui/plugin-toolbar'
export { PluginDefaultTools } from '@/serlo-editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
export { createRenderers } from '@/serlo-editor-integration/create-renderers'
export { createBasicPlugins } from '@/serlo-editor-integration/create-basic-plugins'
