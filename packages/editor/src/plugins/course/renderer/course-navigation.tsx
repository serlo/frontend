import { useStaticStrings } from '@editor/i18n/static-strings-provider'
import { cn } from '@editor/utils/cn'

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
  const courseStrings = useStaticStrings().plugins.course

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
          {courseStrings.pages}{' '}
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
