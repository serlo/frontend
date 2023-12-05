import { faTools } from '@fortawesome/free-solid-svg-icons'
import {
  Root,
  List,
  Item,
  Trigger,
  Content,
} from '@radix-ui/react-navigation-menu'

import { AuthorTools, Tool } from './author-tools'
import type { MoreAuthorToolsProps } from './more-author-tools'
import { FaIcon } from '@/components/fa-icon'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { ExerciseInlineType, UuidType } from '@/data-types'
import { cn } from '@/helper/cn'
import { getTranslatedType } from '@/helper/get-translated-type'

export function AuthorToolsExercises({ data }: MoreAuthorToolsProps) {
  const loggedInData = useLoggedInData()
  const { strings } = useInstanceData()
  if (!data || !loggedInData) return null

  const hasUnrevised =
    data.unrevisedRevisions !== undefined && data.unrevisedRevisions > 0

  const type = getTranslatedType(
    strings,
    data.type === ExerciseInlineType.Exercise
      ? UuidType.Exercise
      : data.type === ExerciseInlineType.ExerciseGroup
        ? UuidType.ExerciseGroup
        : UuidType.Exercise
  )

  return (
    <Root>
      <List>
        <Item>
          <Trigger
            className={cn(`
              serlo-button ml-1 hidden h-8 w-8
              p-0 text-center text-base leading-8
              text-brandgreen hover:bg-brandgreen hover:text-white sm:inline-block
            `)}
          >
            <FaIcon icon={faTools} />
          </Trigger>
          <Content>
            <List className="absolute right-0 top-0 z-30 w-56 pt-2">
              <div className="serlo-sub-list-hover">
                <li className="ml-2 font-bold">{type}</li>
                <AuthorTools
                  entityId={data.id}
                  data={data}
                  tools={getToolsArray()}
                />
              </div>
            </List>
          </Content>
        </Item>
      </List>
    </Root>
  )

  function getToolsArray() {
    if (!data) return []
    return [
      Tool.Abo,
      ...(hasUnrevised ? [Tool.UnrevisedEdit] : [Tool.Edit, Tool.History]),
      Tool.SortGroupedExercises,
      Tool.Curriculum,
      Tool.ChangeLicense,
      Tool.Log,
      Tool.Trash,
      Tool.DirectLink,
    ]
  }
}
