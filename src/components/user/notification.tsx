import { faVolumeMute } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  CheckoutRevisionNotificationEvent,
  CreateCommentNotificationEvent,
  CreateEntityNotificationEvent,
  CreateEntityLinkNotificationEvent,
  CreateEntityRevisionNotificationEvent,
  CreateTaxonomyTermNotificationEvent,
  CreateTaxonomyLinkNotificationEvent,
  CreateThreadNotificationEvent,
  RejectRevisionNotificationEvent,
  RemoveEntityLinkNotificationEvent,
  RemoveTaxonomyLinkNotificationEvent,
  SetLicenseNotificationEvent,
  SetTaxonomyParentNotificationEvent,
  SetTaxonomyTermNotificationEvent,
  SetThreadStateNotificationEvent,
  SetUuidStateNotificationEvent,
  TaxonomyTerm,
  User,
} from '@serlo/api'
import Tippy from '@tippyjs/react'
import React from 'react'
import styled, { css } from 'styled-components'
import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js'
//TODO: investigate, also move to helper, this needs to be dynamic
// eslint-disable-next-line import/no-internal-modules
import de from 'timeago.js/lib/lang/de'

import { useInstanceData } from '@/contexts/instance-context'
import { LoggedInData } from '@/data-types'

// register it.
timeago.register('de', de)

export type NotificationEvent =
  | CheckoutRevisionNotificationEvent
  | CreateCommentNotificationEvent
  | CreateEntityNotificationEvent
  | CreateEntityLinkNotificationEvent
  | CreateEntityRevisionNotificationEvent
  | CreateTaxonomyTermNotificationEvent
  | CreateTaxonomyLinkNotificationEvent
  | CreateThreadNotificationEvent
  | RejectRevisionNotificationEvent
  | RemoveEntityLinkNotificationEvent
  | RemoveTaxonomyLinkNotificationEvent
  | SetLicenseNotificationEvent
  | SetTaxonomyParentNotificationEvent
  | SetTaxonomyTermNotificationEvent
  | SetThreadStateNotificationEvent
  | SetUuidStateNotificationEvent

