export { SerloEditor, type SerloEditorProps } from './editor'
export { SerloRenderer, type SerloRendererProps } from './serlo-renderer'

export { defaultPlugins } from './config'

export type { BaseEditor } from '@editor/core'

export { EditorPluginType } from '@editor/types/editor-plugin-type'

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
