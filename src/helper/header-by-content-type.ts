import {
  faCircle,
  faNewspaper,
  faGraduationCap,
  faPlayCircle,
  faCubes,
  faFolderOpen,
  faFile,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'

import { CategoryType } from '@/data-types'

export const categoryIconMapping: { [K in CategoryType]: IconDefinition } = {
  article: faNewspaper,
  course: faGraduationCap,
  video: faPlayCircle,
  applet: faCubes,
  folder: faFolderOpen,
  exercises: faFile,
}

/*








*/

// Das kann dann woanders hin ...

export const getIconAndTitleByContentType = (contentType: any) => {
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

  return { icon, title }
}
