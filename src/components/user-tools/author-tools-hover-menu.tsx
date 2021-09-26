import Tippy, { TippyProps } from '@tippyjs/react'

import { AuthorTools, Tool } from './author-tools'
import { MenuSubButtonLink } from './menu-sub-button-link'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

export interface AuthorToolsData {
  type: string
  id: number
  taxonomyFolder?: boolean
  taxonomyTopic?: boolean
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
  const instanceData = useInstanceData()

  if (!loggedInData) return null
  const loggedInStrings = loggedInData.strings
  const hasUnrevised =
    data.unrevisedRevisions !== undefined && data.unrevisedRevisions > 0

  if (data.type == 'CoursePage') {
    return renderCoursePage()
  }

  if (
    data.type == '_ExerciseInline' ||
    data.type == '_ExerciseGroupInline' ||
    data.type == '_SolutionInline'
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
      case 'Page':
        return [
          Tool.Abo,
          Tool.PageConvert,
          Tool.History,
          Tool.Log,
          Tool.PageSetting,
        ]
      case 'Article':
      case 'Video':
      case 'Applet':
      case 'Event':
        return [Tool.Abo, Tool.History, Tool.Curriculum, Tool.Log, Tool.Trash]
      case 'Taxonomy':
        return [
          Tool.Abo,
          Tool.Organize,
          Tool.Log,
          Tool.NewEntitySubmenu,
          Tool.SortEntities,
          Tool.CopyItems,
          Tool.MoveItems,
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
    const entities = instanceData.strings.entities

    const typeName =
      entities[
        data.type === '_ExerciseInline'
          ? 'exercise'
          : data.type === '_ExerciseGroupInline'
          ? 'exerciseGroup'
          : data.type === '_SolutionInline'
          ? 'solution'
          : 'exercise'
      ]

    return (
      <ul className="serlo-sub-list-hover">
        <li className="mb-1.5 ml-2 font-bold">{typeName}</li>
        <AuthorTools
          entityId={data.id}
          data={data}
          tools={
            hasUnrevised ? [Tool.UnrevisedEdit] : [Tool.Edit, Tool.History]
          }
        />

        {data.type == '_ExerciseGroupInline' && (
          <AuthorTools
            entityId={data.id}
            data={data}
            tools={[Tool.AddGroupedTextExercise]}
          />
        )}

        {data.type != '_SolutionInline' && (
          <AuthorTools
            entityId={data.id}
            data={data}
            tools={[Tool.SortGroupedExercises]}
          />
        )}

        {data.type == '_SolutionInline' ? (
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
        {data.type != '_SolutionInline' && (
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
