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
    description: 'What you see is what the learner sees',
  },
  {
    title: 'Infinite Undo & Redo',
    icon: faRotateLeft,
    description: 'We all make mistakes sometimes',
  },
  {
    title: '17+ Content Plugins',
    icon: faCubesStacked,
    description: 'Including many especially designed for education',
  },
  {
    title: 'Drag and Drop',
    icon: faHandSparkles,
    description: 'Sort elements with your mouse',
  },
  {
    title: 'Stuctured Content',
    icon: faAlignLeft,
    description: 'Create custom templates for different content types',
  },
]

export function EditorFeatures() {
  return (
    <div className="sm:flex text-left text-lg">
      {features.map(({ icon, title, description }) => {
        return (
          <div key={title} className="flex-1 mx-2">
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
