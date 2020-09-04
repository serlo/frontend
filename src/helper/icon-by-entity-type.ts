import {
  faNewspaper,
  faGraduationCap,
  faPlayCircle,
  faCubes,
  faFolderOpen,
  faFile,
  IconDefinition,
  faCalendarAlt,
  faUser,
  faComments,
  faUserEdit,
} from '@fortawesome/free-solid-svg-icons'

import { CategoryTypes, EntityTypes } from '@/data-types'

export const categoryIconMapping: { [K in CategoryTypes]: IconDefinition } = {
  articles: faNewspaper,
  courses: faGraduationCap,
  videos: faPlayCircle,
  applets: faCubes,
  folders: faFolderOpen,
  exercises: faFile,
  events: faCalendarAlt,
}

export const entityIconMapping: { [K in EntityTypes]: IconDefinition } = {
  applet: faCubes,
  article: faNewspaper,
  course: faGraduationCap,
  coursePage: faGraduationCap,
  event: faCalendarAlt,
  exercise: faFile,
  exerciseGroup: faFile,
  folder: faFolderOpen,
  groupedExercise: faFile,
  page: faFile,
  solution: faFile,
  taxonomyTerm: faFolderOpen,
  user: faUser,
  video: faPlayCircle,
  revision: faUserEdit,
  comment: faComments,
  thread: faComments,
}
