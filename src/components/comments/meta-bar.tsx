import { faUser, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tippy from '@tippyjs/react'
import * as React from 'react'
import styled from 'styled-components'
import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js'
//TODO: investigate, also move implementation to helper (used in notif) that loads languages when needed
// eslint-disable-next-line import/no-internal-modules
import de from 'timeago.js/lib/lang/de'

import { DropdownMenu } from './dropdown-menu'
import { makeDefaultButton, makeMargin, inputFontReset } from '@/helper/css'

// register it.
timeago.register('de', de)

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
          <StyledTimeAgo
            datetime={eventDate}
            locale="de"
            opts={{ minInterval: 60 }}
          />{' '}
          <FontAwesomeIcon icon={faCaretDown} />
        </TimeAgoButton>
      </Tippy>
    </MetaBarBox>
  )
}

const StyledTimeAgo = styled(TimeAgo)``

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
