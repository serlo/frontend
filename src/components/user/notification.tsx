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
} from '@serlo/api'
import Tippy from '@tippyjs/react'
import { Fragment } from 'react';
import styled, { css } from 'styled-components'

import { UserLink } from './user-link'
import { TimeAgo } from '@/components/time-ago'
import { useInstanceData } from '@/contexts/instance-context'
import { LoggedInData } from '@/data-types'

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
  const { strings } = useInstanceData()

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
      <StyledTimeAgo datetime={eventDate} dateAsTitle />
      <Title unread={unread}>{renderText()}</Title>
      {renderExtraContent()}
      {renderMuteButton()}
    </Item>
  )

  function renderMuteButton() {
    return (
      <Tippy
        duration={[300, 250]}
        animation="fade"
        placement="bottom"
        content={<Tooltip>{loggedInStrings.hide}</Tooltip>}
      >
        <MuteButton href={`/unsubscribe/${event.objectId.toString()}`}>
          <FontAwesomeIcon icon={faVolumeMute} />
        </MuteButton>
      </Tippy>
    )
  }

  function parseString(
    string: string,
    replaceables: { [key: string]: JSX.Element | string }
  ) {
    const parts = string.split('%')
    const actor = <UserLink user={event.actor} />
    const keys = Object.keys(replaceables)

    return parts.map((part, index) => {
      if (part === '') return null
      if (part === 'actor') {
        return <Fragment key={index}>{actor}</Fragment>;
      }
      if (keys.indexOf(part) > -1) {
        return <Fragment key={index}>{replaceables[part]}</Fragment>;
      }
      return part
    });
  }

  function renderText() {
    const actor = <UserLink user={event.actor} />

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

  function renderRevision(id: number) {
    return <StyledLink href={`/${id}`}>{strings.entities.revision}</StyledLink>
  }

  function renderThread(id: number) {
    return <StyledLink href={`/${id}`}>{strings.entities.thread}</StyledLink>
  }

  type PlaceholderKeys = keyof typeof placeholderLookup

  function renderEntityTypePlaceholder(typename: string | undefined) {
    if (typename && typename in placeholderLookup) {
      return placeholderLookup[typename as PlaceholderKeys]
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
