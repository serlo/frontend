import {
  faCubes,
  faExpand,
  faFileLines,
  faListCheck,
  faNewspaper,
  faPhotoVideo,
  faSquareCheck,
  faSquareRootVariable,
  faTarp,
  faCaretSquareDown,
  faCode,
  faFilm,
  faImages,
  faParagraph,
  faTable,
} from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { useRef, useState } from 'react'

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

const categories = ['basic', 'educational', 'exercises'] as const

const pluginData = [
  {
    title: 'Semantic Highlighting Box',
    icon: faExpand,
    description:
      'Boxes can be usedoffer the possibility to highlight important sections for learners. VWith the various box types are “such as example,” “mnemonic” or “quote”, the content can be structured clearly.',
    example: boxExample,
    category: 'educational',
  },
  {
    title: 'Image with Explanation',
    icon: faPhotoVideo,
    description: '123',
    example: multimediaExample,
    category: 'educational',
  },
  {
    title: 'Text Exercise',
    icon: faFileLines,
    description:
      'Text exercises give learners a task and access to a solution to this task. They can be created using text and multimedia.',
    example: textExExample,
    category: 'exercises',
  },
  {
    title: 'Input Exercise',
    icon: faTarp,
    description:
      'For an input exercise, an input field appears below the taskexercise where a value or a character string can be entered. Authors can add individual feedback to certain answers like common mistakes.',
    example: inputExample,
    category: 'exercises',
  },
  {
    title: 'Single-Choice Exercise',
    icon: faSquareCheck,
    description: '123',
    example: SCExample,
    category: 'exercises',
  },
  {
    title: 'Multiple-Choice Exercise',
    icon: faListCheck,
    description: '123',
    example: MCExample,
    category: 'exercises',
  },
  {
    title: 'Math Formulas',
    icon: faSquareRootVariable,
    description: '123',
    example: formulaExample,
    category: 'educational',
  },
  {
    title: 'Math Equations',
    icon: faSquareRootVariable,
    description: '123',
    example: formulaExample,
    category: 'educational',
  },
  {
    title: 'Geogebra Integration',
    icon: faCubes,
    description:
      'With the GeoGebra applet, moving or interactive graphics can be integrated into the content. For example, the construction of a geometric figure can be shown step by step, or how a function changes when different values are used for its parameters.',
    example: <Geogebra id="2470285" />,
    category: 'educational',
  },
  {
    title: 'Serlo Content Integration',
    icon: faNewspaper,
    description: '123',
    example: injectionExample,
    category: 'educational',
  },
  // {
  //   title: 'And more…',
  //   icon: faCirclePlus,
  //   description: '',
  //   example: <></>,
  //   category: 'educational',
  // },
  {
    title: 'Text',
    icon: faParagraph,
    description: 'Rich Text with Bold, Italic, Headings, Links, Lists ...',
    example: <>Example Placeholder</>,
    category: 'basic',
  },
  {
    title: 'Image',
    icon: faImages,
    description: 'Everything is better with images',
    example: <>Example Placeholder</>,
    category: 'basic',
  },
  {
    title: 'Video',
    icon: faFilm,
    description: 'Embed directly from YouTube, Vimeo, Wikimedia Commons',
    example: <>Example Placeholder</>,
    category: 'basic',
  },
  {
    title: 'Code',
    icon: faCode,
    description: 'Syntax highlighting for code examples',
    example: <>Example Placeholder</>,
    category: 'basic',
  },
  {
    title: 'Table',
    icon: faTable,
    description: 'Easy to build Tables with row/column headers',
    example: <>Example Placeholder</>,
    category: 'basic',
  },
  {
    title: 'Spoiler',
    icon: faCaretSquareDown,
    description: 'Now you see it, now you don’t',
    example: <>Example Placeholder</>,
    category: 'basic',
  },
]

export function EducationPlugins() {
  const [selectedTitle, setSelectedTitle] = useState(pluginData[4].title)
  const [selectedCategory, setSelectedCategory] = useState<
    typeof categories[number] | undefined
  >(categories[2])

  const categoryRefs = [
    useRef<null | HTMLElement>(null),
    useRef<null | HTMLElement>(null),
    useRef<null | HTMLElement>(null),
  ]

  return (
    <div className="text-center">
      {/* <h3 className="mb-4 mt-16 font-handwritten text-brand text-3xl">
        Education Plugins
      </h3> */}
      <h2 className={clsx(h2Class, 'mb-4')}>Features</h2>
      <div className="sm:flex">
        <div className="mb-4 sm:mt-8 sm:mb-12 sm:w-min text-left sm:text-right">
          {renderPluginsMenu()}
        </div>
        {renderInfoBox()}
      </div>
    </div>
  )

  function renderInfoBox() {
    const { description, example } =
      pluginData.find(({ title }) => title === selectedTitle) ?? pluginData[0]

    return (
      <div className="flex-1 m-3 mt-1 mb-[3.2rem] text-left">
        <div className="shadow-menu w-full p-8 overflow-y-scroll h-[35rem]">
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
        <p className="text-base mt-4">
          The Serlo Editor is in active development. Some features might not yet
          be intuitive and reliable.
        </p>
      </div>
    )
  }

  function renderPluginsMenu() {
    return (
      <>
        {categories.map((thisCategory, categoryIndex) => {
          const plugins = pluginData.filter(
            ({ category }) => category === thisCategory
          )
          const categoryRef = categoryRefs[categoryIndex]
          if (!categoryRef) return null

          const isSelected = selectedCategory === thisCategory

          return (
            <div key={thisCategory} className="mb-4">
              <button
                className="text-brand font-bold cursor-pointer capitalize mr-1 rounded-full hover:bg-brand-100 px-2"
                onClick={() =>
                  setSelectedCategory(isSelected ? undefined : thisCategory)
                }
              >
                {thisCategory}{' '}
                <span
                  className={clsx(
                    'inline-block transition-transform duration-300',
                    isSelected && 'rotate-180 translate-y-[1px]'
                  )}
                >
                  ▾
                </span>
              </button>
              <nav
                className={clsx(
                  'h-0 overflow-hidden transition-all duration-300'
                )}
                ref={categoryRef}
                style={
                  isSelected
                    ? { height: categoryRef.current?.scrollHeight ?? 'auto' }
                    : { height: '0' }
                }
              >
                <ul>{plugins.map(renderPluginMenuEntry)}</ul>
              </nav>
            </div>
          )
        })}
      </>
    )
  }

  function renderPluginMenuEntry({ title, icon }: typeof pluginData[0]) {
    // const isLast = i === pluginData.length - 1

    return (
      <li
        key={title}
        className="sm:text-right text-sm sm:text-base inline-block sm:block"
      >
        <button
          onClick={() => {
            // if (isLast) {
            //   document.querySelector('#roadmap')?.scrollIntoView({
            //     behavior: 'smooth',
            //   })
            // } else
            setSelectedTitle(title)
          }}
          className={clsx(
            'whitespace-nowrap px-2 py-1 m-1 rounded-md',
            'shadow-menu hover:bg-brand-50',
            selectedTitle === title ? 'bg-brand-100' : ''
          )}
        >
          <FaIcon icon={icon} /> <b>{title}</b>
        </button>
      </li>
    )
  }
}
