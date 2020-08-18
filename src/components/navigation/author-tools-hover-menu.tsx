import Tippy from '@tippyjs/react'
import styled from 'styled-components'

import { SubList, SubLink, SubButtonStyle } from './menu'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

export interface AuthorToolsData {
  type: string
  id: number
  revisionId?: number
  parentId?: number
  courseId?: number
  grouped?: boolean
}

export interface AuthorToolsHoverMenuProps {
  data: AuthorToolsData
}

export function AuthorToolsHoverMenu({ data }: AuthorToolsHoverMenuProps) {
  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const { strings } = loggedInData

  if (data.type == 'Page') {
    return (
      <HoverDiv>
        {abo()}
        {convert()}
        <Li>
          <SubLink href={`/page/revision/revisions/${data.id}`} noCSR>
            <SubButtonStyle>{strings.authorMenu.history}</SubButtonStyle>
          </SubLink>
        </Li>
        {log()}
        <Li>
          <SubLink href={`/page/update/${data.id}`} noCSR>
            <SubButtonStyle>{strings.authorMenu.settings}</SubButtonStyle>
          </SubLink>
        </Li>
      </HoverDiv>
    )
  }

  if (
    data.type == 'Article' ||
    data.type == 'Video' ||
    data.type == 'Applet' ||
    data.type == 'Event'
  ) {
    return (
      <HoverDiv>
        {abo()}
        {history()}
        {curriculum()}
        {flag()}
        {log()}
        {trash()}
      </HoverDiv>
    )
  }

  if (data.type == 'CoursePage') {
    return (
      <HoverDiv>
        <Tippy
          interactive
          placement="left-end"
          content={
            <HoverDiv>
              {abo()}
              {history()}

              <Li>
                <SubLink
                  href={`/entity/link/move/link/${data.id}/${data.courseId}`}
                  noCSR
                >
                  <SubButtonStyle>
                    {strings.authorMenu.moveCoursePage}
                  </SubButtonStyle>
                </SubLink>
              </Li>

              {flag()}
              {log()}
              {trash()}
            </HoverDiv>
          }
        >
          <Li>
            <SubLink as="div">
              <SubButtonStyle>
                {strings.authorMenu.thisCoursePage}
              </SubButtonStyle>
            </SubLink>
          </Li>
        </Tippy>
        <Tippy
          interactive
          placement="left-end"
          content={
            <HoverDiv>
              {abo(data.courseId)}
              {history(data.courseId)}

              <Li>
                <SubLink
                  href={`/entity/create/course-page?link%5Btype%5D=link&link%5Bchild%5D=${data.courseId}`}
                  noCSR
                >
                  <SubButtonStyle>
                    {strings.authorMenu.addCoursePage}
                  </SubButtonStyle>
                </SubLink>
              </Li>

              {sort(data.courseId)}
              {curriculum(data.courseId)}
              {flag(data.courseId)}
              {log(data.courseId)}
              {trash(data.courseId)}
            </HoverDiv>
          }
        >
          <Li>
            <SubLink as="div">
              <SubButtonStyle>{strings.authorMenu.wholeCourse}</SubButtonStyle>
            </SubLink>
          </Li>
        </Tippy>
      </HoverDiv>
    )
  }

  if (data.type == 'Taxonomy') {
    return (
      <HoverDiv>
        {abo()}

        <Li>
          <SubLink href={`/taxonomy/term/organize/${data.id}`} noCSR>
            <SubButtonStyle>{strings.authorMenu.organize}</SubButtonStyle>
          </SubLink>
        </Li>

        {log()}
        {sort()}

        <Li>
          <SubLink href={`/taxonomy/term/copy/batch/${data.id}`} noCSR>
            <SubButtonStyle>{strings.authorMenu.copyItems}</SubButtonStyle>
          </SubLink>
        </Li>

        <Li>
          <SubLink href={`/taxonomy/term/move/batch/${data.id}`} noCSR>
            <SubButtonStyle>{strings.authorMenu.moveItems}</SubButtonStyle>
          </SubLink>
        </Li>
      </HoverDiv>
    )
  }

  if (
    data.type == '_ExerciseInline' ||
    data.type == '_ExerciseGroupInline' ||
    data.type == '_SolutionInline'
  ) {
    return (
      <HoverDiv>
        {edit()}
        {abo()}

        {history()}

        {data.type == '_ExerciseGroupInline' && (
          <Li>
            <SubLink
              href={`/entity/create/grouped-text-exercise?link%5Btype%5D=link&link%5Bchild%5D=${data.id}`}
              noCSR
            >
              <SubButtonStyle>
                {strings.authorMenu.addGroupedTextExercise}
              </SubButtonStyle>
            </SubLink>
          </Li>
        )}

        {data.type != '_SolutionInline' && sort()}

        {data.type == '_SolutionInline' ? (
          <Li>
            <SubLink
              href={`/entity/link/move/link/${data.id}/${data.parentId}`}
              noCSR
            >
              <SubButtonStyle>
                {data.grouped
                  ? strings.authorMenu.moveToGroupedTextExercise
                  : strings.authorMenu.moveToTextExercise}
              </SubButtonStyle>
            </SubLink>
          </Li>
        ) : (
          curriculum()
        )}

        <Li>
          <SubLink href={`/entity/license/update/${data.id}`} noCSR>
            <SubButtonStyle>{strings.authorMenu.changeLicense}</SubButtonStyle>
          </SubLink>
        </Li>

        {flag()}
        {log()}
        {trash()}
      </HoverDiv>
    )
  }

  function abo(id = data.id) {
    // todo: check if entity is already subscribed
    return (
      <Tippy
        interactive
        placement="left-end"
        content={
          <HoverDiv>
            <Li>
              <SubLink href={`/subscribe/${id}/0`} noCSR>
                <SubButtonStyle>
                  {strings.authorMenu.subscribeNotifications}
                </SubButtonStyle>
              </SubLink>
            </Li>

            <Li>
              <SubLink href={`/subscribe/${id}/1`} noCSR>
                <SubButtonStyle>
                  {strings.authorMenu.subscribeNotificationsAndMail}
                </SubButtonStyle>
              </SubLink>
            </Li>
          </HoverDiv>
        }
      >
        <Li>
          <SubLink as="div">
            <SubButtonStyle>{strings.authorMenu.subscribe}</SubButtonStyle>
          </SubLink>
        </Li>
      </Tippy>
    )
  }

  function convert(id = data.id, rev = data.revisionId) {
    return (
      <Li>
        <SubLink href={`/page/revision/create/${id}/${rev}`} noCSR>
          <SubButtonStyle>{strings.authorMenu.convert}</SubButtonStyle>
        </SubLink>
      </Li>
    )
  }

  function history(id = data.id) {
    return (
      <Li>
        <SubLink href={`/entity/repository/history/${id}`} noCSR>
          <SubButtonStyle>{strings.authorMenu.history}</SubButtonStyle>
        </SubLink>
      </Li>
    )
  }

  function log(id = data.id) {
    return (
      <Li>
        <SubLink href={`/event/history/${id}`} noCSR>
          <SubButtonStyle>{strings.authorMenu.log}</SubButtonStyle>
        </SubLink>
      </Li>
    )
  }

  function curriculum(id = data.id) {
    return (
      <Li>
        <SubLink href={`/entity/taxonomy/update/${id}`} noCSR>
          <SubButtonStyle>{strings.authorMenu.editAssignments}</SubButtonStyle>
        </SubLink>
      </Li>
    )
  }

  function flag(id = data.id) {
    return (
      <Li>
        <SubLink href={`/flag/add/${id}`} noCSR>
          <SubButtonStyle>{strings.authorMenu.flagContent}</SubButtonStyle>
        </SubLink>
      </Li>
    )
  }

  function trash(id = data.id) {
    // todo: use graphql mutation
    return (
      <Li>
        <SubLink href={`/uuid/trash/${id}`} noCSR>
          <SubButtonStyle>{strings.authorMenu.moveToTrash}</SubButtonStyle>
        </SubLink>
      </Li>
    )
  }

  function sort(id = data.id) {
    return (
      <Li>
        <SubLink href={`/entity/link/order/${id}/link`} noCSR>
          <SubButtonStyle>{strings.authorMenu.sort}</SubButtonStyle>
        </SubLink>
      </Li>
    )
  }

  function edit(id = data.id) {
    return (
      <Li>
        <SubLink href={`/entity/repository/add-revision/${id}`} noCSR>
          <SubButtonStyle>{strings.authorMenu.edit}</SubButtonStyle>
        </SubLink>
      </Li>
    )
  }

  return null
}

const HoverDiv = styled(SubList)`
  background-color: ${(props) => props.theme.colors.lightBackground};
`

const Li = styled.li`
  display: block;
`
