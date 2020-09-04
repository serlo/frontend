import { faUser, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tippy from '@tippyjs/react'
import * as React from 'react'
import styled from 'styled-components'

import { DropdownMenu } from './dropdown-menu'
import { TimeAgo } from '@/components/time-ago'
import { makeDefaultButton, makeMargin, inputFontReset } from '@/helper/css'

export function MetaBar({
  isParent,
  user,
  timestamp,
}: {
  isParent?: boolean
  user: { username: string; id: number }
  timestamp: number
}) {
  const eventDate = new Date(timestamp)

  return (
    <MetaBarBox>
      <UserLink href={`https://serlo.org/${user.id}`}>
        <FontAwesomeIcon icon={faUser} /> {user.username}
      </UserLink>

      <Tippy
        interactive
        content={<DropdownMenu isParent={isParent} eventDate={eventDate} />}
        placement="bottom-end"
      >
        <TimeAgoButton title={eventDate.toLocaleString('de-DE')}>
          <TimeAgo datetime={eventDate} />{' '}
          <FontAwesomeIcon icon={faCaretDown} />
        </TimeAgoButton>
      </Tippy>
    </MetaBarBox>
  )
}

const TimeAgoButton = styled.button`
  ${makeDefaultButton}
  ${inputFontReset}
  color: ${(props) => props.theme.colors.lightblue};
`

const UserLink = styled.a`
  ${makeDefaultButton}
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
