import {
  faCalendarAlt,
  faCircle,
  faComments,
  faCubes,
  faFile,
  faFolderOpen,
  faGraduationCap,
  faNewspaper,
  faPlayCircle,
  faUser,
  faUserEdit,
  faPlay,
} from '@fortawesome/free-solid-svg-icons'

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
  audio: faPlay,
  article: faNewspaper,
  course: faGraduationCap,
  coursepage: faGraduationCap,
  event: faCalendarAlt,
  exercise: faFile,
  exercisegroup: faFile,
  folder: faFolderOpen,
  exercisefolder: faFolderOpen,
  page: faFile,
  taxonomyterm: faFolderOpen,
  user: faUser,
  video: faPlayCircle,
  revision: faUserEdit,
  comment: faComments,
  thread: faComments,
}
