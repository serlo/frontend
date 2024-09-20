import IconAudio from '@editor/editor-ui/assets/plugin-icons/icon-audio.svg'
import IconScMcExercise from '@editor/editor-ui/assets/plugin-icons/icon-auswahlaufgaben.svg'
import IconBlanksDragAndDrop from '@editor/editor-ui/assets/plugin-icons/icon-blanks-dnd.svg'
import IconBlanksTyping from '@editor/editor-ui/assets/plugin-icons/icon-blanks-typing.svg'
import IconBox from '@editor/editor-ui/assets/plugin-icons/icon-box.svg'
import IconDropzones from '@editor/editor-ui/assets/plugin-icons/icon-dropzones.svg'
import IconEquation from '@editor/editor-ui/assets/plugin-icons/icon-equation.svg'
import IconFallback from '@editor/editor-ui/assets/plugin-icons/icon-fallback.svg'
import IconGeogebra from '@editor/editor-ui/assets/plugin-icons/icon-geogebra.svg'
import IconH5p from '@editor/editor-ui/assets/plugin-icons/icon-h5p.svg'
import IconHighlight from '@editor/editor-ui/assets/plugin-icons/icon-highlight.svg'
import IconImage from '@editor/editor-ui/assets/plugin-icons/icon-image.svg'
import IconInjection from '@editor/editor-ui/assets/plugin-icons/icon-injection.svg'
import IconTextArea from '@editor/editor-ui/assets/plugin-icons/icon-input-exercise.svg'
import IconMultimedia from '@editor/editor-ui/assets/plugin-icons/icon-multimedia.svg'
import IconSpoiler from '@editor/editor-ui/assets/plugin-icons/icon-spoiler.svg'
import IconTable from '@editor/editor-ui/assets/plugin-icons/icon-table.svg'
import IconText from '@editor/editor-ui/assets/plugin-icons/icon-text.svg'
import IconVideo from '@editor/editor-ui/assets/plugin-icons/icon-video.svg'
import IconImageGallery from '@editor/editor-ui/assets/plugin-icons/image-gallery/icon-image-gallery.svg'

import { PluginMenuType } from '../../core/plugin-menu-data'

const iconLookup: Record<PluginMenuType, JSX.Element> = {
  [PluginMenuType.Text]: <IconText />,
  [PluginMenuType.Multimedia]: <IconMultimedia />,
  [PluginMenuType.Video]: <IconVideo />,
  [PluginMenuType.Box]: <IconBox />,
  [PluginMenuType.Equations]: <IconEquation />,
  [PluginMenuType.Geogebra]: <IconGeogebra />,
  [PluginMenuType.Highlight]: <IconHighlight />,
  [PluginMenuType.Image]: <IconImage />,
  [PluginMenuType.ImageGallery]: <IconImageGallery />,
  [PluginMenuType.Injection]: <IconInjection />,
  [PluginMenuType.SerloTable]: <IconTable />,
  [PluginMenuType.Spoiler]: <IconSpoiler />,
  [PluginMenuType.DropzoneImage]: <IconDropzones />,
  [PluginMenuType.SingleChoiceExercise]: <IconScMcExercise />,
  [PluginMenuType.MultipleChoiceExercise]: <IconScMcExercise />,
  [PluginMenuType.InputExercise]: <IconTextArea />,
  [PluginMenuType.TextAreaExercise]: <IconTextArea />,
  [PluginMenuType.BlanksExercise]: <IconBlanksTyping />,
  [PluginMenuType.BlanksExerciseDragAndDrop]: <IconBlanksDragAndDrop />,
  [PluginMenuType.H5p]: <IconH5p />,
  [PluginMenuType.ExerciseGroup]: <IconFallback />,
  [PluginMenuType.Audio]: <IconAudio />,
  [PluginMenuType.PageLayout]: <IconFallback />,
  [PluginMenuType.PageTeam]: <IconFallback />,
  [PluginMenuType.PagePartners]: <IconFallback />,
}

export function getIconElement(type: PluginMenuType) {
  return iconLookup[type] ?? <IconFallback />
}
