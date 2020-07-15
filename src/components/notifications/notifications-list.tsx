import { useGraphqlSwr } from '@/api/use-graphql-swr'
import {
  NotificationEvent,
  NotificationEventPayload,
  NotificationEventType,
  parseNotificationEvent,
} from '@/events/event'

export function NotificationsList() {
  const { data } = useGraphqlSwr<{
    notifications: {
      nodes: {
        id: number
        unread: boolean
        event: NotificationEventPayload
      }[]
    }
  }>({
    query: `
      query notifications($count: Int!, $unread: Boolean){
        notifications(first: $count, unread: $unread) {
          nodes {
            id
            unread
            event {
              type
              date
              actor {
                id
                username
              }
              object {
                id
              }
              payload
            }
          }
        }
      }
    `,
    variables: {
      // TODO: set number of items to show. We could add pagination in a later iteration
      count: 20,
      // TODO: can be true | false | undefined. If defined, it will only return notifications that have the corresponding unread state.
      unread: undefined,
    },
  })
  return (
    <ul>
      {data?.notifications.nodes.map((node) => {
        const props = {
          ...node,
          event: parseNotificationEvent(node.event),
        }
        return (
          <li key={node.id}>
            {node.unread ? 'ungelesen' : 'gelesen'}, {node.event.date}
            <br />
            <Notification {...props} />
          </li>
        )
      })}
    </ul>
  )
}

function Notification({
  event,
}: {
  id: number
  unread: boolean
  event: NotificationEvent
}) {
  switch (event.type) {
    case NotificationEventType.SetThreadState:
      // TODO:
      return (
        <>
          User {event.actor.id} hat Thread {event.thread.id}
          {event.archived ? 'archiviert' : 'unarchiviert'}
        </>
      )
    case NotificationEventType.CreateComment:
      // TODO:
      return (
        <>
          User {event.author.id} hat Kommentar {event.comment.id} im Thread{' '}
          {event.thread.id} erstellt.
        </>
      )
    case NotificationEventType.CreateThread:
      // TODO:
      return (
        <>
          User {event.author.id} hat Thread {event.thread.id} in UUID{' '}
          {event.uuid.id} erstellt.
        </>
      )
    case NotificationEventType.CreateEntity:
      // TODO:
      return (
        <>
          User {event.author.id} hat Entity {event.entity.id} erstellt.
        </>
      )
    case NotificationEventType.SetLicense:
      // TODO:
      return (
        <>
          User {event.actor.id} hat die Lizenz von Entity {event.entity.id}{' '}
          geändert.
        </>
      )
    case NotificationEventType.CreateLink:
      // TODO:
      return (
        <>
          User {event.actor.id} hat Entity {event.entity.id} mit UUID{' '}
          {event.parent.id} verknüpft.
        </>
      )
    case NotificationEventType.RemoveLink:
      // TODO:
      return (
        <>
          User {event.actor.id} hat die Verknüpfung von {event.entity.id} mit{' '}
          UUID {event.parent.id} entfernt.
        </>
      )
    case NotificationEventType.CreateEntityRevision:
      // TODO:
      return (
        <>
          User {event.author.id} hat die Revision {event.revision.id} für{' '}
          Entity/Page {event.repository.id} erstellt.
        </>
      )
    case NotificationEventType.CheckoutRevision:
      // TODO:
      return (
        <>
          Reviewer {event.reviewer.id} hat die Revision {event.revision.id} für{' '}
          Entity/Page {event.repository.id} übernommen (Grund: {event.reason}).
        </>
      )
    case NotificationEventType.RejectRevision:
      // TODO:
      return (
        <>
          Reviewer {event.reviewer.id} hat die Revision {event.revision.id} für{' '}
          Entity/Page {event.repository.id} verworfen (Grund: {event.reason}).
        </>
      )
    case NotificationEventType.CreateTaxonomyAssociation:
      // TODO:
      return (
        <>
          User {event.actor.id} hat die Entity {event.entity.id} in Taxonomy{' '}
          Term {event.taxonomyTerm.id} eingeordnet.
        </>
      )
    case NotificationEventType.RemoveTaxonomyAssociation:
      // TODO:
      return (
        <>
          User {event.actor.id} hat die Entity {event.entity.id} aus Taxonomy{' '}
          Term {event.taxonomyTerm.id} entfernt.
        </>
      )
    case NotificationEventType.CreateTaxonomyTerm:
      // TODO:
      return (
        <>
          User {event.actor.id} hat den Taxonomy Term {event.taxonomyTerm.id}{' '}
          erstellt.
        </>
      )
    case NotificationEventType.SetTaxonomyTerm:
      // TODO:
      return (
        <>
          User {event.actor.id} hat den Taxonomy Term {event.taxonomyTerm.id}{' '}
          geändert.
        </>
      )
    case NotificationEventType.SetTaxonomyParent:
      // TODO:
      return (
        <>
          User {event.actor.id} hat den Elternknoten des Terms{' '}
          {event.taxonomyTerm.id} von ${event.previousParent.id} auf{' '}
          {event.parent.id} geändert.
        </>
      )
    case NotificationEventType.SetUuidState:
      // TODO:
      return (
        <>
          User {event.actor.id} hat den Uuid {event.uuid.id}{' '}
          {event.trashed
            ? 'in den Papierkorb verschoben'
            : 'aus dem Papierkorb wieder hergestellt'}
          .
        </>
      )
  }
}
