export enum NotificationEventType {
  SetThreadState = 'SET_THREAD_STATE',
  CreateComment = 'CREATE_COMMENT',
  CreateThread = 'CREATE_THREAD',
  CreateEntity = 'CREATE_ENTITY',
  SetLicense = 'SET_LICENSE',
  CreateLink = 'CREATE_LINK',
  RemoveLink = 'REMOVE_LINK',
  CreateEntityRevision = 'CREATE_ENTITY_REVISION',
  CheckoutRevision = 'CHECKOUT_REVISION',
  RejectRevision = 'REJECT_REVISION',
  CreateTaxonomyAssociation = 'CREATE_TAXONOMY_ASSOCIATION',
  RemoveTaxonomyAssociation = 'REMOVE_TAXONOMY_ASSOCIATION',
  CreateTaxonomyTerm = 'CREATE_TAXONOMY_TERM',
  SetTaxonomyTerm = 'SET_TAXONOMY_TERM',
  SetTaxonomyParent = 'SET_TAXONOMY_PARENT',
  SetUuidState = 'SET_UUID_STATE',
}

export interface AbstractNotificationEvent {
  type: NotificationEventType
  date: Date
}

export interface NotificationUser {
  id: number
  username: string
}

export interface SetThreadStateEvent extends AbstractNotificationEvent {
  type: NotificationEventType.SetThreadState
  archived: boolean
  actor: NotificationUser
  thread: { id: number }
}

export interface CreateCommentEvent extends AbstractNotificationEvent {
  type: NotificationEventType.CreateComment
  thread: { id: number }
  comment: { id: number }
  author: NotificationUser
}

export interface CreateThreadEvent extends AbstractNotificationEvent {
  type: NotificationEventType.CreateThread
  uuid: { id: number }
  thread: { id: number }
  author: NotificationUser
}

export interface CreateEntityEvent extends AbstractNotificationEvent {
  type: NotificationEventType.CreateEntity
  entity: { id: number }
  author: NotificationUser
}

export interface SetLicenseEvent extends AbstractNotificationEvent {
  type: NotificationEventType.SetLicense
  entity: { id: number }
  actor: NotificationUser
}

export interface CreateLinkEvent extends AbstractNotificationEvent {
  type: NotificationEventType.CreateLink
  parent: { id: number }
  entity: { id: number }
  actor: NotificationUser
}

export interface RemoveLinkEvent extends AbstractNotificationEvent {
  type: NotificationEventType.RemoveLink
  parent: { id: number }
  entity: { id: number }
  actor: NotificationUser
}

export interface CreateEntityRevisionEvent extends AbstractNotificationEvent {
  type: NotificationEventType.CreateEntityRevision
  repository: { id: number }
  revision: { id: number }
  author: NotificationUser
}

export interface CheckoutRevisionEvent extends AbstractNotificationEvent {
  type: NotificationEventType.CheckoutRevision
  repository: { id: number }
  revision: { id: number }
  reason: string
  reviewer: NotificationUser
}

export interface RejectRevisionEvent extends AbstractNotificationEvent {
  type: NotificationEventType.RejectRevision
  repository: { id: number }
  revision: { id: number }
  reason: string
  reviewer: NotificationUser
}

export interface CreateTaxonomyAssociation extends AbstractNotificationEvent {
  type: NotificationEventType.CreateTaxonomyAssociation
  taxonomyTerm: { id: number }
  entity: { id: number }
  actor: NotificationUser
}

export interface RemoveTaxonomyAssociation extends AbstractNotificationEvent {
  type: NotificationEventType.RemoveTaxonomyAssociation
  taxonomyTerm: { id: number }
  entity: { id: number }
  actor: NotificationUser
}

export interface CreateTaxonomyTerm extends AbstractNotificationEvent {
  type: NotificationEventType.CreateTaxonomyTerm
  taxonomyTerm: { id: number }
  actor: NotificationUser
}

export interface SetTaxonomyTerm extends AbstractNotificationEvent {
  type: NotificationEventType.SetTaxonomyTerm
  taxonomyTerm: { id: number }
  actor: NotificationUser
}

export interface SetTaxonomyParent extends AbstractNotificationEvent {
  type: NotificationEventType.SetTaxonomyParent
  taxonomyTerm: { id: number }
  actor: NotificationUser
  previousParent: { id: number }
  parent: { id: number }
}

export interface SetUuidState extends AbstractNotificationEvent {
  type: NotificationEventType.SetUuidState
  uuid: { id: number }
  actor: NotificationUser
  trashed: boolean
}

