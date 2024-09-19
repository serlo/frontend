import type { EditorProps } from '@editor/core'
import IconAudio from '@editor/editor-ui/assets/plugin-icons/icon-audio.svg?raw'
import IconScMcExercise from '@editor/editor-ui/assets/plugin-icons/icon-auswahlaufgaben.svg?raw'
import IconBlanksDragAndDrop from '@editor/editor-ui/assets/plugin-icons/icon-blanks-dnd.svg?raw'
import IconBlanksTyping from '@editor/editor-ui/assets/plugin-icons/icon-blanks-typing.svg?raw'
import IconBox from '@editor/editor-ui/assets/plugin-icons/icon-box.svg?raw'
import IconDropzones from '@editor/editor-ui/assets/plugin-icons/icon-dropzones.svg?raw'
import IconEquation from '@editor/editor-ui/assets/plugin-icons/icon-equation.svg?raw'
import IconFallback from '@editor/editor-ui/assets/plugin-icons/icon-fallback.svg?raw'
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
import { mergeDeepRight } from 'ramda'

import { loggedInData as loggedInDataDe } from '@/data/de'
import { loggedInData as loggedInDataEn } from '@/data/en'

const isSerloProduction = process.env.NEXT_PUBLIC_ENV === 'production'

export enum PluginMenuType {
  Text = InternalEditorPluginType.Text,
  Image = InternalEditorPluginType.Image,
  ImageGallery = InternalEditorPluginType.ImageGallery,
  Video = InternalEditorPluginType.Video,
  Highlight = InternalEditorPluginType.Highlight,
  Spoiler = InternalEditorPluginType.Spoiler,
  Box = InternalEditorPluginType.Box,
  SerloTable = InternalEditorPluginType.SerloTable,
  Equations = InternalEditorPluginType.Equations,
  Geogebra = InternalEditorPluginType.Geogebra,
  Injection = InternalEditorPluginType.Injection,
  Multimedia = InternalEditorPluginType.Multimedia,

  Audio = InternalEditorPluginType.Audio,
  PageLayout = InternalEditorPluginType.PageLayout,
  PageTeam = InternalEditorPluginType.PageTeam,
  PagePartners = InternalEditorPluginType.PagePartners,

  SingleChoiceExercise = 'singleChoiceExercise',
  MultipleChoiceExercise = 'multipleChoiceExercise',
  InputExercise = InternalEditorPluginType.InputExercise,
  TextAreaExercise = InternalEditorPluginType.TextAreaExercise,
  BlanksExercise = InternalEditorPluginType.BlanksExercise,
  BlanksExerciseDragAndDrop = InternalEditorPluginType.BlanksExerciseDragAndDrop,
  DropzoneImage = InternalEditorPluginType.DropzoneImage,
  H5p = InternalEditorPluginType.H5p,
  ExerciseGroup = InternalEditorPluginType.ExerciseGroup,
}

const germanPluginStrings = loggedInDataDe.strings.editor.plugins
const englishPluginStrings = loggedInDataEn.strings.editor.plugins

/*
 * All items that can be in the plugin menu.
 * So this includes some plugins that are specific to a certain integration.
 * If a plugin in not loaded in the current editor instance, it will be filtered out.
 */
