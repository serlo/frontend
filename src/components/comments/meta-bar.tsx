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
  isParent?: boolean
  id: number
  highlight: (id: number) => void
}

export function MetaBar({
  user,
  timestamp,
  isParent,
  id,
  highlight,
}: MetaBarProps) {
  const [
    tippyInstance,
    setTippyInstance,
  ] = React.useState<Instance<Props> | null>(null)

  const date = new Date(timestamp)

  return (
    <MetaBarBox>
      <StyledUserLink user={user} withIcon />

      <Tippy
        interactive
        placement="bottom-end"
        onCreate={(instance) => setTippyInstance(instance)}
        content={
          tippyInstance ? (
            <DropdownMenu
              isParent={isParent}
              date={date}
              id={id}
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