export function Notification({
  event,
  unread,
  loggedInStrings,
}: {
  unread: boolean
  event: NotificationEvent
  loggedInStrings: LoggedInData['strings']['notifications']
}) {
  const eventDate = new Date(event.date)
  const { strings, lang } = useInstanceData()

  const placeholderLookup = {
    Page: strings.entities.page,
    Article: strings.entities.article,
    Video: strings.entities.video,
    Applet: strings.entities.applet,
    CoursePage: strings.entities.coursePage,
    Exercise: strings.entities.exercise,
    GroupedExercise: strings.entities.groupedExercise,
    ExerciseGroup: strings.entities.exerciseGroup,
    Event: strings.entities.event,
    Course: strings.entities.course,
    TaxonomyTerm: strings.entities.taxonomyTerm,
    fallback: loggedInStrings.entityPlaceholderFallback,
  }

  return (
    <Item>
      <span title={eventDate.toLocaleString(lang)}>
        <StyledTimeAgo
          datetime={eventDate}
          locale={lang}
          opts={{ minInterval: 60 }}
        />
      </span>
      <Title unread={unread}>{renderText()}</Title>
      {renderExtraContent()}
      {renderMuteButton()}
    </Item>
  )

  function renderMuteButton() {
    const subscriptionId = getSubscriptionId()
    return subscriptionId !== undefined ? (
      <Tippy
        duration={[300, 250]}
        animation="fade"
        placement="bottom"
        content={<Tooltip>{loggedInStrings.hide}</Tooltip>}
      >
        <MuteButton href={`/unsubscribe/${subscriptionId.toString()}`}>
          <FontAwesomeIcon icon={faVolumeMute} />
        </MuteButton>
      </Tippy>
    ) : null
  }

  function getSubscriptionId() {
    switch (event.__typename) {
      case 'SetThreadStateNotificationEvent':
      case 'CreateThreadNotificationEvent':
      case 'CreateCommentNotificationEvent':
        return event.thread.id

      //TODO: Check if Subscription is linked to the child
      case 'CreateEntityLinkNotificationEvent':
      case 'RemoveEntityLinkNotificationEvent':
      case 'CreateTaxonomyLinkNotificationEvent':
      case 'RemoveTaxonomyLinkNotificationEvent':
        return event.child.id

      case 'CreateEntityNotificationEvent':
      case 'CreateEntityRevisionNotificationEvent':
        return event.entity.id

      case 'SetLicenseNotificationEvent':
      case 'CheckoutRevisionNotificationEvent':
      case 'RejectRevisionNotificationEvent':
        return event.repository.id

      case 'SetUuidStateNotificationEvent':
        return event.object.id

      default:
        return undefined
    }
  }

  function parseString(
    string: string,
    replaceables: { [key: string]: JSX.Element | string }
  ) {
    const parts = string.split('%')
    const actor = renderUser(event.actor)
    const keys = Object.keys(replaceables)

    return parts.map((part, index) => {
      if (part === '') return null
      if (part === 'actor') {
        return <React.Fragment key={index}>{actor}</React.Fragment>
      }
      if (keys.indexOf(part) > -1) {
        return <React.Fragment key={index}>{replaceables[part]}</React.Fragment>
      }
      return part
    })
  }

  function renderText() {
    const actor = renderUser(event.actor)

    switch (event.__typename) {
      case 'SetThreadStateNotificationEvent':
        return parseString(
          event.archived
            ? loggedInStrings.setThreadStateArchived
            : loggedInStrings.setThreadStateUnarchived,
          {
            thread: renderThread(event.thread.id),
          }
        )

      case 'CreateCommentNotificationEvent':
        return parseString(loggedInStrings.createComment, {
          thread: renderThread(event.thread.id),
          comment: (
            <StyledLink href={`/${event.comment.id}`}>
              {strings.entities.comment}
            </StyledLink>
          ),
        })

      case 'CreateThreadNotificationEvent':
        return parseString(loggedInStrings.createThread, {
          thread: renderThread(event.thread.id),
          object: renderObject(event.object),
        })

      case 'CreateEntityNotificationEvent':
        return parseString(loggedInStrings.createEntity, {
          object: renderObject(event.entity),
        })

      case 'SetLicenseNotificationEvent':
        return parseString(loggedInStrings.setLicense, {
          repository: renderObject(event.repository),
        })

      case 'CreateEntityLinkNotificationEvent':
        return parseString(loggedInStrings.createEntityLink, {
          child: renderObject(event.child),
          parent: renderObject(event.parent),
        })

      case 'RemoveEntityLinkNotificationEvent':
        return parseString(loggedInStrings.removeEntityLink, {
          child: renderObject(event.child),
          parent: renderObject(event.parent),
        })

      case 'CreateEntityRevisionNotificationEvent':
        return parseString(loggedInStrings.createEntityRevision, {
          revision: renderRevision(event.entityRevision.id),
          entity: renderObject(event.entity),
        })

      case 'CheckoutRevisionNotificationEvent':
        return parseString(loggedInStrings.checkoutRevision, {
          actor: actor,
          revision: renderRevision(event.revision.id),
          repository: renderObject(event.repository),
        })

      case 'RejectRevisionNotificationEvent':
        return parseString(loggedInStrings.rejectRevision, {
          revision: renderRevision(event.revision.id),
          repository: renderObject(event.repository),
        })

      case 'CreateTaxonomyLinkNotificationEvent':
        return parseString(loggedInStrings.createTaxonomyLink, {
          child: renderObject(event.child),
          parent: renderObject(event.parent),
        })

      case 'RemoveTaxonomyLinkNotificationEvent':
        return parseString(loggedInStrings.removeTaxonomyLink, {
          child: renderObject(event.child),
          parent: renderTax(event.parent),
        })

      case 'CreateTaxonomyTermNotificationEvent':
        return parseString(loggedInStrings.createTaxonomyTerm, {
          term: renderTax(event.taxonomyTerm),
        })

      case 'SetTaxonomyTermNotificationEvent':
        return parseString(loggedInStrings.setTaxonomyTerm, {
          term: renderTax(event.taxonomyTerm),
        })

      case 'SetTaxonomyParentNotificationEvent':
        if (!event.parent) {
          //deleted
          return parseString(loggedInStrings.setTaxonomyParentDeleted, {
            child: renderTax(event.child),
          })
        }
        if (event.previousParent) {
          return parseString(loggedInStrings.setTaxonomyParentChangedFrom, {
            child: renderTax(event.child),
            previousparent: renderTax(event.previousParent),
            parent: renderTax(event.parent),
          })
        }
        return parseString(loggedInStrings.setTaxonomyParentChanged, {
          child: renderTax(event.child),
          parent: renderTax(event.parent),
        })

      case 'SetUuidStateNotificationEvent':
        return parseString(
          event.trashed
            ? loggedInStrings.setUuidStateTrashed
            : loggedInStrings.setUuidStateRestored,
          {
            object: renderObject(event.object),
          }
        )
    }
  }

  function renderExtraContent() {
    if (
      event.__typename === 'RejectRevisionNotificationEvent' ||
      event.__typename === 'CheckoutRevisionNotificationEvent'
    ) {
      return <Content>{event.reason}</Content>
    }
  }

  function renderUser(user: User) {
    return (
      <StyledLink href={`/user/profile/${user.id}`}>{user.username}</StyledLink>
    )
  }

  function renderObject(object: {
    id: number
    currentRevision?: {
      title?: string
    }
    __typename?: string
  }) {
    const title = object.currentRevision?.title
    return (
      <StyledLink href={`/${object.id}`}>
        {title ? title : renderEntityTypePlaceholder(object.__typename)}
      </StyledLink>
    )
  }

  function renderTax(taxonomy: TaxonomyTerm) {
    return <StyledLink href={`/${taxonomy.id}`}>{taxonomy.name}</StyledLink>
  }

  //TODO: also check logged out error

  function renderRevision(id: number) {
    return <StyledLink href={`/${id}`}>{strings.entities.revision}</StyledLink>
  }

  function renderThread(id: number) {
    return <StyledLink href={`/${id}`}>{strings.entities.thread}</StyledLink>
  }

  function renderEntityTypePlaceholder(typename: string | undefined) {
    console.log(typename)

    if (typename && typename in placeholderLookup) {
      //TODO: find a way to translate grammatically correct placeholders
      //@ts-expect-error
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return placeholderLookup[typename]
    }
    return placeholderLookup.fallback
  }
}

