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
  [EditorElement.Text]: getInfo(EditorElement.Text, IconText),
  [EditorElement.Multimedia]: getInfo(EditorElement.Multimedia, IconMultimedia),
  [EditorElement.Video]: getInfo(EditorElement.Video, IconVideo),
  [EditorElement.Box]: getInfo(EditorElement.Box, IconBox),
  [EditorElement.Equations]: getInfo(EditorElement.Equations, IconEquation),
  [EditorElement.Geogebra]: getInfo(EditorElement.Geogebra, IconGeogebra),
  [EditorElement.H5p]: getInfo(EditorElement.H5p, IconH5p),
  [EditorElement.Highlight]: getInfo(EditorElement.Highlight, IconHighlight),
  [EditorElement.Image]: getInfo(EditorElement.Image, IconImage),
  [EditorElement.ImageGallery]: getInfo(
    EditorElement.ImageGallery,
    IconImageGallery
  ),
  [EditorElement.Injection]: getInfo(EditorElement.Injection, IconInjection),
  [EditorElement.SerloTable]: getInfo(EditorElement.SerloTable, IconTable),
  [EditorElement.Spoiler]: getInfo(EditorElement.Spoiler, IconSpoiler),
  [EditorElement.DropzoneImage]: getInfo(
    EditorElement.DropzoneImage,
    IconDropzones
  ),
  [EditorElement.ScMcExercise]: getInfo(
    EditorElement.ScMcExercise,
    IconScMcExercise
  ),
  [EditorElement.InputExercise]: getInfo(
    EditorElement.InputExercise,
    IconTextArea
  ),
  [EditorElement.TextAreaExercise]: getInfo(
    EditorElement.TextAreaExercise,
    IconTextArea
  ),
  [EditorElement.BlanksExercise]: getInfo(
    EditorElement.BlanksExercise,
    IconBlanksTyping
  ),
  [EditorElement.BlanksExerciseDragAndDrop]: getInfo(
    EditorElement.BlanksExerciseDragAndDrop,
    IconBlanksDragAndDrop
  ),
}

interface ElementInfo {
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

function getInfo(type: EditorElement, icon: string): ElementInfo {
  return {
    ...getInternationalizedStrings(type),
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

function getInternationalizedStrings(type: EditorElement) {
  return {
    de: getNameAndDescription('de', type),
    en: getNameAndDescription('en', type),
  }
}

function getNameAndDescription(locale: 'de' | 'en', pluginType: EditorElement) {
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
