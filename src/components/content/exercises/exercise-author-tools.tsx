import { faTools } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tippy from '@tippyjs/react'
import styled from 'styled-components'

import {
  AuthorToolsData,
  AuthorToolsHoverMenu,
} from '../../user-tools/author-tools-hover-menu'
import { makeTransparentButton } from '@/helper/css'

export interface ExerciseAuthorToolsProps {
  data: AuthorToolsData
}

export function ExerciseAuthorTools({ data }: ExerciseAuthorToolsProps) {
  return (
    <Tippy
      interactive
      placement="bottom-end"
      delay={[0, 300]}
      interactiveBorder={40}
      content={<AuthorToolsHoverMenu data={data} />}
    >
      <EditButton>
        <FontAwesomeIcon icon={faTools} />
      </EditButton>
    </Tippy>
  )
}

const EditButton = styled.a`
  display: none;

  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    display: inline;
    ${makeTransparentButton}

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
  }
`
