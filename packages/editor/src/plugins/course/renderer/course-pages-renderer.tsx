import { CourseFooter } from './course-footer'

export function CoursePagesRenderer({
  pages,
}: {
  pages: {
    id: string
    title: string
    titleElement: JSX.Element
    contentElement: JSX.Element
  }[]
}) {
  return pages.map(({ id, titleElement, contentElement }, index) => {
    return (
      <section
        className="mt-24 flex min-h-[95vh] flex-col justify-between border-b-2 border-t-2 border-brand-200 pb-4 pt-10"
        key={id}
        id={id}
      >
        {titleElement}
        <div>{contentElement}</div>
        <CourseFooter index={index} pages={pages} />
      </section>
    )
  })
}
