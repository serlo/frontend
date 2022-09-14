import { faLayerGroup } from '@fortawesome/free-solid-svg-icons/faLayerGroup'
import { faTools } from '@fortawesome/free-solid-svg-icons/faTools'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import clsx from 'clsx'

import { AuthorTools, Tool } from './author-tools'
import type { MoreAuthorToolsProps } from './more-author-tools'
import { FaIcon } from '@/components/fa-icon'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { ExerciseInlineType, UuidType } from '@/data-types'
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
      : data.type === ExerciseInlineType.Solution
      ? UuidType.Solution
      : UuidType.Exercise
  )

  return (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger
            className={clsx(
              'hidden sm:inline-block serlo-button text-center text-truegray-800',
              'hover:bg-brand hover:text-white text-base leading-8',
              'w-8 h-8 ml-1 p-0'
            )}
          >
            <FaIcon
              icon={
                data.type == ExerciseInlineType.ExerciseGroup
                  ? faLayerGroup
                  : faTools
              }
            />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <NavigationMenu.List className="absolute w-56 z-50 pt-2 right-0 top-0">
              <div className="serlo-sub-list-hover">
                <li className="ml-2 font-bold">{type}</li>
                <AuthorTools
                  entityId={data.id}
                  data={data}
                  tools={getToolsArray()}
                />
              </div>
            </NavigationMenu.List>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  )

  function getToolsArray() {
    if (!data) return []
    const noSolution = data.type != ExerciseInlineType.Solution
    return [
      Tool.Abo,
      ...(hasUnrevised ? [Tool.UnrevisedEdit] : [Tool.Edit, Tool.History]),
      ...(noSolution ? [Tool.SortGroupedExercises] : []),
      ...(ExerciseInlineType.Solution
        ? [Tool.MoveToExercise]
        : [Tool.Curriculum]),
      Tool.ChangeLicense,
      Tool.Log,
      Tool.Trash,
      ...(noSolution ? [Tool.DirectLink] : []),
    ]
  }
}
