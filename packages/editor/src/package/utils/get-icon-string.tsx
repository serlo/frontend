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

import { PluginMenuType } from '../plugin-menu-data'

const iconLookup: Record<PluginMenuType, string> = {
  [PluginMenuType.Text]: IconText,
  [PluginMenuType.Multimedia]: IconMultimedia,
  [PluginMenuType.Video]: IconVideo,
  [PluginMenuType.Box]: IconBox,
  [PluginMenuType.Equations]: IconEquation,
  [PluginMenuType.Geogebra]: IconGeogebra,
  [PluginMenuType.Highlight]: IconHighlight,
  [PluginMenuType.Image]: IconImage,
  [PluginMenuType.ImageGallery]: IconImageGallery,
  [PluginMenuType.Injection]: IconInjection,
  [PluginMenuType.SerloTable]: IconTable,
  [PluginMenuType.Spoiler]: IconSpoiler,
  [PluginMenuType.DropzoneImage]: IconDropzones,
  [PluginMenuType.SingleChoiceExercise]: IconScMcExercise,
  [PluginMenuType.MultipleChoiceExercise]: IconScMcExercise,
  [PluginMenuType.InputExercise]: IconTextArea,
  [PluginMenuType.TextAreaExercise]: IconTextArea,
  [PluginMenuType.BlanksExercise]: IconBlanksTyping,
  [PluginMenuType.BlanksExerciseDragAndDrop]: IconBlanksDragAndDrop,
  [PluginMenuType.H5p]: IconH5p,
  [PluginMenuType.ExerciseGroup]: IconFallback,
  [PluginMenuType.Audio]: IconAudio,
  [PluginMenuType.PageLayout]: IconFallback,
  [PluginMenuType.PageTeam]: IconFallback,
  [PluginMenuType.PagePartners]: IconFallback,
}

export function getIconString(type: PluginMenuType) {
  return iconLookup[type] ?? IconFallback
}
