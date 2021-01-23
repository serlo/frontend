import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tippy from '@tippyjs/react'
import * as React from 'react'
import styled from 'styled-components'

import { UserLink } from '../user/user-link'
import { TimeAgo } from '@/components/time-ago'
import { makeTransparentButton, makeMargin } from '@/helper/css'

export interface MetaBarProps {
  user: { username: string; id: number }
  date: Date
  dropdownMenu: React.ReactElement
}

export function MetaBar({ user, date, dropdownMenu }: MetaBarProps) {
  return (
    <MetaBarBox>
      <StyledUserLink user={user} withIcon />

      <Tippy interactive content={dropdownMenu} placement="bottom-end">
        <TimeAgoButton title={date.toLocaleString('de-DE')}>
          <TimeAgo datetime={date} /> <FontAwesomeIcon icon={faCaretDown} />
        </TimeAgoButton>
      </Tippy>
    </MetaBarBox>
  )
}

const TimeAgoButton = styled.button`
  ${makeTransparentButton}
  color: ${(props) => props.theme.colors.lightblue};
  font-size: 1rem;
`

const StyledUserLink = styled(UserLink)`
  ${makeTransparentButton}
  font-size: 1.125rem;
  font-weight: bold;
`

const MetaBarBox = styled.div`
  ${makeMargin}
  color: #222;
  margin-bottom: 0.3rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
