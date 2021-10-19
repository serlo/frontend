import { PluginToolbarButton } from '@edtr-io/core'
import { Icon } from '@edtr-io/ui'
import { faHistory } from '@fortawesome/free-solid-svg-icons'
import NProgress from 'nprogress'
import { PropsWithChildren, useState } from 'react'

import { endpoint } from '@/api/endpoint'
import { useGraphqlSwr } from '@/api/use-graphql-swr'
import {
  editorResponseToState,
  isError,
} from '@/components/edtr-io/editor-response-to-state'
import { revisionResponseToResponse } from '@/components/edtr-io/revision-response-to-response'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { RevisionHistory as SerloRevisionHistory } from '@/components/pages/revision-history'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { HistoryRevisionsData } from '@/data-types'
import { QueryResponseRevision } from '@/fetcher/query-types'
import { revisionQuery } from '@/fetcher/revision/query'
import { showToastNotice } from '@/helper/show-toast-notice'
import { triggerSentry } from '@/helper/trigger-sentry'
import { revisionHistoryQuery } from '@/pages/entity/repository/history/[id]'

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

  if (props.id === 0) return null

  if (!revisionsResponse.data?.uuid.revisions) {
    return <p>…</p>
  }

  const revisions = revisionsResponse.data?.uuid.revisions.nodes
  // const currentlyAccepted = revisionsResponse.data?.uuid.currentRevision.id

  const onSelectRevision = (id: number) => {
    //don't select the current selected
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
        {/* // a bit untidy, but it's very nice to reuse this component here.
        // TODO: find a way to mark currently loaded id */}
        <SerloRevisionHistory
          data={revisionsResponse.data?.uuid}
          hideEdit
          onSelectRevision={onSelectRevision}
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

  //const isCurrentlyLoaded = props.currentRevision === id
  //const isCurrentlyAccepted = currentlyAccepted === id

  function useRevisionsFetch(id: number) {
    return useGraphqlSwr<{ uuid: HistoryRevisionsData }>({
      query: revisionHistoryQuery,
      variables: { id },
      config: {
        refreshInterval: 1 * 60 * 1000, //1min
      },
    })
  }

  function fetchRevisionData(id: number) {
    // TODO: Maybe add loading indicator

    NProgress.start()

    void fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: revisionQuery,
        variables: {
          id,
        },
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        try {
          const { uuid } = (
            result as unknown as { data: { uuid: QueryResponseRevision } }
          ).data
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
        }
      })
      .finally(() => {
        NProgress.done()
      })
  }
}

function handleError(message: string) {
  void triggerSentry({ message })
  void showToastNotice('Sorry, could not load revision 🥵', 'warning')
}
