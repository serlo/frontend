import { TaxonomyTermType } from '@serlo/api'
import { Entity, Subscription, TaxonomyTerm, Uuid } from '@serlo/authorization'
import {
  Entity,
  Page,
  Subscription,
  TaxonomyTerm,
  Uuid,
} from '@serlo/authorization'
import Tippy from '@tippyjs/react'
import { useRouter } from 'next/router'
import { Fragment } from 'react'

import { AuthorToolsData, tippyDefaultProps } from './author-tools-hover-menu'
import { MenuSubButtonLink } from './menu-sub-button-link'
import { useCanDo } from '@/auth/use-can-do'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { useSetUuidStateMutation } from '@/helper/mutations/use-set-uuid-state-mutation'
import { useSubscriptionSetMutation } from '@/helper/mutations/use-subscription-set-mutation'
import { getEditUrl } from '@/helper/urls/get-edit-url'
import { getHistoryUrl } from '@/helper/urls/get-history-url'
import { useIsSubscribed } from '@/helper/use-is-subscribed'

export enum Tool {
  Abo = 'abo',
  AddCoursePage = 'addCoursePage',
  AddGroupedTextExercise = 'addGroupedTextExercise',
  ChangeLicense = 'changeLicense',
  CopyItems = 'copyItems',
  Curriculum = 'curriculum',
  Edit = 'edit',
  UnrevisedEdit = 'unrevisedEdit',
  History = 'history',
  Log = 'log',
  MoveCoursePage = 'moveCoursePage',
  MoveItems = 'moveItems',
  MoveToExercise = 'moveToExercise',
  NewEntitySubmenu = 'newEntitySubmenu',
  Organize = 'organize',
  SortCoursePages = 'sortCoursePages',
  SortGroupedExercises = 'sortGroupedExercises',
  SortEntities = 'sortEntities',
  Trash = 'trash',
  DirectLink = 'directLink',
  AnalyticsLink = 'analyticsLink',
}

interface ToolConfig {
  url?: string
  title?: string
  canDo: boolean
  entityId?: number
  renderer?: (entityId?: number) => JSX.Element
}

type ToolsConfig = Record<Tool, ToolConfig>

export interface AuthorToolsProps {
  tools: Tool[]
  entityId: number
  data: AuthorToolsData
}

