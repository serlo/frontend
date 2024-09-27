import type { EditorProps } from '@editor/core'
import IconAudio from '@editor/editor-ui/assets/plugin-icons/icon-audio.svg?raw'
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
import IconMcExercise from '@editor/editor-ui/assets/plugin-icons/icon-mc-exercise.svg?raw'
import IconMultimedia from '@editor/editor-ui/assets/plugin-icons/icon-multimedia.svg?raw'
import IconScExercise from '@editor/editor-ui/assets/plugin-icons/icon-sc-exercise.svg?raw'
import IconSpoiler from '@editor/editor-ui/assets/plugin-icons/icon-spoiler.svg?raw'
import IconTable from '@editor/editor-ui/assets/plugin-icons/icon-table.svg?raw'
import IconText from '@editor/editor-ui/assets/plugin-icons/icon-text.svg?raw'
import IconVideo from '@editor/editor-ui/assets/plugin-icons/icon-video.svg?raw'
import IconImageGallery from '@editor/editor-ui/assets/plugin-icons/image-gallery/icon-image-gallery.svg?raw'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import type { EditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'

const isSerloProduction = process.env.NEXT_PUBLIC_ENV === 'production'

/*
 * All plugin menu items that can be in the plugin menu.
 * So this includes some plugins that are specific to a certain integration.
 * If a plugin in not loaded in the current editor instance, it will be filtered out.
 */
export const pluginMenuType = {
  Text: EditorPluginType.Text,
  Image: EditorPluginType.Image,
  ImageGallery: EditorPluginType.ImageGallery,
  Video: EditorPluginType.Video,
  Highlight: EditorPluginType.Highlight,
  Spoiler: EditorPluginType.Spoiler,
  Box: EditorPluginType.Box,
  SerloTable: EditorPluginType.SerloTable,
  Equations: EditorPluginType.Equations,
  Geogebra: EditorPluginType.Geogebra,
  Injection: EditorPluginType.Injection,
  Multimedia: EditorPluginType.Multimedia,

  Audio: EditorPluginType.Audio,
  PageLayout: EditorPluginType.PageLayout,
  PageTeam: EditorPluginType.PageTeam,
  PagePartners: EditorPluginType.PagePartners,

  SingleChoiceExercise: 'singleChoiceExercise',
  MultipleChoiceExercise: 'multipleChoiceExercise',
  InputExercise: EditorPluginType.InputExercise,
  TextAreaExercise: EditorPluginType.TextAreaExercise,
  BlanksExercise: EditorPluginType.BlanksExercise,
  BlanksExerciseDragAndDrop: 'blanksExerciseDragAndDrop',
  DropzoneImage: EditorPluginType.DropzoneImage,
  H5p: EditorPluginType.H5p,
  ExerciseGroup: EditorPluginType.ExerciseGroup,
} as const

export type PluginMenuType =
  (typeof pluginMenuType)[keyof typeof pluginMenuType]

// filter out special cases, e.g. plugins that are in development
const visibleTypes = Object.values(pluginMenuType).filter((type) => {
  // for serlo.org exercise group plugin is loaded but only shows in staging/dev menus
  if (type === pluginMenuType.ExerciseGroup) {
    return isSerloProduction ? false : true
  }
  return true
})

export function getPluginMenuItems(
  editorStrings: EditorStrings
): PluginMenuItem[] {
  return visibleTypes.map((type) => {
    const [initialState, unwrappedPlugin] = getInitialState(type)
    const strings = getTitleAndDescription(type, unwrappedPlugin, editorStrings)
    const icon = getIconString(type)

    return { type, icon, initialState, ...strings }
  })
}

export interface PluginMenuItem {
  type: PluginMenuType
  title: string
  description: string
  initialState: EditorProps['initialState']
  // until we use the editor package in the frontend (only having vite for building)
  // icons should be strings but are loaded as () => JSX.Element in the frontend (webpack)
  icon: string | (() => JSX.Element)
}

const mysteryStrings = {
  title: 'Mystery Plugin 😶‍🌫️',
  description:
    'This is probably a new plugin, make sure you provide a title and description',
}

function getTitleAndDescription(
  type: PluginMenuType,
  pluginType: EditorPluginType,
  editorStrings: EditorStrings
) {
  // use extra plugin menu items strings if available
  if (Object.hasOwn(editorStrings.pluginMenu, type)) {
    const { title, description } =
      editorStrings.pluginMenu[type as keyof typeof editorStrings.pluginMenu]
    return { title, description }
  }

  if (!Object.hasOwn(editorStrings.plugins, pluginType)) return mysteryStrings

  const pluginStrings =
    editorStrings.plugins[pluginType as keyof EditorStrings['plugins']]

  // use plugin strings (normal case)

  const title = pluginStrings.title
  if (!title) return mysteryStrings

  const description = Object.hasOwn(pluginStrings, 'description')
    ? pluginStrings.description
    : ''

  return { title, description }
}

function getInitialState(
  type: PluginMenuType
): [EditorProps['initialState'], EditorPluginType] {
  switch (type) {
    case pluginMenuType.BlanksExerciseDragAndDrop:
    case pluginMenuType.BlanksExercise:
      return [
        wrapInExercise({
          plugin: EditorPluginType.BlanksExercise,
          state: {
            text: { plugin: EditorPluginType.Text },
            mode:
              type === pluginMenuType.BlanksExerciseDragAndDrop
                ? 'drag-and-drop'
                : 'typing',
          },
        }),
        EditorPluginType.BlanksExercise,
      ]

    case pluginMenuType.SingleChoiceExercise:
    case pluginMenuType.MultipleChoiceExercise:
      return [
        wrapInExercise({
          plugin: EditorPluginType.ScMcExercise,
          state: {
            isSingleChoice: type === pluginMenuType.SingleChoiceExercise,
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
        }),
        EditorPluginType.ScMcExercise,
      ]

    case pluginMenuType.InputExercise:
    case pluginMenuType.TextAreaExercise:
    case pluginMenuType.DropzoneImage:
    case pluginMenuType.H5p:
      return [wrapInExercise({ plugin: type }), type]

    default:
      return [{ plugin: type }, type]
  }
}

function wrapInExercise(interactive: unknown) {
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

const iconLookup: Record<PluginMenuType, string> = {
  [pluginMenuType.Text]: IconText,
  [pluginMenuType.Multimedia]: IconMultimedia,
  [pluginMenuType.Video]: IconVideo,
  [pluginMenuType.Box]: IconBox,
  [pluginMenuType.Equations]: IconEquation,
  [pluginMenuType.Geogebra]: IconGeogebra,
  [pluginMenuType.Highlight]: IconHighlight,
  [pluginMenuType.Image]: IconImage,
  [pluginMenuType.ImageGallery]: IconImageGallery,
  [pluginMenuType.Injection]: IconInjection,
  [pluginMenuType.SerloTable]: IconTable,
  [pluginMenuType.Spoiler]: IconSpoiler,
  [pluginMenuType.DropzoneImage]: IconDropzones,
  [pluginMenuType.SingleChoiceExercise]: IconScExercise,
  [pluginMenuType.MultipleChoiceExercise]: IconMcExercise,
  [pluginMenuType.InputExercise]: IconTextArea,
  [pluginMenuType.TextAreaExercise]: IconTextArea,
  [pluginMenuType.BlanksExercise]: IconBlanksTyping,
  [pluginMenuType.BlanksExerciseDragAndDrop]: IconBlanksDragAndDrop,
  [pluginMenuType.H5p]: IconH5p,
  [pluginMenuType.ExerciseGroup]: IconFallback,
  [pluginMenuType.Audio]: IconAudio,
  [pluginMenuType.PageLayout]: IconFallback,
  [pluginMenuType.PageTeam]: IconFallback,
  [pluginMenuType.PagePartners]: IconFallback,
}

function getIconString(type: PluginMenuType) {
  return iconLookup[type]
}
