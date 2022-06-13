import { faBellSlash } from '@fortawesome/free-solid-svg-icons/faBellSlash'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import Tippy from '@tippyjs/react'
import clsx from 'clsx'

import { FaIcon } from '../fa-icon'
import { UserLink } from './user-link'
import { useAuthentication } from '@/auth/use-authentication'
import { Link } from '@/components/content/link'
import { TimeAgo } from '@/components/time-ago'
import { useInstanceData } from '@/contexts/instance-context'
import { LoggedInData } from '@/data-types'
import { GetNotificationsQuery } from '@/fetcher/graphql-types/operations'
import { getEntityStringByTypename } from '@/helper/feature-i18n'
import { replacePlaceholders } from '@/helper/replace-placeholders'

type Event = GetNotificationsQuery['notifications']['nodes'][number]['event']

type EventThread = Extract<Event, { thread: any }>['thread']
type EventObject = Extract<Event, { object: any }>['object']
type EventParent = Extract<Event, { parent: any }>['parent']

type EventAbstractUuid = Extract<Event, { __typename: string }>

interface EventProps {
  event: EventAbstractUuid
  eventId: number
  unread: boolean
  loggedInStrings?: LoggedInData['strings']['notifications']
  setToRead?: (id: number) => void
  mute?: (id: number) => void
  slim?: boolean
  noPrivateContent?: boolean
}

export function Event({
  event,
  eventId,
  unread,
  loggedInStrings,
  setToRead,
  mute,
  slim,
  noPrivateContent,
}: EventProps) {
  const { strings } = useInstanceData()
  const eventDate = new Date(event.date)

  // for chat invitation mvp
  const auth = useAuthentication()

  return (
    <>
      <div
        className={clsx(
          'relative my-2.5 py-6 px-side odd:bg-brand-100',
          slim && 'pt-1 pb-1'
        )}
      >
        <TimeAgo
          className="text-sm text-truegray-500"
          datetime={eventDate}
          dateAsTitle
        />
        <div className={clsx('mb-2 mt-0.25', unread && 'font-bold')}>
          {unread && <span className="text-brand">● </span>}
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
              {`${strings.entities.comment} ${event.comment.id}`}
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
          parent: renderObject(event.parent),
        })

      case 'CreateTaxonomyTermNotificationEvent':
        return parseString(strings.events.createTaxonomyTerm, {
          term: renderObject(event.taxonomyTerm),
        })

      case 'SetTaxonomyTermNotificationEvent':
        return parseString(strings.events.setTaxonomyTerm, {
          term: renderObject(event.taxonomyTerm),
        })

      case 'SetTaxonomyParentNotificationEvent':
        if (!event.optionalParent) {
          //deleted
          return parseString(strings.events.setTaxonomyParentDeleted, {
            child: renderObject(event.child),
          })
        }
        if (event.previousParent) {
          return parseString(strings.events.setTaxonomyParentChangedFrom, {
            child: renderObject(event.child),
            previousparent: renderObject(event.previousParent),
            parent: renderObject(event.optionalParent),
          })
        }
        return parseString(strings.events.setTaxonomyParentChanged, {
          child: renderObject(event.child),
          parent: renderObject(event.optionalParent),
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

  function renderObject({
    alias,
    title,
    __typename,
  }: EventObject | EventParent) {
    return <Link href={alias}>{renderTitle(title, __typename)}</Link>
  }

  function renderTitle(title: string, type: string) {
    const typeString = getEntityStringByTypename(type, strings)
    const preposition = ['Exercise', 'GroupedExercise', 'Solution'].includes(
      type
    )
      ? strings.events.entityInParentPreposition
      : ['Thread', 'Comment'].includes(type)
      ? strings.events.commentInParentPreposition
      : ''

    return preposition ? `${typeString} (${preposition} ${title})` : title
  }

  function renderRevision(id: number) {
    return <Link href={`/${id}`}>{`${strings.entities.revision} ${id}`}</Link>
  }

  function renderThread(thread: EventThread) {
    const id = thread.comments?.nodes[0]?.id
    return (
      <Link href={`/${id}`} forceNoCSR>
        {`${strings.entities.thread} ${id}`}
      </Link>
    )
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
        <button
          className="serlo-button serlo-make-interactive-transparent-blue text-base"
          onClick={() => setToRead(eventId)}
        >
          <FaIcon icon={faCheck} />
        </button>
      </Tippy>
    )
  }

  function renderMuteButton() {
    if (!mute || !setToRead) return null
    return (
      <Tippy
        duration={[300, 250]}
        animation="fade"
        placement="bottom"
        content={renderTooltip(loggedInStrings?.hide)}
      >
        <button
          className="serlo-button serlo-make-interactive-transparent-blue text-base mr-3"
          onClick={() => {
            void mute(event.objectId)
            if (unread) void setToRead(eventId)
          }}
        >
          <FaIcon icon={faBellSlash} />
        </button>
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
