import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import styled from 'styled-components'
// import { Box } from 'grommet'
// import { Button, DropButton } from '../button.component'
// import * as moment from 'moment'
// import { getColor } from '../provider.component'
import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js'
//TODO: investigate, also move implementation to helper (used in notif) that loads languages when needed
// eslint-disable-next-line import/no-internal-modules
import de from 'timeago.js/lib/lang/de'

import { makeDefaultButton, makeMargin } from '@/helper/css'
// register it.
timeago.register('de', de)

/*
const renderItems = (leaf: boolean | undefined, timestamp: Date) => (
  <DropContent>
    {leaf ? null : (
      <DropContentButton
        label="Diskussion archivieren"
        iconName="faCheck"
        backgroundColor="transparent"
        activeBackgroundColor={getColor('lightblue')}
        fontColor={getColor('darkGray')}
      />
    )}
    <DropContentButton
      label="Diskussion melden"
      iconName="faFlag"
      backgroundColor="transparent"
      activeBackgroundColor={getColor('lightblue')}
      fontColor={getColor('darkGray')}
    />
    <DropContentButton
      label="Diskussion löschen"
      iconName="faTrash"
      backgroundColor="transparent"
      activeBackgroundColor={getColor('lightblue')}
      fontColor={getColor('darkGray')}
    />
    <Time>
      Gepostet am{' '}
      {'' +
        // @ts-ignore
        moment(timestamp).locale('de').format('DD.MM.YYYY, HH:mm:ss ')}
    </Time>
  </DropContent>
)
*/

export function MetaBar({
  user,
  timestamp,
  leaf,
}: {
  user: { username: string; id: number }
  timestamp: number
  leaf: boolean | undefined
}) {
  const eventDate = new Date(timestamp)

  return (
    <MetaBarBox>
      <UserLink href={`https://serlo.org/${user.id}`}>
        <FontAwesomeIcon icon={faUser} /> {user.username}
      </UserLink>
      <span>
        {/* <StyledDropButton
          dropAlign={{ top: 'bottom', right: 'right' }}
          dropContent={renderItems(leaf, timestamp)}
          iconName="faCaretDown"
          fontColor={getColor('lighterblue')}
          activeFontColor={'#fff'}
          backgroundColor="transparent"
          activeBackgroundColor={getColor('lightblue')}
          reverse
          label={
            '' +
            // @ts-ignore
            moment(timestamp).locale('de').startOf().fromNow()
          }
        /> */}
        <span title={eventDate.toLocaleString('de-DE')}>
          <StyledTimeAgo
            datetime={eventDate}
            locale="de"
            opts={{ minInterval: 60 }}
          />
        </span>
      </span>
    </MetaBarBox>
  )
}

// const Time = styled.span`
//   font-size: 0.65rem;
//   text-align: center;
//   color: ${(props) => props.theme.colors.lighterblue};
//   margin-top: 1rem;
// `

const StyledTimeAgo = styled(TimeAgo)`
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.gray};
`

const UserLink = styled.a`
  ${makeDefaultButton}
  font-weight: bold;
`

// const DropContent = styled(Box)`
//   background-color: ${(props) => props.theme.colors};
//   padding: 1rem 0.5rem 0.5rem 0.5rem;
// `

// const DropContentButton = styled(Button)`
//   margin-bottom: 0.2rem;
// `

const MetaBarBox = styled.div`
  ${makeMargin}
  color: #222;
  margin-bottom: 0.3rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* direction="row" justify="between" */
`

// const StyledDropButton = styled(DropButton)`
//   > svg {
//     width: 1.3rem;
//     height: 1.3rem;
//   }
// `
