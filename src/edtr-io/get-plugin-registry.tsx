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
  faQuoteRight,
  faTable,
} from '@edtr-io/ui'
import { faSquare } from '@fortawesome/free-regular-svg-icons'

import { features } from '@/components/user/profile-experimental'
import { LoggedInData } from '@/data-types'
import { isProduction } from '@/helper/is-production'

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

  const registry = [
    {
      name: 'text',
      title: editorStrings.edtrIo.text,
      description: editorStrings.edtrIo.textDesc,
      icon: createIcon(faParagraph),
    },
    {
      name: 'blockquote',
      title: editorStrings.edtrIo.blockquoteTitle,
      description: editorStrings.edtrIo.quoteDescription,
      icon: createIcon(faQuoteRight),
    },
    {
      name: 'box',
      title: editorStrings.edtrIo.box,
      description: editorStrings.edtrIo.boxDesc,
      icon: createIcon(faSquare),
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
      name: 'anchor',
      title: editorStrings.edtrIo.anchor,
      description: editorStrings.edtrIo.anchorDesc,
      icon: createIcon(faAnchor),
    },
    {
      name: 'equations',
      title: editorStrings.edtrIo.equationsTitle,
      description: editorStrings.edtrIo.equationsDesc,
      icon: createIcon(faEquals),
    },
    {
      name: 'image',
      title: editorStrings.edtrIo.image,
      description: editorStrings.edtrIo.imageDesc,
      icon: createIcon(faImages),
    },
    {
      name: 'important', // old "Merksatz"
      title: editorStrings.edtrIo.importantTitle,
      description: editorStrings.edtrIo.importantDesc,
    },
    {
      name: 'injection',
      title: editorStrings.edtrIo.injectionTitle,
      description: editorStrings.edtrIo.injectionDesc,
      icon: createIcon(faNewspaper),
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
      name: 'table',
      title: editorStrings.edtrIo.table,
      description: editorStrings.edtrIo.tableDesc,
      icon: createIcon(faTable),
    },
    {
      name: 'serloTable',
      title: editorStrings.edtrIo.serloTable,
      description: editorStrings.edtrIo.serloTableDesc,
      icon: createIcon(faTable),
    },
    {
      name: 'video',
      title: editorStrings.edtrIo.video,
      description: editorStrings.edtrIo.videoDesc,
      icon: createIcon(faFilm),
    },
    ...(isExercise
      ? [
          {
            name: 'separator',
            title: editorStrings.edtrIo.solutionSeparator,
            description: editorStrings.edtrIo.solutionSeparatorDesc,
          },
        ]
      : []),
  ]

  const filteredRegistry = include
    ? registry.filter((plugin) => include.includes(plugin.name))
    : registry

  // Testing new box plugin
  const showBox =
    typeof window !== 'undefined' &&
    !isProduction &&
    features.boxPlugin &&
    document.cookie.includes(features.boxPlugin.cookieName + '=1')

  const boxFiltered = showBox
    ? filteredRegistry.filter(
        (plugin) => !['blockquote', 'important'].includes(plugin.name)
      )
    : filteredRegistry.filter((plugin) => plugin.name != 'box')

  // Testing new table plugin
  const tableFiltered = isProduction
    ? boxFiltered.filter((plugin) => plugin.name != 'serloTable')
    : boxFiltered.filter((plugin) => plugin.name !== 'table')

  return tableFiltered
}
