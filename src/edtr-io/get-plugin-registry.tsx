import { RowsConfig } from '@edtr-io/plugin-rows'
import { createIcon } from '@edtr-io/ui'
import {
  faGrip,
  faGripLinesVertical,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'

import {
  IconBox,
  IconEquation,
  IconFallback,
  IconGeogebra,
  IconHighlight,
  IconImage,
  IconInjection,
  IconMultimedia,
  IconSpoiler,
  IconTable,
  IconText,
  IconVideo,
} from './components/icons'
import { shouldUseFeature } from '@/components/user/profile-experimental'
import { LoggedInData, UuidType } from '@/data-types'

export function getPluginRegistry(
  type: string,
  editorStrings: LoggedInData['strings']['editor'],
  include?: string[]
): RowsConfig['plugins'] {
  const isExercise = [
    'grouped-text-exercise',
    'text-exercise',
    'text-exercise-group',
  ].includes(type)
  const isPage = type === UuidType.Page

  const registry = [
    {
      name: 'text',
      title: editorStrings.edtrIo.text,
      description: editorStrings.edtrIo.textDesc,
      icon: IconText,
    },
    {
      name: 'image',
      title: editorStrings.edtrIo.image,
      description: editorStrings.edtrIo.imageDesc,
      icon: IconImage,
    },
    {
      name: 'multimedia',
      title: editorStrings.edtrIo.multimediaTitle,
      description: editorStrings.edtrIo.multimediaDesc,
      icon: IconMultimedia,
    },
    {
      name: 'spoiler',
      title: editorStrings.edtrIo.spoiler,
      description: editorStrings.edtrIo.spoilerDesc,
      icon: IconSpoiler,
    },
    {
      name: 'box',
      title: editorStrings.edtrIo.box,
      description: editorStrings.edtrIo.boxDesc,
      icon: IconBox,
    },
    {
      name: 'serloTable',
      title: editorStrings.edtrIo.serloTable,
      description: editorStrings.edtrIo.serloTableDesc,
      icon: IconTable,
    },
    {
      name: 'injection',
      title: editorStrings.edtrIo.injectionTitle,
      description: editorStrings.edtrIo.injectionDesc,
      icon: IconInjection,
    },
    {
      name: 'equations',
      title: editorStrings.edtrIo.equationsTitle,
      description: editorStrings.edtrIo.equationsDesc,
      icon: IconEquation,
    },
    {
      name: 'geogebra',
      title: editorStrings.edtrIo.geogebraTitle,
      description: editorStrings.edtrIo.geogebraDesc,
      icon: IconGeogebra,
    },
    {
      name: 'highlight', //source code
      title: editorStrings.edtrIo.highlightTitle,
      description: editorStrings.edtrIo.highlightDesc,
      icon: IconHighlight,
    },
    {
      name: 'video',
      title: editorStrings.edtrIo.video,
      description: editorStrings.edtrIo.videoDesc,
      icon: IconVideo,
    },
    {
      name: 'anchor',
      title: editorStrings.edtrIo.anchor,
      description: editorStrings.edtrIo.anchorDesc,
      icon: IconFallback,
    },
    ...(shouldUseFeature('edtrPasteHack')
      ? [
          {
            name: 'pasteHack',
            title: 'Paste Hack',
            description: 'hmmm hack',
            icon: IconFallback,
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
            icon: createIcon(faGripLinesVertical),
          },
          {
            name: 'pageTeam',
            title: 'Team Overview',
            description: 'Only for the teampages',
            icon: createIcon(faUsers),
          },
          {
            name: 'pagePartners',
            title: 'Partner List',
            description:
              'Only for partner page (List of partner logos like on de.serlo.org/)',
            icon: createIcon(faGrip),
          },
        ]
      : []),
  ]

  const filteredRegistry = include
    ? registry.filter((plugin) => include.includes(plugin.name))
    : registry

  return filteredRegistry
}
