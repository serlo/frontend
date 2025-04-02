import { faTools } from '@fortawesome/free-solid-svg-icons'
import {
  Root,
  List,
  Item,
  Trigger,
  Content,
} from '@radix-ui/react-navigation-menu'

import { AuthorTools, Tool } from './author-tools'
import { FaIcon } from '@/components/fa-icon'
import {
  preventHover,
  useNavMenuTriggerFix,
} from '@/components/navigation/header/menu/use-nav-menu-trigger-fix'
import { useEntityMetaData } from '@/contexts/entity-meta-context'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { ExerciseInlineType, UuidType } from '@/data-types'
import { cn } from '@/helper/cn'
import { getTranslatedType } from '@/helper/get-translated-type'

export interface AuthorToolsExercisesProps {
  type: ExerciseInlineType
}

// typename: ExerciseInlineType.ExerciseGroup,
//               id: entityId,
//               trashed: trashed,
//               unrevisedRevisions: unrevisedRevisions,

// export function AuthorToolsExercises({ data }: MoreAuthorToolsProps) {
export function AuthorToolsExercises({ type }: AuthorToolsExercisesProps) {
  const triggerFix = useNavMenuTriggerFix()

  const loggedInData = useLoggedInData()
  const { strings } = useInstanceData()
  const { entityId, unrevisedRevisions, trashed } = useEntityMetaData()

  if (!loggedInData || !entityId) return null

  const hasUnrevised = Boolean(unrevisedRevisions)

  const typeString = getTranslatedType(
    strings,
    type === ExerciseInlineType.Exercise
      ? UuidType.Exercise
      : type === ExerciseInlineType.ExerciseGroup
        ? UuidType.ExerciseGroup
        : UuidType.Exercise
  )

  return (
    <Root>
      <List>
        <Item>
          <Trigger
            className={cn(`
              serlo-button-learner ml-1 hidden h-8 w-8
              p-0 text-center text-base leading-8
              text-brandgreen hover:bg-brandgreen hover:text-white sm:inline-block
            `)}
            {...triggerFix}
          >
            <FaIcon icon={faTools} />
          </Trigger>
          <Content onPointerEnter={preventHover}>
            <List className="absolute right-0 top-0 z-30 w-56 pt-2">
              <div className="serlo-sub-list-hover">
                <li className="ml-2 font-bold">{typeString}</li>
                <AuthorTools
                  entityId={entityId}
                  data={{
                    typename: type,
                    id: entityId,
                    trashed,
                    unrevisedRevisions,
                  }}
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
    return [
      Tool.Abo,
      ...(hasUnrevised ? [Tool.UnrevisedEdit] : [Tool.Edit, Tool.History]),
      Tool.Curriculum,
      Tool.ChangeLicense,
      Tool.Log,
      Tool.Trash,
      Tool.DirectLink,
    ]
  }
}
