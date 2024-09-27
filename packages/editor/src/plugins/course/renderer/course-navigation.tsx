import { cn } from '@editor/utils/cn'
import { useInstanceData } from '@editor/utils/use-instance-data'

export interface CourseNavigationProps {
  pages: { key: string; element: JSX.Element }[]
  open: boolean
  onOverviewButtonClick: () => void
}

export function CourseNavigationRenderer({
  pages,
  open,
  onOverviewButtonClick,
}: CourseNavigationProps) {
  const { strings } = useInstanceData()

  return (
    <nav
      id="course-overview"
      className="mt-4 border-b-2 border-brand-200 bg-brand-50 pb-5 pt-1 sm:bg-white sm:pb-11 "
    >
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
