import { AddButton } from '@editor/editor-ui'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { EntityTitleInput } from '@editor/plugins/serlo-template-plugins/common/entity-title-input'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { useEffect, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'

import type { CourseProps } from '.'
import { EditorCourseNavigation } from './editor-course-navigation'
import { CoursePagesRenderer } from './renderer/course-pages-renderer'

export function CourseEditor(props: CourseProps) {
  const { state } = props
  const { pages } = state

  const editorStrings = useEditStrings()
  const courseStrings = editorStrings.templatePlugins.course

  // make sure that is at least one page
  useEffect(() => {
    if (pages.length) return
    createPage()
    // only on first load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleAddClick() {
    const id = createPage()
    setTimeout(() => (window.location.hash = `#${id}`), 30)
  }

  const rendererPages = useMemo(
    () =>
      pages.map((page) => ({
        id: page.id.value,
        title: page.title.value,
        titleElement: <EntityTitleInput title={page.title} forceFocus />,
        contentElement: page.content.render(),
      })),
    [pages]
  )

  return (
    <>
      <EditorCourseNavigation pages={pages} />
      <br />
      <AddButton onClick={handleAddClick}>
        {courseStrings.addCoursePage}
      </AddButton>

      <CoursePagesRenderer pages={rendererPages} />
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

  function generateNewId() {
    const newId = uuidv4().slice(0, 5)
    if (pages.some(({ id }) => id.value === newId)) return generateNewId()
    return newId
  }
}
