import { faTools } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tippy from '@tippyjs/react'
import styled from 'styled-components'

import {
  AuthorToolsHoverMenu,
  AuthorToolsData,
} from '../navigation/author-tools-hover-menu'
import { makeDefaultButton } from '@/helper/css'

export interface AuthorToolsProps {
  data: AuthorToolsData
}

export function AuthorTools({ data }: AuthorToolsProps) {
  return (
    <Tippy
      interactive
      placement="bottom-end"
      content={<AuthorToolsHoverMenu data={data} />}
    >
      <EditButton>
        <FontAwesomeIcon icon={faTools} />
      </EditButton>
    </Tippy>
  )
}

const EditButton = styled.a`
  ${makeDefaultButton}

  text-align: center;
  color: ${(props) => props.theme.colors.dark1};
  background-color: ${(props) => props.theme.colors.lightBackground};
  font-size: 1rem;
  line-height: 2rem;
  width: 2rem;
  height: 2rem;
  padding: 0;
  margin-left: 5px;

  &:hover {
    background-color: ${(props) => props.theme.colors.brand};
    color: #fff;
  }
`
