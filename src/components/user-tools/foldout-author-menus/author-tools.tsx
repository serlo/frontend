import {
  faWandSparkles,
  faWandMagicSparkles,
} from '@fortawesome/free-solid-svg-icons'
import {
  Entity,
  Subscription,
  TaxonomyTerm,
  Uuid,
  UuidType as AuthUuidType,
} from '@serlo/authorization'
import { useRouter } from 'next/router'
import { Fragment } from 'react'

import { SubItem } from './sub-item'
import { useCanDo } from '@/auth/use-can-do'
import { useAiFeatures } from '@/components/exercise-generation/use-ai-features'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import {
  ExerciseInlineType,
  UuidRevType,
  UuidType,
  UuidWithRevType,
} from '@/data-types'
import { Instance, TaxonomyTermType } from '@/fetcher/graphql-types/operations'
import { getTranslatedType } from '@/helper/get-translated-type'
import { getEditUrl } from '@/helper/urls/get-edit-url'
import { getHistoryUrl } from '@/helper/urls/get-history-url'
import { useIsSubscribed } from '@/helper/use-is-subscribed'
import { useSetUuidStateMutation } from '@/mutations/use-set-uuid-state-mutation'
import { useSubscriptionSetMutation } from '@/mutations/use-subscription-set-mutation'

