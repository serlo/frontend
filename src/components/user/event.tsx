import { faBellSlash, faCheck } from '@fortawesome/free-solid-svg-icons'
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
  AbstractUuid,
  Thread,
} from '@serlo/api'
import Tippy from '@tippyjs/react'
import clsx from 'clsx'
import { hasPath } from 'ramda'

import { FaIcon } from '../fa-icon'
import { UserLink } from './user-link'
import { useAuthentication } from '@/auth/use-authentication'
import { Link } from '@/components/content/link'
import { TimeAgo } from '@/components/time-ago'
import { useInstanceData } from '@/contexts/instance-context'
import { LoggedInData } from '@/data-types'
import { getEntityStringByTypename } from '@/helper/feature-i18n'
import { replacePlaceholders } from '@/helper/replace-placeholders'

export type EventData =
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

interface EventProps {
  event: EventData
  eventId: number
  unread: boolean
  loggedInStrings?: LoggedInData['strings']['notifications']
  setToRead?: (id: number) => void
  slim?: boolean
  noPrivateContent?: boolean
}

export function Event({
  event,
  eventId,
  unread,
  loggedInStrings,
  setToRead,
  slim,
  noPrivateContent,
}: EventProps) {
  const { strings } = useInstanceData()
  const eventDate = new Date(event.date)

  // for chat invitation mvp
  const auth = useAuthentication()

  return (
    <>
      <style jsx>{`
        .unread {
          font-weight: bold;
          &:before {
            content: '';
            display: inline-block;
            @apply bg-brand;
            border-radius: 50%;
            width: 10px;
            height: 10px;
            margin-right: 7px;
          }
        }
      `}</style>
      <div
        /*Item*/ className={clsx(
          'py-6 px-side',
          slim && 'pt-1 pb-1',
          'relative my-2.5',
          'odd:bg-brand-100'
        )}
      >
        <TimeAgo
          className="text-sm text-truegray-500"
          /*StyledTimeAgo*/ datetime={eventDate}
          dateAsTitle
        />
        <div className={clsx('mb-2 mt-0.25', unread && 'unread')} /*Title*/>
          {renderText()}
        </div>
        {renderReason()}
        {renderButtons()}
      </div>
    </>
  )

  function parseString(
    string: string,
    replaceables: { [key: string]: JSX.Element | string }
  ) {
    replaceables.actor = <UserLink noBadges user={event.actor} />
    return replacePlaceholders(string, replaceables)
  }

  function renderText() {
    const actor = <UserLink noBadges user={event.actor} />

    switch (event.__typename) {
      case 'SetThreadStateNotificationEvent':
        return parseString(
          event.archived
            ? strings.events.setThreadStateArchived
            : strings.events.setThreadStateUnarchived,
          {
            thread: renderThread(event.thread),
          }
        )

      case 'CreateCommentNotificationEvent':
        return parseString(strings.events.createComment, {
          thread: renderThread(event.thread),
          comment: (
            <Link href={`/${event.comment.id}`} forceNoCSR>
              {strings.entities.comment}
            </Link>
          ),
        })

      case 'CreateThreadNotificationEvent':
        // for invite to chat mvp
        if (event.object.id === auth.current?.id) {
          return parseString(strings.events.inviteToChat, {
            chatLink: (
              <a className="serlo-link" href="https://community.serlo.org">
                community.serlo.org
              </a>
            ),
            comment: (
              <p className="font-normal">
                &quot;{event.thread.comments.nodes[0].content}&quot;
              </p>
            ),
          })
        }
        //default notification
        return parseString(strings.events.createThread, {
          thread: renderThread(event.thread),
          object: renderObject(event.object),
        })

      case 'CreateEntityNotificationEvent':
        return parseString(strings.events.createEntity, {
          object: renderObject(event.entity),
        })

      case 'SetLicenseNotificationEvent':
        return parseString(strings.events.setLicense, {
          repository: renderObject(event.repository),
        })

      case 'CreateEntityLinkNotificationEvent':
        return parseString(strings.events.createEntityLink, {
          child: renderObject(event.child),
          parent: renderObject(event.parent),
        })

      case 'RemoveEntityLinkNotificationEvent':
        return parseString(strings.events.removeEntityLink, {
          child: renderObject(event.child),
          parent: renderObject(event.parent),
        })

      case 'CreateEntityRevisionNotificationEvent':
        return parseString(strings.events.createEntityRevision, {
          revision: renderRevision(event.entityRevision.id),
          entity: renderObject(event.entity),
        })

      case 'CheckoutRevisionNotificationEvent':
        return parseString(strings.events.checkoutRevision, {
          actor: actor,
          revision: renderRevision(event.revision.id),
          repository: renderObject(event.repository),
        })

      case 'RejectRevisionNotificationEvent':
        return parseString(strings.events.rejectRevision, {
          revision: renderRevision(event.revision.id),
          repository: renderObject(event.repository),
        })

      case 'CreateTaxonomyLinkNotificationEvent':
        return parseString(strings.events.createTaxonomyLink, {
          child: renderObject(event.child),
          parent: renderObject(event.parent),
        })

      case 'RemoveTaxonomyLinkNotificationEvent':
        return parseString(strings.events.removeTaxonomyLink, {
          child: renderObject(event.child),
          parent: renderTax(event.parent),
        })

      case 'CreateTaxonomyTermNotificationEvent':
        return parseString(strings.events.createTaxonomyTerm, {
          term: renderTax(event.taxonomyTerm),
        })

      case 'SetTaxonomyTermNotificationEvent':
        return parseString(strings.events.setTaxonomyTerm, {
          term: renderTax(event.taxonomyTerm),
        })

      case 'SetTaxonomyParentNotificationEvent':
        if (!event.parent) {
          //deleted
          return parseString(strings.events.setTaxonomyParentDeleted, {
            child: renderTax(event.child),
          })
        }
        if (event.previousParent) {
          return parseString(strings.events.setTaxonomyParentChangedFrom, {
            child: renderTax(event.child),
            previousparent: renderTax(event.previousParent),
            parent: renderTax(event.parent),
          })
        }
        return parseString(strings.events.setTaxonomyParentChanged, {
          child: renderTax(event.child),
          parent: renderTax(event.parent),
        })

      case 'SetUuidStateNotificationEvent':
        return parseString(
          event.trashed
            ? strings.events.setUuidStateTrashed
            : strings.events.setUuidStateRestored,
          {
            object: renderObject(event.object),
          }
        )
    }
  }

  function renderReason() {
    if (noPrivateContent) return null
    if (
      event.__typename === 'RejectRevisionNotificationEvent' ||
      event.__typename === 'CheckoutRevisionNotificationEvent'
    ) {
      return <div className="text-truegray-500" /*Content*/>{event.reason}</div>
    }
  }

  function renderObject(object: AbstractUuid & { __typename?: string }) {
    return (
      <Link href={object.alias ?? `/${object.id}`}>
        {hasObject(object)
          ? object.currentRevision.title
          : getEntityStringByTypename(object.__typename, strings)}
      </Link>
    )
  }

  function renderTax(taxonomy: TaxonomyTerm) {
    return (
      <Link href={taxonomy.alias ?? `/${taxonomy.id}`}>{taxonomy.name}</Link>
    )
  }

  function renderRevision(id: number) {
    return <Link href={`/${id}`}>{strings.entities.revision}</Link>
  }

  function renderThread(thread: Thread) {
    const id = thread.comments?.nodes[0]?.id
    return (
      <Link href={`/${id}`} forceNoCSR>
        {strings.entities.thread}
      </Link>
    )
  }

  function hasObject(
    object: unknown
  ): object is { currentRevision: { title: string } } {
    return hasPath(['currentRevision', 'title'], object)
  }

  function renderButtons() {
    if (!setToRead) return null
    return (
      <div className="absolute flex right-5 top-8" /*ButtonWrapper*/>
        {renderMuteButton()}
        {unread && renderReadButton()}
      </div>
    )
  }

  function renderReadButton() {
    if (!setToRead) return null
    return (
      <Tippy
        duration={[300, 250]}
        animation="fade"
        placement="bottom"
        content={renderTooltip(loggedInStrings?.setToRead)}
      >
        <a
          className="serlo-button serlo-make-interactive-transparent-blue text-base"
          /*StyledButton*/ onClick={() => setToRead(eventId)}
        >
          <FaIcon icon={faCheck} />
        </a>
      </Tippy>
    )
  }

  function renderMuteButton() {
    return (
      <Tippy
        duration={[300, 250]}
        animation="fade"
        placement="bottom"
        content={renderTooltip(loggedInStrings?.hide)}
      >
        <a
          className="serlo-button serlo-make-interactive-transparent-blue text-base mr-3"
          /*StyledButton*/ href={`/unsubscribe/${event.objectId.toString()}`}
        >
          <FaIcon icon={faBellSlash} />
        </a>
      </Tippy>
    )
  }

  function renderTooltip(text?: string) {
    return (
      <span
        className="text-sm leading-tight block bg-truegray-800 text-white rounded-md py-2 px-2.5 max-w-[200px]" /*Tooltip*/
      >
        {text}
      </span>
    )
  }
}
