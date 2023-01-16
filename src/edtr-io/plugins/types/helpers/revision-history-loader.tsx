import { PluginToolbarButton } from '@edtr-io/core'
import { Icon } from '@edtr-io/ui'
import { faHistory } from '@fortawesome/free-solid-svg-icons/faHistory'
import request, { gql } from 'graphql-request'
import NProgress from 'nprogress'
import { PropsWithChildren, useState } from 'react'

import { endpoint } from '@/api/endpoint'
import { useGraphqlSwr } from '@/api/use-graphql-swr'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { RevisionHistory as SerloRevisionHistory } from '@/components/pages/revision-history'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import {
  editorResponseToState,
  isError,
} from '@/edtr-io/editor-response-to-state'
import { revisionResponseToResponse } from '@/edtr-io/revision-response-to-response'
import {
  RevisionUuidQuery,
  RevisionUuidQueryVariables,
} from '@/fetcher/graphql-types/operations'
import { Revisions } from '@/fetcher/query-types'
import { revisionQuery } from '@/fetcher/revision/query'
import { basicUserDataFragment } from '@/fetcher/user/query'
import { showToastNotice } from '@/helper/show-toast-notice'
import { triggerSentry } from '@/helper/trigger-sentry'

export const revisionHistoryQuery = gql`
  query revisions($id: Int!) {
    uuid(id: $id) {
      id
      alias
      __typename
      title
      ... on Applet {
        currentRevision {
          id
        }
        revisions {
          nodes {
            id
            trashed
            author {
              ...basicUserData
            }
            changes
            date
          }
        }
      }
      ... on Article {
        currentRevision {
          id
        }
        revisions {
          nodes {
            id
            trashed
            author {
              ...basicUserData
            }
            changes
            date
          }
        }
      }
      ... on Course {
        currentRevision {
          id
        }
        revisions {
          nodes {
            id
            trashed
            author {
              ...basicUserData
            }
            changes
            date
          }
        }
      }
      ... on CoursePage {
        currentRevision {
          id
        }
        revisions {
          nodes {
            id
            trashed
            author {
              ...basicUserData
            }
            changes
            date
          }
        }
      }
      ... on Event {
        currentRevision {
          id
        }
        revisions {
          nodes {
            id
            trashed
            author {
              ...basicUserData
            }
            changes
            date
          }
        }
      }
      ... on Exercise {
        currentRevision {
          id
        }
        revisions {
          nodes {
            id
            trashed
            author {
              ...basicUserData
            }
            changes
            date
          }
        }
      }
      ... on ExerciseGroup {
        currentRevision {
          id
        }
        revisions {
          nodes {
            id
            trashed
            author {
              ...basicUserData
            }
            changes
            date
          }
        }
      }
      ... on GroupedExercise {
        currentRevision {
          id
        }
        revisions {
          nodes {
            id
            trashed
            author {
              ...basicUserData
            }
            changes
            date
          }
        }
      }
      ... on Page {
        currentRevision {
          id
        }
        revisions {
          nodes {
            id
            trashed
            author {
              ...basicUserData
            }
            date
          }
        }
      }
      ... on Video {
        currentRevision {
          id
        }
        revisions {
          nodes {
            id
            trashed
            author {
              ...basicUserData
            }
            changes
            date
          }
        }
      }
      ... on Solution {
        currentRevision {
          id
        }
        revisions {
          nodes {
            id
            trashed
            author {
              ...basicUserData
            }
            changes
            date
          }
        }
      }
    }
  }

  ${basicUserDataFragment}
`

export function RevisionHistoryLoader<T>(
  props: PropsWithChildren<{
    id: number
    currentRevision: number
    onSwitchRevision: (data: T) => void
  }>
) {
  const [showRevisions, setShowRevisions] = useState(false)

  const revisionsResponse = useRevisionsFetch(props.id)

  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const editorStrings = loggedInData.strings.editor

  if (!revisionsResponse) return null

  if (!revisionsResponse.data?.uuid.revisions) return null // no revision loader for solutions

  const revisions = revisionsResponse.data?.uuid.revisions.nodes

  const onSelectRevision = (id: number) => {
    //don't select the selected
    const isCurrentlyLoaded = props.currentRevision === id
    if (isCurrentlyLoaded) return null
    fetchRevisionData(id)
  }

  return (
    <div>
      <span
        onClick={() => {
          if (revisions.length) {
            setShowRevisions(true)
          }
        }}
      >
        <PluginToolbarButton
          icon={<Icon icon={faHistory} size="lg" />}
          label={editorStrings.edtrIo.switchRevision}
        />
      </span>

      <ModalWithCloseButton
        isOpen={showRevisions}
        onCloseClick={() => {
          setShowRevisions(false)
        }}
        title={editorStrings.edtrIo.switchRevision}
      >
        {/* // a bit untidy, but it's very nice to reuse this component here */}
        <SerloRevisionHistory
          data={revisionsResponse.data?.uuid}
          hideEdit
          onSelectRevision={onSelectRevision}
          selectedRevisionId={props.currentRevision}
        />
      </ModalWithCloseButton>
      <style jsx global>{`
        .ReactModalPortal .ReactModal__Content {
          @apply w-[900px] max-w-[90vw] max-h-[80vh];
          @apply translate-y-0 top-8 overflow-y-scroll;
          @apply pt-0;

          table {
            @apply w-auto mt-12;
          }
        }
      `}</style>
    </div>
  )

  function useRevisionsFetch(id: number) {
    return useGraphqlSwr<{ uuid: Revisions }>({
      query: revisionHistoryQuery,
      variables: { id },
      noKey: id === 0,
      config: {
        refreshInterval: 1 * 60 * 1000, //1min
      },
    })
  }

  function fetchRevisionData(id: number) {
    NProgress.start()

    void (async () => {
      try {
        const data = await request<
          RevisionUuidQuery,
          RevisionUuidQueryVariables
        >(endpoint, revisionQuery, {
          id,
        })
        const { uuid } = data
        const prepared = revisionResponseToResponse(uuid)
        const converted = editorResponseToState(prepared!)

        if (isError(converted)) {
          handleError(`editor: revision conversion | ${converted.error}`)
        } else {
          props.onSwitchRevision(converted.initialState.state as T)
          setShowRevisions(false)
        }
      } catch (e) {
        handleError('editor: revision conversion failed')
      } finally {
        NProgress.done()
      }
    })()
  }
}

function handleError(message: string) {
  void triggerSentry({ message })
  void showToastNotice('Sorry, could not load revision 🥵', 'warning')
}
