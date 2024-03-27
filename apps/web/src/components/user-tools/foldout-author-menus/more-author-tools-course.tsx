import { faTools } from '@fortawesome/free-solid-svg-icons'
import { List, Item, Trigger, Content } from '@radix-ui/react-navigation-menu'

import { AuthorTools, Tool } from './author-tools'
import type { MoreAuthorToolsProps } from './more-author-tools'
import { UserToolsItem } from '../user-tools-item'
import {
  preventHover,
  useNavMenuTriggerFix,
} from '@/components/navigation/header/menu/use-nav-menu-trigger-fix'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { UuidType } from '@/data-types'

export function MoreAuthorToolsCourse({
  data,
  aboveContent,
}: MoreAuthorToolsProps) {
  const triggerFix = useNavMenuTriggerFix()

  const loggedInData = useLoggedInData()

  if (!data || !loggedInData) return null

  const isEmptyCourse = data.type === UuidType.Course

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
        <Trigger {...triggerFix}>
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

        <Content onPointerEnter={preventHover}>
          <List className="absolute right-0 z-50 w-56 pt-2 lg:bottom-0 lg:right-48">
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
          Tool.History,
          Tool.SortCoursePages,
          Tool.Curriculum,
          Tool.Log,
          Tool.ChangeLicense,
          Tool.Trash,
        ]
      : [Tool.Abo, Tool.History, Tool.Log]
  }
}
