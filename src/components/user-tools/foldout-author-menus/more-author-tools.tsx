import { faTools, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { List, Item, Trigger, Content } from '@radix-ui/react-navigation-menu'

import { AuthorTools, AuthorToolsData, Tool } from './author-tools'
import { UserToolsItem } from '../user-tools-item'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { ExerciseInlineType, UuidType } from '@/data-types'

export interface MoreAuthorToolsProps {
  data?: AuthorToolsData
  aboveContent?: boolean
  taxNewItems?: boolean
  title?: string
}

export function MoreAuthorTools({
  data,
  aboveContent,
  taxNewItems,
  title,
}: MoreAuthorToolsProps) {
  const loggedInData = useLoggedInData()
  const { strings } = useInstanceData()

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
    <Item>
      <Trigger>
        <UserToolsItem
          title={
            taxNewItems
              ? title ?? strings.editOrAdd.addNewEntities
              : loggedInData.strings.tools
          }
          aboveContent={aboveContent}
          icon={taxNewItems ? faPlusCircle : faTools}
        />
      </Trigger>

      <Content>
        <List className="absolute right-0 z-50 w-56 pt-2 lg:bottom-0 lg:mr-44">
          <div className="serlo-sub-list-hover">
            <AuthorTools
              entityId={data.id}
              data={data}
              tools={getToolsArray()}
            />
          </div>
        </List>
      </Content>
    </Item>
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
        return taxNewItems
          ? [Tool.NewEntitySubmenu]
          : [
              Tool.Abo,
              Tool.EditTax,
              Tool.Log,
              Tool.AnalyticsLink,
              Tool.SortEntities,
              Tool.CopyItems,
              Tool.MoveItems,
              Tool.Trash,
            ]
    }
    return []
  }
}
