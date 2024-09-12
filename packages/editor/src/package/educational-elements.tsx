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
  SingleChoiceExercise = 'singleChoiceExercise',
  MultipleChoiceExercise = 'multipleChoiceExercise',
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

export const educationalElements: EducationalElements = {
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
  [EducationalElement.SingleChoiceExercise]: getInfo(
    EducationalElement.SingleChoiceExercise,
    IconScMcExercise
  ),
  [EducationalElement.MultipleChoiceExercise]: getInfo(
    EducationalElement.MultipleChoiceExercise,
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

type EducationalElements = {
  [E in EducationalElement]: ElementInfo<E>
}

interface ElementInfo<E extends EducationalElement> {
  type: E
  de: {
    name: string
    description: string
  }
  en: {
    name: string
    description: string
  }
  icon: string
  initialState: PluginState
}

interface PluginState {
  plugin: string
  state?: any
}

function getInfo<E extends EducationalElement>(
  type: E,
  icon: string
): ElementInfo<E> {
  return {
    ...getInternationalizedStrings(type),
    icon,
    type,
    initialState: getInitialState(type),
  }
}

function getInitialState(type: EducationalElement): PluginState {
  switch (type) {
    case EducationalElement.BlanksExerciseDragAndDrop:
    case EducationalElement.BlanksExercise:
      return getEditorState({
        plugin: InternalEditorPluginType.BlanksExercise,
        state: {
          text: { plugin: InternalEditorPluginType.Text },
          mode:
            type === EducationalElement.BlanksExerciseDragAndDrop
              ? 'drag-and-drop'
              : 'typing',
        },
      })

    case EducationalElement.SingleChoiceExercise:
    case EducationalElement.MultipleChoiceExercise:
      return getEditorState({
        plugin: InternalEditorPluginType.ScMcExercise,
        state: {
          isSingleChoice: type === EducationalElement.SingleChoiceExercise,
          answers: [
            {
              content: { plugin: InternalEditorPluginType.Text },
              isCorrect: true,
              feedback: { plugin: InternalEditorPluginType.Text },
            },
            {
              content: { plugin: InternalEditorPluginType.Text },
              isCorrect: false,
              feedback: { plugin: InternalEditorPluginType.Text },
            },
          ],
        },
      })

    case EducationalElement.InputExercise:
    case EducationalElement.TextAreaExercise:
      return getEditorState({ plugin: type })

    default:
      return { plugin: type }
  }
}

function getEditorState(interactive: unknown) {
  return {
    plugin: InternalEditorPluginType.Exercise,
    state: {
      content: {
        plugin: InternalEditorPluginType.Rows,
        state: [{ plugin: InternalEditorPluginType.Text }],
      },
      interactive,
    },
  }
}

function getInternationalizedStrings(type: EducationalElement) {
  switch (type) {
    case EducationalElement.SingleChoiceExercise:
      return {
        de: {
          name: 'Single-Choice-Aufgabe',
          description: 'Eine Frage mit einer Auswahl an Antwortmöglichkeiten.',
        },
        en: {
          name: 'Single Choice Exercise',
          description: 'A question with a selection of answer options.',
        },
      }
    case EducationalElement.MultipleChoiceExercise:
      return {
        de: {
          name: 'Multiple-Choice-Aufgabe',
          description: 'Eine Frage mit einer Auswahl an Antwortmöglichkeiten.',
        },
        en: {
          name: 'Multiple Choice Exercise',
          description: 'A question with a selection of answer options.',
        },
      }
    default:
      return {
        de: getNameAndDescription('de', type),
        en: getNameAndDescription('en', type),
      }
  }
}

type PluginsWithNameAndDescription = {
  [P in keyof typeof germanPluginStrings]: (typeof germanPluginStrings)[P] extends {
    title: string
    description: string
  }
    ? P
    : never
}[keyof typeof germanPluginStrings]

function getNameAndDescription(
  locale: 'de' | 'en',
  pluginType: PluginsWithNameAndDescription
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
