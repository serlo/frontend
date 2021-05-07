import {
  Entity,
  Page,
  Subscription,
  TaxonomyTerm,
  Uuid,
} from '@serlo/authorization'
import Tippy, { TippyProps } from '@tippyjs/react'
import cookie from 'cookie'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import { Fragment } from 'react'

import { SubLink } from '../navigation/sub-link'
import { AuthorToolsData } from './author-tools-hover-menu'
import { HoverSubList } from './hover-sub-list'
import { SubButtonStyle } from './sub-button-style'
import { useCanDo } from '@/auth/use-can-do'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { csrReload } from '@/helper/csr-reload'
import { useSetUuidStateMutation } from '@/helper/mutations'
import { showToastNotice } from '@/helper/show-toast-notice'
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
  Sort = 'sort',
  SortEntities = 'sortEntities',
  Trash = 'trash',
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

const tippyDefaultProps: Partial<TippyProps> = {
  delay: [0, 270],
  interactiveBorder: 40,
  interactive: true,
  placement: 'left-end',
}

export function AuthorTools({ tools, entityId, data }: AuthorToolsProps) {
  const loggedInData = useLoggedInData()
  const instanceData = useInstanceData()
  const { isSubscribed, updateIsSubscribed } = useIsSubscribed(data.id)

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
        canDo(TaxonomyTerm.set) &&
        canDo(TaxonomyTerm.orderChildren) &&
        canDo(TaxonomyTerm.addChild) &&
        canDo(TaxonomyTerm.removeChild),
    },
    trash: {
      renderer: trash,
      canDo: canDo(Uuid.setState(data.type)),
    },
    newEntitySubmenu: {
      renderer: renderNewEntity,
      canDo: canDo(Uuid.create(data.type)),
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
      return renderFetchLi(
        `/unsubscribe/${entityId}`,
        loggedInStrings.authorMenu.unsubscribeNotifications
      )
    }
    return (
      <div>
        <Tippy
          {...tippyDefaultProps}
          content={
            <HoverSubList>
              {renderFetchLi(
                `/subscribe/${entityId}/0`,
                loggedInStrings.authorMenu.subscribeNotifications
              )}
              {renderFetchLi(
                `/subscribe/${entityId}/1`,
                loggedInStrings.authorMenu.subscribeNotificationsAndMail
              )}
            </HoverSubList>
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
      </div>
    )
  }

  function trash() {
    return (
      <li
        className="block"
        key={
          data.trashed
            ? loggedInStrings.authorMenu.restoreContent
            : loggedInStrings.authorMenu.moveToTrash
        }
      >
        <SubButtonStyle
          as="button"
          onClick={() => {
            void setUuidState({ id: [data.id], trashed: !data.trashed })
          }}
        >
          {data.trashed
            ? loggedInStrings.authorMenu.restoreContent
            : loggedInStrings.authorMenu.moveToTrash}
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
              <HoverSubList>
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
              </HoverSubList>
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

  function renderFetchLi(href: string, text: string, csrf?: boolean) {
    return (
      <li className="block">
        <SubButtonStyle
          as="button"
          onClick={() => fetchLegacyUrl(href, text, csrf)}
        >
          {text}
        </SubButtonStyle>
      </li>
    )
  }

  //quick experiment
  function fetchLegacyUrl(url: string, text: string, csrf?: boolean) {
    //TODO: this works quite nicely, but the fetch below does not :)
    if (url.startsWith('/subscribe') || url.startsWith('/unsubscribe')) {
      updateIsSubscribed(data.id, !isSubscribed)
      return false
    }

    NProgress.start()

    const cookies = cookie.parse(
      typeof window === 'undefined' ? '' : document.cookie
    )

    const options = csrf
      ? { method: 'POST', body: JSON.stringify({ csrf: cookies['CSRF'] }) }
      : {}

    try {
      void fetch(url, options)
        .then((res) => {
          //if location.href is not res.url there was probably an authentication error. use api mutation in the future.
          if (res.status === 200 && location.href.startsWith(res.url)) {
            NProgress.done()
            showToastNotice(`'${text}' erfolgreich `, 'success')

            if (
              url.startsWith('/subscribe') ||
              url.startsWith('/unsubscribe')
            ) {
              //TODO: Mutate Subscribed here

              return false
            }

            setTimeout(() => {
              csrReload()
            }, 1500)
          } else {
            showErrorNotice()
          }
        })
        .catch(() => {
          showErrorNotice()
        })
    } catch (e) {
      console.log(e)
      showErrorNotice()
    }

    function showErrorNotice() {
      NProgress.done()
      showToastNotice('Something went wrong… Please try again.', 'warning')
      return false
    }
  }
}
