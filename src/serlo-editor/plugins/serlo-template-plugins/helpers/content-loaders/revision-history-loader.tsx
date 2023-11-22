import { faHistory } from '@fortawesome/free-solid-svg-icons'
import request from 'graphql-request'
import NProgress from 'nprogress'
import { useState } from 'react'

import { endpoint } from '@/api/endpoint'
import { useGraphqlSwr } from '@/api/use-graphql-swr'
import { FaIcon } from '@/components/fa-icon'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { RevisionHistory as SerloRevisionHistory } from '@/components/pages/revision-history'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import type {
  RevisionUuidQuery,
  RevisionUuidQueryVariables,
} from '@/fetcher/graphql-types/operations'
import type { Revisions } from '@/fetcher/query-types'
import { revisionQuery } from '@/fetcher/revision/query'
import { showToastNotice } from '@/helper/show-toast-notice'
import { triggerSentry } from '@/helper/trigger-sentry'
import { revisionHistoryQuery } from '@/pages/entity/repository/history/[id]'
import { EditorTooltip } from '@/serlo-editor/editor-ui/editor-tooltip'
import {
  convertEditorResponseToState,
  isError,
} from '@/serlo-editor-integration/convert-editor-response-to-state'
import { revisionResponseToResponse } from '@/serlo-editor-integration/revision-response-to-response'

export function RevisionHistoryLoader<T>({
  id,
  currentRevision,
  onSwitchRevision,
}: {
  id: number
  currentRevision: number
  onSwitchRevision: (data: T) => void
}) {
  const [showRevisions, setShowRevisions] = useState(false)

  const revisionsResponse = useRevisionsFetch(id)

  const editorStrings = useEditorStrings()

  if (!revisionsResponse) return null

  if (!revisionsResponse.data?.uuid.revisions) return null

  const revisions = revisionsResponse.data?.uuid.revisions.nodes

  const onSelectRevision = (id: number) => {
    //don't select the selected
    const isCurrentlyLoaded = currentRevision === id
    if (isCurrentlyLoaded) return null
    fetchRevisionData(id)
  }

  return (
    <div>
      <span
        onClick={() => {
          if (revisions.length) setShowRevisions(true)
        }}
      >
        <button className="serlo-button-editor-secondary serlo-tooltip-trigger">
          <EditorTooltip
            text={editorStrings.edtrIo.switchRevision}
            className="-left-40"
          />
          <FaIcon icon={faHistory} className="text-md" />
        </button>
      </span>

      <ModalWithCloseButton
        isOpen={showRevisions}
        onCloseClick={() => {
          setShowRevisions(false)
        }}
        title={editorStrings.edtrIo.switchRevision}
        className="!top-[3rem] max-h-[80vh] w-[900px] max-w-[90vw] translate-y-0 overflow-y-auto pt-0"
      >
        {/* a bit untidy, but it's very nice to reuse this component here */}
        <SerloRevisionHistory
          data={revisionsResponse.data?.uuid}
          hideEdit
          onSelectRevision={onSelectRevision}
          selectedRevisionId={currentRevision}
          tableClassName="mt-12 !w-auto"
        />
      </ModalWithCloseButton>
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
        const converted = convertEditorResponseToState(prepared!)

        if (isError(converted)) {
          handleError(`editor: revision conversion | ${converted.error}`)
        } else {
          onSwitchRevision(converted.state as T)
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
