import { PluginToolbarButton } from '@edtr-io/core'
import { Icon } from '@edtr-io/ui'
import { faHistory } from '@fortawesome/free-solid-svg-icons'
import { PropsWithChildren, useState } from 'react'

import { endpoint } from '@/api/endpoint'
import { useGraphqlSwr } from '@/api/use-graphql-swr'
import { queryResponseToQueryRevision } from '@/components/edtr-io/editor-response-to-state'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { RevisionHistory as SerloRevisionHistory } from '@/components/pages/revision-history'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { HistoryRevisionsData } from '@/data-types'
import { revisionQuery } from '@/fetcher/revision/query'
import { showToastNotice } from '@/helper/show-toast-notice'
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
    // TODO: Build fetch

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
        const converted = queryResponseToQueryRevision(result.data.uuid)
        console.log(converted)
      })

    showToastNotice('Not implemented yet!', 'warning')
    setShowRevisions(false)

    /*void fetch(
                        `/entity/repository/get-revision-data/${props.id}/${id}`
                      )
                        .then((response) => response.json())
                        .then((data: { state: unknown; type: string }) => {
                          const deserialized = deserialize({
                            initialState: data.state,
                            type: data.type,
                          })
                          if (isError(deserialized)) {
                            alert(deserialized.error)
                          } else {
                            props.onSwitchRevision(
                              deserialized.initialState.state as T
                            )
                            setShowRevisions(false)
                          }
                        })*/
  }
}
