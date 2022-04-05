import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons/faCalendarAlt'
import { faCircle } from '@fortawesome/free-solid-svg-icons/faCircle'
import { faComments } from '@fortawesome/free-solid-svg-icons/faComments'
import { faCubes } from '@fortawesome/free-solid-svg-icons/faCubes'
import { faFile } from '@fortawesome/free-solid-svg-icons/faFile'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons/faFolderOpen'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons/faGraduationCap'
import { faNewspaper } from '@fortawesome/free-solid-svg-icons/faNewspaper'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons/faPlayCircle'
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
import { faUserEdit } from '@fortawesome/free-solid-svg-icons/faUserEdit'

import { TopicCategoryTypes } from '@/data-types'

export const categoryIconMapping: {
  [K in TopicCategoryTypes]: IconDefinition
} = {
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
  topicfolder: faFolderOpen,
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
