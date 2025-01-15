import type { EditorProps } from '@editor/core'
import { AudioIcon } from '@editor/editor-ui/assets/plugin-icons/icon-audio'
import IconAudio from '@editor/editor-ui/assets/plugin-icons/icon-audio.svg?raw'
import { BlanksDndIcon } from '@editor/editor-ui/assets/plugin-icons/icon-blanks-dnd'
import IconBlanksDragAndDrop from '@editor/editor-ui/assets/plugin-icons/icon-blanks-dnd.svg?raw'
import { BlanksTypingIcon } from '@editor/editor-ui/assets/plugin-icons/icon-blanks-typing'
import IconBlanksTyping from '@editor/editor-ui/assets/plugin-icons/icon-blanks-typing.svg?raw'
import { BoxIcon } from '@editor/editor-ui/assets/plugin-icons/icon-box'
import IconBox from '@editor/editor-ui/assets/plugin-icons/icon-box.svg?raw'
import { DropzonesIcon } from '@editor/editor-ui/assets/plugin-icons/icon-dropzones'
import IconDropzones from '@editor/editor-ui/assets/plugin-icons/icon-dropzones.svg?raw'
import IconEquation from '@editor/editor-ui/assets/plugin-icons/icon-equation.svg?raw'
import { EquationsIcon } from '@editor/editor-ui/assets/plugin-icons/icon-equations'
import { FallbackIcon } from '@editor/editor-ui/assets/plugin-icons/icon-fallback'
import IconFallback from '@editor/editor-ui/assets/plugin-icons/icon-fallback.svg?raw'
import { GeogebraIcon } from '@editor/editor-ui/assets/plugin-icons/icon-geogebra'
import IconGeogebra from '@editor/editor-ui/assets/plugin-icons/icon-geogebra.svg?raw'
import { H5PIcon } from '@editor/editor-ui/assets/plugin-icons/icon-h5p'
import IconH5p from '@editor/editor-ui/assets/plugin-icons/icon-h5p.svg?raw'
import { HighlightIcon } from '@editor/editor-ui/assets/plugin-icons/icon-highlight'
import IconHighlight from '@editor/editor-ui/assets/plugin-icons/icon-highlight.svg?raw'
import { ImageIcon } from '@editor/editor-ui/assets/plugin-icons/icon-image'
import IconImage from '@editor/editor-ui/assets/plugin-icons/icon-image.svg?raw'
import { InjectionIcon } from '@editor/editor-ui/assets/plugin-icons/icon-injection'
import IconInjection from '@editor/editor-ui/assets/plugin-icons/icon-injection.svg?raw'
import { InputExerciseIcon } from '@editor/editor-ui/assets/plugin-icons/icon-input-exercise'
import IconInputExercise from '@editor/editor-ui/assets/plugin-icons/icon-input-exercise.svg?raw'
import { InteractiveVideoIcon } from '@editor/editor-ui/assets/plugin-icons/icon-interactive-video'
import IconInteractiveVideo from '@editor/editor-ui/assets/plugin-icons/icon-interactive-video.svg?raw'
import { MCExerciseIcon } from '@editor/editor-ui/assets/plugin-icons/icon-mc-exercise'
import IconMcExercise from '@editor/editor-ui/assets/plugin-icons/icon-mc-exercise.svg?raw'
import { MultimediaIcon } from '@editor/editor-ui/assets/plugin-icons/icon-multimedia'
import IconMultimedia from '@editor/editor-ui/assets/plugin-icons/icon-multimedia.svg?raw'
import { SCExerciseIcon } from '@editor/editor-ui/assets/plugin-icons/icon-sc-exercise'
import IconScExercise from '@editor/editor-ui/assets/plugin-icons/icon-sc-exercise.svg?raw'
import { SpoilerIcon } from '@editor/editor-ui/assets/plugin-icons/icon-spoiler'
import IconSpoiler from '@editor/editor-ui/assets/plugin-icons/icon-spoiler.svg?raw'
import { TableIcon } from '@editor/editor-ui/assets/plugin-icons/icon-table'
import IconTable from '@editor/editor-ui/assets/plugin-icons/icon-table.svg?raw'
import { TextIcon } from '@editor/editor-ui/assets/plugin-icons/icon-text'
import { TextAreaIcon } from '@editor/editor-ui/assets/plugin-icons/icon-text-area'
import IconTextArea from '@editor/editor-ui/assets/plugin-icons/icon-text-area.svg?raw'
import IconText from '@editor/editor-ui/assets/plugin-icons/icon-text.svg?raw'
import { VideoIcon } from '@editor/editor-ui/assets/plugin-icons/icon-video'
import IconVideo from '@editor/editor-ui/assets/plugin-icons/icon-video.svg?raw'
import { ImageGalleryIcon } from '@editor/editor-ui/assets/plugin-icons/image-gallery/icon-image-gallery'
import IconImageGallery from '@editor/editor-ui/assets/plugin-icons/image-gallery/icon-image-gallery.svg?raw'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { AnyEditorDocument } from '@editor/types/editor-plugins'
import { EditStrings } from '@editor/types/language-data'
import {
  isBlanksExerciseDocument,
  isExerciseDocument,
  isScMcExerciseDocument,
} from '@editor/types/plugin-type-guards'

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

  InteractiveVideo: EditorPluginType.InteractiveVideo,
  Audio: EditorPluginType.Audio,
  PageLayout: EditorPluginType.PageLayout,

  SingleChoiceExercise: 'singleChoiceExercise',
  MultipleChoiceExercise: 'multipleChoiceExercise',
  InputExercise: EditorPluginType.InputExercise,
  TextAreaExercise: EditorPluginType.TextAreaExercise,
  BlanksExercise: EditorPluginType.BlanksExercise,
  BlanksExerciseDragAndDrop: 'blanksExerciseDragAndDrop',
  DropzoneImage: EditorPluginType.DropzoneImage,
  H5p: EditorPluginType.H5p,
  ExerciseGroup: EditorPluginType.ExerciseGroup,

  EdusharingAsset: EditorPluginType.EdusharingAsset,
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

