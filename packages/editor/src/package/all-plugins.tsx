// import IconAudio from '@editor/editor-ui/assets/plugin-icons/icon-audio.svg?raw'
import IconScMcExercise from '@editor/editor-ui/assets/plugin-icons/icon-auswahlaufgaben.svg?raw'
import IconBlanksDragAndDrop from '@editor/editor-ui/assets/plugin-icons/icon-blanks-dnd.svg?raw'
import IconBlanksTyping from '@editor/editor-ui/assets/plugin-icons/icon-blanks-typing.svg?raw'
import IconBox from '@editor/editor-ui/assets/plugin-icons/icon-box.svg?raw'
import IconDropzones from '@editor/editor-ui/assets/plugin-icons/icon-dropzones.svg?raw'
import IconEquation from '@editor/editor-ui/assets/plugin-icons/icon-equation.svg?raw'
import IconGeogebra from '@editor/editor-ui/assets/plugin-icons/icon-geogebra.svg?raw'
import IconH5p from '@editor/editor-ui/assets/plugin-icons/icon-h5p.svg?raw'
import IconHighlight from '@editor/editor-ui/assets/plugin-icons/icon-highlight.svg?raw'
import IconImage from '@editor/editor-ui/assets/plugin-icons/icon-image.svg?raw'
import IconInjection from '@editor/editor-ui/assets/plugin-icons/icon-injection.svg?raw'
import IconTextArea from '@editor/editor-ui/assets/plugin-icons/icon-input-exercise.svg?raw'
import IconMultimedia from '@editor/editor-ui/assets/plugin-icons/icon-multimedia.svg?raw'
import IconSpoiler from '@editor/editor-ui/assets/plugin-icons/icon-spoiler.svg?raw'
import IconTable from '@editor/editor-ui/assets/plugin-icons/icon-table.svg?raw'
import IconText from '@editor/editor-ui/assets/plugin-icons/icon-text.svg?raw'
import IconVideo from '@editor/editor-ui/assets/plugin-icons/icon-video.svg?raw'
import IconImageGallery from '@editor/editor-ui/assets/plugin-icons/image-gallery/icon-image-gallery.svg?raw'
import { EditorPluginType as InternalEditorPluginType } from '@editor/types/editor-plugin-type'

import { loggedInData as loggedInDataDe } from '@/data/de'
import { loggedInData as loggedInDataEn } from '@/data/en'

export enum EditorPluginType {
  ScMcExercise = InternalEditorPluginType.ScMcExercise,
  InputExercise = InternalEditorPluginType.InputExercise,
  TextAreaExercise = InternalEditorPluginType.TextAreaExercise,
  BlanksExercise = InternalEditorPluginType.BlanksExercise,
  BlanksExerciseDragAndDrop = InternalEditorPluginType.BlanksExerciseDragAndDrop,
  Text = InternalEditorPluginType.Text,
  Image = InternalEditorPluginType.Image,
  Video = InternalEditorPluginType.Video,
  Highlight = InternalEditorPluginType.Highlight,
  Spoiler = InternalEditorPluginType.Spoiler,
  Box = InternalEditorPluginType.Box,
  SerloTable = InternalEditorPluginType.SerloTable,
  Equations = InternalEditorPluginType.Equations,
  Geogebra = InternalEditorPluginType.Geogebra,
  Injection = InternalEditorPluginType.Injection,
  H5p = InternalEditorPluginType.H5p,
  Multimedia = InternalEditorPluginType.Multimedia,
  DropzoneImage = InternalEditorPluginType.DropzoneImage,
  ImageGallery = InternalEditorPluginType.ImageGallery,
}

const germanPluginStrings = loggedInDataDe.strings.editor.plugins
const englishPluginStrings = loggedInDataEn.strings.editor.plugins

const getPluginNameAndDescription = (
  locale: 'de' | 'en',
  pluginType: EditorPluginType
) => {
  const name =
    locale === 'de'
      ? germanPluginStrings[pluginType].title
      : englishPluginStrings[pluginType].title
  const description =
    locale === 'de'
      ? germanPluginStrings[pluginType].description
      : englishPluginStrings[pluginType].description

  return { name, description }
}

