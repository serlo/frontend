import styled from 'styled-components'

import {
  NotificationEvent,
  NotificationEventType,
  NotificationUser,
} from '@/events/event'

export function Notification({
  event,
}: {
  id: number
  unread: boolean
  event: NotificationEvent
}) {
  switch (event.type) {
    case NotificationEventType.SetThreadState:
      return (
        <>
          <UserLink user={event.actor} /> hat Thread {event.thread.id}
          {event.archived ? 'archiviert' : 'unarchiviert'}
        </>
      )
    case NotificationEventType.CreateComment:
      return (
        <>
          <UserLink user={event.author} /> hat Kommentar {event.comment.id} im
          Thread {event.thread.id} erstellt.
        </>
      )
    case NotificationEventType.CreateThread:
      return (
        <>
          <UserLink user={event.author} /> hat Thread {event.thread.id} in UUID{' '}
          {event.uuid.id} erstellt.
        </>
      )
    case NotificationEventType.CreateEntity:
      return (
        <>
          <UserLink user={event.author} /> hat Entity {event.entity.id}{' '}
          erstellt.
        </>
      )
    case NotificationEventType.SetLicense:
      return (
        <>
          <UserLink user={event.actor} /> hat die Lizenz von Entity{' '}
          {event.entity.id} geändert.
        </>
      )
    case NotificationEventType.CreateLink:
      return (
        <>
          <UserLink user={event.actor} /> hat Entity {event.entity.id} mit UUID{' '}
          {event.parent.id} verknüpft.
        </>
      )
    case NotificationEventType.RemoveLink:
      return (
        <>
          <UserLink user={event.actor} /> hat die Verknüpfung von{' '}
          {event.entity.id} mit UUID {event.parent.id} entfernt.
        </>
      )
    case NotificationEventType.CreateEntityRevision:
      return (
        <>
          <UserLink user={event.author} /> hat die{' '}
          <ContentLink id={event.revision.id}>Bearbeitung</ContentLink> für
          Entity/Page {event.repository.id} erstellt.
        </>
      )
    case NotificationEventType.CheckoutRevision:
      return (
        <>
          <UserLink user={event.reviewer} /> hat die{' '}
          <ContentLink id={event.revision.id}>Bearbeitung</ContentLink> für
          Entity/Page {event.repository.id} übernommen (Grund: {event.reason}).
        </>
      )
    case NotificationEventType.RejectRevision:
      return (
        <>
          <UserLink user={event.reviewer} /> hat die{' '}
          <ContentLink id={event.revision.id}>Bearbeitung</ContentLink> für
          Entity/Page {event.repository.id} verworfen (Grund: {event.reason}).
        </>
      )
    case NotificationEventType.CreateTaxonomyAssociation:
      return (
        <>
          <UserLink user={event.actor} /> hat die Entity {event.entity.id} in
          Taxonomy Term {event.taxonomyTerm.id} eingeordnet.
        </>
      )
    case NotificationEventType.RemoveTaxonomyAssociation:
      return (
        <>
          <UserLink user={event.actor} /> hat die Entity {event.entity.id} aus
          Taxonomy Term {event.taxonomyTerm.id} entfernt.
        </>
      )
    case NotificationEventType.CreateTaxonomyTerm:
      return (
        <>
          <UserLink user={event.actor} /> hat den Taxonomy Term{' '}
          {event.taxonomyTerm.id} erstellt.
        </>
      )
    case NotificationEventType.SetTaxonomyTerm:
      return (
        <>
          <UserLink user={event.actor} /> hat den Taxonomy Term{' '}
          {event.taxonomyTerm.id} geändert.
        </>
      )
    case NotificationEventType.SetTaxonomyParent:
      return (
        <>
          <UserLink user={event.actor} /> hat den Elternknoten des Terms{' '}
          {event.taxonomyTerm.id} von ${event.previousParent.id} auf{' '}
          {event.parent.id} geändert.
        </>
      )
    case NotificationEventType.SetUuidState:
      return (
        <>
          <UserLink user={event.actor} /> hat den Uuid {event.uuid.id}{' '}
          {event.trashed
            ? 'in den Papierkorb verschoben'
            : 'aus dem Papierkorb wieder hergestellt'}
          .
        </>
      )
  }
}

function UserLink({ user }: { user: NotificationUser }) {
  return (
    <StyledLink href={`/user/profile/${user.id}`}>{user.username}</StyledLink>
  )
}

interface ContentLink {
  id: number
  children: string
}

function ContentLink(props: ContentLink) {
  return <StyledLink href={`/${props.id}`}>{props.children}</StyledLink>
}

const StyledLink = styled.a`
  color: ${(props) => props.theme.colors.brand};
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.colors.lightblue};
  }
`
