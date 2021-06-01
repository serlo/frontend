import Tippy, { TippyProps } from '@tippyjs/react'

import { SubLink } from '../navigation/sub-link'
import { AuthorTools, Tool } from './author-tools'
import { HoverSubList } from './hover-sub-list'
import { SubButtonStyle } from './sub-button-style'
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
}

export interface AuthorToolsHoverMenuProps {
  data: AuthorToolsData
}

const tippyDefaultProps: Partial<TippyProps> = {
  delay: [0, 270],
  interactiveBorder: 40,
  interactive: true,
  placement: 'left-end',
  trigger: 'click mouseenter focus',
}

export function AuthorToolsHoverMenu({ data }: AuthorToolsHoverMenuProps) {
  const loggedInData = useLoggedInData()

  if (!loggedInData) return null
  const loggedInStrings = loggedInData.strings

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
    <HoverSubList>
      <AuthorTools entityId={data.id} data={data} tools={getToolsArray()} />
    </HoverSubList>
  )

  function getToolsArray(): Tool[] {
    switch (data.type) {
      case 'Page':
        return [
          Tool.Abo,
          Tool.PageConvert,
          Tool.PageHistory,
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
    return (
      <HoverSubList>
        <Tippy
          {...tippyDefaultProps}
          content={
            <HoverSubList>
              <AuthorTools
                entityId={data.id}
                data={data}
                tools={[
                  Tool.Abo,
                  Tool.History,
                  Tool.MoveCoursePage,
                  Tool.Log,
                  Tool.Trash,
                ]}
              />
            </HoverSubList>
          }
        >
          <li className="block">
            <SubLink>
              <SubButtonStyle>
                ◂ {loggedInStrings.authorMenu.thisCoursePage}
              </SubButtonStyle>
            </SubLink>
          </li>
        </Tippy>
        <Tippy
          {...tippyDefaultProps}
          content={
            <HoverSubList>
              <AuthorTools
                data={data}
                tools={[
                  Tool.Edit,
                  Tool.Abo,
                  Tool.History,
                  Tool.AddCoursePage,
                  Tool.Sort,
                  Tool.Curriculum,
                  Tool.Log,
                  Tool.Trash,
                ]}
                entityId={data.courseId || data.id}
              />
            </HoverSubList>
          }
        >
          <li className="block">
            <SubLink>
              <SubButtonStyle>
                ◂ {loggedInStrings.authorMenu.wholeCourse}
              </SubButtonStyle>
            </SubLink>
          </li>
        </Tippy>
      </HoverSubList>
    )
  }
  function renderExercise() {
    return (
      <HoverSubList>
        <AuthorTools
          entityId={data.id}
          data={data}
          tools={[Tool.Edit, Tool.Abo, Tool.History]}
        />

        {data.type == '_ExerciseGroupInline' && (
          <AuthorTools
            entityId={data.id}
            data={data}
            tools={[Tool.AddGroupedTextExercise]}
          />
        )}

        {data.type != '_SolutionInline' && (
          <AuthorTools entityId={data.id} data={data} tools={[Tool.Sort]} />
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
          tools={[Tool.ChangeLicense, Tool.Log, Tool.Trash]}
        />
      </HoverSubList>
    )
  }
}
