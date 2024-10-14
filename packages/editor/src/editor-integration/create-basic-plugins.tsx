import { createBlanksExercisePlugin } from '@editor/plugins/blanks-exercise'
import { createBoxPlugin } from '@editor/plugins/box'
import { createDropzoneImagePlugin } from '@editor/plugins/dropzone-image'
import { createEdusharingAssetPlugin } from '@editor/plugins/edusharing-asset'
import { equationsPlugin } from '@editor/plugins/equations'
import { exercisePlugin } from '@editor/plugins/exercise'
import { geoGebraPlugin } from '@editor/plugins/geogebra'
import { createHighlightPlugin } from '@editor/plugins/highlight'
import { createImagePlugin } from '@editor/plugins/image'
import { createImageGalleryPlugin } from '@editor/plugins/image-gallery'
import { createInputExercisePlugin } from '@editor/plugins/input-exercise'
import { createMultimediaPlugin } from '@editor/plugins/multimedia'
import { createRowsPlugin } from '@editor/plugins/rows'
import { createScMcExercisePlugin } from '@editor/plugins/sc-mc-exercise'
import { createSerloInjectionPlugin } from '@editor/plugins/serlo-injection'
import { SerloInjectionStaticRenderer } from '@editor/plugins/serlo-injection/static'
import { createSerloTablePlugin } from '@editor/plugins/serlo-table'
import { genericContentTypePlugin } from '@editor/plugins/serlo-template-plugins/generic-content'
import { solutionPlugin } from '@editor/plugins/solution'
import { createSpoilerPlugin } from '@editor/plugins/spoiler'
import { createTextPlugin } from '@editor/plugins/text'
import { textAreaExercisePlugin } from '@editor/plugins/text-area-exercise'
import { unsupportedPlugin } from '@editor/plugins/unsupported'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { TemplatePluginType } from '@editor/types/template-plugin-type'

export function createBasicPlugins(
  plugins: (EditorPluginType | TemplatePluginType)[]
) {
  const allPlugins = [
    {
      type: EditorPluginType.Text,
      plugin: createTextPlugin({}),
    },
    {
      type: EditorPluginType.Image,
      plugin: createImagePlugin({}),
    },
    {
      type: EditorPluginType.ImageGallery,
      plugin: createImageGalleryPlugin(),
    },
    {
      type: EditorPluginType.Multimedia,
      plugin: createMultimediaPlugin(plugins),
    },
    {
      type: EditorPluginType.Spoiler,
      plugin: createSpoilerPlugin(plugins),
    },
    {
      type: EditorPluginType.Equations,
      plugin: equationsPlugin,
    },
    {
      type: EditorPluginType.Box,
      plugin: createBoxPlugin(plugins),
    },
    {
      type: EditorPluginType.SerloTable,
      plugin: createSerloTablePlugin(),
    },
    {
      type: EditorPluginType.Geogebra,
      plugin: geoGebraPlugin,
    },
    {
      type: EditorPluginType.Highlight,
      plugin: createHighlightPlugin(),
    },
    {
      type: EditorPluginType.EdusharingAsset,
      plugin: createEdusharingAssetPlugin(),
    },
    {
      type: EditorPluginType.SerloInjection,
      plugin: createSerloInjectionPlugin(),
      renderer: SerloInjectionStaticRenderer,
    },
    // Exercises etc.
    // ===================================================
    {
      type: EditorPluginType.Exercise,
      plugin: exercisePlugin,
    },
    {
      type: EditorPluginType.Solution,
      plugin: solutionPlugin,
    },
    {
      type: EditorPluginType.InputExercise,
      plugin: createInputExercisePlugin(),
    },
    {
      type: EditorPluginType.ScMcExercise,
      plugin: createScMcExercisePlugin(),
    },
    {
      type: EditorPluginType.BlanksExercise,
      plugin: createBlanksExercisePlugin(),
    },
    {
      type: EditorPluginType.TextAreaExercise,
      plugin: textAreaExercisePlugin,
    },
    {
      type: EditorPluginType.DropzoneImage,
      plugin: createDropzoneImagePlugin(),
    },

    // Special plugins, never visible in suggestions
    // ===================================================
    { type: EditorPluginType.Rows, plugin: createRowsPlugin() },
    { type: EditorPluginType.Unsupported, plugin: unsupportedPlugin },
    {
      type: TemplatePluginType.GenericContent,
      plugin: genericContentTypePlugin,
    },
  ]

  return allPlugins.filter(({ type }) => plugins.includes(type))
}
