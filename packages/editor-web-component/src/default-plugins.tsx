import { EditorPluginType } from '@serlo/editor'

export const defaultBoxAndSpoilerPlugins: (EditorPluginType | string)[] = [
  EditorPluginType.Text,
  EditorPluginType.Image,
  EditorPluginType.Equations,
  EditorPluginType.Multimedia,
  EditorPluginType.SerloTable,
  EditorPluginType.Highlight,
]

export const defaultMultimediaConfig = {
  allowedPlugins: [
    EditorPluginType.Image,
    EditorPluginType.Video,
    EditorPluginType.Geogebra,
  ],
  explanation: {
    plugin: EditorPluginType.Rows,
    config: {
      allowedPlugins: [
        EditorPluginType.Text,
        EditorPluginType.Highlight,
        EditorPluginType.Anchor,
        EditorPluginType.Equations,
        EditorPluginType.Image,
        EditorPluginType.SerloTable,
      ],
    },
  },
}