export enum Tool {
  Abo = 'abo',
  ChangeLicense = 'changeLicense',
  MoveOrCopyItems = 'moveOrCopyItems',
  Curriculum = 'curriculum',
  Edit = 'edit',
  EditTax = 'editTax',
  UnrevisedEdit = 'unrevisedEdit',
  History = 'history',
  Log = 'log',
  NewEntitySubmenu = 'newEntitySubmenu',
  Separator = 'separator',
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

export interface AuthorToolsData {
  type: UuidWithRevType | ExerciseInlineType
  id: number
  alias?: string
  taxonomyType?: TaxonomyTermType
  revisionId?: number
  title?: string
  parentId?: number
  courseId?: number
  grouped?: boolean
  trashed?: boolean
  checkoutRejectButtons?: JSX.Element
  revisionData?: {
    rejected: boolean
    current: boolean
  }
  unrevisedRevisions?: number
  unrevisedCourseRevisions?: number
}

export interface AuthorToolsProps {
  tools: Tool[]
  entityId: number
  data: AuthorToolsData
}

export function AuthorTools({ tools, entityId, data }: AuthorToolsProps) {
  const loggedInData = useLoggedInData()
  const { lang, strings } = useInstanceData()

  const isSubscribed = useIsSubscribed(data.id)
  const setSubscription = useSubscriptionSetMutation()
  const setUuidState = useSetUuidStateMutation()

  const router = useRouter()
  const canDo = useCanDo()

  const { canUseAiFeaturesOutsideProduction } = useAiFeatures()

  if (!loggedInData) return null
  const loggedInStrings = loggedInData.strings

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
    editTax: {
      url: getEditUrl(entityId),
      canDo: canDo(TaxonomyTerm.set),
    },
    unrevisedEdit: {
      url: getHistoryUrl(entityId),
      canDo: canDo(Uuid.create('EntityRevision')),
    },
    curriculum: {
      url: `/entity/taxonomy/update/${entityId}`,
      title: loggedInStrings.authorMenu.editAssignments,
      canDo:
        !(data.type === ExerciseInlineType.Exercise && data.grouped) &&
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
    sortEntities: {
      url: `/taxonomy/term/sort/entities/${data.id}`,
      canDo: canDo(Entity.orderChildren),
    },
    moveOrCopyItems: {
      url: `/taxonomy/term/copy/batch/${data.id}`,
      canDo: canDo(TaxonomyTerm.change),
    },
    changeLicense: {
      url: `/entity/license/update/${data.id}`,
      canDo: canDo(Entity.updateLicense),
    },
    directLink: {
      title: loggedInStrings.authorMenu.directLink,
      url: `/${data.id}`,
      canDo: true,
    },
    analyticsLink:
      data.taxonomyType === TaxonomyTermType.ExerciseFolder &&
      lang === Instance.De
        ? {
            title: 'Daten-Dashboard für Ordner anzeigen',
            url: `/___exercise_folder_dashboard/${data.id}`,
            canDo: canDo(Uuid.create('Entity')),
          }
        : {
            title: loggedInStrings.authorMenu.analyticsLink,
            url: `https://simpleanalytics.com/${lang}.serlo.org${
              data.alias ?? ''
            }`,
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
          if (url) {
            const titleWithFallback = title || getTranslatedString(toolName)
            return (
              <SubItem
                key={titleWithFallback}
                title={titleWithFallback}
                href={url}
              />
            )
          }
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
    const {
      unsubscribeNotifications,
      subscribeNotifications,
      subscribeNotificationsAndMail,
    } = loggedInStrings.authorMenu
    return (
      <>
        {isSubscribed ? (
          renderAboItem(unsubscribeNotifications, false, false)
        ) : (
          <>
            {renderAboItem(subscribeNotifications, true, false)}
            {renderAboItem(subscribeNotificationsAndMail, true, true)}
          </>
        )}
        <li className="mb-2 border-b-[1px] border-brand-200 pb-2"></li>
      </>
    )

    function renderAboItem(
      title: string,
      subscribe: boolean,
      sendEmail: boolean
    ) {
      return (
        <SubItem
          key={title}
          title={title}
          onClick={() => {
            void setSubscription({
              id: [entityId],
              subscribe,
              sendEmail,
            })
          }}
        />
      )
    }
  }

  function trash() {
    const { restoreContent, moveToTrash, confirmTrash } =
      loggedInStrings.authorMenu
    const title = data.trashed ? restoreContent : moveToTrash
    return (
      <SubItem
        title={title}
        key={title}
        onClick={() => {
          if (!data.trashed && !window.confirm(confirmTrash)) return
          void setUuidState({ id: [data.id], trashed: !data.trashed })
        }}
      />
    )
  }

  function renderNewEntity() {
    if (data.type !== UuidType.TaxonomyTerm || !data.taxonomyType) return null

    const allowedTypes: Record<
      TaxonomyTermType,
      (UuidType | TaxonomyTermType)[]
    > = {
      topic: [
        UuidType.Article,
        UuidType.Course,
        UuidType.Video,
        UuidType.Applet,
        UuidType.Event,
        TaxonomyTermType.Topic,
        TaxonomyTermType.ExerciseFolder,
      ],
      exerciseFolder: [UuidType.Exercise, UuidType.ExerciseGroup],
      subject: [TaxonomyTermType.Topic],
      root: [TaxonomyTermType.Subject],
    }

    const shouldRenderEvents =
      (lang === Instance.De &&
        router.asPath === '/community/142215/veranstaltungen') ||
      (lang !== Instance.De && router.asPath.startsWith('/community'))

    const entries = allowedTypes[data.taxonomyType].map((entityType) => {
      if (entityType === UuidType.Event && !shouldRenderEvents) return null

      const title = getTranslatedType(strings, entityType)

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

        return (
          <SubItem
            key={title}
            title={title}
            href={`/taxonomy/term/create/${createId}/${data.id}`}
          />
        )
      }

      const showAiItem =
        canUseAiFeaturesOutsideProduction &&
        entityType === UuidType.ExerciseGroup

      return (
        <Fragment key={title}>
          <SubItem
            key={title}
            title={title}
            href={`/entity/create/${entityType}/${data.id}`}
          />
          {showAiItem ? (
            <Fragment key="ai-group">
              <SubItem
                key="ai-single-exercise"
                title={
                  loggedInStrings.ai.exerciseGeneration.buttonTitleSingular
                }
                href={`/entity/create/${UuidType.Exercise}/${data.id}?showAiWizard=&referrer=exercise-folder`}
                icon={faWandSparkles}
              />
              <SubItem
                key="ai-group-exercise"
                title={loggedInStrings.ai.exerciseGeneration.buttonTitle}
                href={`/entity/create/${entityType}/${data.id}?showAiWizard=&referrer=exercise-folder`}
                icon={faWandMagicSparkles}
              />
            </Fragment>
          ) : null}
        </Fragment>
      )
    })

    return <>{entries}</>
  }
}

function typeToAuthorizationType(type: AuthorToolsData['type']): AuthUuidType {
  if (type === UuidType.Page) return 'Page'
  if (type === UuidRevType.Page) return 'PageRevision'
  if (type.includes('Revision')) return 'EntityRevision'
  return 'Entity'
}
