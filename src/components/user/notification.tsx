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
  AbstractEntity,
  AbstractRevision,
  TaxonomyTerm,
} from '@serlo/api'
import Tippy from '@tippyjs/react'
import styled, { css } from 'styled-components'
import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js'
//TODO: investigate
// eslint-disable-next-line import/no-internal-modules
import de from 'timeago.js/lib/lang/de'

import { NotificationEventType, NotificationUser } from '@/events/event'

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
}: {
  unread: boolean
  event: NotificationEvent
}) {
  const eventDate = new Date(event.date)

  return (
    <Item>
      <span title={eventDate.toLocaleString('de-DE')}>
        <StyledTimeAgo
          datetime={eventDate}
          locale="de"
          opts={{ minInterval: 60 }}
        />
      </span>
      <Title unread={unread}>{renderText()}</Title>
      {/* {renderExtraContent()} */}
      {/* {renderMuteButton()} */}
    </Item>
  )

  function renderMuteButton() {
    const subscriptionId = getSubscriptionId()
    return subscriptionId !== undefined ? (
      <Tippy
        duration={[300, 250]}
        animation="fade"
        placement="bottom"
        content={
          <Tooltip>
            Benachrichtigungen für diesen Inhalt nicht mehr anzeigen.
          </Tooltip>
        }
      >
        <MuteButton href={`/unsubscribe/${subscriptionId.toString()}`}>
          <FontAwesomeIcon icon={faVolumeMute} />
        </MuteButton>
      </Tippy>
    ) : null
  }

  function getSubscriptionId() {
    switch (event.type) {
      case NotificationEventType.SetThreadState:
      case NotificationEventType.CreateThread:
        return event.thread

      case NotificationEventType.CreateComment:
        return event.thread.id

      case NotificationEventType.CreateEntity:
      case NotificationEventType.SetLicense:
      case NotificationEventType.CreateLink:
      case NotificationEventType.RemoveLink:
        return event.entity

      case NotificationEventType.CreateEntityRevision:
      case NotificationEventType.CheckoutRevision:
      case NotificationEventType.RejectRevision:
        return event.repository.id

      case NotificationEventType.CreateTaxonomyAssociation:
      case NotificationEventType.RemoveTaxonomyAssociation:
        return event.entity.id

      case NotificationEventType.SetUuidState:
        return event.uuid

      default:
        return undefined
    }
  }

  function renderText() {
    switch (event.__typename) {
      case 'SetThreadStateNotificationEvent':
        return (
          <>
            {renderUser(event.actor)} hat einen {renderThread(event.thread.id)}{' '}
            {event.archived ? 'archiviert' : 'unarchiviert'}
          </>
        )
      case 'CreateCommentNotificationEvent':
        return (
          <>
            {renderUser(event.author)} hat einen{' '}
            <StyledLink href={`/${event.comment.id}`}>Kommentar</StyledLink> in{' '}
            einem {renderThread(event.thread.id)} erstellt.
          </>
        )
      case 'CreateThreadNotificationEvent':
        return (
          <>
            {renderUser(event.author)} hat einen {renderThread(event.thread.id)}{' '}
            in {renderObject(event.object)} erstellt.
          </>
        )
      case 'CreateEntityNotificationEvent':
        return (
          <>
            {renderUser(event.author)} hat {renderObject(event.entity)}{' '}
            erstellt.
          </>
        )
      case 'SetLicenseNotificationEvent':
        return (
          <>
            {renderUser(event.actor)} hat die Lizenz von{' '}
            {renderObject(event.repository)} geändert.
          </>
        )
      case 'CreateEntityLinkNotificationEvent':
        return (
          <>
            {renderUser(event.actor)} hat {renderObject(event.child)} mit{' '}
            {renderObject(event.parent)} verknüpft.
          </>
        )
      case 'RemoveEntityLinkNotificationEvent':
        return (
          <>
            {renderUser(event.actor)} hat die Verknüpfung von{' '}
            {renderObject(event.child)}
            mit {renderObject(event.parent)} entfernt.
          </>
        )
      case 'CreateEntityRevisionNotificationEvent':
        return (
          <>
            {renderUser(event.author)} hat eine{' '}
            {renderRevision(event.entityRevision.id)} von{' '}
            {renderObject(event.entity)} erstellt.
          </>
        )
      case 'CheckoutRevisionNotificationEvent':
        return (
          <>
            {renderUser(event.reviewer)} hat eine{' '}
            {renderRevision(event.revision.id)} von{' '}
            {renderObject(event.repository)} übernommen
          </>
        )
      case 'RejectRevisionNotificationEvent':
        return (
          <>
            {renderUser(event.reviewer)} hat die{' '}
            {renderRevision(event.revision.id)} für
            {renderObject(event.repository)}
          </>
        )
      case 'CreateTaxonomyLinkNotificationEvent':
        return (
          <>
            {renderUser(event.actor)} hat {renderObject(event.child)} in{' '}
            {renderTax(event.parent)} eingeordnet.
          </>
        )
      case 'RemoveTaxonomyLinkNotificationEvent':
        return (
          <>
            {renderUser(event.actor)} hat {renderObject(event.child)} aus{' '}
            {renderTax(event.parent)} entfernt.
          </>
        )
      case 'CreateTaxonomyTermNotificationEvent':
        return (
          <>
            {renderUser(event.author)} hat den {renderTax(event.taxonomyTerm)}{' '}
            erstellt.
          </>
        )
      case 'SetTaxonomyTermNotificationEvent':
        return (
          <>
            {renderUser(event.author)} hat den {renderTax(event.taxonomyTerm)}{' '}
            geändert.
          </>
        )
      case 'SetTaxonomyParentNotificationEvent':
        return (
          <>
            {renderUser(event.actor)} hat den Elternknoten von{' '}
            {renderTax(event.child)} von geändert.
          </>
          /*
          TODO: previousParent and parent can be null, hide event or build cases for that 
          {renderTax(event.previousParent!)} auf{' '}
            {renderTax(event.parent!)} geändert.
          */
        )
      case 'SetUuidStateNotificationEvent':
        return (
          <>
            {renderUser(event.actor)} hat {renderObject(event.object)}{' '}
            {event.trashed
              ? 'in den Papierkorb verschoben'
              : 'aus dem Papierkorb wieder hergestellt'}
            .
          </>
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

  function renderUser(user: NotificationUser) {
    return (
      <StyledLink href={`/user/profile/${user.id}`}>{user.username}</StyledLink>
    )
  }

  function renderObject(object: {
    id: number
    currentRevision?: {
      title?: string
    }
  }) {
    const title = object.currentRevision?.title
    //TODO: Fall back to type if no title
    return (
      <StyledLink href={`/${object.id}`}>{title ? title : 'Entity'}</StyledLink>
    )
  }

  function renderTax(taxonomy: TaxonomyTerm) {
    return <StyledLink href={`/${taxonomy.id}`}>{taxonomy.name}</StyledLink>
  }

  function renderRevision(id: number) {
    return <StyledLink href={`/${id}`}>Bearbeitung</StyledLink>
  }

  function renderThread(id: number) {
    return <StyledLink href={`/${id}`}>Thread</StyledLink>
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
    `}

  display:block;
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
