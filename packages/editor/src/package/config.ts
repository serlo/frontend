import { EditorPluginType } from '@editor/types/editor-plugin-type'
import type { SupportedLanguage } from '@editor/types/language-data'

import { TemplatePluginType } from '../types/template-plugin-type'

export const emptyDocumentState = {
  plugin: EditorPluginType.Rows,
  state: [
    {
      plugin: EditorPluginType.Text,
      state: [],
    },
  ],
}

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
  EditorPluginType.DropzoneImage,
  EditorPluginType.Solution,
  EditorPluginType.Rows,
  EditorPluginType.Unsupported,
  TemplatePluginType.GenericContent,
]

export const defaultSerloEditorProps = {
  plugins: defaultPlugins,
  onChange: undefined,
  initialState: emptyDocumentState,
  language: 'de' as SupportedLanguage,
}
