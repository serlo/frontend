import { AddButton } from '@editor/editor-ui'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { useEffect, useState } from 'react'

import { CourseNavigation } from './course-navigation'
import { CoursePage } from './course-page'
import type { CourseProps } from '..'

export function CourseEditor(props: CourseProps) {
  const { state } = props
  const { pages } = state

  const editorStrings = useEditorStrings()
  const courseStrings = editorStrings.templatePlugins.course

  const [courseNavOpen, setCourseNavOpen] = useState(true)
  const [activePageIndex, setActivePageIndex] = useState(0)

  const activePage = pages.at(activePageIndex)

  useEffect(() => {
    const hashId = window.location.hash.substring(1)
    if (!hashId) return
    const index = pages.findIndex(({ id }) => id.value === hashId)
    setActivePageIndex(Math.max(index, 0))
    // only on first load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pages])

  return (
    <>
      <CourseNavigation
        courseNavOpen={courseNavOpen}
        setCourseNavOpen={setCourseNavOpen}
        pages={pages}
        activePageIndex={activePageIndex}
        setActivePageIndex={setActivePageIndex}
      />
      <br />
      {renderAddButton()}
      {activePage ? <CoursePage coursePage={activePage} /> : null}
      <div>
        {/* {isSerlo ? (
        <SerloLicenseChooser
          licenseId={licenseId}
          className="!right-[84px] !top-[-30px]"
        />
      ) : null} */}
      </div>
    </>
  )

  function renderAddButton() {
    return (
      <AddButton
        onClick={() => {
          pages.insert()
          setTimeout(() => {
            setActivePageIndex(pages.length)
            window.location.hash = `#${pages.at(pages.length - 1)?.id.value ?? pages[0].id.value}`
          })
        }}
      >
        {courseStrings.addCoursePage}
      </AddButton>
    )
  }
}
