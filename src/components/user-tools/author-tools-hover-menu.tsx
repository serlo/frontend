import { TaxonomyTermType } from '@serlo/api'
import Tippy, { TippyProps } from '@tippyjs/react'

import { AuthorTools, Tool } from './author-tools'
import { MenuSubButtonLink } from './menu-sub-button-link'
import { ExerciseInlineType } from '@/components/content/exercises/exercise-author-tools'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { UuidType, UuidWithRevType } from '@/data-types'
import { getTranslatedType } from '@/helper/get-translated-type'

export interface AuthorToolsData {
  type: UuidWithRevType | ExerciseInlineType
  id: number
  alias?: string
  taxonomyType?: TaxonomyTermType
  revisionId?: number
  parentId?: number
  courseId?: number
  grouped?: boolean
  trashed?: boolean
  checkoutRejectButtons?: JSX.Element
  unrevisedRevisions?: number
  unrevisedCourseRevisions?: number
}

export interface AuthorToolsHoverMenuProps {
  data: AuthorToolsData
}

export const tippyDefaultProps: Partial<TippyProps> = {
  delay: [0, 270],
  interactiveBorder: 40,
  interactive: true,
  placement: 'left-end',
  trigger: 'click mouseenter focus',
}

export function AuthorToolsHoverMenu({ data }: AuthorToolsHoverMenuProps) {
  const loggedInData = useLoggedInData()
  const { strings } = useInstanceData()

  if (!loggedInData) return null
  const loggedInStrings = loggedInData.strings
  const hasUnrevised =
    data.unrevisedRevisions !== undefined && data.unrevisedRevisions > 0

  if (data.type == UuidType.CoursePage) {
    return renderCoursePage()
  }

  if (
    data.type == ExerciseInlineType.Exercise ||
    data.type == ExerciseInlineType.ExerciseGroup ||
    data.type == ExerciseInlineType.Solution
  ) {
    return renderExercise()
  }

  return (
    <ul className="serlo-sub-list-hover">
      <AuthorTools entityId={data.id} data={data} tools={getToolsArray()} />
    </ul>
  )

  function getToolsArray(): Tool[] {
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

  function renderCoursePage() {
    const hasCourseRevisions =
      data.unrevisedCourseRevisions && data.unrevisedCourseRevisions > 0

    return (
      <ul className="serlo-sub-list-hover">
        <Tippy
          {...tippyDefaultProps}
          content={
            <ul className="serlo-sub-list-hover">
              {/* Author tools for this course page */}
              <AuthorTools
                entityId={data.id}
                data={data}
                tools={[
                  hasUnrevised ? Tool.UnrevisedEdit : Tool.Edit,
                  Tool.Abo,
                  Tool.History,
                  Tool.MoveCoursePage,
                  Tool.Log,
                  Tool.AnalyticsLink,
                  Tool.Trash,
                ]}
              />
            </ul>
          }
        >
          <li className="block">
            <MenuSubButtonLink>
              ◂ {loggedInStrings.authorMenu.thisCoursePage}
            </MenuSubButtonLink>
          </li>
        </Tippy>
        <Tippy
          {...tippyDefaultProps}
          content={
            <ul className="serlo-sub-list-hover">
              {/* Author tools for course */}
              <AuthorTools
                data={data}
                tools={[
                  hasCourseRevisions ? Tool.UnrevisedEdit : Tool.Edit,
                  Tool.History,
                  Tool.Abo,
                  Tool.AddCoursePage,
                  Tool.SortCoursePages,
                  Tool.Curriculum,
                  Tool.Log,
                  Tool.Trash,
                ]}
                entityId={data.courseId || data.id}
              />
            </ul>
          }
        >
          <li className="block">
            <MenuSubButtonLink>
              ◂ {loggedInStrings.authorMenu.wholeCourse}
            </MenuSubButtonLink>
          </li>
        </Tippy>
      </ul>
    )
  }
  function renderExercise() {
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
      <ul className="serlo-sub-list-hover">
        <li className="mb-1.5 ml-2 font-bold">{type}</li>
        <AuthorTools
          entityId={data.id}
          data={data}
          tools={
            hasUnrevised ? [Tool.UnrevisedEdit] : [Tool.Edit, Tool.History]
          }
        />

        {data.type == ExerciseInlineType.ExerciseGroup && (
          <AuthorTools
            entityId={data.id}
            data={data}
            tools={[Tool.AddGroupedTextExercise]}
          />
        )}

        {data.type != ExerciseInlineType.Solution && (
          <AuthorTools
            entityId={data.id}
            data={data}
            tools={[Tool.SortGroupedExercises]}
          />
        )}

        {data.type == ExerciseInlineType.Solution ? (
          <AuthorTools
            entityId={data.id}
            data={data}
            tools={[Tool.MoveToExercise]}
          />
        ) : (
          <AuthorTools
            entityId={data.id}
            data={data}
            tools={[Tool.Curriculum]}
          />
        )}

        <AuthorTools
          entityId={data.id}
          data={data}
          tools={[Tool.ChangeLicense, Tool.Log, Tool.Abo, Tool.Trash]}
        />
        {data.type != ExerciseInlineType.Solution && (
          <AuthorTools
            entityId={data.id}
            data={data}
            tools={[Tool.DirectLink]}
          />
        )}
      </ul>
    )
  }
}
