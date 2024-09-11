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
export enum EducationalElement {
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

export const EducationalElements: Record<EducationalElement, ElementInfo> = {
  [EducationalElement.Text]: getInfo(EducationalElement.Text, IconText),
  [EducationalElement.Multimedia]: getInfo(
    EducationalElement.Multimedia,
    IconMultimedia
  ),
  [EducationalElement.Video]: getInfo(EducationalElement.Video, IconVideo),
  [EducationalElement.Box]: getInfo(EducationalElement.Box, IconBox),
  [EducationalElement.Equations]: getInfo(
    EducationalElement.Equations,
    IconEquation
  ),
  [EducationalElement.Geogebra]: getInfo(
    EducationalElement.Geogebra,
    IconGeogebra
  ),
  [EducationalElement.H5p]: getInfo(EducationalElement.H5p, IconH5p),
  [EducationalElement.Highlight]: getInfo(
    EducationalElement.Highlight,
    IconHighlight
  ),
  [EducationalElement.Image]: getInfo(EducationalElement.Image, IconImage),
  [EducationalElement.ImageGallery]: getInfo(
    EducationalElement.ImageGallery,
    IconImageGallery
  ),
  [EducationalElement.Injection]: getInfo(
    EducationalElement.Injection,
    IconInjection
  ),
  [EducationalElement.SerloTable]: getInfo(
    EducationalElement.SerloTable,
    IconTable
  ),
  [EducationalElement.Spoiler]: getInfo(
    EducationalElement.Spoiler,
    IconSpoiler
  ),
  [EducationalElement.DropzoneImage]: getInfo(
    EducationalElement.DropzoneImage,
    IconDropzones
  ),
  [EducationalElement.ScMcExercise]: getInfo(
    EducationalElement.ScMcExercise,
    IconScMcExercise
  ),
  [EducationalElement.InputExercise]: getInfo(
    EducationalElement.InputExercise,
    IconTextArea
  ),
  [EducationalElement.TextAreaExercise]: getInfo(
    EducationalElement.TextAreaExercise,
    IconTextArea
  ),
  [EducationalElement.BlanksExercise]: getInfo(
    EducationalElement.BlanksExercise,
    IconBlanksTyping
  ),
  [EducationalElement.BlanksExerciseDragAndDrop]: getInfo(
    EducationalElement.BlanksExerciseDragAndDrop,
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
  type: EducationalElement
  initialState: PluginState
}

interface PluginState {
  plugin: InternalEditorPluginType
  state?: any
}

function getInfo(type: EducationalElement, icon: string): ElementInfo {
  return {
    ...getInternationalizedStrings(type),
    icon,
    type,
    initialState: getInitialState(type),
  }
}

function getInitialState(type: EducationalElement): PluginState {
  switch (type) {
    case EducationalElement.ScMcExercise:
    case EducationalElement.InputExercise:
    case EducationalElement.TextAreaExercise:
    case EducationalElement.BlanksExercise:
    case EducationalElement.BlanksExerciseDragAndDrop:
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

function getInternationalizedStrings(type: EducationalElement) {
  return {
    de: getNameAndDescription('de', type),
    en: getNameAndDescription('en', type),
  }
}

function getNameAndDescription(
  locale: 'de' | 'en',
  pluginType: EducationalElement
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
