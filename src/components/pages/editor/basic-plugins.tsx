import {
  faCaretSquareDown,
  faCode,
  faFilm,
  faImages,
  faParagraph,
  faTable,
} from '@fortawesome/free-solid-svg-icons'

import { FaIcon } from '@/components/fa-icon'

const commonData = [
  {
    title: 'Text',
    icon: faParagraph,
    description: 'Rich Text with Bold, Italic, Headings, Links, Lists ...',
  },
  {
    title: 'Image',
    icon: faImages,
    description: 'Everything is better with images',
  },
  {
    title: 'Video',
    icon: faFilm,
    description: 'Embed directly from YouTube, Vimeo, Wikimedia Commons',
  },
  {
    title: 'Code',
    icon: faCode,
    description: 'Syntax highlighting for code examples',
  },
  {
    title: 'Table',
    icon: faTable,
    description: 'Easy to build Tables with row/column headers',
  },
  {
    title: 'Spoiler',
    icon: faCaretSquareDown,
    description: 'Now you see it, now you don’t',
  },
]

export function BasicPlugins() {
  return (
    <div className="mt-8 text-center">
      <h3 className="mb-4 font-handwritten text-3xl text-brand">
        … and the basics
      </h3>
      <ul className="grid grid-cols-2 text-left sm:grid-cols-3 lg:grid-cols-6">
        {commonData.map(renderCommonCard)}
      </ul>
    </div>
  )

  function renderCommonCard({
    title,
    description,
    icon,
  }: (typeof commonData)[0]) {
    return (
      <li key={title} className="m-2 rounded-md p-3 shadow-menu">
        <FaIcon icon={icon} className="" /> <b className=" text-xl ">{title}</b>
        <br />
        {description}{' '}
      </li>
    )
  }
}