const StyledLink = styled.a`
  color: ${(props) => props.theme.colors.brand};
  text-decoration: none;

  &:hover {
    color: ${(props) => props.theme.colors.lightblue};
  }
`

const StyledTimeAgo = styled(TimeAgo)`
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.gray};
`

const MuteButton = styled.a`
  position: absolute;
  opacity: 0;
  display: flex;
  justify-content: center;
  right: 20px;
  top: 30px;
  padding: 10px;
  border-radius: 2rem;
  transition: all 0.2s ease-in;
  color: ${(props) => props.theme.colors.brand};

  &:hover {
    background-color: ${(props) => props.theme.colors.brand};
    color: #fff;
  }
`

const Tooltip = styled.span`
  font-size: 0.8rem;
  line-height: 1.2rem;
  display: block;
  background-color: ${(props) => props.theme.colors.darkgray};
  color: #fff;
  border-radius: 4px;
  padding: 8px 10px;
  max-width: 200px;
`

const Item = styled.div`
  position: relative;
  margin: 10px 0;
  padding: 24px;
  &:nth-child(even) {
    background: ${(props) => props.theme.colors.bluewhite};
  }

  &:hover ${MuteButton} {
    opacity: 1;
  }
`

const Content = styled.span`
  color: ${(props) => props.theme.colors.gray};
  display: block;
`

const Title = styled.span<{ unread: boolean }>`
  ${(props) =>
    props.unread &&
    css`
      font-weight: bold;
      &:before {
        content: '';
        display: inline-block;
        background: ${props.theme.colors.brand};
        border-radius: 50%;
        width: 10px;
        height: 10px;
        margin-right: 7px;
      }
    `};

  display: block;
  margin-bottom: 9px;
  margin-top: 1px;

  a {
    color: ${(props) => props.theme.colors.brand};
    text-decoration: none;
  }
  a:hover {
    color: ${(props) => props.theme.colors.lightblue};
  }
`
