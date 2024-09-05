import { EditorPluginType } from '@editor/types/editor-plugin-type'
import type { SupportedLanguage } from '@editor/types/language-data'
import { TemplatePluginType } from '@editor/types/template-plugin-type'

export const defaultPlugins = [
  EditorPluginType.Text,
  EditorPluginType.Image,
  EditorPluginType.Multimedia,
  EditorPluginType.Spoiler,
  EditorPluginType.Box,
  EditorPluginType.SerloTable,
  EditorPluginType.Equations,
  EditorPluginType.Geogebra,
  EditorPluginType.Highlight,
  EditorPluginType.Exercise,
  EditorPluginType.InputExercise,
  EditorPluginType.ScMcExercise,
  EditorPluginType.BlanksExercise,
  EditorPluginType.BlanksExerciseDragAndDrop,
  EditorPluginType.DropzoneImage,
  EditorPluginType.Solution,
  EditorPluginType.Rows,
  EditorPluginType.Unsupported,
  TemplatePluginType.GenericContent,
]

export const defaultSerloEditorProps = {
  plugins: defaultPlugins,
  onChange: undefined,
  language: 'de' as SupportedLanguage,
}
