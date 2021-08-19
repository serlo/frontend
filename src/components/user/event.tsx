import { faBellSlash, faCheck } from '@fortawesome/free-solid-svg-icons'
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
  AbstractUuid,
  Thread,
} from '@serlo/api'
import Tippy from '@tippyjs/react'
import clsx from 'clsx'
import * as R from 'ramda'
import styled, { css } from 'styled-components'

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
    <Item className={clsx('py-6 px-side', slim && 'pt-1 pb-1')}>
      <StyledTimeAgo datetime={eventDate} dateAsTitle />
      <Title unread={unread}>{renderText()}</Title>
      {renderReason()}
      {renderButtons()}
    </Item>
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
            <Link href={`/${event.comment.id}`} noCSR>
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
            break: <br />,
          })
        }
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
      return <Content>{event.reason}</Content>
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
      <Link href={`/${id}`} noCSR>
        {strings.entities.thread}
      </Link>
    )
  }

  function hasObject(
    object: unknown
  ): object is { currentRevision: { title: string } } {
    return R.hasPath(['currentRevision', 'title'], object)
  }

  function renderButtons() {
    if (!setToRead) return null
    return (
      <ButtonWrapper>
        {renderMuteButton()}
        {unread && renderReadButton()}
      </ButtonWrapper>
    )
  }

  function renderReadButton() {
    if (!setToRead) return null
    return (
      <Tippy
        duration={[300, 250]}
        animation="fade"
        placement="bottom"
        content={<Tooltip>{loggedInStrings?.setToRead}</Tooltip>}
      >
        <StyledButton onClick={() => setToRead(eventId)}>
          <FontAwesomeIcon icon={faCheck} />
        </StyledButton>
      </Tippy>
    )
  }

  function renderMuteButton() {
    return (
      <Tippy
        duration={[300, 250]}
        animation="fade"
        placement="bottom"
        content={<Tooltip>{loggedInStrings?.hide}</Tooltip>}
      >
        <StyledButton href={`/unsubscribe/${event.objectId.toString()}`}>
          <FontAwesomeIcon icon={faBellSlash} />
        </StyledButton>
      </Tippy>
    )
  }
}

const StyledTimeAgo = styled(TimeAgo)`
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.gray};
`

const ButtonWrapper = styled.div`
  display: flex;
  position: absolute;
  right: 20px;
  top: 30px;
`

const StyledButton = styled.a`
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 10px;
  margin-left: 10px;
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
  &:nth-child(odd) {
    background: ${(props) => props.theme.colors.bluewhite};
  }

  &:hover ${StyledButton} {
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
`
