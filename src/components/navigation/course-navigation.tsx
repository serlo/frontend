import { faGraduationCap, faListUl } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { MouseEvent } from 'react'

import { Link } from '../content/link'
import { useInstanceData } from '@/contexts/instance-context'
import { CourseData } from '@/data-types'

export interface CourseNavigationProps {
  open: boolean
  onOverviewButtonClick: (e?: MouseEvent<HTMLButtonElement>) => void
  data: CourseData
}

export function CourseNavigation({
  data,
  open,
  onOverviewButtonClick,
}: CourseNavigationProps) {
  const { strings } = useInstanceData()

  //open directly
  if (data.pages.length < 4) onOverviewButtonClick()

  return (
    <nav
      id="course-overview"
      className="mt-6 bg-brand-50 sm:bg-white pt-1 pb-5"
    >
      <h1 className="mx-side my-4 font-bold text-xl text-brand">
        <FontAwesomeIcon icon={faGraduationCap} /> {data.title}
      </h1>
      {open ? (
        <ol className="serlo-ol mb-0 mt-7">
          {data.pages.map(({ url, active, title, noCurrentRevision }) => (
            <li key={url}>
              <Link
                className={clsx(
                  'text-lg leading-browser',
                  {
                    'font-semibold text-truegray-800 hover:no-underline':
                      active,
                  },
                  { 'text-brand-300': noCurrentRevision }
                )}
                href={active ? undefined : url}
              >
                {noCurrentRevision
                  ? '(' + strings.course.noRevisionForPage + ')'
                  : title}
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <>
          {data.pages.length > 0 ? (
            <button
              onClick={onOverviewButtonClick}
              className="serlo-button mx-side bg-brand text-white hover:bg-brand-lighter"
            >
              <FontAwesomeIcon icon={faListUl} /> {strings.course.showPages}
            </button>
          ) : null}
        </>
      )}
    </nav>
  )
}
