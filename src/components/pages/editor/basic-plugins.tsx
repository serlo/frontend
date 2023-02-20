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
  // { title: 'Anchor', icon: faAnchor, description: '123' },
  // { title: 'Highlighting Box', icon: faIcons, description: '123' },
]

export function BasicPlugins() {
  return (
    <div className="text-center mt-8">
      <h3 className="mb-4 font-handwritten text-brand text-3xl">
        Common Plugins
      </h3>
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 text-left">
        {commonData.map(renderCommonCard)}
      </ul>
    </div>
  )

  function renderCommonCard({
    title,
    description,
    icon,
  }: typeof commonData[0]) {
    return (
      <li
        key={title}
        className="p-3 m-2 rounded-md shadow-menu hover:bg-brand-50"
      >
        <FaIcon icon={icon} className="" /> <b className=" text-xl ">{title}</b>
        <br />
        {description}{' '}
      </li>
    )
  }
}
