import { EditorPluginType } from '@editor/types/editor-plugin-type'

export const interactivePluginTypes = [
  EditorPluginType.TextAreaExercise,
  EditorPluginType.ScMcExercise,
  EditorPluginType.H5p,
  EditorPluginType.BlanksExercise,
  EditorPluginType.BlanksExerciseDragAndDrop,
  EditorPluginType.InputExercise,
  EditorPluginType.DropzoneImage,
] as const

export type InteractivePluginType = (typeof interactivePluginTypes)[number]
