import { AddButton } from '@editor/editor-ui'
import { EntityTitleInput } from '@editor/plugins/serlo-template-plugins/common/entity-title-input'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { CourseNavigation } from './course-navigation'
import type { CourseProps } from '..'

export function CourseEditor(props: CourseProps) {
  const { state } = props
  const { pages } = state

  const editorStrings = useEditorStrings()
  const courseStrings = editorStrings.templatePlugins.course

  const [courseNavOpen, setCourseNavOpen] = useState(true)
  const [activePageIndex, setActivePageIndex] = useState(0)

  const activePage = pages.at(activePageIndex)

  // make sure that is at least one page
  useEffect(() => {
    if (pages.length) return
    createPage()
    // only on first load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const hashId = window.location.hash.substring(1)
    if (!hashId) return
    const index = pages.findIndex(({ id }) => id.value === hashId)
    setActivePageIndex(Math.max(index, 0))
    // only on first load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      {activePage ? (
        <div
          key={activePage.id.value}
          className="mt-16 border-t-2 border-editor-primary-200 pt-2"
        >
          <EntityTitleInput title={activePage.title} forceFocus />
          {activePage.content.render()}
        </div>
      ) : null}
    </>
  )

  function createPage() {
    const id = generateNewId()
    pages.insert(pages.length, {
      id,
      title: '',
      content: { plugin: EditorPluginType.Rows },
    })
    return id
  }

  function renderAddButton() {
    return (
      <AddButton
        onClick={() => {
          const id = createPage()
          setTimeout(() => {
            setActivePageIndex(pages.length)
            window.location.hash = `#${id}`
          }, 30)
        }}
      >
        {courseStrings.addCoursePage}
      </AddButton>
    )
  }

  function generateNewId() {
    const newId = uuidv4().slice(0, 5)
    if (pages.some(({ id }) => id.value === newId)) return generateNewId()
    return newId
  }
}
