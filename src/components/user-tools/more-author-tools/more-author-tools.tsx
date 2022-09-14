import { faTools } from '@fortawesome/free-solid-svg-icons/faTools'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'

import { AuthorTools, AuthorToolsData, Tool } from '../author-tools'
import { UserToolsItem } from '../user-tools-item'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { ExerciseInlineType, UuidType } from '@/data-types'

export interface MoreAuthorToolsProps {
  data?: AuthorToolsData
  aboveContent?: boolean
}

export function MoreAuthorTools({ data, aboveContent }: MoreAuthorToolsProps) {
  const loggedInData = useLoggedInData()

  if (!data) return null

  if (!data || !loggedInData) return null
  const supportedTypes: AuthorToolsData['type'][] = [
    UuidType.Page,
    UuidType.Article,
    UuidType.Video,
    UuidType.Applet,
    UuidType.Event,
    UuidType.CoursePage,
    UuidType.TaxonomyTerm,
    ExerciseInlineType.Exercise,
    ExerciseInlineType.ExerciseGroup,
    ExerciseInlineType.Solution,
  ]
  if (!supportedTypes.includes(data.type)) return null

  return (
    <NavigationMenu.Item>
      <NavigationMenu.Trigger>
        <UserToolsItem
          title={loggedInData.strings.tools}
          aboveContent={aboveContent}
          icon={faTools}
        />
      </NavigationMenu.Trigger>

      <NavigationMenu.Content>
        <NavigationMenu.List className="absolute w-56 z-50 pt-2 right-0 lg:right-48 lg:bottom-0">
          <div className="serlo-sub-list-hover">
            <AuthorTools
              entityId={data.id}
              data={data}
              tools={getToolsArray()}
            />
          </div>
        </NavigationMenu.List>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  )

  function getToolsArray(): Tool[] {
    if (!data) return []
    switch (data.type) {
      case UuidType.Page:
        return [Tool.Abo, Tool.History, Tool.Log, Tool.AnalyticsLink]
      case UuidType.Article:
      case UuidType.Video:
      case UuidType.Applet:
      case UuidType.Event:
        return [
          Tool.Abo,
          Tool.History,
          Tool.Curriculum,
          Tool.Log,
          Tool.AnalyticsLink,
          Tool.Trash,
        ]
      case UuidType.TaxonomyTerm:
        return [
          Tool.Abo,
          Tool.Organize,
          Tool.Log,
          Tool.AnalyticsLink,
          Tool.NewEntitySubmenu,
          Tool.SortEntities,
          Tool.CopyItems,
          Tool.MoveItems,
          Tool.Trash,
        ]
    }
    return []
  }
}
