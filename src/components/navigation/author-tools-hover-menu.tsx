import Tippy from '@tippyjs/react'
import styled from 'styled-components'

import { SubList, SubLink, SubButtonStyle } from './menu'

export interface AuthorToolsHoverMenuProps {
  id: number
}

export function AuthorToolsHoverMenu({ id }: AuthorToolsHoverMenuProps) {
  return (
    <HoverDiv>
      <Tippy
        interactive
        placement="left-end"
        content={
          <HoverDiv>
            <Li>
              <SubLink href={`/subscribe/${id}/0`}>
                <SubButtonStyle>Benachrichtigungen erhalten</SubButtonStyle>
              </SubLink>
            </Li>

            <Li>
              <SubLink href={`/subscribe/${id}/1`}>
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
        <SubLink>
          <SubButtonStyle>Konvertieren</SubButtonStyle>
        </SubLink>
      </Li>

      <Li>
        <SubLink href={`/page/revision/revisions/${id}`}>
          <SubButtonStyle>Bearbeitungsverlauf</SubButtonStyle>
        </SubLink>
      </Li>

      <Li>
        <SubLink href={`/event/history/${id}`}>
          <SubButtonStyle>Aktivitätenlog</SubButtonStyle>
        </SubLink>
      </Li>
    </HoverDiv>
  )
}

const HoverDiv = styled(SubList)`
  background-color: ${(props) => props.theme.colors.lightBackground};
`

const Li = styled.li`
  display: block;
`
