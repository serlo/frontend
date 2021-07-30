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

import { SubLink } from '../navigation/sub-link'
import { AuthorToolsData, tippyDefaultProps } from './author-tools-hover-menu'
import { SubButtonStyle } from './sub-button-style'
import { useCanDo } from '@/auth/use-can-do'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { isClient } from '@/helper/client-detection'
import {
  useSetUuidStateMutation,
  useSubscriptionSetMutation,
} from '@/helper/mutations'
import { useIsSubscribed } from '@/helper/use-is-subscribed'

export enum Tool {
  Abo = 'abo',
  AddCoursePage = 'addCoursePage',
  AddGroupedTextExercise = 'addGroupedTextExercise',
  ChangeLicense = 'changeLicense',
  CopyItems = 'copyItems',
  Curriculum = 'curriculum',
  Edit = 'edit',
  History = 'history',
  Log = 'log',
  MoveCoursePage = 'moveCoursePage',
  MoveItems = 'moveItems',
  MoveToExercise = 'moveToExercise',
  NewEntitySubmenu = 'newEntitySubmenu',
  Organize = 'organize',
  PageConvert = 'pageConvert',
  PageHistory = 'pageHistory',
  PageSetting = 'pageSetting',
  Pdf = 'pdf',
  Sort = 'sort',
  SortEntities = 'sortEntities',
  Trash = 'trash',
  DirectLink = 'directLink',
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
    convert: {
      url: `/page/revision/create/${entityId}/${data.revisionId || ''}`,
      canDo: false, // we should remove this?
    },
    pageConvert: {
      url: `/page/revision/create/${entityId}/${data.revisionId || ''}`,
      title: loggedInStrings.authorMenu.convert,
      canDo: canDo(Uuid.create('PageRevision')),
    },
    log: {
      url: `/event/history/${entityId}`,
      canDo: true,
    },
    pdf: {
      renderer: pdf,
      canDo: true,
    },
    history: {
      url: `/entity/repository/history/${entityId}`,
      canDo: true,
    },
    sort: {
      url: `/entity/link/order/${entityId}/link`,
      canDo: canDo(Entity.orderChildren),
    },
    edit: {
      url: `/entity/repository/add-revision/${entityId}`,
      canDo: canDo(Uuid.create('EntityRevision')),
    },
    curriculum: {
      url: `/entity/taxonomy/update/${entityId}`,
      title: loggedInStrings.authorMenu.editAssignments,
      canDo:
        !(data.type === '_ExerciseInline' && data.grouped) &&
        canDo(TaxonomyTerm.set) &&
        canDo(TaxonomyTerm.orderChildren) &&
        canDo(TaxonomyTerm.addChild) &&
        canDo(TaxonomyTerm.removeChild),
    },
    trash: {
      renderer: trash,
      canDo: canDo(Uuid.setState(customTypeToAuthorizationType(data.type))),
    },
    newEntitySubmenu: {
      renderer: renderNewEntity,
      canDo: canDo(Uuid.create('Entity')),
    },
    pageHistory: {
      url: `/page/revision/revisions/${data.id}`,
      title: loggedInStrings.authorMenu.history,
      canDo: true,
    },
    pageSetting: {
      url: `/page/update/${data.id}`,
      title: loggedInStrings.authorMenu.settings,
      canDo: canDo(Page.set),
    },
    moveCoursePage: {
      url: `/entity/link/move/link/${data.id}/${data.courseId!}`,
      canDo: false,
    },
    organize: {
      url: `/taxonomy/term/organize/${data.id}`,
      canDo: canDo(TaxonomyTerm.addChild) && canDo(TaxonomyTerm.removeChild),
    },
    sortEntities: {
      url: `/taxonomy/term/sort/entities/${data.id}`,
      canDo: canDo(Entity.orderChildren),
    },
    copyItems: {
      url: `/taxonomy/term/copy/batch/${data.id}`,
      canDo: canDo(TaxonomyTerm.addChild),
    },
    addGroupedTextExercise: {
      url: `/entity/create/grouped-text-exercise?link%5Btype%5D=link&link%5Bchild%5D=${data.id}`,
      canDo: false,
    },
    changeLicense: {
      url: `/entity/license/update/${data.id}`,
      canDo: canDo(Entity.setLicense),
    },
    moveItems: {
      url: `/taxonomy/term/move/batch/${data.id}`,
      canDo: canDo(TaxonomyTerm.addChild) && canDo(TaxonomyTerm.removeChild),
    },
    moveToExercise: {
      url: `/entity/link/move/link/${data.id}/${data.parentId!}`,
      title: data.grouped
        ? loggedInStrings.authorMenu.moveToGroupedTextExercise
        : loggedInStrings.authorMenu.moveToTextExercise,
      canDo: canDo(TaxonomyTerm.addChild) && canDo(TaxonomyTerm.removeChild),
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
          <SubButtonStyle
            as="button"
            onClick={() => {
              void setSubscription({
                id: [entityId],
                subscribe: false,
                sendEmail: false,
              })
            }}
          >
            {loggedInStrings.authorMenu.unsubscribeNotifications}
          </SubButtonStyle>
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
              <SubButtonStyle
                as="button"
                onClick={() => {
                  void setSubscription({
                    id: [entityId],
                    subscribe: true,
                    sendEmail: false,
                  })
                }}
              >
                {loggedInStrings.authorMenu.subscribeNotifications}
              </SubButtonStyle>
            </li>
            <li
              className="block"
              key={loggedInStrings.authorMenu.subscribeNotificationsAndMail}
            >
              <SubButtonStyle
                as="button"
                onClick={() => {
                  void setSubscription({
                    id: [entityId],
                    subscribe: true,
                    sendEmail: true,
                  })
                }}
              >
                {loggedInStrings.authorMenu.subscribeNotificationsAndMail}
              </SubButtonStyle>
            </li>
          </ul>
        }
      >
        <li className="block">
          <SubLink as="div" tabIndex={0}>
            <SubButtonStyle>
              ◂ {loggedInStrings.authorMenu.subscribe}
            </SubButtonStyle>
          </SubLink>
        </li>
      </Tippy>
    )
  }

  function pdf() {
    const { pdf } = loggedInStrings.authorMenu
    const path = router.asPath.split('#')[0]
    // TODO: Just for testing!
    const url = isClient ? window.location.href : ''
    // const url = `https://${router.locale ?? 'de'}.${domain}${path}`
    const fileName = `serlo__${path.split('/').pop() ?? entityId}.pdf`

    return (
      <li className="block" key={pdf}>
        <SubButtonStyle
          as="a"
          download={fileName}
          href={`/api/pdf?url=${encodeURIComponent(url)}`}
        >
          {pdf}
        </SubButtonStyle>
      </li>
    )
  }

  function trash() {
    const title = data.trashed
      ? loggedInStrings.authorMenu.restoreContent
      : loggedInStrings.authorMenu.moveToTrash
    return (
      <li className="block" key={title}>
        <SubButtonStyle
          as="button"
          onClick={() => {
            void setUuidState({ id: [data.id], trashed: !data.trashed })
          }}
        >
          {title}
        </SubButtonStyle>
      </li>
    )
  }

  function renderNewEntity() {
    const shouldRenderEvents =
      (lang === 'de' && router.asPath === '/community/veranstaltungen') ||
      (lang !== 'de' && router.asPath.startsWith('/community'))

    if (data.taxonomyFolder || data.taxonomyTopic)
      return (
        <li className="block">
          <Tippy
            {...tippyDefaultProps}
            content={
              <ul className="serlo-sub-list-hover">
                {data.taxonomyFolder && (
                  <>
                    {renderLi(
                      `/entity/create/text-exercise?taxonomy%5Bterm%5D=${data.id}`,
                      entities.exercise
                    )}
                    {renderLi(
                      `/entity/create/text-exercise-group?taxonomy%5Bterm%5D=${data.id}`,
                      entities.exerciseGroup
                    )}
                  </>
                )}

                {data.taxonomyTopic && (
                  <>
                    {renderLi(
                      `/entity/create/article?taxonomy%5Bterm%5D=${data.id}`,
                      entities.article
                    )}
                    {renderLi(
                      `/entity/create/course?taxonomy%5Bterm%5D=${data.id}`,
                      entities.course
                    )}
                    {renderLi(
                      `/entity/create/video?taxonomy%5Bterm%5D=${data.id}`,
                      entities.video
                    )}
                    {renderLi(
                      `/entity/create/applet?taxonomy%5Bterm%5D=${data.id}`,
                      entities.applet
                    )}
                    {shouldRenderEvents &&
                      renderLi(
                        `/entity/create/event?taxonomy%5Bterm%5D=${data.id}`,
                        entities.event
                      )}
                  </>
                )}
              </ul>
            }
          >
            <SubLink as="div" tabIndex={0}>
              <SubButtonStyle>
                ◂ {loggedInStrings.authorMenu.newEntity}
              </SubButtonStyle>
            </SubLink>
          </Tippy>
        </li>
      )
  }

  function renderLi(href: string, text: string) {
    return (
      <li className="block" key={text}>
        <SubLink href={href}>
          <SubButtonStyle>{text}</SubButtonStyle>
        </SubLink>
      </li>
    )
  }
}

function customTypeToAuthorizationType(type: string) {
  if (type == 'Taxonomy') return 'TaxonomyTerm'
  if (['Page', 'PageRevision'].includes(type)) return type
  if (type.includes('Revision')) return 'EntityRevision'
  return 'Entity'
}
