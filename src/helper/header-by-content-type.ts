import {
  faCircle,
  faNewspaper,
  faGraduationCap,
  faPlayCircle,
  faCubes,
  faFolderOpen,
  faFile,
} from '@fortawesome/free-solid-svg-icons'

import { EntityProps } from '@/components/content/entity'
import { LinkInterfaceKeys } from '@/components/content/topic-link-list'

export const getIconAndTitleByContentType = (
  contentType: EntityProps['contentType'] | LinkInterfaceKeys
) => {
  let icon = faCircle
  let title = ''

  switch (contentType) {
    case 'Article':
    case 'articles':
      icon = faNewspaper
      title = 'Artikel'
      break
    case 'CoursePage':
    case 'courses':
      icon = faGraduationCap
      title = 'Kurs'
      break
    case 'Video':
    case 'videos':
      icon = faPlayCircle
      title = 'Video'
      break
    case 'Applet':
    case 'applets':
      icon = faCubes
      title = 'Applet'
      break
    case 'TaxonomyTerm':
    case 'subfolders':
      icon = faFolderOpen
      title = 'Bereich'
      break
    case 'exercises':
      icon = faFile
      title = 'Aufgaben'
  }

  return { icon: icon, title: title }
}
