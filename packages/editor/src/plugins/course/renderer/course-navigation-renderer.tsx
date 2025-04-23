import { useStaticStrings } from '@editor/i18n/static-strings-provider'

import type { JSX } from "react";

export interface CourseNavigationProps {
  pages: { id: string; title: string; afterLink?: JSX.Element }[]
}

export function CourseNavigationRenderer({ pages }: CourseNavigationProps) {
  const courseStrings = useStaticStrings().plugins.course

  return (
    <nav id="course-nav" className="mt-4 pb-5 pt-3 sm:bg-white sm:pb-11">
      <b className="mx-side text-lg">{courseStrings.pages}</b>

      <ol className="serlo-ol mb-0 mt-3.5">
        {pages.map(({ id, title, afterLink }) => {
          return (
            <li key={id} className="group">
              <a className="serlo-link text-lg leading-browser" href={`#${id}`}>
                {title}
              </a>
              {afterLink}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
