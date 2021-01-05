import Tippy, { TippyProps } from '@tippyjs/react'
import cookie from 'cookie'
import { gql } from 'graphql-request'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import React from 'react'
import styled from 'styled-components'

import { SubList, SubLink, SubButtonStyle } from '../navigation/menu'
import { createAuthAwareGraphqlFetch } from '@/api/graphql-fetch'
import { useAuth } from '@/auth/use-auth'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { useToastNotice } from '@/contexts/toast-notice-context'
import { UserRoles } from '@/data-types'
import { useRefreshFromAPI } from '@/helper/use-refresh-from-api'

export interface AuthorToolsData {
  type: string
  id: number
  taxonomyFolder?: boolean
  taxonomyTopic?: boolean
  revisionId?: number
  parentId?: number
  courseId?: number
  grouped?: boolean
  trashed?: boolean
}

export interface AuthorToolsHoverMenuProps {
  data: AuthorToolsData
}

const tippyDefaultProps: Partial<TippyProps> = {
  delay: [0, 270],
  interactiveBorder: 40,
  interactive: true,
  placement: 'left-end',
}

export function AuthorToolsHoverMenu({ data }: AuthorToolsHoverMenuProps) {
  const loggedInData = useLoggedInData()
  const instanceData = useInstanceData()
  const showToastNotice = useToastNotice()
  const refreshFromAPI = useRefreshFromAPI()
  const [isSubscribed, setSubscribed] = React.useState<boolean | null>(null)

  const auth = useAuth()
  const request = createAuthAwareGraphqlFetch(auth)

  React.useEffect(() => {
    if (isSubscribed !== null) return
    void (async () => {
      try {
        const res = await request(
          JSON.stringify({
            query: gql`
              query {
                subscriptions {
                  nodes {
                    id
                  }
                }
              }
            `,
          })
        )
        setSubscribed(
          res.subscriptions.nodes.some((n: any) => n.id === data.id)
        )
      } catch (e) {
        //
      }
    })()
  }, [request, data.id, isSubscribed])

  const router = useRouter()
  if (!loggedInData) return null
  const loggedInStrings = loggedInData.strings
  const entities = instanceData.strings.entities
  const lang = instanceData.lang

  const RoleEverybody = [UserRoles.Guest, UserRoles.Login]

  const tools = {
    abo: {
      renderer: abo,
      forRole: [UserRoles.Login],
    },
    convert: {
      renderer: convert,
      forRole: [],
    },
    pageConvert: {
      renderer: convert,
      forRole: [UserRoles.PageBuilder],
    },
    log: {
      renderer: log,
      forRole: RoleEverybody,
    },
    history: {
      renderer: history,
      forRole: RoleEverybody,
    },
    sort: {
      renderer: sort,
      forRole: [UserRoles.Reviewer, UserRoles.TaxonomyManager],
    },
    edit: {
      renderer: edit,
      forRole: [UserRoles.Login],
    },
    curriculum: {
      renderer: curriculum,
      forRole: [UserRoles.Login],
    },
    trash: {
      renderer: trash,
      forRole: [UserRoles.Admin],
    },
    pageHistory: {
      renderer: () => {
        return renderLi(
          `/page/revision/revisions/${data.id}`,
          loggedInStrings.authorMenu.history
        )
      },
      forRole: [UserRoles.Login],
    },
    pageSetting: {
      renderer: () => {
        return renderLi(
          `/page/update/${data.id}`,
          loggedInStrings.authorMenu.settings
        )
      },
      forRole: [UserRoles.PageBuilder],
    },
    moveCoursePage: {
      renderer: () => {
        return renderLi(
          `/entity/link/move/link/${data.id}/${data.courseId!}`,
          loggedInStrings.authorMenu.moveCoursePage
        )
      },
      forRole: [UserRoles.TaxonomyManager, UserRoles.Reviewer],
    },
    organize: {
      renderer: () => {
        return renderLi(
          `/taxonomy/term/organize/${data.id}`,
          loggedInStrings.authorMenu.organize
        )
      },
      forRole: [UserRoles.TaxonomyManager],
    },
    sortEntities: {
      renderer: () => {
        return renderLi(
          `/taxonomy/term/sort/entities/${data.id}`,
          loggedInStrings.authorMenu.sortEntities
        )
      },
      forRole: [UserRoles.Login],
    },
    copyItems: {
      renderer: () => {
        return renderLi(
          `/taxonomy/term/copy/batch/${data.id}`,
          loggedInStrings.authorMenu.copyItems
        )
      },
      forRole: [UserRoles.TaxonomyManager],
    },
    addGroupedTextExercise: {
      renderer: () => {
        return renderLi(
          `/entity/create/grouped-text-exercise?link%5Btype%5D=link&link%5Bchild%5D=${data.id}`,
          loggedInStrings.authorMenu.addGroupedTextExercise
        )
      },
      forRole: [UserRoles.Login],
    },
    changeLicense: {
      renderer: () => {
        return renderLi(
          `/entity/license/update/${data.id}`,
          loggedInStrings.authorMenu.changeLicense
        )
      },
      forRole: [UserRoles.Admin],
    },
    moveItems: {
      renderer: () => {
        return renderLi(
          `/taxonomy/term/move/batch/${data.id}`,
          loggedInStrings.authorMenu.moveItems
        )
      },
      forRole: [UserRoles.TaxonomyManager, UserRoles.Reviewer],
    },
    moveToExercise: {
      renderer: () => {
        return renderLi(
          `/entity/link/move/link/${data.id}/${data.parentId!}`,
          data.grouped
            ? loggedInStrings.authorMenu.moveToGroupedTextExercise
            : loggedInStrings.authorMenu.moveToTextExercise
        )
      },
      forRole: [UserRoles.TaxonomyManager, UserRoles.Reviewer],
    },
    addCoursePage: {
      renderer: () => {
        return renderLi(
          `/entity/create/course-page?link%5Btype%5D=link&link%5Bchild%5D=${data.courseId!}`,
          loggedInStrings.authorMenu.addCoursePage
        )
      },
      forRole: [UserRoles.Login],
    },
    newEntitySubmenu: {
      renderer: renderNewEntity,
      forRole: [UserRoles.Login],
    },
  } as Record<
    string,
    { renderer: (overwriteId?: number) => JSX.Element; forRole: UserRoles[] }
  >

  type ItemsType = keyof typeof tools

  if (data.type == 'Page') {
    return (
      <HoverSubList>
        {renderTools([
          'abo',
          'pageConvert',
          'pageHistory',
          'log',
          'pageSetting',
        ])}
      </HoverSubList>
    )
  }

  if (
    data.type == 'Article' ||
    data.type == 'Video' ||
    data.type == 'Applet' ||
    data.type == 'Event'
  ) {
    return (
      <HoverSubList>
        {renderTools(['abo', 'history', 'curriculum', 'log', 'trash'])}
      </HoverSubList>
    )
  }

  if (data.type == 'CoursePage') {
    return (
      <HoverSubList>
        <Tippy
          {...tippyDefaultProps}
          content={
            <HoverSubList>
              {renderTools([
                'abo',
                'history',
                'moveCoursePage',
                'log',
                'trash',
              ])}
            </HoverSubList>
          }
        >
          <Li>
            <SubLink>
              <SubButtonStyle>
                ◂ {loggedInStrings.authorMenu.thisCoursePage}
              </SubButtonStyle>
            </SubLink>
          </Li>
        </Tippy>
        <Tippy
          {...tippyDefaultProps}
          content={
            <HoverSubList>
              {renderTools(
                [
                  'abo',
                  'history',
                  'addCoursePage',
                  'sort',
                  'curriculum',
                  'log',
                  'trash',
                ],
                data.courseId
              )}
            </HoverSubList>
          }
        >
          <Li>
            <SubLink>
              <SubButtonStyle>
                ◂ {loggedInStrings.authorMenu.wholeCourse}
              </SubButtonStyle>
            </SubLink>
          </Li>
        </Tippy>
      </HoverSubList>
    )
  }

  if (data.type == 'Taxonomy') {
    return (
      <HoverSubList>
        {renderTools([
          'abo',
          'organize',
          'log',
          'newEntitySubmenu',
          'sortEntities',
          'copyItems',
          'moveItems',
        ])}
      </HoverSubList>
    )
  }

  if (
    data.type == '_ExerciseInline' ||
    data.type == '_ExerciseGroupInline' ||
    data.type == '_SolutionInline'
  ) {
    return (
      <HoverSubList>
        {renderTools(['edit', 'abo', 'history'])}

        {data.type == '_ExerciseGroupInline' &&
          renderTools(['addGroupedTextExercise'])}

        {data.type != '_SolutionInline' && renderTools(['sort'])}

        {data.type == '_SolutionInline'
          ? renderTools(['moveToExercise'])
          : renderTools(['curriculum'])}
        {renderTools(['changeLicense', 'log', 'trash'])}
      </HoverSubList>
    )
  }

  return null

  function renderTools(toolNames: ItemsType[], overwriteId?: number) {
    return toolNames.map((toolName) => {
      const tool = tools[toolName]
      const roles = auth.current?.roles || [UserRoles.Guest]
      const hasPower =
        tool.forRole.filter((role) => {
          return roles.indexOf(role) > -1
        }).length > 0

      if (hasPower) return tool.renderer(overwriteId)
    })
  }

  function abo(id = data.id) {
    if (isSubscribed) {
      return renderFetchLi(
        `/unsubscribe/${id}`,
        loggedInStrings.authorMenu.unsubscribeNotifications
      )
    }
    return (
      <Tippy
        {...tippyDefaultProps}
        content={
          <HoverSubList>
            {renderFetchLi(
              `/subscribe/${id}/0`,
              loggedInStrings.authorMenu.subscribeNotifications
            )}
            {renderFetchLi(
              `/subscribe/${id}/1`,
              loggedInStrings.authorMenu.subscribeNotificationsAndMail
            )}
          </HoverSubList>
        }
      >
        <Li>
          <SubLink as="div" tabIndex={0}>
            <SubButtonStyle>
              ◂ {loggedInStrings.authorMenu.subscribe}
            </SubButtonStyle>
          </SubLink>
        </Li>
      </Tippy>
    )
  }

  function convert(id = data.id, rev = data.revisionId) {
    return renderLi(
      `/page/revision/create/${id}/${rev || ''}`,
      loggedInStrings.authorMenu.convert
    )
  }

  function history(id = data.id) {
    return renderLi(
      `/entity/repository/history/${id}`,
      loggedInStrings.authorMenu.history
    )
  }

  function log(id = data.id) {
    return renderLi(`/event/history/${id}`, loggedInStrings.authorMenu.log)
  }

  function curriculum(id = data.id) {
    return renderLi(
      `/entity/taxonomy/update/${id}`,
      loggedInStrings.authorMenu.editAssignments
    )
  }

  function trash(id = data.id) {
    // todo: use graphql mutation
    if (data.trashed) {
      return renderFetchLi(
        `/uuid/restore/${id}`,
        loggedInStrings.authorMenu.restoreContent
      )
    }
    return renderFetchLi(
      `/uuid/trash/${id}`,
      loggedInStrings.authorMenu.moveToTrash,
      true
    )
  }

  function sort(id = data.id) {
    return renderLi(
      `/entity/link/order/${id}/link`,
      loggedInStrings.authorMenu.sort
    )
  }

  function edit(id = data.id) {
    return renderLi(
      `/entity/repository/add-revision/${id}`,
      loggedInStrings.authorMenu.edit
    )
  }

  function renderNewEntity() {
    const shouldRenderEvents =
      (lang === 'de' && router.asPath === '/community/veranstaltungen') ||
      (lang !== 'de' && router.asPath.startsWith('/community'))

    if (data.taxonomyFolder || data.taxonomyTopic)
      return (
        <Li>
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
        </Li>
      )
  }

  function renderLi(href: string, text: string) {
    return (
      <Li key={text}>
        <SubLink href={href} noCSR>
          <SubButtonStyle>{text}</SubButtonStyle>
        </SubLink>
      </Li>
    )
  }

  function renderFetchLi(href: string, text: string, csrf?: boolean) {
    return (
      <Li key={text}>
        <SubButtonStyle
          as="button"
          onClick={() => fetchLegacyUrl(href, text, csrf)}
        >
          {text}
        </SubButtonStyle>
      </Li>
    )
  }

  //quick experiment
  function fetchLegacyUrl(url: string, text: string, csrf?: boolean) {
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
              setSubscribed(!isSubscribed)
              return false
            }

            setTimeout(() => {
              refreshFromAPI()
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

const HoverSubList = styled(SubList)`
  background-color: ${(props) => props.theme.colors.lightBackground};
  min-width: 180px;
`

const Li = styled.li`
  display: block;
`
