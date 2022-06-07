import { faBellSlash } from '@fortawesome/free-solid-svg-icons/faBellSlash'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
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
import { GetNotificationsQuery } from '@/fetcher/graphql-types/operations'
import { getEntityStringByTypename } from '@/helper/feature-i18n'
import { replacePlaceholders } from '@/helper/replace-placeholders'

type Event = GetNotificationsQuery['notifications']['nodes'][number]['event']

type EventThread = Extract<Event, { thread: any }>['thread']

type EventAbstractUuid = Extract<Event, { __typename: string }>

// TODO: work in progress

interface EventProps {
  event: Event
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
        {hasTitle(object)
          ? object.currentRevision.title
          : getEntityStringIncludingFolder(object)}
      </Link>
    )
  }

  // Gets localized entity name (for example "Solution") and containing folder (for example "Exercises about topic X")
  // Full example: "Solution | Exercises about topic X"
  function getEntityStringIncludingFolder(
    object: AbstractUuid & { __typename?: string }
  ) {
    const taxonomyTerms = getTaxonomyTerms(object)

    if (taxonomyTerms.length == 0) {
      return getEntityStringByTypename(object.__typename, strings)
    }

    const topicFolder = taxonomyTerms.find(
      (term) => term.type === TaxonomyTermType.TopicFolder
    )
    if (topicFolder === undefined) {
      return (
        getEntityStringByTypename(object.__typename, strings) +
        ' | ' +
        taxonomyTerms[0].name // Give at least some context.
      )
    }

    return (
      getEntityStringByTypename(object.__typename, strings) +
      ' | ' +
      topicFolder.name
    )
  }

  function getTaxonomyTerms(
    object: AbstractUuid & { __typename?: string }
  ): { name: string; type: TaxonomyTermType }[] {
    if (object.__typename === 'Exercise' && hasTaxonomyTerms(object)) {
      return object.taxonomyTerms.nodes
    }

    if (object.__typename === 'ExerciseGroup' && hasTaxonomyTerms(object)) {
      return object.taxonomyTerms.nodes
    }

    if (
      object.__typename === 'GroupedExercise' &&
      hasExerciseGroup(object) &&
      hasTaxonomyTerms(object.exerciseGroup)
    ) {
      return object.exerciseGroup.taxonomyTerms.nodes
    }

    if (object.__typename === 'Solution' && hasExercise(object)) {
      if (
        object.exercise.__typename === 'Exercise' &&
        hasTaxonomyTerms(object.exercise)
      ) {
        return object.exercise.taxonomyTerms.nodes
      } else if (
        object.exercise.__typename === 'GroupedExercise' &&
        hasExerciseGroup(object.exercise) &&
        hasTaxonomyTerms(object.exercise.exerciseGroup)
      ) {
        return object.exercise.exerciseGroup.taxonomyTerms.nodes
      }
    }

    if (
      object.__typename === 'TaxonomyTerm' &&
      hasName(object) &&
      hasType(object)
    ) {
      return [{ name: object.name, type: object.type }]
    }

    return []
  }

  function hasExercise(
    object: AbstractUuid & { __typename?: string }
  ): object is AbstractUuid & { __typename?: string } & {
    exercise: AbstractUuid & { __typename?: string }
  } {
    return hasPath(['exercise'], object)
  }

  function hasExerciseGroup(
    object: AbstractUuid & { __typename?: string }
  ): object is AbstractUuid & { __typename?: string } & {
    exerciseGroup: AbstractUuid & { __typename?: string }
  } {
    return hasPath(['exerciseGroup'], object)
  }

  function hasName(
    object: AbstractUuid & { __typename?: string }
  ): object is AbstractUuid & { __typename?: string } & { name: string } {
    return hasPath(['name'], object)
  }

  function hasType(
    object: AbstractUuid & { __typename?: string }
  ): object is AbstractUuid & { __typename?: string } & {
    type: TaxonomyTermType
  } {
    return hasPath(['type'], object)
  }

  function hasTaxonomyTerms(
    object: AbstractUuid & { __typename?: string }
  ): object is AbstractUuid & { __typename?: string } & {
    taxonomyTerms: { nodes: { name: string; type: TaxonomyTermType }[] }
  } {
    return hasPath(['taxonomyTerms', 'nodes'], object)
  }

  function hasTitle(
    object: unknown
  ): object is { currentRevision: { title: string } } {
    return hasPath(['currentRevision', 'title'], object)
  }

  function renderTax(taxonomy: TaxonomyTerm) {
    return (
      <Link href={taxonomy.alias ?? `/${taxonomy.id}`}>{taxonomy.name}</Link>
    )
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