const getInternationalizedPluginStrings = (type: EditorPluginType) => ({
  de: getPluginNameAndDescription('de', type),
  en: getPluginNameAndDescription('en', type),
})

interface PluginState {
  plugin: InternalEditorPluginType
  state?: any
}

interface PluginInfo {
  de: {
    name: string
    description: string
  }
  en: {
    name: string
    description: string
  }
  icon: string
  type: EditorPluginType
  initialState: PluginState
}

function pluginFactory(type: EditorPluginType, icon: string): PluginInfo {
  return {
    ...getInternationalizedPluginStrings(type),
    icon,
    type,
    initialState: getInitialState(type),
  }
}

function getInitialState(type: EditorPluginType): PluginState {
  switch (type) {
    case EditorPluginType.ScMcExercise:
    case EditorPluginType.InputExercise:
    case EditorPluginType.TextAreaExercise:
    case EditorPluginType.BlanksExercise:
    case EditorPluginType.BlanksExerciseDragAndDrop:
      return {
        plugin: InternalEditorPluginType.Rows,
        state: [
          {
            plugin: InternalEditorPluginType.Exercise,
            state: {
              content: {
                plugin: InternalEditorPluginType.Rows,
                state: [{ plugin: InternalEditorPluginType.Text }],
              },
              interactive: { plugin: type },
            },
          },
        ],
      }
    default:
      return {
        // ? All plugins and the migration algorithm seem to be reliant on this
        // structure. How could we remove the rows plugin from the initial state?
        plugin: InternalEditorPluginType.Rows,
        state: [{ plugin: type }],
      }
  }
}

export const AllPlugins = {
  [EditorPluginType.Text]: pluginFactory(EditorPluginType.Text, IconText),
  [EditorPluginType.Multimedia]: pluginFactory(
    EditorPluginType.Multimedia,
    IconMultimedia
  ),
  [EditorPluginType.Video]: pluginFactory(EditorPluginType.Video, IconVideo),
  [EditorPluginType.Box]: pluginFactory(EditorPluginType.Box, IconBox),
  [EditorPluginType.Equations]: pluginFactory(
    EditorPluginType.Equations,
    IconEquation
  ),
  [EditorPluginType.Geogebra]: pluginFactory(
    EditorPluginType.Geogebra,
    IconGeogebra
  ),
  [EditorPluginType.H5p]: pluginFactory(EditorPluginType.H5p, IconH5p),
  [EditorPluginType.Highlight]: pluginFactory(
    EditorPluginType.Highlight,
    IconHighlight
  ),
  [EditorPluginType.Image]: pluginFactory(EditorPluginType.Image, IconImage),
  [EditorPluginType.ImageGallery]: pluginFactory(
    EditorPluginType.ImageGallery,
    IconImageGallery
  ),
  [EditorPluginType.Injection]: pluginFactory(
    EditorPluginType.Injection,
    IconInjection
  ),
  [EditorPluginType.SerloTable]: pluginFactory(
    EditorPluginType.SerloTable,
    IconTable
  ),
  [EditorPluginType.Spoiler]: pluginFactory(
    EditorPluginType.Spoiler,
    IconSpoiler
  ),
  [EditorPluginType.DropzoneImage]: pluginFactory(
    EditorPluginType.DropzoneImage,
    IconDropzones
  ),
  [EditorPluginType.ScMcExercise]: pluginFactory(
    EditorPluginType.ScMcExercise,
    IconScMcExercise
  ),
  [EditorPluginType.InputExercise]: pluginFactory(
    EditorPluginType.InputExercise,
    IconTextArea
  ),
  [EditorPluginType.TextAreaExercise]: pluginFactory(
    EditorPluginType.TextAreaExercise,
    IconTextArea
  ),
  [EditorPluginType.BlanksExercise]: pluginFactory(
    EditorPluginType.BlanksExercise,
    IconBlanksTyping
  ),
  [EditorPluginType.BlanksExerciseDragAndDrop]: pluginFactory(
    EditorPluginType.BlanksExerciseDragAndDrop,
    IconBlanksDragAndDrop
  ),
}
