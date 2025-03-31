import { useStaticStrings } from '@editor/i18n/static-strings-provider'

export interface CourseNavigationProps {
  pages: { key: string; element: JSX.Element }[]
}

export function CourseNavigationRenderer({ pages }: CourseNavigationProps) {
  const courseStrings = useStaticStrings().plugins.course

  return (
    <nav className="mt-4 bg-brand-50 pb-5 pt-3 sm:bg-white sm:pb-11">
      <b className="mx-side text-lg">{courseStrings.pages}</b>

      <ol className="serlo-ol mb-0 mt-3.5">
        {pages.map(({ key, element }) => {
          return <li key={key}>{element}</li>
        })}
      </ol>
    </nav>
  )
}
