import { faTools } from '@fortawesome/free-solid-svg-icons/faTools'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'

import { AuthorTools, Tool } from '../author-tools'
import { UserToolsItem } from '../user-tools-item'
import type { MoreAuthorToolsProps } from './more-author-tools'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

export function MoreAuthorToolsCourse({
  data,
  aboveContent,
}: MoreAuthorToolsProps) {
  const loggedInData = useLoggedInData()

  if (!data || !loggedInData) return null

  const hasCourseRevisions =
    data.unrevisedCourseRevisions && data.unrevisedCourseRevisions > 0
  const hasUnrevised =
    data.unrevisedRevisions !== undefined && data.unrevisedRevisions > 0

  return (
    <>
      {renderSettingsItem(true)}
      {renderSettingsItem(false)}
    </>
  )

  function renderSettingsItem(whole: boolean) {
    if (!data || !loggedInData) return null
    return (
      <NavigationMenu.Item>
        <NavigationMenu.Trigger>
          <UserToolsItem
            title={
              whole
                ? loggedInData.strings.authorMenu.wholeCourse
                : loggedInData.strings.authorMenu.thisCoursePage
            }
            aboveContent={aboveContent}
            icon={faTools}
          />
        </NavigationMenu.Trigger>

        <NavigationMenu.Content>
          <NavigationMenu.List className="absolute w-56 z-50 pt-2 right-0 lg:right-48 lg:bottom-0">
            <div className="serlo-sub-list-hover">
              <AuthorTools
                entityId={whole ? data.courseId || data.id : data.id}
                data={data}
                tools={getToolsArray(whole)}
              />
            </div>
          </NavigationMenu.List>
        </NavigationMenu.Content>
      </NavigationMenu.Item>
    )
  }

  function getToolsArray(whole: boolean) {
    return whole
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
