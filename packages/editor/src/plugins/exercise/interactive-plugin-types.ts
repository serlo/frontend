import { EditorPluginType } from '@editor/types/editor-plugin-type'

export const interactivePluginTypes = [
  EditorPluginType.Exercise,
  EditorPluginType.H5p,
] as const

export type InteractivePluginType = (typeof interactivePluginTypes)[number]
