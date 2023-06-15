import {
  faGrip,
  faGripLinesVertical,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'

import IconBox from '@/assets-webkit/img/editor/icon-box.svg'
import IconEquation from '@/assets-webkit/img/editor/icon-equation.svg'
import IconFallback from '@/assets-webkit/img/editor/icon-fallback.svg'
import IconGeogebra from '@/assets-webkit/img/editor/icon-geogebra.svg'
import IconHighlight from '@/assets-webkit/img/editor/icon-highlight.svg'
import IconImage from '@/assets-webkit/img/editor/icon-image.svg'
import IconInjection from '@/assets-webkit/img/editor/icon-injection.svg'
import IconMultimedia from '@/assets-webkit/img/editor/icon-multimedia.svg'
import IconSpoiler from '@/assets-webkit/img/editor/icon-spoiler.svg'
import IconTable from '@/assets-webkit/img/editor/icon-table.svg'
import IconText from '@/assets-webkit/img/editor/icon-text.svg'
import IconVideo from '@/assets-webkit/img/editor/icon-video.svg'
import { FaIcon } from '@/components/fa-icon'
import { shouldUseFeature } from '@/components/user/profile-experimental'
import { LoggedInData, UuidType } from '@/data-types'
import { RegistryPlugin } from '@/serlo-editor/plugins/rows'

export function getPluginRegistry(
  type: string,
  editorStrings: LoggedInData['strings']['editor']
): RegistryPlugin[] {
  const isExercise = [
    'grouped-text-exercise',
    'text-exercise',
    'text-exercise-group',
  ].includes(type)
  const isPage = type === UuidType.Page

  return [
    {
      name: 'text',
      title: editorStrings.edtrIo.text,
      description: editorStrings.edtrIo.textDesc,
      icon: <IconText />,
    },
    {
      name: 'image',
      title: editorStrings.edtrIo.image,
      description: editorStrings.edtrIo.imageDesc,
      icon: <IconImage />,
    },
    {
      name: 'multimedia',
      title: editorStrings.edtrIo.multimediaTitle,
      description: editorStrings.edtrIo.multimediaDesc,
      icon: <IconMultimedia />,
    },
    {
      name: 'spoiler',
      title: editorStrings.edtrIo.spoiler,
      description: editorStrings.edtrIo.spoilerDesc,
      icon: <IconSpoiler />,
    },
    {
      name: 'box',
      title: editorStrings.edtrIo.box,
      description: editorStrings.edtrIo.boxDesc,
      icon: <IconBox />,
    },
    {
      name: 'serloTable',
      title: editorStrings.edtrIo.serloTable,
      description: editorStrings.edtrIo.serloTableDesc,
      icon: <IconTable />,
    },
    {
      name: 'injection',
      title: editorStrings.edtrIo.injectionTitle,
      description: editorStrings.edtrIo.injectionDesc,
      icon: <IconInjection />,
    },
    {
      name: 'equations',
      title: editorStrings.edtrIo.equationsTitle,
      description: editorStrings.edtrIo.equationsDesc,
      icon: <IconEquation />,
    },
    {
      name: 'geogebra',
      title: editorStrings.edtrIo.geogebraTitle,
      description: editorStrings.edtrIo.geogebraDesc,
      icon: <IconGeogebra />,
    },
    {
      name: 'highlight', //source code
      title: editorStrings.edtrIo.highlightTitle,
      description: editorStrings.edtrIo.highlightDesc,
      icon: <IconHighlight />,
    },
    {
      name: 'video',
      title: editorStrings.edtrIo.video,
      description: editorStrings.edtrIo.videoDesc,
      icon: <IconVideo />,
    },
    {
      name: 'anchor',
      title: editorStrings.edtrIo.anchor,
      description: editorStrings.edtrIo.anchorDesc,
      icon: <IconFallback />,
    },
    ...(shouldUseFeature('edtrPasteHack')
      ? [
          {
            name: 'pasteHack',
            title: 'Paste Hack',
            description: 'hmmm hack',
            icon: <IconFallback />,
          },
        ]
      : []),
    ...(isExercise
      ? [
          {
            name: 'separator',
            title: editorStrings.edtrIo.solutionSeparator,
            description: editorStrings.edtrIo.solutionSeparatorDesc,
          },
        ]
      : []),
    ...(isPage
      ? [
          {
            name: 'pageLayout',
            title: 'Layout Column for Pages',
            description: "The plugin the people want but don't get 🤫",
            icon: (
              <FaIcon
                icon={faGripLinesVertical}
                className="mx-auto block py-1 text-5xl text-editor-primary-200"
              />
            ),
          },
          {
            name: 'pageTeam',
            title: 'Team Overview',
            description: 'Only for the teampages',
            icon: (
              <FaIcon
                icon={faUsers}
                className="mx-auto block py-1 text-5xl text-editor-primary-200"
              />
            ),
          },
          {
            name: 'pagePartners',
            title: 'Partner List',
            description:
              'Only for partner page (List of partner logos like on de.serlo.org/)',
            icon: (
              <FaIcon
                icon={faGrip}
                className="mx-auto block py-1 text-5xl text-editor-primary-200"
              />
            ),
          },
        ]
      : []),
  ]
}
