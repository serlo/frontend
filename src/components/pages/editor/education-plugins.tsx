import {
  faCubes,
  faExpand,
  faFileLines,
  faListCheck,
  faNewspaper,
  // faPhotoVideo,
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
  // multimediaExample,
  SCExample,
  textExExample,
} from './education-plugin-examples'
import { Geogebra } from '@/components/content/geogebra'
import { FaIcon } from '@/components/fa-icon'
import { EntityIdProvider } from '@/contexts/entity-id-context'

const categories = ['educational', 'basic'] as const

const pluginData = [
  {
    title: 'Single-Choice Exercise',
    icon: faSquareCheck,
    description:
      'Single-choice exercises offer different answer options, of which only one is correct. For each answer authors can provide individual feedback to the learners e.g. to explain misconceptions behind common mistakes.',
    example: SCExample,
    category: 'educational',
  },
  {
    title: 'Multiple-Choice Exercise',
    icon: faListCheck,
    description:
      'Multiple-choice exercises offer different answer options, of which several can be correct. For each answer authors can provide individual feedback to the learners e.g. to explain misconceptions behind common mistakes.',
    example: MCExample,
    category: 'educational',
  },
  {
    title: 'Input Exercise',
    icon: faTarp,
    description:
      'An input field appears below the task where a value or a character string can be entered and validated. Authors can add individual feedback to certain answers e.g. to explain misconceptions behind common mistakes.',
    example: inputExample,
    category: 'educational',
  },
  {
    title: 'Text Exercise',
    icon: faFileLines,
    description:
      'Text exercises give learners a task and access to a detailed solution to this task. They can be created using text and multimedia.',
    example: textExExample,
    category: 'educational',
  },
  {
    title: 'Math Formulas',
    icon: faSquareRootVariable,
    description:
      'Math Formulas are well formatted and correctly displayed and can be created using LaTeX or a visual editor.',
    example: formulaExample,
    category: 'educational',
  },
  {
    title: 'Math Equations',
    icon: faSquareRootVariable,
    description:
      'With the terms and equations element, we make it simple to implement nicely formatted, multi-line equations and term transformations. Command dashes and additional explanations with links can also be added.',
    example: formulaExample,
    category: 'educational',
  },
  {
    title: 'Geogebra Integration',
    icon: faCubes,
    description:
      'With the GeoGebra applet, moving or interactive graphics can be integrated into the content. You can create your own applet or choose from the huge free public applet collection on geogebra.org',
    example: <Geogebra id="2470285" />,
    category: 'educational',
  },
  {
    title: 'Serlo Content Integration',
    icon: faNewspaper,
    description:
      'It is also possible to include other serlo.org content within the learning content being created. Here authors can choose from 23,000 high quality, standardized educational contents like explanations, exercises, solutions, videos and applets in a  vast number of subjects like Maths, Chemistry, Biology, IT, Applied Sustainability, German, English as a foreign language, and many more.',
    example: injectionExample,
    category: 'educational',
  },
  {
    title: 'Semantic Highlighting Box',
    icon: faExpand,
    description:
      'Boxes offer the possibility to highlight important sections for learners. With the various semantic box types e.g. “example,” “mnemonic” or “quote”, the content can be structured clearly.',
    example: boxExample,
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
    description:
      'Rich text can be edited in-line with bold, italic, headings, links, lists, and more.',
    example: <>Example Placeholder</>,
    category: 'basic',
  },
  {
    title: 'Image',
    icon: faImages,
    description: 'Everything is better with images 🙂',
    example: <>Example Placeholder</>,
    category: 'basic',
  },
  {
    title: 'Video',
    icon: faFilm,
    description:
      'Embed videos directly from YouTube, Vimeo or Wikimedia Commons in your content.',
    example: <>Example Placeholder</>,
    category: 'basic',
  },
  {
    title: 'Code',
    icon: faCode,
    description:
      'This feature offers special formatting and automatic syntax highlighting for code examples.',
    example: <>Example Placeholder</>,
    category: 'basic',
  },
  {
    title: 'Table',
    icon: faTable,
    description: 'Build tables intuitively with row and column headers.',
    example: <>Example Placeholder</>,
    category: 'basic',
  },
  {
    title: 'Spoiler',
    icon: faCaretSquareDown,
    description:
      'Hide additional content – e.g. more detailed context, sub-topics or further information – easily accessible within your content.',
    example: <>Example Placeholder</>,
    category: 'basic',
  },
  // {
  //   title: 'Image with Explanation',
  //   icon: faPhotoVideo,
  //   description: '123',
  //   example: multimediaExample,
  //   category: 'educational',
  // },
]

export function EducationPlugins() {
  const [selectedTitle, setSelectedTitle] = useState(pluginData[0].title)
  const [selectedCategory, setSelectedCategory] = useState<
    typeof categories[number] | undefined
  >(categories[0])

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
        <div className="shadow-menu w-full p-8 overflow-y-scroll md:h-[35rem]">
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
        {/* <p className="text-base mt-4">
          The Serlo Editor is in active development. Some features might not yet
          be intuitive and reliable.
        </p> */}
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
