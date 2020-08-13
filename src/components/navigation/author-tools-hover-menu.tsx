import Tippy from '@tippyjs/react'
import styled from 'styled-components'

import { SubList, SubLink, SubButtonStyle } from './menu'

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
  if (data.type == 'Page') {
    return (
      <HoverDiv>
        {abo()}
        {convert()}
        <Li>
          <SubLink href={`/page/revision/revisions/${data.id}`} noCSR>
            <SubButtonStyle>Bearbeitungsverlauf</SubButtonStyle>
          </SubLink>
        </Li>
        {log()}
        <Li>
          <SubLink href={`/page/update/${data.id}`} noCSR>
            <SubButtonStyle>Einstellungen</SubButtonStyle>
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
                    Diesen Inhalt zu einem anderen Überelement (course)
                    verschieben
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
              <SubButtonStyle>Diese Kursseite</SubButtonStyle>
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
                  <SubButtonStyle>Kursseite hinzufügen</SubButtonStyle>
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
              <SubButtonStyle>Gesamter Kurs</SubButtonStyle>
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
            <SubButtonStyle>Baumstruktur bearbeiten</SubButtonStyle>
          </SubLink>
        </Li>

        {log()}
        {sort()}

        <Li>
          <SubLink href={`/taxonomy/term/copy/batch/${data.id}`} noCSR>
            <SubButtonStyle>Elemente kopieren</SubButtonStyle>
          </SubLink>
        </Li>

        <Li>
          <SubLink href={`/taxonomy/term/move/batch/${data.id}`} noCSR>
            <SubButtonStyle>Elemente verschieben</SubButtonStyle>
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
              <SubButtonStyle>grouped-text-exercise hinzufügen</SubButtonStyle>
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
                Diesen Inhalt zu einem anderen Überelement (
                {data.grouped ? 'grouped-text-exercise' : 'text-exercise'})
                verschieben
              </SubButtonStyle>
            </SubLink>
          </Li>
        ) : (
          curriculum()
        )}

        <Li>
          <SubLink href={`/entity/license/update/${data.id}`} noCSR>
            <SubButtonStyle>Lizenz auswählen</SubButtonStyle>
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
                <SubButtonStyle>Benachrichtigungen erhalten</SubButtonStyle>
              </SubLink>
            </Li>

            <Li>
              <SubLink href={`/subscribe/${id}/1`} noCSR>
                <SubButtonStyle>
                  Benachrichtigungen und E-Mail erhalten
                </SubButtonStyle>
              </SubLink>
            </Li>
          </HoverDiv>
        }
      >
        <Li>
          <SubLink as="div">
            <SubButtonStyle>Abonnieren (?)</SubButtonStyle>
          </SubLink>
        </Li>
      </Tippy>
    )
  }

  function convert(id = data.id, rev = data.revisionId) {
    return (
      <Li>
        <SubLink href={`/page/revision/create/${id}/${rev}`} noCSR>
          <SubButtonStyle>Konvertieren (beta)</SubButtonStyle>
        </SubLink>
      </Li>
    )
  }

  function history(id = data.id) {
    return (
      <Li>
        <SubLink href={`/entity/repository/history/${id}`} noCSR>
          <SubButtonStyle>Bearbeitungsverlauf</SubButtonStyle>
        </SubLink>
      </Li>
    )
  }

  function log(id = data.id) {
    return (
      <Li>
        <SubLink href={`/event/history/${id}`} noCSR>
          <SubButtonStyle>Aktivitätenlog</SubButtonStyle>
        </SubLink>
      </Li>
    )
  }

  function curriculum(id = data.id) {
    return (
      <Li>
        <SubLink href={`/entity/taxonomy/update/${id}`} noCSR>
          <SubButtonStyle>
            Zuweisung zu Themen und Lehrplänen bearbeiten
          </SubButtonStyle>
        </SubLink>
      </Li>
    )
  }

  function flag(id = data.id) {
    return (
      <Li>
        <SubLink href={`/flag/add/${id}`} noCSR>
          <SubButtonStyle>Inhalt melden</SubButtonStyle>
        </SubLink>
      </Li>
    )
  }

  function trash(id = data.id) {
    // todo: use graphql mutation
    return (
      <Li>
        <SubLink href={`/uuid/trash/${id}`} noCSR>
          <SubButtonStyle>In den Papierkorb verschieben (?)</SubButtonStyle>
        </SubLink>
      </Li>
    )
  }

  function sort(id = data.id) {
    return (
      <Li>
        <SubLink href={`/entity/link/order/${id}/link`} noCSR>
          <SubButtonStyle>Unterelemente sortieren</SubButtonStyle>
        </SubLink>
      </Li>
    )
  }

  function edit(id = data.id) {
    return (
      <Li>
        <SubLink href={`/entity/repository/add-revision/${id}`} noCSR>
          <SubButtonStyle>Bearbeiten</SubButtonStyle>
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
