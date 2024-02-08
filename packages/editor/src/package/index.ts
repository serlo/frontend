export { SerloEditor, type SerloEditorProps } from './editor'
export { SerloRenderer, type SerloRendererProps } from './serlo-renderer'

export { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
export { editorRenderers } from '@editor/plugin/helpers/editor-renderer'

export { EditorPluginType } from '@editor/types/editor-plugin-type'

// default strings
export {
  instanceData as instanceDataDe,
  loggedInData as loggedInDataDe,
} from '@/data/de'

export { ROOT } from '@editor/store/root/constants'
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
} from '@editor/store'

export { StaticRenderer } from '@editor/static-renderer/static-renderer'

export { string, object, optional, number } from '@editor/plugin'
export type {
  EditorPlugin,
  EditorPluginProps,
  PrettyStaticState,
} from '@editor/plugin'

export { FaIcon } from '@/components/fa-icon'

export { EditorInput, PreviewOverlay } from '@editor/editor-ui'
export { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
export { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
export { createRenderers } from '@editor/editor-integration/create-renderers'
export { createBasicPlugins } from '@editor/editor-integration/create-basic-plugins'