export type NotificationEvent =
  | SetThreadStateEvent
  | CreateCommentEvent
  | CreateThreadEvent
  | CreateEntityEvent
  | SetLicenseEvent
  | CreateLinkEvent
  | RemoveLinkEvent
  | CreateEntityRevisionEvent
  | CheckoutRevisionEvent
  | RejectRevisionEvent
  | CreateTaxonomyAssociation
  | RemoveTaxonomyAssociation
  | CreateTaxonomyTerm
  | SetTaxonomyTerm
  | SetTaxonomyParent
  | SetUuidState

export interface NotificationEventPayload {
  type: NotificationEventType
  date: string
  actor: {
    id: number
    username: string
  }
  object: {
    id: number
  }
  payload: string
}

export function parseNotificationEvent(
  payload: NotificationEventPayload
): NotificationEvent {
  const extra = JSON.parse(payload.payload)

  switch (payload.type) {
    case NotificationEventType.SetThreadState:
      return {
        type: NotificationEventType.SetThreadState,
        date: new Date(payload.date),
        actor: payload.actor,
        thread: payload.object,
        archived: extra.archived,
      }
    case NotificationEventType.CreateComment:
      return {
        type: NotificationEventType.CreateComment,
        date: new Date(payload.date),
        thread: { id: extra.threadId },
        comment: payload.object,
        author: payload.actor,
      }
    case NotificationEventType.CreateThread:
      return {
        type: NotificationEventType.CreateThread,
        date: new Date(payload.date),
        thread: payload.object,
        uuid: { id: extra.objectId },
        author: payload.actor,
      }
    case NotificationEventType.CreateEntity:
      return {
        type: NotificationEventType.CreateEntity,
        date: new Date(payload.date),
        entity: payload.object,
        author: payload.actor,
      }
    case NotificationEventType.SetLicense:
      return {
        type: NotificationEventType.SetLicense,
        date: new Date(payload.date),
        entity: payload.object,
        actor: payload.actor,
      }
    case NotificationEventType.CreateLink:
      return {
        type: NotificationEventType.CreateLink,
        date: new Date(payload.date),
        entity: payload.object,
        actor: payload.actor,
        parent: { id: extra.parentId },
      }
    case NotificationEventType.RemoveLink:
      return {
        type: NotificationEventType.RemoveLink,
        date: new Date(payload.date),
        entity: payload.object,
        actor: payload.actor,
        parent: { id: extra.parentId },
      }
    case NotificationEventType.CreateEntityRevision:
      return {
        type: NotificationEventType.CreateEntityRevision,
        date: new Date(payload.date),
        revision: payload.object,
        author: payload.actor,
        repository: { id: extra.repositoryId },
      }
    case NotificationEventType.CheckoutRevision:
      return {
        type: NotificationEventType.CheckoutRevision,
        date: new Date(payload.date),
        revision: payload.object,
        reviewer: payload.actor,
        repository: { id: extra.repositoryId },
        reason: extra.reason,
      }
    case NotificationEventType.RejectRevision:
      return {
        type: NotificationEventType.RejectRevision,
        date: new Date(payload.date),
        revision: payload.object,
        reviewer: payload.actor,
        repository: { id: extra.repositoryId },
        reason: extra.reason,
      }
    case NotificationEventType.CreateTaxonomyAssociation:
      return {
        type: NotificationEventType.CreateTaxonomyAssociation,
        date: new Date(payload.date),
        taxonomyTerm: payload.object,
        actor: payload.actor,
        entity: { id: extra.objectId },
      }
    case NotificationEventType.RemoveTaxonomyAssociation:
      return {
        type: NotificationEventType.RemoveTaxonomyAssociation,
        date: new Date(payload.date),
        taxonomyTerm: payload.object,
        actor: payload.actor,
        entity: { id: extra.objectId },
      }
    case NotificationEventType.CreateTaxonomyTerm:
      return {
        type: NotificationEventType.CreateTaxonomyTerm,
        date: new Date(payload.date),
        taxonomyTerm: payload.object,
        actor: payload.actor,
      }
    case NotificationEventType.SetTaxonomyTerm:
      return {
        type: NotificationEventType.SetTaxonomyTerm,
        date: new Date(payload.date),
        taxonomyTerm: payload.object,
        actor: payload.actor,
      }
    case NotificationEventType.SetTaxonomyParent:
      return {
        type: NotificationEventType.SetTaxonomyParent,
        date: new Date(payload.date),
        taxonomyTerm: payload.object,
        actor: payload.actor,
        previousParent: { id: extra.previousParentId },
        parent: { id: extra.parentId },
      }
    case NotificationEventType.SetUuidState:
      return {
        type: NotificationEventType.SetUuidState,
        date: new Date(payload.date),
        uuid: payload.object,
        actor: payload.actor,
        trashed: extra.trashed,
      }
  }
}
