import { faBellSlash, faCheck } from '@fortawesome/free-solid-svg-icons'
import { Entity } from '@serlo/authorization'
import type { StaticMathProps } from '@serlo/editor/src/plugins/text/static-components/static-math'
import { cn } from '@serlo/tailwind/helper/cn'
import Tippy from '@tippyjs/react'
import dynamic from 'next/dynamic'

import { UserLink } from './user-link'
import { FaIcon } from '../fa-icon'
import { useAuthentication } from '@/auth/use-authentication'
import { useCanDo } from '@/auth/use-can-do'
import { Link } from '@/components/content/link'
import { TimeAgo } from '@/components/time-ago'
import { useInstanceData } from '@/contexts/instance-context'
import { LoggedInData, UuidType } from '@/data-types'
import { GetNotificationsQuery } from '@/fetcher/graphql-types/operations'
import { getEntityStringByTypename } from '@/helper/feature-i18n'
import { isProduction } from '@/helper/is-production'
import { replacePlaceholders } from '@/helper/replace-placeholders'
import { replaceWithJSX } from '@/helper/replace-with-jsx'

type Event = GetNotificationsQuery['notifications']['nodes'][number]['event']

type EventThread = Extract<Event, { thread: any }>['thread']
type EventObject = Extract<Event, { object: any }>['object']
type EventParent = Extract<Event, { parent: any }>['parent']

type EventAbstractUuid = Extract<Event, { __typename: string }>

interface EventProps {
  event?: EventAbstractUuid | null
  eventId: number
  unread: boolean
  loggedInStrings?: LoggedInData['strings']['notifications']
  setToRead?: (id: number) => void
  mute?: (id: number) => void
  slim?: boolean
  noPrivateContent?: boolean
}

const StaticMath = dynamic<StaticMathProps>(() =>
  import('@serlo/editor/src/plugins/text/static-components/static-math').then(
    (mod) => mod.StaticMath
  )
)

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

  // for chat invitation mvp
  const authId = useAuthentication()?.id

  const canDo = useCanDo()
  const showErrors = !isProduction || canDo(Entity.checkoutRevision)

  if (!event) {
    return showErrors ? (
      <p className="my-2.5 bg-amber-100 px-side py-1 font-bold">
        Faulty Event (id: {eventId}){' '}
      </p>
    ) : null
  }

  const { actor, __typename, objectId } = event

  const eventDate = new Date(event.date)

  return (
    <>
      <div
        className={cn(
          'relative my-2.5 px-side py-6 odd:bg-brand-100',
          slim && 'pb-1 pt-1'
        )}
      >
        <TimeAgo
          className="text-sm text-gray-500"
          datetime={eventDate}
          dateAsTitle
        />
        <div className={cn('mb-2 mt-0.25 pr-24', unread && 'font-bold')}>
          {unread && <span className="text-brand">● </span>}
          {renderText()}
        </div>
        {renderAdditionalText()}
        {renderButtons()}
      </div>
    </>
  )

  function parseString(
    string: string,
    replaceables: { [key: string]: JSX.Element | string }
  ) {
    replaceables.actor = <UserLink noBadges user={actor} />
    return replacePlaceholders(string, replaceables)
  }

  function renderText() {
    const userLink = <UserLink noBadges user={actor} />

    switch (__typename) {
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
          // links to comments need to go through cf worker
          comment: (
            <Link href={`/${event.comment.id}`} forceNoCSR>
              {strings.entities.comment}&nbsp;<sup>{event.comment.id}</sup>
            </Link>
          ),
        })

      case 'CreateThreadNotificationEvent':
        // for invite to chat mvp
        if (event.object.id === authId) {
          return parseString(strings.events.inviteToChat, {
            chatLink: (
              <a className="serlo-link" href="https://community.serlo.org">
                community.serlo.org
              </a>
            ),
            comment: (
              <p className="font-normal">
                &quot;{event.thread.thread.nodes[0].content}&quot;
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
          actor: userLink,
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

  function renderAdditionalText() {
    if (noPrivateContent || !event) return null

    if (
      event.__typename === 'RejectRevisionNotificationEvent' ||
      event.__typename === 'CheckoutRevisionNotificationEvent'
    ) {
      return <div className="text-gray-500">{event.reason}</div>
    }
    if (event.__typename === 'CreateThreadNotificationEvent') {
      return renderCommentContent(event.thread.thread.nodes[0].content)
    }
    if (event.__typename === 'CreateCommentNotificationEvent') {
      return renderCommentContent(event.comment.content)
    }
  }

  function renderCommentContent(content?: string) {
    if (!content) return null
    const maxLength = 200
    const shortened =
      content.length > maxLength
        ? content.substring(0, maxLength) + '…'
        : content
    const withMath = replaceWithJSX([shortened], /%%(.+?)%%/g, (formula, i) => (
      <StaticMath key={`math-${i}`} type="math" src={formula} inline />
    ))
    return <div className="text-gray-500">{withMath}</div>
  }

  function renderObject({
    alias,
    title,
    __typename,
    id,
  }: EventObject | EventParent) {
    return (
      <Link href={alias}>
        <>
          {renderTitle(title, __typename as UuidType, id)}
          {shouldRenderParent(__typename as UuidType) ? (
            <>{renderParent(title, __typename as UuidType)}</>
          ) : null}
        </>
      </Link>
    )
  }

  function shouldRenderParent(typename: UuidType) {
    return [
      UuidType.Exercise,
      UuidType.GroupedExercise,
      UuidType.Thread,
      UuidType.Comment,
    ].includes(typename)
  }

  function renderParent(title: string, typename: UuidType) {
    const preposition = [UuidType.Exercise, UuidType.GroupedExercise].includes(
      typename
    )
      ? strings.events.entityInParentPreposition
      : [UuidType.Thread, UuidType.Comment].includes(typename)
        ? strings.events.commentInParentPreposition
        : ''

    return ` (${preposition} ${title})`
  }

  function renderTitle(title: string, typename: UuidType, id: number) {
    if (
      [
        UuidType.Exercise,
        UuidType.GroupedExercise,
        UuidType.Thread,
        UuidType.Comment,
      ].includes(typename)
    ) {
      return (
        <>
          {getEntityStringByTypename(typename, strings)}&nbsp;<sup>{id}</sup>
        </>
      )
    } else {
      return <>{title}</>
    }
  }

  function renderRevision(id: number) {
    return (
      <Link href={`/${id}`}>
        {strings.entities.revision}&nbsp;<sup>{id}</sup>
      </Link>
    )
  }

  function renderThread(thread: EventThread) {
    const id = thread.thread.nodes[0]?.id
    // links to comments need to go through cf worker
    return (
      <Link href={`/${id}`} forceNoCSR>
        {strings.entities.thread}&nbsp;<sup>{id}</sup>
      </Link>
    )
  }

  function renderButtons() {
    if (!setToRead) return null
    return (
      <div className="absolute right-5 top-11 flex" /*ButtonWrapper*/>
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
          className="serlo-button-blue-transparent text-base"
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
          className="serlo-button-blue-transparent mr-3 text-base"
          onClick={() => {
            void mute(objectId)
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
        className="block max-w-[200px] rounded-md bg-almost-black px-2.5 py-2 text-sm leading-tight text-white" /*Tooltip*/
      >
        {text}
      </span>
    )
  }
}
