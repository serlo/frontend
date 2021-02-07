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
  faCircle,
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

export function getIconByTypename(typename: string) {
  const typenameCamelCase = (typename.charAt(0).toLowerCase() +
    typename.slice(1)) as EntityTypes
  return entityIconMapping[typenameCamelCase] ?? faCircle
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
