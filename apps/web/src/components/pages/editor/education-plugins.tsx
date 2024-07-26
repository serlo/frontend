import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import {
  faCubes,
  faExpand,
  faFileLines,
  faListCheck,
  faNewspaper,
  faSquareCheck,
  faSquareRootVariable,
  faPencilAlt,
  faTarp,
  faCaretSquareDown,
  faCode,
  faFilm,
  faImages,
  faParagraph,
  faTable,
  faEquals,
} from '@fortawesome/free-solid-svg-icons'
import { useRef, useState } from 'react'

import {
  BoxExample,
  FillInTheBlanksExample,
  HighlightExample,
  InputExample,
  MCExample,
  SCExample,
  SpoilerExample,
  TextExerciseExample,
} from './education-plugin-examples'
import { FaIcon } from '@/components/fa-icon'
import { UuidsProvider } from '@/contexts/uuids-context'
import { cn } from '@/helper/cn'

const h2Class =
  'text-center text-4xl leading-cozy tracking-tight font-extrabold'

const categories = ['educational', 'basic'] as const

//dropzone-exercise

const pluginData = [
  {
    title: 'Fill in the Blanks Exercise',
    icon: faPencilAlt,
    description:
      'Fill in the Blanks exercises allow students to either input an original answer, or drag & drop from a predefined list of answers. Authors can add additional wrong answers to the list to make the exercise more challenging.',
    example: <FillInTheBlanksExample />,
    demoSlug: '/_assets/img/editor/demo-videos/fill-in-the-blanks-exercise',
    category: 'educational',
  },
  {
    title: 'Single-Choice Exercise',
    icon: faSquareCheck,
    description:
      'Single-choice exercises offer different answer options, of which only one is correct. For each answer authors can provide individual feedback to the learners e.g. to explain misconceptions behind common mistakes.',
    example: SCExample,
    demoSlug: '/_assets/img/editor/demo-videos/sc-exercise',
    category: 'educational',
  },
  {
    title: 'Multiple-Choice Exercise',
    icon: faListCheck,
    description:
      'Multiple-choice exercises offer different answer options, of which several can be correct. For each answer authors can provide individual feedback to the learners e.g. to explain misconceptions behind common mistakes.',
    example: MCExample,
    demoSlug: '/_assets/img/editor/demo-videos/mc-exercise',
    category: 'educational',
  },
  {
    title: 'Input Exercise',
    icon: faTarp,
    description:
      'An input field appears below the task where a value or a character string can be entered and validated. Authors can add individual feedback to certain answers e.g. to explain misconceptions behind common mistakes.',
    example: InputExample,
    demoSlug: '/_assets/img/editor/demo-videos/input-exercise',
    category: 'educational',
  },
  {
    title: 'Text Exercise',
    icon: faFileLines,
    description:
      'Text exercises give learners a task and access to a detailed solution to this task. They can be created using text and multimedia.',
    example: TextExerciseExample,
    category: 'educational',
  },
  {
    title: 'Math Formulas',
    icon: faSquareRootVariable,
    description:
      'Math Formulas are well formatted and correctly displayed and can be created using LaTeX or a visual editor.',
    example: null,
    demoSlug: '/_assets/img/editor/demo-videos/math-formulas',
    category: 'educational',
  },
  {
    title: 'Math Equations',
    icon: faEquals,
    description:
      'With the terms and equations element, we make it simple to implement nicely formatted, multi-line equations and term transformations. Command dashes and additional explanations with links can also be added.',
    example: null,
    demoSlug: '/_assets/img/editor/demo-videos/equations-plugin',
    category: 'educational',
  },
  {
    title: 'Geogebra Integration',
    icon: faCubes,
    description:
      'With the GeoGebra applet, moving or interactive graphics can be integrated into the content. You can create your own applet or choose from the huge free public applet collection on geogebra.org.',
    example: (
      <StaticRenderer
        document={{ plugin: EditorPluginType.Geogebra, state: 'd4eNMF5R' }}
      />
    ),
    demoSlug: '/_assets/img/editor/demo-videos/geogebra-plugin',
    category: 'educational',
  },
  {
    title: 'Serlo Content Integration',
    icon: faNewspaper,
    description:
      'It is also possible to include other serlo.org content within the learning content being created. Here authors can choose from 23,000 high quality, standardized educational contents like explanations, exercises, solutions, videos and applets in a  vast number of subjects like Maths, Chemistry, Biology, IT, Applied Sustainability, German, English as a foreign language, and many more.',
    example: null,
    image: 'serlo-injection.png',
    category: 'educational',
  },
  {
    title: 'Semantic Highlighting Box',
    icon: faExpand,
    description:
      'Boxes offer the possibility to highlight important sections for learners. With the various semantic box types e.g. “example,” “mnemonic” or “quote”, the content can be structured clearly.',
    example: BoxExample,
    demoSlug: '/_assets/img/editor/demo-videos/box-plugin',
    category: 'educational',
  },
  {
    title: 'Text',
    icon: faParagraph,
    description:
      'Rich text can be edited in-line with bold, italic, headings, links, lists, and more.',
    example: null,
    demoSlug: '/_assets/img/editor/demo-videos/text-plugin',
    category: 'basic',
  },
  {
    title: 'Image',
    icon: faImages,
    description:
      'Everything looks nicer with images 🙂. You can insert them full width or with your text floating around. ',
    example: null,
    demoSlug: '/_assets/img/editor/demo-videos/image-plugin',
    image: 'images.png',
    category: 'basic',
  },
  {
    title: 'Video',
    icon: faFilm,
    description:
      'Embed videos directly from YouTube, Vimeo or Wikimedia Commons in your content.',
    example: null,
    image: 'video.png',
    category: 'basic',
  },
  {
    title: 'Code',
    icon: faCode,
    description:
      'This feature offers special formatting and automatic syntax highlighting for code examples.',
    example: HighlightExample,
    demoSlug: '/_assets/img/editor/demo-videos/code-plugin',
    category: 'basic',
  },
  {
    title: 'Table',
    icon: faTable,
    description: 'Build tables intuitively with row and column headers.',
    example: null,
    demoSlug: '/_assets/img/editor/demo-videos/table-plugin',
    image: 'table.png',
    category: 'basic',
  },
  {
    title: 'Spoiler',
    icon: faCaretSquareDown,
    description:
      'Hide additional content – e.g. more detailed context, sub-topics or further information – easily accessible within your content.',
    example: SpoilerExample,
    demoSlug: '/_assets/img/editor/demo-videos/spoiler-plugin',
    category: 'basic',
  },
]

