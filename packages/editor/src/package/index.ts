export { SerloEditor, type SerloEditorProps } from './editor'
export { SerloRenderer, type SerloRendererProps } from './serlo-renderer'

// Exported only so that integrations like serlo-editor-for-edusharing can customize available plugins based on the default plugins
export { defaultPlugins } from './config'

export type { BaseEditor } from '@editor/core'

export { EditorPluginType } from '@editor/types/editor-plugin-type'
export { TemplatePluginType } from '@editor/types/template-plugin-type'
export { type EditorVariant } from '@editor/package/storage-format'

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
