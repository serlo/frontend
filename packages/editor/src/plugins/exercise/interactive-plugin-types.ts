import { EditorPluginType } from '@editor/types/editor-plugin-type'

export const interactivePluginTypes = [
  EditorPluginType.ScMcExercise,
  EditorPluginType.InputExercise,
  EditorPluginType.BlanksExercise,
  EditorPluginType.BlanksExerciseDragAndDrop,
  EditorPluginType.DropzoneImage,
  EditorPluginType.TextAreaExercise,
  EditorPluginType.H5p,
] as const

export type InteractivePluginType = (typeof interactivePluginTypes)[number]
