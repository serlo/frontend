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
import { EditorPluginType } from '@editor/types/editor-plugin-type'

import { loggedInData as loggedInDataDe } from '@/data/de'
import { loggedInData as loggedInDataEn } from '@/data/en'

// Need this tiny interface, because the mergeDeepObject seems to
// screw up the types of our i18n strings
type PluginStrings = Record<
  EditorPluginType,
  {
    title: string
    description: string
  }
>

const germanPluginStrings = loggedInDataDe.strings.editor
  .plugins as unknown as PluginStrings

const englishPluginStrings = loggedInDataEn.strings.editor
  .plugins as unknown as PluginStrings

const getPluginNameAndDescription = (
  locale: 'de' | 'en',
  pluginType: EditorPluginType
) => {
  let name: string
  let description: string
  if (locale === 'de') {
    name = germanPluginStrings[pluginType]?.title
    description = germanPluginStrings[pluginType]?.description
  } else if (locale === 'en') {
    name = englishPluginStrings[pluginType]?.title
    description = englishPluginStrings[pluginType]?.description
  } else {
    throw new Error('Invalid locale')
  }

  if (!name || !description) {
    throw new Error(
      'Missing plugin name or description for plugin type' + pluginType
    )
  }

  return {
    name,
    description,
  }
}

const getInternationalizedPluginStrings = (type: EditorPluginType) => ({
  de: getPluginNameAndDescription('de', type),
  en: getPluginNameAndDescription('en', type),
})

interface PluginState {
  plugin: EditorPluginType
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
  const internationalizedStrings = getInternationalizedPluginStrings(type)

  let initialState: PluginState = {
    // ? All plugins and the migration algorithm seem to be reliant on this
    // structure. How could we remove the rows plugin from the initial state?
    plugin: EditorPluginType.Rows,
    state: [{ plugin: type }],
  }

  switch (type) {
    // Following types need to be wrapped in exercises
    case EditorPluginType.ScMcExercise:
    case EditorPluginType.InputExercise:
    case EditorPluginType.TextAreaExercise:
    case EditorPluginType.BlanksExercise:
    case EditorPluginType.BlanksExerciseDragAndDrop:
      initialState = {
        plugin: EditorPluginType.Rows,
        state: [
          {
            plugin: EditorPluginType.Exercise,
            state: {
              content: {
                plugin: EditorPluginType.Rows,
                state: [{ plugin: EditorPluginType.Text }],
              },
              interactive: { plugin: type },
            },
          },
        ],
      }
      break
    case EditorPluginType.Text:
    case EditorPluginType.Image:
    case EditorPluginType.Video:
    case EditorPluginType.Highlight:
    case EditorPluginType.Spoiler:
    case EditorPluginType.Box:
    case EditorPluginType.SerloTable:
    case EditorPluginType.Equations:
    case EditorPluginType.Geogebra:
    case EditorPluginType.Injection:
    case EditorPluginType.H5p:
    case EditorPluginType.Multimedia:
    case EditorPluginType.DropzoneImage:
    case EditorPluginType.ImageGallery:
      break
    default:
      console.warn(`Unhandled plugin type: ${type}`)
  }

  return {
    ...internationalizedStrings,
    icon,
    type,
    initialState,
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
