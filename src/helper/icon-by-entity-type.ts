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

import { FaIconProps } from '@/components/fa-icon'
import {
  TopicCategoryCustomType,
  TopicCategoryType,
  UuidWithRevType,
} from '@/data-types'
import { TaxonomyTermType } from '@/fetcher/graphql-types/operations'

export const categoryIconMapping: Record<
  TopicCategoryType | TopicCategoryCustomType,
  FaIconProps['icon']
> = {
  articles: faNewspaper,
  courses: faGraduationCap,
  videos: faPlayCircle,
  applets: faCubes,
  folders: faFolderOpen,
  exercises: faFile,
  events: faCalendarAlt,
  unrevised: faCircle,
  subterms: faFolderOpen,
  exercisesContent: faFile,
}

export function getIconByTypename(
  typename: UuidWithRevType | TaxonomyTermType
) {
  const typenameLowerCase = typename
    .replace('Revision', '')
    .toLowerCase() as keyof typeof entityIconMapping
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
  exercisefolder: faFolderOpen,
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
