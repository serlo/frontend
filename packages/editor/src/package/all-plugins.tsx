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

/**
 * An element of the Serlo editor which can be integrated as a block / plugin
 * in another editor (for example editor.js).
 *
 * Note: This is not the same as the list of plugins in the Serlo Editor. For
 * example the elements single choice question and multiple choice question
 * are both represented by the same plugin in the Serlo Editor (they only differ
 * by a configuration). In this list they are represented as two separate elements.
 */
export enum EditorElement {
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

export const AllPlugins = {
  [EditorElement.Text]: pluginFactory(EditorElement.Text, IconText),
  [EditorElement.Multimedia]: pluginFactory(
    EditorElement.Multimedia,
    IconMultimedia
  ),
  [EditorElement.Video]: pluginFactory(EditorElement.Video, IconVideo),
  [EditorElement.Box]: pluginFactory(EditorElement.Box, IconBox),
  [EditorElement.Equations]: pluginFactory(
    EditorElement.Equations,
    IconEquation
  ),
  [EditorElement.Geogebra]: pluginFactory(EditorElement.Geogebra, IconGeogebra),
  [EditorElement.H5p]: pluginFactory(EditorElement.H5p, IconH5p),
  [EditorElement.Highlight]: pluginFactory(
    EditorElement.Highlight,
    IconHighlight
  ),
  [EditorElement.Image]: pluginFactory(EditorElement.Image, IconImage),
  [EditorElement.ImageGallery]: pluginFactory(
    EditorElement.ImageGallery,
    IconImageGallery
  ),
  [EditorElement.Injection]: pluginFactory(
    EditorElement.Injection,
    IconInjection
  ),
  [EditorElement.SerloTable]: pluginFactory(
    EditorElement.SerloTable,
    IconTable
  ),
  [EditorElement.Spoiler]: pluginFactory(EditorElement.Spoiler, IconSpoiler),
  [EditorElement.DropzoneImage]: pluginFactory(
    EditorElement.DropzoneImage,
    IconDropzones
  ),
  [EditorElement.ScMcExercise]: pluginFactory(
    EditorElement.ScMcExercise,
    IconScMcExercise
  ),
  [EditorElement.InputExercise]: pluginFactory(
    EditorElement.InputExercise,
    IconTextArea
  ),
  [EditorElement.TextAreaExercise]: pluginFactory(
    EditorElement.TextAreaExercise,
    IconTextArea
  ),
  [EditorElement.BlanksExercise]: pluginFactory(
    EditorElement.BlanksExercise,
    IconBlanksTyping
  ),
  [EditorElement.BlanksExerciseDragAndDrop]: pluginFactory(
    EditorElement.BlanksExerciseDragAndDrop,
    IconBlanksDragAndDrop
  ),
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
  type: EditorElement
  initialState: PluginState
}

interface PluginState {
  plugin: InternalEditorPluginType
  state?: any
}

function pluginFactory(type: EditorElement, icon: string): PluginInfo {
  return {
    ...getInternationalizedPluginStrings(type),
    icon,
    type,
    initialState: getInitialState(type),
  }
}

function getInitialState(type: EditorElement): PluginState {
  switch (type) {
    case EditorElement.ScMcExercise:
    case EditorElement.InputExercise:
    case EditorElement.TextAreaExercise:
    case EditorElement.BlanksExercise:
    case EditorElement.BlanksExerciseDragAndDrop:
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

function getInternationalizedPluginStrings(type: EditorElement) {
  return {
    de: getPluginNameAndDescription('de', type),
    en: getPluginNameAndDescription('en', type),
  }
}

function getPluginNameAndDescription(
  locale: 'de' | 'en',
  pluginType: EditorElement
) {
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
