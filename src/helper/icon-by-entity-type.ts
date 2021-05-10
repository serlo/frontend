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

import { CategoryTypes } from '@/data-types'

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
  const typenameLowerCase =
    typename.toLowerCase() as keyof typeof entityIconMapping
  return entityIconMapping[typenameLowerCase] ?? faCircle
}

export const entityIconMapping = {
  applet: faCubes,
  article: faNewspaper,
  course: faGraduationCap,
  coursepage: faGraduationCap,
  event: faCalendarAlt,
  exercise: faFile,
  exercisegroup: faFile,
  folder: faFolderOpen,
  groupedexercise: faFile,
  page: faFile,
  solution: faFile,
  taxonomyterm: faFolderOpen,
  user: faUser,
  video: faPlayCircle,
  revision: faUserEdit,
  comment: faComments,
  thread: faComments,
}