export function getPluginMenuItems(editStrings: EditStrings): PluginMenuItem[] {
  return visibleTypes.map((type) => getPluginMenuItem(editStrings, type))
}

function getPluginMenuItem(editStrings: EditStrings, type: PluginMenuType) {
  const [initialState, unwrappedPlugin] = getInitialState(type)
  const strings = getTitleAndDescription(type, unwrappedPlugin, editStrings)
  const icon = getIconString(type)
  const IconComponent = getIconComponent(type)

  return { type, icon, IconComponent, initialState, ...strings }
}

export interface PluginMenuItem {
  type: PluginMenuType
  title: string
  description: string
  initialState: EditorProps['initialState']
  IconComponent: React.ComponentType
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
  editStrings: EditStrings
) {
  // use extra plugin menu items strings if available
  if (Object.hasOwn(editStrings.pluginMenu, type)) {
    const { title, description } =
      editStrings.pluginMenu[type as keyof typeof editStrings.pluginMenu]
    return { title, description }
  }

  if (!Object.hasOwn(editStrings.plugins, pluginType)) return mysteryStrings

  const pluginStrings =
    editStrings.plugins[pluginType as keyof EditStrings['plugins']]

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
  [pluginMenuType.InputExercise]: IconInputExercise,
  [pluginMenuType.TextAreaExercise]: IconTextArea,
  [pluginMenuType.BlanksExercise]: IconBlanksTyping,
  [pluginMenuType.BlanksExerciseDragAndDrop]: IconBlanksDragAndDrop,
  [pluginMenuType.H5p]: IconH5p,
  [pluginMenuType.ExerciseGroup]: IconFallback,
  [pluginMenuType.InteractiveVideo]: IconInteractiveVideo,
  [pluginMenuType.Audio]: IconAudio,
  [pluginMenuType.PageLayout]: IconFallback,
  [pluginMenuType.EdusharingAsset]: IconImage,
}

function getIconString(type: PluginMenuType) {
  return iconLookup[type]
}

const iconComponentLookup: Record<PluginMenuType, React.ComponentType> = {
  [pluginMenuType.Text]: TextIcon,
  [pluginMenuType.Multimedia]: MultimediaIcon,
  [pluginMenuType.Video]: VideoIcon,
  [pluginMenuType.Box]: BoxIcon,
  [pluginMenuType.Equations]: EquationsIcon,
  [pluginMenuType.Geogebra]: GeogebraIcon,
  [pluginMenuType.Highlight]: HighlightIcon,
  [pluginMenuType.Image]: ImageIcon,
  [pluginMenuType.ImageGallery]: ImageGalleryIcon,
  [pluginMenuType.Injection]: InjectionIcon,
  [pluginMenuType.SerloTable]: TableIcon,
  [pluginMenuType.Spoiler]: SpoilerIcon,
  [pluginMenuType.DropzoneImage]: DropzonesIcon,
  [pluginMenuType.SingleChoiceExercise]: SCExerciseIcon,
  [pluginMenuType.MultipleChoiceExercise]: MCExerciseIcon,
  [pluginMenuType.InputExercise]: InputExerciseIcon,
  [pluginMenuType.TextAreaExercise]: TextAreaIcon,
  [pluginMenuType.BlanksExercise]: BlanksTypingIcon,
  [pluginMenuType.BlanksExerciseDragAndDrop]: BlanksDndIcon,
  [pluginMenuType.H5p]: H5PIcon,
  [pluginMenuType.ExerciseGroup]: FallbackIcon,
  [pluginMenuType.InteractiveVideo]: InteractiveVideoIcon,
  [pluginMenuType.Audio]: AudioIcon,
  [pluginMenuType.PageLayout]: FallbackIcon,
  [pluginMenuType.EdusharingAsset]: ImageIcon,
}

function getIconComponent(type: PluginMenuType) {
  return iconComponentLookup[type]
}

export function filterPluginMenuItemsBySearchString(
  option: PluginMenuItem[],
  searchString: string
) {
  if (!searchString.length) return option

  const search = searchString.toLowerCase()

  // title (localized) or pluginType includes search string
  return option.filter(
    (entry) =>
      entry.title.toLowerCase().includes(search) ||
      entry.type.toLowerCase().includes(search) ||
      entry.initialState.plugin.toLowerCase().includes(search)
  )
}

export function getInteractiveItemByStaticState(
  exercise: AnyEditorDocument,
  editStrings: EditStrings
) {
  if (!exercise || !isExerciseDocument(exercise)) return null

  const interactive = exercise.state.interactive
  if (!interactive) return null

  if (isScMcExerciseDocument(interactive)) {
    const type = interactive.state.isSingleChoice
      ? 'singleChoiceExercise'
      : 'multipleChoiceExercise'
    return getPluginMenuItem(editStrings, type)
  }
  if (isBlanksExerciseDocument(interactive)) {
    const type =
      interactive.state.mode === 'drag-and-drop'
        ? 'blanksExerciseDragAndDrop'
        : EditorPluginType.BlanksExercise
    return getPluginMenuItem(editStrings, type)
  }
  // extra check for typescript
  if (interactive.plugin === EditorPluginType.ScMcExercise) return

  // default cases:
  return getPluginMenuItem(editStrings, interactive.plugin)
}
