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
    titleDe: 'WYSIWYG Editor',
    icon: faFileLines,
    description: 'What authors see looks just like what learners see',
    descriptionDe:
      'Die Bearbeitungsansicht ist für Autor*innen genauso wie die Ansicht für Lernende',
  },
  {
    title: '20+ Features',
    titleDe: '20+ Features',
    icon: faCubesStacked,
    description: 'Including many especially designed for supporting education',
    descriptionDe:
      'Darunter viele, die speziell für den Bildungs- & Lernkontext entwickelt wurden',
  },
  {
    title: 'Drag and Drop',
    titleDe: 'Drag & Drop',
    icon: faHandSparkles,
    description: 'Sort elements with your mouse',
    descriptionDe:
      'Verschiebe Elemente und Abschnitte  mit der Maus an eine neue Position',
  },
  {
    title: 'Infinite Undo & Redo',
    titleDe: 'Unbegrenztes Undo & Redo',
    icon: faRotateLeft,
    description: 'We all make mistakes sometimes, no worries ;)',
    descriptionDe: 'Wir machen alle mal Fehler, keine Sorge ;)',
  },
  {
    title: 'Structured Content',
    titleDe: 'Strukturierter Inhalt',
    icon: faAlignLeft,
    description: 'Guide authors with custom content templates',
    descriptionDe:
      'Unterstützt Autor*innen mit benutzerdefinierten Inhaltsvorlagen',
  },
]

export function EditorFeatures({ lang }: { lang?: 'de' }) {
  const isDe = lang === 'de'
  return (
    <div className="text-center text-lg sm:flex sm:text-left">
      {features.map(({ icon, title, titleDe, description, descriptionDe }) => {
        return (
          <div key={title} className="mx-2 mt-4 flex-1">
            <FaIcon icon={icon} className="mx-auto mb-2 text-4xl text-brand" />
            <div>
              <b className="text-lg">{isDe ? titleDe : title}</b>
              <br />
              {isDe ? descriptionDe : description}
            </div>
          </div>
        )
      })}
    </div>
  )
}
