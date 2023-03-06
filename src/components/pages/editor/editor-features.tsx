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
    title: 'Stuctured Content',
    icon: faAlignLeft,
    description: 'Guide authors with custom content templates',
  },
]

export function EditorFeatures() {
  return (
    <div className="sm:flex text-center sm:text-left text-lg">
      {features.map(({ icon, title, description }) => {
        return (
          <div key={title} className="flex-1 mx-2 mt-4">
            <FaIcon icon={icon} className="text-brand text-4xl mx-auto mb-2" />
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
