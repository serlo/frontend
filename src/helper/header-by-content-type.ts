import {
  faNewspaper,
  faGraduationCap,
  faPlayCircle,
  faCubes,
  faFolderOpen,
  faFile,
  IconDefinition,
  faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons'

import { CategoryType } from '@/data-types'

export const categoryIconMapping: { [K in CategoryType]: IconDefinition } = {
  article: faNewspaper,
  course: faGraduationCap,
  video: faPlayCircle,
  applet: faCubes,
  folder: faFolderOpen,
  exercises: faFile,
  event: faCalendarAlt,
}
