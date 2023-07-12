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
      className="mt-6 border-b-2 border-brand-200 bg-brand-50 pb-5 pt-1 sm:bg-white sm:pb-11 "
    >
      <p className="serlo-p mb-0 mt-4 text-[1rem] font-bold">
        <FaIcon icon={faGraduationCap} /> Kurs
      </p>
      <h1 className="mx-side mb-4 mt-0 text-2xl font-bold">{data.title}</h1>
      {data.pages.length > 0 ? (
        <button
          onClick={onOverviewButtonClick}
          className="serlo-button-light ml-2"
        >
          {strings.course.pages}{' '}
          <span
            className={clsx(
              'inline-block',
              open && 'translate-y-0.5 rotate-180'
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
                    'font-semibold text-almost-black hover:no-underline':
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