export function EducationPlugins() {
  const [selectedTitle, setSelectedTitle] = useState(pluginData[0].title)
  const [selectedCategory, setSelectedCategory] = useState<
    (typeof categories)[number] | undefined
  >(categories[0])

  const categoryRefs = [
    useRef<null | HTMLElement>(null),
    useRef<null | HTMLElement>(null),
    useRef<null | HTMLElement>(null),
  ]

  return (
    <div className="text-center">
      <h2 className={cn(h2Class, 'mb-4')}>Features</h2>
      <div className="sm:flex">
        <div className="mb-4 text-left sm:mb-12 sm:mt-8 sm:w-min sm:text-right">
          {renderPluginsMenu()}
        </div>
        {renderInfoBox()}
      </div>
    </div>
  )

  function renderInfoBox() {
    const { description, example, image, title, demoSlug } =
      pluginData.find(({ title }) => title === selectedTitle) ?? pluginData[0]

    return (
      <div
        className="m-3 mb-[3.2rem] mt-1 flex-1 text-left"
        key={`infoBox-${title}`}
      >
        <div className="w-full overflow-y-scroll p-8 shadow-menu md:h-[37rem]">
          <UuidsProvider value={{ entityId: 1555 }}>
            <p className="mb-6 text-xl">{description}</p>

            {demoSlug ? (
              <>
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="mb-12 rounded-md border-4 border-brand-200"
                >
                  <source src={`${demoSlug}.webm`} type="video/webm" />
                  <source src={`${demoSlug}.mp4`} type="video/mp4" />
                </video>
                <p className="sr-only">
                  Short Video of Editing Experience with ${title}
                </p>
              </>
            ) : null}

            {example ? (
              <>
                <div className="mb-3 border-b-2 border-brand-100 font-bold">
                  Live Example
                </div>
                <div className="serlo-content-with-spacing-fixes -ml-side">
                  {example}
                </div>
              </>
            ) : (
              <>
                <div className="mb-6 border-b-2 border-brand-100 font-bold">
                  Screenshot
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={image}
                  className="
                    rounded-md border-4 border-brand-200"
                  alt={`Screenshot of ${title}`}
                  src={`/_assets/img/editor/screenshots/${image}`}
                />
              </>
            )}
          </UuidsProvider>
          <style jsx global>
            {`
              .lazyload-wrapper > .print:hidden,
              .lazyload-wrapper > aside {
                display: none;
              }
              .serlo-solution-box > .lazyload-wrapper {
                display: none;
              }
              .serlo-exercise-wrapper {
                margin-top: 0 !important;
                margin-bottom: 0 !important;
              }
              .serlo-exercise-wrapper li.flex {
                margin-bottom: 1rem !important;
              }
            `}
          </style>
        </div>
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
                className="mr-1 cursor-pointer rounded-full px-2 font-bold capitalize text-brand hover:bg-brand-100"
                onClick={() =>
                  setSelectedCategory(isSelected ? undefined : thisCategory)
                }
              >
                {thisCategory}{' '}
                <span
                  className={cn(
                    'inline-block transition-transform duration-300',
                    isSelected && 'translate-y-[1px] rotate-180'
                  )}
                >
                  ▾
                </span>
              </button>
              <nav
                className={cn(
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

  function renderPluginMenuEntry({ title, icon }: (typeof pluginData)[0]) {
    return (
      <li
        key={title}
        className="inline-block text-sm sm:block sm:text-right sm:text-base"
      >
        <button
          onClick={() => setSelectedTitle(title)}
          className={cn(
            cn`
              m-1 whitespace-nowrap rounded-md px-2 py-1
              shadow-menu hover:bg-brand-50
            `,
            selectedTitle === title ? 'bg-brand-100' : ''
          )}
        >
          <FaIcon icon={icon} /> <b>{title}</b>
        </button>
      </li>
    )
  }
}
