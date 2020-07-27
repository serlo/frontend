import { faTools } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tippy from '@tippyjs/react'
import styled from 'styled-components'

import { AuthorToolsHoverMenu } from '../navigation/author-tools-hover-menu'

export interface AuthorToolsProps {}

export function AuthorTools() {
  return (
    <ToolsDiv>
      <Tippy
        interactive
        placement="bottom-end"
        content={<AuthorToolsHoverMenu id={123} />}
      >
        <span>
          <FontAwesomeIcon icon={faTools} />
        </span>
      </Tippy>
    </ToolsDiv>
  )
}

const ToolsDiv = styled.div`
  display: flex;
  flex-direction: row-reverse;
`
