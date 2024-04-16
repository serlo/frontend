import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { useInstanceData } from '@serlo/frontend/src/contexts/instance-context'
import { cn } from '@serlo/frontend/src/helper/cn'
import { type MouseEvent } from 'react'

export interface CourseNavigationProps {
  title: string | JSX.Element
  pages: { key: string; element: JSX.Element }[]
  open: boolean
  onOverviewButtonClick: (e?: MouseEvent<HTMLButtonElement>) => void
}
// this is a renderer
export function CourseNavigation({
  title,
  pages,
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
        <FaIcon icon={faGraduationCap} /> {strings.entities.course}
      </p>
      <h1 className="mx-side mb-4 mt-0 text-2xl font-bold">{title}</h1>
      {pages.length > 0 ? (
        <button
          onClick={onOverviewButtonClick}
          className="serlo-button-light ml-2"
        >
          {strings.course.pages}{' '}
          <span
            className={cn('inline-block', open && 'translate-y-0.5 rotate-180')}
          >
            ▾
          </span>
        </button>
      ) : null}
      {open ? (
        <ol className="serlo-ol mb-0 mt-7">
          {pages.map(({ key, element }) => {
            return <li key={key}>{element}</li>
          })}
        </ol>
      ) : null}
    </nav>
  )
}