export const allPluginMenuItems: PluginMenuItem[] = [
  getItem(PluginMenuType.Text, IconText),
  getItem(PluginMenuType.Multimedia, IconMultimedia),
  getItem(PluginMenuType.Video, IconVideo),
  getItem(PluginMenuType.Box, IconBox),
  getItem(PluginMenuType.Equations, IconEquation),
  getItem(PluginMenuType.Geogebra, IconGeogebra),
  getItem(PluginMenuType.Highlight, IconHighlight),
  getItem(PluginMenuType.Image, IconImage),
  getItem(PluginMenuType.ImageGallery, IconImageGallery),
  getItem(PluginMenuType.Injection, IconInjection),
  getItem(PluginMenuType.SerloTable, IconTable),
  getItem(PluginMenuType.Spoiler, IconSpoiler),
  getItem(PluginMenuType.DropzoneImage, IconDropzones),
  getItem(PluginMenuType.SingleChoiceExercise, IconScMcExercise),
  getItem(PluginMenuType.MultipleChoiceExercise, IconScMcExercise),
  getItem(PluginMenuType.InputExercise, IconTextArea),
  getItem(PluginMenuType.TextAreaExercise, IconTextArea),
  getItem(PluginMenuType.BlanksExercise, IconBlanksTyping),
  getItem(PluginMenuType.BlanksExerciseDragAndDrop, IconBlanksDragAndDrop),
  getItem(PluginMenuType.H5p, IconH5p),
  getItem(PluginMenuType.ExerciseGroup, IconFallback, isSerloProduction),

  // serlo specific plugins
  getItem(PluginMenuType.Audio, IconAudio), // only loads on serlo.org staging
  getItem(PluginMenuType.PageLayout, IconFallback),
  getItem(PluginMenuType.PageTeam, IconFallback),
  getItem(PluginMenuType.PagePartners, IconFallback),
]

export const pluginMenuItems = allPluginMenuItems.filter((item) => !item.hidden)

// exports for package

/**
 * An element of the Serlo editor which can be integrated as a block / plugin
 * in another editor (for example editor.js).
 *
 * Note: This is not the same as the list of plugins in the Serlo Editor. For
 * example the elements single choice question and multiple choice question
 * are both represented by the same plugin in the Serlo Editor (they only differ
 * by a configuration). In this list they are represented as two separate elements.
 */
export const PluginMenuItem = pluginMenuItems.map((item) => item.type)

/**
 * Object of PluginMenuItems and the info needed to render a menu.
 */
export const pluginMenu = pluginMenuItems.reduce(
  (previous, current) => ({ ...previous, [current.type]: current }),
  {}
)

interface PluginMenuItem {
  type: PluginMenuType
  de: {
    name: string
    description: string
  }
  en: {
    name: string
    description: string
  }
  icon: string
  initialState: EditorProps['initialState']
  hidden?: boolean
}

function getItem(
  type: PluginMenuType,
  icon: string,
  hidden?: boolean
): PluginMenuItem {
  return {
    ...getInternationalizedStrings(type),
    icon,
    type,
    initialState: getInitialState(type),
    hidden,
  }
}

function getInitialState(type: PluginMenuType): EditorProps['initialState'] {
  switch (type) {
    case PluginMenuType.BlanksExerciseDragAndDrop:
    case PluginMenuType.BlanksExercise:
      return getEditorState({
        plugin: InternalEditorPluginType.BlanksExercise,
        state: {
          text: { plugin: InternalEditorPluginType.Text },
          mode:
            type === PluginMenuType.BlanksExerciseDragAndDrop
              ? 'drag-and-drop'
              : 'typing',
        },
      })

    case PluginMenuType.SingleChoiceExercise:
    case PluginMenuType.MultipleChoiceExercise:
      return getEditorState({
        plugin: InternalEditorPluginType.ScMcExercise,
        state: {
          isSingleChoice: type === PluginMenuType.SingleChoiceExercise,
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

    case PluginMenuType.InputExercise:
    case PluginMenuType.TextAreaExercise:
    case PluginMenuType.DropzoneImage:
    case PluginMenuType.H5p:
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

// TODO: move to i18n file
function getInternationalizedStrings(type: PluginMenuType) {
  switch (type) {
    case PluginMenuType.SingleChoiceExercise:
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
    case PluginMenuType.MultipleChoiceExercise:
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

function getNameAndDescription(
  locale: 'de' | 'en',
  pluginType: keyof typeof englishPluginStrings
) {
  const strings =
    locale === 'de'
      ? mergeDeepRight(englishPluginStrings, germanPluginStrings)
      : englishPluginStrings

  const { title: name, description } = strings[pluginType]

  return { name, description }
}
