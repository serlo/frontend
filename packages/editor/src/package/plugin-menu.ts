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

/**
 * An element of the Serlo editor which can be integrated as a block / plugin
 * in another editor (for example editor.js).
 *
 * Note: This is not the same as the list of plugins in the Serlo Editor. For
 * example the elements single choice question and multiple choice question
 * are both represented by the same plugin in the Serlo Editor (they only differ
 * by a configuration). In this list they are represented as two separate elements.
 */
export enum PluginMenuItem {
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
 * A list of all items that can be in the plugin menu.
 * If a plugin in not loaded in this editor instance, it will be filtered out.
 */
export const pluginMenu: PluginMenu = {
  [PluginMenuItem.Text]: getInfo(PluginMenuItem.Text, IconText),
  [PluginMenuItem.Multimedia]: getInfo(
    PluginMenuItem.Multimedia,
    IconMultimedia
  ),
  [PluginMenuItem.Video]: getInfo(PluginMenuItem.Video, IconVideo),
  [PluginMenuItem.Box]: getInfo(PluginMenuItem.Box, IconBox),
  [PluginMenuItem.Equations]: getInfo(PluginMenuItem.Equations, IconEquation),
  [PluginMenuItem.Geogebra]: getInfo(PluginMenuItem.Geogebra, IconGeogebra),
  [PluginMenuItem.Highlight]: getInfo(PluginMenuItem.Highlight, IconHighlight),
  [PluginMenuItem.Image]: getInfo(PluginMenuItem.Image, IconImage),
  [PluginMenuItem.ImageGallery]: getInfo(
    PluginMenuItem.ImageGallery,
    IconImageGallery
  ),
  [PluginMenuItem.Injection]: getInfo(PluginMenuItem.Injection, IconInjection),
  [PluginMenuItem.SerloTable]: getInfo(PluginMenuItem.SerloTable, IconTable),
  [PluginMenuItem.Spoiler]: getInfo(PluginMenuItem.Spoiler, IconSpoiler),
  [PluginMenuItem.DropzoneImage]: getInfo(
    PluginMenuItem.DropzoneImage,
    IconDropzones
  ),
  [PluginMenuItem.SingleChoiceExercise]: getInfo(
    PluginMenuItem.SingleChoiceExercise,
    IconScMcExercise
  ),
  [PluginMenuItem.MultipleChoiceExercise]: getInfo(
    PluginMenuItem.MultipleChoiceExercise,
    IconScMcExercise
  ),
  [PluginMenuItem.InputExercise]: getInfo(
    PluginMenuItem.InputExercise,
    IconTextArea
  ),
  [PluginMenuItem.TextAreaExercise]: getInfo(
    PluginMenuItem.TextAreaExercise,
    IconTextArea
  ),
  [PluginMenuItem.BlanksExercise]: getInfo(
    PluginMenuItem.BlanksExercise,
    IconBlanksTyping
  ),
  [PluginMenuItem.BlanksExerciseDragAndDrop]: getInfo(
    PluginMenuItem.BlanksExerciseDragAndDrop,
    IconBlanksDragAndDrop
  ),
  [PluginMenuItem.H5p]: getInfo(PluginMenuItem.H5p, IconH5p),
  [PluginMenuItem.ExerciseGroup]: getInfo(
    PluginMenuItem.ExerciseGroup,
    IconFallback
  ),

  // serlo specific plugins
  [PluginMenuItem.Audio]: getInfo(PluginMenuItem.Audio, IconAudio),
  [PluginMenuItem.PageLayout]: getInfo(PluginMenuItem.PageLayout, IconFallback),
  [PluginMenuItem.PageTeam]: getInfo(PluginMenuItem.PageTeam, IconFallback),
  [PluginMenuItem.PagePartners]: getInfo(
    PluginMenuItem.PagePartners,
    IconFallback
  ),
}

type PluginMenu = {
  [E in PluginMenuItem]: PluginMenuItemInfo<E>
}

interface PluginMenuItemInfo<E extends PluginMenuItem> {
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
  initialState: EditorProps['initialState']
}

function getInfo<E extends PluginMenuItem>(
  type: E,
  icon: string
): PluginMenuItemInfo<E> {
  return {
    ...getInternationalizedStrings(type),
    icon,
    type,
    initialState: getInitialState(type),
  }
}

function getInitialState(type: PluginMenuItem): EditorProps['initialState'] {
  switch (type) {
    case PluginMenuItem.BlanksExerciseDragAndDrop:
    case PluginMenuItem.BlanksExercise:
      return getEditorState({
        plugin: InternalEditorPluginType.BlanksExercise,
        state: {
          text: { plugin: InternalEditorPluginType.Text },
          mode:
            type === PluginMenuItem.BlanksExerciseDragAndDrop
              ? 'drag-and-drop'
              : 'typing',
        },
      })

    case PluginMenuItem.SingleChoiceExercise:
    case PluginMenuItem.MultipleChoiceExercise:
      return getEditorState({
        plugin: InternalEditorPluginType.ScMcExercise,
        state: {
          isSingleChoice: type === PluginMenuItem.SingleChoiceExercise,
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

    case PluginMenuItem.InputExercise:
    case PluginMenuItem.TextAreaExercise:
    case PluginMenuItem.DropzoneImage:
    case PluginMenuItem.H5p:
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
function getInternationalizedStrings(type: PluginMenuItem) {
  switch (type) {
    case PluginMenuItem.SingleChoiceExercise:
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
    case PluginMenuItem.MultipleChoiceExercise:
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
