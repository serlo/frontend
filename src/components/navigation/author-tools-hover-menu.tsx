import Tippy from '@tippyjs/react'
import styled from 'styled-components'

import { SubList, SubLink, SubButtonStyle } from './menu'

export interface AuthorToolsData {
  type: string
  id: number
  revisionId?: number
  parentId?: number
  courseId?: number
}

export interface AuthorToolsHoverMenuProps {
  data: AuthorToolsData
}

export function AuthorToolsHoverMenu({ data }: AuthorToolsHoverMenuProps) {
  if (data.type == 'Page') {
    return (
      <HoverDiv>
        <Tippy
          interactive
          placement="left-end"
          content={
            <HoverDiv>
              <Li>
                <SubLink href={`/subscribe/${data.id}/0`} noCSR>
                  <SubButtonStyle>Benachrichtigungen erhalten</SubButtonStyle>
                </SubLink>
              </Li>

              <Li>
                <SubLink href={`/subscribe/${data.id}/1`} noCSR>
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
              <SubButtonStyle>Abonnieren</SubButtonStyle>
            </SubLink>
          </Li>
        </Tippy>

        <Li>
          <SubLink
            href={`/page/revision/create/${data.id}/${data.revisionId}`}
            noCSR
          >
            <SubButtonStyle>Konvertieren (beta)</SubButtonStyle>
          </SubLink>
        </Li>

        <Li>
          <SubLink href={`/page/revision/revisions/${data.id}`} noCSR>
            <SubButtonStyle>Bearbeitungsverlauf</SubButtonStyle>
          </SubLink>
        </Li>

        <Li>
          <SubLink href={`/event/history/${data.id}`} noCSR>
            <SubButtonStyle>Aktivitätenlog</SubButtonStyle>
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
        <Tippy
          interactive
          placement="left-end"
          content={
            <HoverDiv>
              <Li>
                <SubLink href={`/subscribe/${data.id}/0`} noCSR>
                  <SubButtonStyle>Benachrichtigungen erhalten</SubButtonStyle>
                </SubLink>
              </Li>

              <Li>
                <SubLink href={`/subscribe/${data.id}/1`} noCSR>
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
              <SubButtonStyle>Abonnieren</SubButtonStyle>
            </SubLink>
          </Li>
        </Tippy>

        <Li>
          <SubLink href={`/page/revision/revisions/${data.id}`} noCSR>
            <SubButtonStyle>Bearbeitungsverlauf</SubButtonStyle>
          </SubLink>
        </Li>

        <Li>
          <SubLink href={`/entity/taxonomy/update/${data.id}`} noCSR>
            <SubButtonStyle>
              Zuweisung zu Themen und Lehrplänen bearbeiten
            </SubButtonStyle>
          </SubLink>
        </Li>

        <Li>
          <SubLink href={`/flag/add/${data.id}`} noCSR>
            <SubButtonStyle>Inhalt melden</SubButtonStyle>
          </SubLink>
        </Li>

        <Li>
          <SubLink href={`/event/history/${data.id}`} noCSR>
            <SubButtonStyle>Aktivitätenlog</SubButtonStyle>
          </SubLink>
        </Li>

        <Li>
          <SubLink href={`/uuid/trash/${data.id}`} noCSR>
            <SubButtonStyle>In den Papierkorb verschieben (?)</SubButtonStyle>
          </SubLink>
        </Li>
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
              <Tippy
                interactive
                placement="left-end"
                content={
                  <HoverDiv>
                    <Li>
                      <SubLink href={`/subscribe/${data.id}/0`} noCSR>
                        <SubButtonStyle>
                          Benachrichtigungen erhalten
                        </SubButtonStyle>
                      </SubLink>
                    </Li>

                    <Li>
                      <SubLink href={`/subscribe/${data.id}/1`} noCSR>
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
                    <SubButtonStyle>Abonnieren</SubButtonStyle>
                  </SubLink>
                </Li>
              </Tippy>

              <Li>
                <SubLink href={`/page/revision/revisions/${data.id}`} noCSR>
                  <SubButtonStyle>Bearbeitungsverlauf</SubButtonStyle>
                </SubLink>
              </Li>

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

              <Li>
                <SubLink href={`/flag/add/${data.id}`} noCSR>
                  <SubButtonStyle>Inhalt melden</SubButtonStyle>
                </SubLink>
              </Li>

              <Li>
                <SubLink href={`/event/history/${data.id}`} noCSR>
                  <SubButtonStyle>Aktivitätenlog</SubButtonStyle>
                </SubLink>
              </Li>

              <Li>
                <SubLink href={`/uuid/trash/${data.id}`} noCSR>
                  <SubButtonStyle>
                    In den Papierkorb verschieben (?)
                  </SubButtonStyle>
                </SubLink>
              </Li>
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
              <Tippy
                interactive
                placement="left-end"
                content={
                  <HoverDiv>
                    <Li>
                      <SubLink href={`/subscribe/${data.courseId}/0`} noCSR>
                        <SubButtonStyle>
                          Benachrichtigungen erhalten
                        </SubButtonStyle>
                      </SubLink>
                    </Li>

                    <Li>
                      <SubLink href={`/subscribe/${data.courseId}/1`} noCSR>
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
                    <SubButtonStyle>Abonnieren</SubButtonStyle>
                  </SubLink>
                </Li>
              </Tippy>

              <Li>
                <SubLink
                  href={`/page/revision/revisions/${data.courseId}`}
                  noCSR
                >
                  <SubButtonStyle>Bearbeitungsverlauf</SubButtonStyle>
                </SubLink>
              </Li>

              <Li>
                <SubLink
                  href={`/entity/create/course-page?link%5Btype%5D=link&link%5Bchild%5D=${data.courseId}`}
                  noCSR
                >
                  <SubButtonStyle>course-page hinzufügen</SubButtonStyle>
                </SubLink>
              </Li>

              <Li>
                <SubLink
                  href={`/entity/link/order/${data.courseId}/link`}
                  noCSR
                >
                  <SubButtonStyle>Unterelemente sortieren</SubButtonStyle>
                </SubLink>
              </Li>

              <Li>
                <SubLink
                  href={`/entity/taxonomy/update/${data.courseId}`}
                  noCSR
                >
                  <SubButtonStyle>
                    Zuweisung zu Themen und Lehrplänen bearbeiten
                  </SubButtonStyle>
                </SubLink>
              </Li>

              <Li>
                <SubLink href={`/flag/add/${data.id}`} noCSR>
                  <SubButtonStyle>Inhalt melden</SubButtonStyle>
                </SubLink>
              </Li>

              <Li>
                <SubLink href={`/event/history/${data.id}`} noCSR>
                  <SubButtonStyle>Aktivitätenlog</SubButtonStyle>
                </SubLink>
              </Li>

              <Li>
                <SubLink href={`/uuid/trash/${data.id}`} noCSR>
                  <SubButtonStyle>
                    In den Papierkorb verschieben (?)
                  </SubButtonStyle>
                </SubLink>
              </Li>
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
        <Tippy
          interactive
          placement="left-end"
          content={
            <HoverDiv>
              <Li>
                <SubLink href={`/subscribe/${data.id}/0`} noCSR>
                  <SubButtonStyle>Benachrichtigungen erhalten</SubButtonStyle>
                </SubLink>
              </Li>

              <Li>
                <SubLink href={`/subscribe/${data.id}/1`} noCSR>
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
              <SubButtonStyle>Abonnieren</SubButtonStyle>
            </SubLink>
          </Li>
        </Tippy>

        <Li>
          <SubLink href={`/taxonomy/term/organize/${data.id}`} noCSR>
            <SubButtonStyle>Baumstruktur bearbeiten</SubButtonStyle>
          </SubLink>
        </Li>

        <Li>
          <SubLink href={`/event/history/${data.id}`} noCSR>
            <SubButtonStyle>Aktivitätenlog</SubButtonStyle>
          </SubLink>
        </Li>

        <Li>
          <SubLink href={`/taxonomy/term/sort/entities/${data.id}`} noCSR>
            <SubButtonStyle>Inhalt sortieren</SubButtonStyle>
          </SubLink>
        </Li>

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
        <Li>
          <SubLink href={`/entity/repository/add-revision/${data.id}`} noCSR>
            <SubButtonStyle>Bearbeiten</SubButtonStyle>
          </SubLink>
        </Li>

        <Tippy
          interactive
          placement="left-end"
          content={
            <HoverDiv>
              <Li>
                <SubLink href={`/subscribe/${data.id}/0`} noCSR>
                  <SubButtonStyle>Benachrichtigungen erhalten</SubButtonStyle>
                </SubLink>
              </Li>

              <Li>
                <SubLink href={`/subscribe/${data.id}/1`} noCSR>
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
              <SubButtonStyle>Abonnieren</SubButtonStyle>
            </SubLink>
          </Li>
        </Tippy>

        <Li>
          <SubLink href={`/page/revision/revisions/${data.id}`} noCSR>
            <SubButtonStyle>Bearbeitungsverlauf</SubButtonStyle>
          </SubLink>
        </Li>

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

        {data.type != '_SolutionInline' && (
          <Li>
            <SubLink href={`/entity/link/order/${data.id}/link`} noCSR>
              <SubButtonStyle>Unterelemente sortieren</SubButtonStyle>
            </SubLink>
          </Li>
        )}

        {data.type == '_SolutionInline' ? (
          <Li>
            <SubLink
              href={`/entity/link/move/link/${data.id}/${data.parentId}`}
              noCSR
            >
              <SubButtonStyle>
                Diesen Inhalt zu einem anderen Überelement verschieben
              </SubButtonStyle>
            </SubLink>
          </Li>
        ) : (
          <Li>
            <SubLink href={`/entity/taxonomy/update/${data.id}`} noCSR>
              <SubButtonStyle>
                Zuweisung zu Themen und Lehrplänen bearbeiten
              </SubButtonStyle>
            </SubLink>
          </Li>
        )}

        <Li>
          <SubLink href={`/flag/add/${data.id}`} noCSR>
            <SubButtonStyle>Inhalt melden</SubButtonStyle>
          </SubLink>
        </Li>

        <Li>
          <SubLink href={`/event/history/${data.id}`} noCSR>
            <SubButtonStyle>Aktivitätenlog</SubButtonStyle>
          </SubLink>
        </Li>

        <Li>
          <SubLink href={`/uuid/trash/${data.id}`} noCSR>
            <SubButtonStyle>In den Papierkorb verschieben (?)</SubButtonStyle>
          </SubLink>
        </Li>
      </HoverDiv>
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
