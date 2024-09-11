export { SerloEditor, type SerloEditorProps } from './editor'
export { SerloRenderer, type SerloRendererProps } from './serlo-renderer'

export type { BaseEditor } from '@editor/core'
export { EducationalElements } from './all-plugins'

export { EditorPluginType } from '@editor/types/editor-plugin-type'

// Exported only so that integrations like serlo-editor-for-edusharing can customize available plugins based on the default plugins
export { defaultPlugins } from './config'
