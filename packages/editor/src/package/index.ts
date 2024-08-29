export { SerloEditor, type SerloEditorProps } from './editor'
export { SerloRenderer, type SerloRendererProps } from './serlo-renderer'

export type { BaseEditor } from '@editor/core'

export { EditorPluginType } from '@editor/types/editor-plugin-type'
export { type EditorVariant } from '@editor/package/storage-format'

// Exported only so that integrations like serlo-editor-for-edusharing can customize available plugins based on the default plugins
export { defaultPlugins } from './config'
