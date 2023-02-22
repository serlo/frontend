import {
  faCirclePlus,
  faCubes,
  faExpand,
  faFileLines,
  faListCheck,
  faNewspaper,
  faPhotoVideo,
  faSquareCheck,
  faSquareRootVariable,
  faTarp,
} from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { useState } from 'react'

import { h2Class } from './editor-presentation'
import {
  boxExample,
  formulaExample,
  injectionExample,
  inputExample,
  MCExample,
  multimediaExample,
  SCExample,
  textExExample,
} from './education-plugin-examples'
import { Geogebra } from '@/components/content/geogebra'
import { FaIcon } from '@/components/fa-icon'
import { EntityIdProvider } from '@/contexts/entity-id-context'

const pluginData = [
  {
    title: 'Highlighting Box',
    icon: faExpand,
    description:
      'Boxes can be usedoffer the possibility to highlight important sections for learners. VWith the various box types are “such as example,” “mnemonic” or “quote”, the content can be structured clearly.',
    example: boxExample,
  },
  {
    title: 'Image with Explanation',
    icon: faPhotoVideo,
    description: '123',
    example: multimediaExample,
  },
  {
    title: 'Text Exercise',
    icon: faFileLines,
    description:
      'Text exercises give learners a task and access to a solution to this task. They can be created using text and multimedia.',
    example: textExExample,
  },
  {
    title: 'Input Exercise',
    icon: faTarp,
    description:
      'For an input exercise, an input field appears below the taskexercise where a value or a character string can be entered. Authors can add individual feedback to certain answers like common mistakes.',
    example: inputExample,
  },
  {
    title: 'Single-Choice Exercise',
    icon: faSquareCheck,
    description: '123',
    example: SCExample,
  },
  {
    title: 'Multiple-Choice Exercise',
    icon: faListCheck,
    description: '123',
    example: MCExample,
  },
  {
    title: 'Math Formulas & Equations',
    icon: faSquareRootVariable,
    description: '123',
    example: formulaExample,
  },
  {
    title: 'Geogebra Integration',
    icon: faCubes,
    description:
      'With the GeoGebra applet, moving or interactive graphics can be integrated into the content. For example, the construction of a geometric figure can be shown step by step, or how a function changes when different values are used for its parameters.',
    example: <Geogebra id="2470285" />,
  },
  {
    title: 'Content Integration',
    icon: faNewspaper,
    description: '123',
    example: injectionExample,
  },
  {
    title: 'And more…',
    icon: faCirclePlus,
    description: '',
    example: <></>,
  },
]

export function EducationPlugins() {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div className="text-center">
      {/* <h3 className="mb-4 mt-16 font-handwritten text-brand text-3xl">
        Education Plugins
      </h3> */}
      <h2 className={clsx(h2Class, 'mb-4')}>Content Features</h2>
      <div className="sm:flex">
        {renderPluginsMenu()}
        {renderInfoBox()}
      </div>
    </div>
  )

  function renderInfoBox() {
    const { description, example } = pluginData[selectedIndex]
    return (
      <div className="flex-1 m-3 mt-1 mb-[3.2rem] text-left p-10 shadow-menu">
        <EntityIdProvider value={1555}>
          <p className="text-xl mb-6">{description}</p>
          <div className="border-b-2 border-brand-100 font-bold mb-6">
            Example
          </div>
          <div className="-ml-side serlo-content-with-spacing-fixes">
            {example}
          </div>
        </EntityIdProvider>
        <style jsx global>
          {`
            .lazyload-wrapper > .print:hidden,
            .lazyload-wrapper > aside {
              display: none;
            }
          `}
        </style>
      </div>
    )
  }

  function renderPluginsMenu() {
    return (
      <nav className="mb-4 sm:mb-12 sm:w-min">
        <ul>{pluginData.map(renderPluginMenuEntry)}</ul>
      </nav>
    )
  }

  function renderPluginMenuEntry(
    { title, icon }: typeof pluginData[0],
    i: number
  ) {
    const isLast = i === pluginData.length - 1

    return (
      <li
        key={title}
        className="sm:text-right text-sm sm:text-base inline-block sm:block"
      >
        <button
          onClick={() => {
            if (isLast) {
              document.querySelector('#roadmap')?.scrollIntoView({
                behavior: 'smooth',
              })
            } else {
              setSelectedIndex(i)
            }
          }}
          className={clsx(
            'whitespace-nowrap p-2 sm:p-3 m-1 rounded-md',
            'shadow-menu hover:bg-brand-50',
            selectedIndex === i ? 'bg-brand-100' : ''
          )}
        >
          <FaIcon icon={icon} /> <b>{title}</b>
        </button>
      </li>
    )
  }
}
