import { faTools, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { List, Item, Trigger, Content } from '@radix-ui/react-navigation-menu'

import { AuthorTools, AuthorToolsData, Tool } from './author-tools'
import { UserToolsItem } from '../user-tools-item'
import {
  preventHover,
  useNavMenuTriggerFix,
} from '@/components/navigation/header/menu/use-nav-menu-trigger-fix'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { ExerciseInlineType, UuidType } from '@/data-types'

export interface MoreAuthorToolsProps {
  data?: AuthorToolsData
  aboveContent?: boolean
  taxNewItems?: boolean
  title?: string
}

const supportedTypes: AuthorToolsData['typename'][] = [
  UuidType.Page,
  UuidType.Article,
  UuidType.Video,
  UuidType.Applet,
  UuidType.Event,
  UuidType.CoursePage,
  UuidType.TaxonomyTerm,
  ExerciseInlineType.Exercise,
  ExerciseInlineType.ExerciseGroup,
]

export function MoreAuthorTools({
  data,
  aboveContent,
  taxNewItems,
  title,
}: MoreAuthorToolsProps) {
  const triggerFix = useNavMenuTriggerFix()

  const loggedInData = useLoggedInData()
  const { strings } = useInstanceData()

  if (!data || !loggedInData) return null

  if (!supportedTypes.includes(data.typename)) return null

  return (
    <Item>
      <Trigger {...triggerFix}>
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

      <Content onPointerEnter={preventHover}>
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
    switch (data.typename) {
      case UuidType.Page:
        return [Tool.Abo, Tool.History, Tool.Log, Tool.AnalyticsLink]
      case UuidType.Article:
      case UuidType.Video:
      case UuidType.Applet:
        return [
          Tool.Abo,
          Tool.History,
          Tool.Curriculum,
          Tool.Log,
          Tool.AnalyticsLink,
          Tool.ChangeLicense,
          Tool.Trash,
        ]
      case UuidType.Event:
        return [Tool.Abo, Tool.History, Tool.Curriculum, Tool.Log, Tool.Trash]
      case UuidType.TaxonomyTerm:
        return taxNewItems
          ? [Tool.NewEntitySubmenu]
          : [
              Tool.Abo,
              Tool.EditTax,
              Tool.Log,
              Tool.AnalyticsLink,
              Tool.SortEntities,
              Tool.MoveOrCopyItems,
              Tool.Trash,
            ]
    }
    return []
  }
}
