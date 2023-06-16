import {
  faAlignLeft,
  faCubesStacked,
  faFileLines,
  faHandSparkles,
  faRotateLeft,
} from '@fortawesome/free-solid-svg-icons'

import { FaIcon } from '@/components/fa-icon'

const features = [
  {
    title: 'WYSIWYG Editor',
    icon: faFileLines,
    description: 'What authors see looks just like what learners see',
  },
  {
    title: '17+ Content Elements',
    icon: faCubesStacked,
    description: 'Including many especially designed for supporting education',
  },
  {
    title: 'Drag and Drop',
    icon: faHandSparkles,
    description: 'Sort elements with your mouse',
  },
  {
    title: 'Infinite Undo & Redo',
    icon: faRotateLeft,
    description: 'We all make mistakes sometimes, no worries ;)',
  },
  {
    title: 'Structured Content',
    icon: faAlignLeft,
    description: 'Guide authors with custom content templates',
  },
]

export function EditorFeatures() {
  return (
    <div className="text-center text-lg sm:flex sm:text-left">
      {features.map(({ icon, title, description }) => {
        return (
          <div key={title} className="mx-2 mt-4 flex-1">
            <FaIcon icon={icon} className="mx-auto mb-2 text-4xl text-brand" />
            <div>
              <b className="text-lg">{title}</b>
              <br />
              {description}
            </div>
          </div>
        )
      })}
    </div>
  )
}
