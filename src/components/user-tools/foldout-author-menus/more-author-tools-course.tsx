import { faTools } from '@fortawesome/free-solid-svg-icons/faTools'
import { List, Item, Trigger, Content } from '@radix-ui/react-navigation-menu'

import { UserToolsItem } from '../user-tools-item'
import { AuthorTools, Tool } from './author-tools'
import type { MoreAuthorToolsProps } from './more-author-tools'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { UuidType } from '@/data-types'

export function MoreAuthorToolsCourse({
  data,
  aboveContent,
}: MoreAuthorToolsProps) {
  const loggedInData = useLoggedInData()

  if (!data || !loggedInData) return null

  const isEmptyCourse = data.type === UuidType.Course

  const hasCourseRevisions =
    data.unrevisedCourseRevisions && data.unrevisedCourseRevisions > 0
  const hasUnrevised =
    data.unrevisedRevisions !== undefined && data.unrevisedRevisions > 0

  return (
    <>
      {renderSettingsItem(true)}
      {isEmptyCourse ? null : renderSettingsItem(false)}
    </>
  )

  function renderSettingsItem(wholeCourse: boolean) {
    if (!data || !loggedInData) return null
    return (
      <Item>
        <Trigger>
          <UserToolsItem
            title={
              wholeCourse
                ? loggedInData.strings.authorMenu.wholeCourse
                : loggedInData.strings.authorMenu.thisCoursePage
            }
            aboveContent={aboveContent}
            icon={faTools}
          />
        </Trigger>

        <Content>
          <List className="absolute w-56 z-50 pt-2 right-0 lg:right-48 lg:bottom-0">
            <div className="serlo-sub-list-hover">
              <AuthorTools
                entityId={wholeCourse ? data.courseId || data.id : data.id}
                data={data}
                tools={getToolsArray(wholeCourse)}
              />
            </div>
          </List>
        </Content>
      </Item>
    )
  }

  function getToolsArray(wholeCourse: boolean) {
    return wholeCourse
      ? [
          Tool.Abo,
          hasCourseRevisions ? Tool.UnrevisedEdit : Tool.Edit,
          Tool.History,
          Tool.SortCoursePages,
          Tool.Curriculum,
          Tool.Log,
          Tool.Trash,
        ]
      : [
          Tool.Abo,
          hasUnrevised ? Tool.UnrevisedEdit : Tool.Edit,
          Tool.History,
          Tool.Log,
          Tool.AnalyticsLink,
          Tool.Trash,
        ]
  }
}
