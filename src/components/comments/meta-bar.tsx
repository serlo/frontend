import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tippy from '@tippyjs/react'
import * as React from 'react'
import styled from 'styled-components'
import { Instance, Props } from 'tippy.js'

import { UserLink } from '../user/user-link'
import { DropdownMenu } from './dropdown-menu'
import { TimeAgo } from '@/components/time-ago'
import { makeTransparentButton, makeMargin } from '@/helper/css'

export interface MetaBarProps {
  user: { username: string; id: number }
  timestamp: string
  threadId: string
  isParent?: boolean
  archived?: boolean
  id: number
  highlight: (id: number) => void
}

export function MetaBar({
  user,
  timestamp,
  isParent,
  archived,
  id,
  highlight,
  threadId,
}: MetaBarProps) {
  const [
    tippyInstance,
    setTippyInstance,
  ] = React.useState<Instance<Props> | null>(null)

  const date = new Date(timestamp)
  return (
    <MetaBarBox>
      <StyledUserLink user={user} withIcon path={['comment-user', id]} />

      <Tippy
        interactive
        placement="bottom-end"
        onCreate={(instance) => setTippyInstance(instance)}
        content={
          tippyInstance ? (
            <DropdownMenu
              isParent={isParent}
              threadId={threadId}
              date={date}
              id={id}
              archived={archived}
              highlight={highlight}
              // eslint-disable-next-line @typescript-eslint/unbound-method
              onAnyClick={tippyInstance.hide}
            />
          ) : (
            ''
          )
        }
      >
        <TimeAgoButton title={date.toLocaleString('de-DE')}>
          <TimeAgo datetime={date} /> <FontAwesomeIcon icon={faCaretDown} />
        </TimeAgoButton>
      </Tippy>
    </MetaBarBox>
  )
}

const TimeAgoButton = styled.button`
  ${makeTransparentButton}
  font-weight: normal;
  color: ${(props) => props.theme.colors.lightblue};
  font-size: 1rem;
  height: 27px;
`

const StyledUserLink = styled(UserLink)`
  ${makeTransparentButton}
  font-size: 1.125rem;
  font-weight: bold;
  margin-left: -5px;
  padding-left: 3px;
  display: flex;
  align-items: center;
  &:hover {
    color: ${(props) => props.theme.colors.brand};
    background-color: ${(props) => props.theme.colors.lightBlueBackground};
  }
`

const MetaBarBox = styled.div`
  ${makeMargin}
  color: #222;
  margin-bottom: 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