export function AuthorTools({ tools, entityId, data }: AuthorToolsProps) {
  const loggedInData = useLoggedInData()
  const instanceData = useInstanceData()

  const isSubscribed = useIsSubscribed(data.id)
  const setSubscription = useSubscriptionSetMutation()
  const setUuidState = useSetUuidStateMutation()

  const router = useRouter()
  const canDo = useCanDo()

  if (!loggedInData) return null
  const loggedInStrings = loggedInData.strings
  const entities = instanceData.strings.entities
  const lang = instanceData.lang

  const toolsConfig = {
    abo: {
      renderer: abo,
      canDo: canDo(Subscription.set),
    },
    log: {
      url: `/event/history/${entityId}`,
      canDo: true,
    },
    history: {
      url: getHistoryUrl(entityId),
      canDo: true,
    },
    sortCoursePages: {
      url: `/entity/link/order/${entityId}/link`,
      canDo: canDo(Entity.orderChildren),
    },
    sortGroupedExercises: {
      url: `/entity/link/order/${entityId}/link`,
      canDo: canDo(Entity.orderChildren),
    },
    edit: {
      url: getEditUrl(entityId),
      canDo: canDo(Uuid.create('EntityRevision')),
    },
    unrevisedEdit: {
      url: getHistoryUrl(entityId),
      canDo: canDo(Uuid.create('EntityRevision')),
    },
    curriculum: {
      url: `/entity/taxonomy/update/${entityId}`,
      title: loggedInStrings.authorMenu.editAssignments,
      canDo:
        !(data.type === '_ExerciseInline' && data.grouped) &&
        canDo(TaxonomyTerm.set) &&
        canDo(TaxonomyTerm.orderChildren) &&
        canDo(TaxonomyTerm.change) &&
        canDo(TaxonomyTerm.removeChild),
    },
    trash: {
      renderer: trash,
      canDo: canDo(Uuid.setState(typeToAuthorizationType(data.type))),
    },
    newEntitySubmenu: {
      renderer: renderNewEntity,
      canDo: canDo(Uuid.create('Entity')),
    },
    moveCoursePage: {
      url: `/entity/link/move/link/${data.id}/${data.courseId!}`,
      canDo: false,
    },
    organize: {
      url: `/taxonomy/term/organize/${data.id}`,
      canDo: canDo(TaxonomyTerm.change) && canDo(TaxonomyTerm.removeChild),
    },
    sortEntities: {
      url: `/taxonomy/term/sort/entities/${data.id}`,
      canDo: canDo(Entity.orderChildren),
    },
    copyItems: {
      url: `/taxonomy/term/copy/batch/${data.id}`,
      canDo: canDo(TaxonomyTerm.change),
    },
    addGroupedTextExercise: {
      url: `/entity/create/grouped-text-exercise?link%5Btype%5D=link&link%5Bchild%5D=${data.id}`,
      canDo: false,
    },
    changeLicense: {
      url: `/entity/license/update/${data.id}`,
      canDo: canDo(Entity.updateLicense),
    },
    moveItems: {
      url: `/taxonomy/term/move/batch/${data.id}`,
      canDo: canDo(TaxonomyTerm.change) && canDo(TaxonomyTerm.removeChild),
    },
    moveToExercise: {
      url: `/entity/link/move/link/${data.id}/${data.parentId!}`,
      title: data.grouped
        ? loggedInStrings.authorMenu.moveToGrouped
        : loggedInStrings.authorMenu.moveToTextExercise,
      canDo: canDo(TaxonomyTerm.change) && canDo(TaxonomyTerm.removeChild),
    },
    addCoursePage: {
      url: `/entity/create/course-page?link%5Btype%5D=link&link%5Bchild%5D=${data.courseId!}`,
      canDo: false,
    },
    directLink: {
      title: loggedInStrings.authorMenu.directLink,
      url: `/${data.id}`,
      canDo: true,
    },
    analyticsLink: {
      title: loggedInStrings.authorMenu.analyticsLink,
      url: `https://simpleanalytics.com/${lang}.serlo.org${data.alias ?? ''}`,
      canDo: canDo(Uuid.delete('Page')) && data.alias,
    },
  } as ToolsConfig

  return (
    <>
      {tools.map((toolName) => {
        const { canDo, renderer, url, title } = toolsConfig[toolName]

        if (canDo) {
          if (renderer) {
            return (
              <Fragment key={`${title ?? renderer.name}`}>
                {renderer(entityId)}
              </Fragment>
            )
          }
          if (url) return renderLi(url, title || getTranslatedString(toolName))
        }
      })}
    </>
  )

  function getTranslatedString(toolName: Tool) {
    return toolName in loggedInStrings.authorMenu
      ? loggedInStrings.authorMenu[
          toolName as keyof typeof loggedInStrings.authorMenu
        ]
      : ''
  }

  function abo() {
    if (isSubscribed) {
      return (
        <li
          className="block"
          key={loggedInStrings.authorMenu.unsubscribeNotifications}
        >
          <MenuSubButtonLink
            onClick={() => {
              void setSubscription({
                id: [entityId],
                subscribe: false,
                sendEmail: false,
              })
            }}
          >
            {loggedInStrings.authorMenu.unsubscribeNotifications}
          </MenuSubButtonLink>
        </li>
      )
    }
    return (
      <Tippy
        {...tippyDefaultProps}
        content={
          <ul className="serlo-sub-list-hover">
            <li
              className="block"
              key={loggedInStrings.authorMenu.subscribeNotifications}
            >
              <MenuSubButtonLink
                onClick={() => {
                  void setSubscription({
                    id: [entityId],
                    subscribe: true,
                    sendEmail: false,
                  })
                }}
              >
                {loggedInStrings.authorMenu.subscribeNotifications}
              </MenuSubButtonLink>
            </li>
            <li
              className="block"
              key={loggedInStrings.authorMenu.subscribeNotificationsAndMail}
            >
              <MenuSubButtonLink
                onClick={() => {
                  void setSubscription({
                    id: [entityId],
                    subscribe: true,
                    sendEmail: true,
                  })
                }}
              >
                {loggedInStrings.authorMenu.subscribeNotificationsAndMail}
              </MenuSubButtonLink>
            </li>
          </ul>
        }
      >
        <li className="block">
          <MenuSubButtonLink tabIndex={0}>
            ◂ {loggedInStrings.authorMenu.subscribe}
          </MenuSubButtonLink>
        </li>
      </Tippy>
    )
  }

  function trash() {
    const { restoreContent, moveToTrash, confirmTrash } =
      loggedInStrings.authorMenu
    const title = data.trashed ? restoreContent : moveToTrash
    return (
      <li className="block" key={title}>
        <MenuSubButtonLink
          onClick={() => {
            if (!data.trashed && !window.confirm(confirmTrash)) return
            void setUuidState({ id: [data.id], trashed: !data.trashed })
          }}
        >
          {title}
        </MenuSubButtonLink>
      </li>
    )
  }

  function renderNewEntity() {
    if (data.type !== 'TaxonomyTerm' || !data.taxonomyType) return null

    type EntityTypes = keyof typeof entities

    const allowedTypes: Record<
      NonNullable<AuthorToolsData['taxonomyType']>,
      EntityTypes[]
    > = {
      topic: [
        'article',
        'course',
        'video',
        'applet',
        'event',
        TaxonomyTermType.Topic,
        TaxonomyTermType.ExerciseFolder,
      ],
      exerciseFolder: ['exercise', 'exerciseGroup'],
      subject: [TaxonomyTermType.Topic],
      root: [TaxonomyTermType.Subject],
    }

    const shouldRenderEvents =
      (lang === 'de' &&
        router.asPath === '/community/142215/veranstaltungen') ||
      (lang !== 'de' && router.asPath.startsWith('/community'))

    const entries = allowedTypes[data.taxonomyType].map((entityType) => {
      if (entityType === 'event' && !shouldRenderEvents) return null

      if (
        (
          [
            TaxonomyTermType.Subject,
            TaxonomyTermType.Topic,
            TaxonomyTermType.ExerciseFolder,
          ] as string[]
        ).includes(entityType)
      ) {
        if (!canDo(TaxonomyTerm.change)) return null

        const createId = entityType === TaxonomyTermType.ExerciseFolder ? 9 : 4
        return renderLi(
          `/taxonomy/term/create/${createId}/${data.id}`,
          entities[entityType]
        )
      }

      const urlTypeString =
        entityType === 'exercise'
          ? 'text-exercise'
          : entityType === 'exerciseGroup'
          ? 'text-exercise-group'
          : entityType

      return renderLi(
        `/entity/create/${urlTypeString}?taxonomy%5Bterm%5D=${data.id}`,
        entities[entityType]
      )
    })

    return (
      <li className="block">
        <Tippy
          {...tippyDefaultProps}
          content={<ul className="serlo-sub-list-hover">{entries}</ul>}
        >
          <div>
            <MenuSubButtonLink tabIndex={0}>
              ◂ {loggedInStrings.authorMenu.newEntity}
            </MenuSubButtonLink>
          </div>
        </Tippy>
      </li>
    )
  }

  function renderLi(href: string, text: string) {
    return (
      <li className="block" key={text}>
        <MenuSubButtonLink href={href}>{text}</MenuSubButtonLink>
      </li>
    )
  }
}

function typeToAuthorizationType(type: string) {
  if (['Page', 'PageRevision'].includes(type)) return type
  if (type.includes('Revision')) return 'EntityRevision'
  return 'Entity'
}
