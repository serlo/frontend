import type { EditorProps } from '@editor/core'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { mergeDeepRight } from 'ramda'

import { loggedInData as loggedInDataDe } from '@/data/de'
import { loggedInData as loggedInDataEn } from '@/data/en'

const englishPluginStrings = loggedInDataEn.strings.editor.plugins

const isSerloProduction = process.env.NEXT_PUBLIC_ENV === 'production'

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
  initialState: EditorProps['initialState']
}

export enum PluginMenuType {
  Text = EditorPluginType.Text,
  Image = EditorPluginType.Image,
  ImageGallery = EditorPluginType.ImageGallery,
  Video = EditorPluginType.Video,
  Highlight = EditorPluginType.Highlight,
  Spoiler = EditorPluginType.Spoiler,
  Box = EditorPluginType.Box,
  SerloTable = EditorPluginType.SerloTable,
  Equations = EditorPluginType.Equations,
  Geogebra = EditorPluginType.Geogebra,
  Injection = EditorPluginType.Injection,
  Multimedia = EditorPluginType.Multimedia,

  // serlo specific plugins
  Audio = EditorPluginType.Audio, // only loads on serlo.org staging
  PageLayout = EditorPluginType.PageLayout,
  PageTeam = EditorPluginType.PageTeam,
  PagePartners = EditorPluginType.PagePartners,

  // exercises
  SingleChoiceExercise = 'singleChoiceExercise',
  MultipleChoiceExercise = 'multipleChoiceExercise',
  InputExercise = EditorPluginType.InputExercise,
  TextAreaExercise = EditorPluginType.TextAreaExercise,
  BlanksExercise = EditorPluginType.BlanksExercise,
  BlanksExerciseDragAndDrop = EditorPluginType.BlanksExerciseDragAndDrop,
  DropzoneImage = EditorPluginType.DropzoneImage,
  H5p = EditorPluginType.H5p,
  ExerciseGroup = EditorPluginType.ExerciseGroup,
}

const allPluginMenuTypes = Object.values(PluginMenuType).filter(
  (_, index) => index % 2 === 0
)
/*
 * All items that can be in the plugin menu.
 * So this includes some plugins that are specific to a certain integration.
 * If a plugin in not loaded in the current editor instance, it will be filtered out.
 */
const allPluginMenuItems: PluginMenuItem[] = allPluginMenuTypes.map((type) => ({
  ...getInternationalizedStrings(type),
  type,
  initialState: getInitialState(type),
}))

// filter out special cases, e.g. plugins that are in development
export const pluginMenuItems = allPluginMenuItems.filter(({ type }) => {
  if (type === PluginMenuType.Audio) {
    return isSerloProduction
  }
  return true
})

function getInitialState(type: PluginMenuType): EditorProps['initialState'] {
  switch (type) {
    case PluginMenuType.BlanksExerciseDragAndDrop:
    case PluginMenuType.BlanksExercise:
      return getEditorState({
        plugin: EditorPluginType.BlanksExercise,
        state: {
          text: { plugin: EditorPluginType.Text },
          mode:
            type === PluginMenuType.BlanksExerciseDragAndDrop
              ? 'drag-and-drop'
              : 'typing',
        },
      })

    case PluginMenuType.SingleChoiceExercise:
    case PluginMenuType.MultipleChoiceExercise:
      return getEditorState({
        plugin: EditorPluginType.ScMcExercise,
        state: {
          isSingleChoice: type === PluginMenuType.SingleChoiceExercise,
          answers: [
            {
              content: { plugin: EditorPluginType.Text },
              isCorrect: true,
              feedback: { plugin: EditorPluginType.Text },
            },
            {
              content: { plugin: EditorPluginType.Text },
              isCorrect: false,
              feedback: { plugin: EditorPluginType.Text },
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
    plugin: EditorPluginType.Exercise,
    state: {
      content: {
        plugin: EditorPluginType.Rows,
        state: [{ plugin: EditorPluginType.Text }],
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
      ? mergeDeepRight(
          englishPluginStrings,
          loggedInDataDe.strings.editor.plugins
        )
      : englishPluginStrings

  if (!strings[pluginType]) return { name: '', description: '' }
  const { title: name, description } = strings[pluginType]

  return { name, description }
}
