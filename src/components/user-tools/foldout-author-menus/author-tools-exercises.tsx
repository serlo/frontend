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
import { getTranslatedType } from '@/helper/get-translated-type'
import { tw } from '@/helper/tw'

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
      : data.type === ExerciseInlineType.Solution
      ? UuidType.Solution
      : UuidType.Exercise
  )

  return (
    <Root>
      <List>
        <Item>
          <Trigger
            className={tw`
              serlo-button ml-1 hidden h-8 w-8
              p-0 text-center text-base leading-8
              text-brandgreen hover:bg-brandgreen hover:text-white sm:inline-block
            `}
          >
            <FaIcon icon={faTools} />
          </Trigger>
          <Content>
            <List className="absolute right-0 top-0 z-50 w-56 pt-2">
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
    const noSolution = data.type !== ExerciseInlineType.Solution
    return [
      Tool.Abo,
      ...(hasUnrevised ? [Tool.UnrevisedEdit] : [Tool.Edit, Tool.History]),
      ...(noSolution ? [Tool.SortGroupedExercises] : []),
      ...(ExerciseInlineType.Solution ? [] : [Tool.Curriculum]),
      Tool.ChangeLicense,
      Tool.Log,
      Tool.Trash,
      ...(noSolution ? [Tool.DirectLink] : []),
    ]
  }
}
