import { RowsConfig } from '@edtr-io/plugin-rows'
import {
  createIcon,
  faAnchor,
  faCaretSquareDown,
  faCode,
  faCubes,
  faEquals,
  faFilm,
  faImages,
  faNewspaper,
  faParagraph,
  faPhotoVideo,
  faTable,
} from '@edtr-io/ui'
import { faSquare } from '@fortawesome/free-regular-svg-icons'
import {
  faGripLinesVertical,
  faUsers,
  faWrench,
} from '@fortawesome/free-solid-svg-icons'

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
      icon: createIcon(faParagraph),
    },
    {
      name: 'image',
      title: editorStrings.edtrIo.image,
      description: editorStrings.edtrIo.imageDesc,
      icon: createIcon(faImages),
    },
    {
      name: 'multimedia',
      title: editorStrings.edtrIo.multimediaTitle,
      description: editorStrings.edtrIo.multimediaDesc,
      icon: createIcon(faPhotoVideo),
    },
    {
      name: 'spoiler',
      title: editorStrings.edtrIo.spoiler,
      description: editorStrings.edtrIo.spoilerDesc,
      icon: createIcon(faCaretSquareDown),
    },
    {
      name: 'box',
      title: editorStrings.edtrIo.box,
      description: editorStrings.edtrIo.boxDesc,
      icon: createIcon(faSquare),
    },
    {
      name: 'serloTable',
      title: editorStrings.edtrIo.serloTable,
      description: editorStrings.edtrIo.serloTableDesc,
      icon: createIcon(faTable),
    },
    {
      name: 'injection',
      title: editorStrings.edtrIo.injectionTitle,
      description: editorStrings.edtrIo.injectionDesc,
      icon: createIcon(faNewspaper),
    },
    {
      name: 'equations',
      title: editorStrings.edtrIo.equationsTitle,
      description: editorStrings.edtrIo.equationsDesc,
      icon: createIcon(faEquals),
    },
    {
      name: 'geogebra',
      title: editorStrings.edtrIo.geogebraTitle,
      description: editorStrings.edtrIo.geogebraDesc,
      icon: createIcon(faCubes),
    },
    {
      name: 'highlight', //source code
      title: editorStrings.edtrIo.highlightTitle,
      description: editorStrings.edtrIo.highlightDesc,
      icon: createIcon(faCode),
    },
    {
      name: 'video',
      title: editorStrings.edtrIo.video,
      description: editorStrings.edtrIo.videoDesc,
      icon: createIcon(faFilm),
    },
    {
      name: 'anchor',
      title: editorStrings.edtrIo.anchor,
      description: editorStrings.edtrIo.anchorDesc,
      icon: createIcon(faAnchor),
    },
    ...(shouldUseFeature('edtrPasteHack')
      ? [
          {
            name: 'pasteHack',
            title: 'Paste Hack',
            description: 'hmmm hack',
            icon: createIcon(faWrench),
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
        ]
      : []),
  ]

  const filteredRegistry = include
    ? registry.filter((plugin) => include.includes(plugin.name))
    : registry

  return filteredRegistry
}
