import { EntityTitleInput } from '@editor/plugins/serlo-template-plugins/common/entity-title-input'

import { type CourseProps } from '..'

export function CoursePage({
  coursePage,
}: {
  coursePage: CourseProps['state']['pages'][0]
}) {
  return (
    <div
      key={coursePage.id.value}
      className="mt-16 border-t-2 border-editor-primary-200 pt-2"
    >
      <EntityTitleInput title={coursePage.title} forceFocus />
      {coursePage.content.render()}
    </div>
  )
}
