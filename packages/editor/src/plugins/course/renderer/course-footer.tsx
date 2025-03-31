import { FaIcon } from '@editor/editor-ui/fa-icon'
import { useStaticStrings } from '@editor/i18n/static-strings-provider'
import { cn } from '@editor/utils/cn'
import {
  faArrowCircleRight,
  faArrowCircleUp,
} from '@fortawesome/free-solid-svg-icons'

export function CourseFooter({
  index,
  pages,
}: {
  index: number
  pages: { id: string; title: string }[]
}) {
  const nextIndex = index + 1
  const nextPage = pages.at(nextIndex)

  const courseStrings = useStaticStrings().plugins.course

  return (
    <>
      <nav className="mt-auto flex justify-between bg-brand-50 py-5 pt-12 sm:bg-white">
        <a
          className="serlo-button-learner-secondary mx-side h-fit hover:no-underline"
          href="#__next"
        >
          <FaIcon icon={faArrowCircleUp} /> {courseStrings.pages}
        </a>

        {nextPage ? (
          <a
            href={`#${nextPage.id}`}
            className="ml-auto mr-side text-right hover:no-underline"
          >
            <div className="serlo-button-learner-primary mb-2 hover:no-underline">
              <FaIcon icon={faArrowCircleRight} /> {courseStrings.next}
            </div>
            <div className="flex text-lg">
              <b
                className={cn(`
                  mr-1.5 mt-1.5 h-4 w-4 rounded-full
                  bg-brand-200 pt-0.25 text-center text-xs leading-tight text-brand
                `)}
              >
                {nextIndex + 1}
              </b>{' '}
              {nextPage.title}
            </div>
          </a>
        ) : null}
      </nav>
    </>
  )
}
