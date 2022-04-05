import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { MouseEvent } from 'react'

import { Link } from '../content/link'
import { FaIcon } from '../fa-icon'
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

  return (
    <nav
      id="course-overview"
      className="mt-6 bg-brand-50 sm:bg-white pt-1 pb-5 sm:pb-11 border-b-2 border-brand-150 "
    >
      <p className="serlo-p mb-0 mt-4 font-bold text-[1rem]">
        <FaIcon icon={faGraduationCap} /> Kurs
      </p>
      <h1 className="mt-0 mb-4 mx-side font-bold text-2xl">{data.title}</h1>
      {data.pages.length > 0 ? (
        <button
          onClick={onOverviewButtonClick}
          className="serlo-button ml-2 serlo-make-interactive-light"
        >
          {strings.course.pages}{' '}
          <span
            className={clsx(
              'inline-block',
              open && 'rotate-180 translate-y-0.5'
            )}
          >
            ▾
          </span>
        </button>
      ) : null}
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
      ) : null}
    </nav>
  )
}
