import { PluginToolbarButton } from '@edtr-io/core'
import { Icon } from '@edtr-io/ui'
import { faFileImport } from '@fortawesome/free-solid-svg-icons'
import request from 'graphql-request'
import NProgress from 'nprogress'
import { useState } from 'react'

import { SerloAddButton } from '../../../helpers/serlo-editor-button'
import { endpoint } from '@/api/endpoint'
import { UuidUrlInput } from '@/components/author/uuid-url-input'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { UuidType } from '@/data-types'
import {
  editorResponseToState,
  isError,
} from '@/edtr-io/editor-response-to-state'
import {
  MainUuidQuery,
  MainUuidQueryVariables,
} from '@/fetcher/graphql-types/operations'
import { dataQuery } from '@/fetcher/query'
import { isProduction } from '@/helper/is-production'
import { showToastNotice } from '@/helper/show-toast-notice'
import { triggerSentry } from '@/helper/trigger-sentry'

export function ExternalRevisionLoader<T>({
  entityType,
  onSwitchRevision,
}: {
  entityType: UuidType
  onSwitchRevision: (data: T) => void
}) {
  const [showRevisions, setShowRevisions] = useState(false)

  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const editorStrings = loggedInData.strings.editor

  if (isProduction) return null

  return (
    <div>
      <span onClick={() => setShowRevisions(true)}>
        <PluginToolbarButton
          icon={<Icon icon={faFileImport} size="lg" />}
          label={editorStrings.edtrIo.importOther}
          className="p-0.5 pt-2"
        />
      </span>

      <ModalWithCloseButton
        isOpen={showRevisions}
        onCloseClick={() => setShowRevisions(false)}
        title={editorStrings.edtrIo.importOther}
      >
        <>
          <p className="serlo-p">
            {editorStrings.edtrIo.importOtherExplanation}
            <br />
            <br />
            <b>{editorStrings.edtrIo.importOtherWarning}</b>
          </p>
          <div className="mx-side">
            <UuidUrlInput
              renderButtons={(
                _typename: string,
                id: number,
                _title: string,
                _taxType?: unknown,
                coursePageId?: number
              ) => (
                <SerloAddButton
                  text={editorStrings.edtrIo.importOtherButton}
                  onClick={() =>
                    fetchRevisionDataByUuid(coursePageId ? coursePageId : id)
                  }
                />
              )}
              supportedEntityTypes={[entityType]}
              supportedTaxonomyTypes={[]}
            />
          </div>
        </>
      </ModalWithCloseButton>
      <style jsx global>{`
        .ReactModalPortal .ReactModal__Content {
          /* this css colides with save-modal.tsx */
          width: 900px;
          max-width: 90vw;
          max-height: 80vh;
          top: 2rem;
          overflow-y: auto;
          padding-top: 0;
          transform: translate(-50%, 0);
        }

        .ReactModalPortal .ReactModal__Content table {
          margin-top: 3rem;
          width: auto;
        }
      `}</style>
    </div>
  )

  function fetchRevisionDataByUuid(id: number) {
    NProgress.start()

    void (async () => {
      try {
        const data = await request<MainUuidQuery, MainUuidQueryVariables>(
          endpoint,
          dataQuery,
          {
            id,
          }
        )
        const { uuid } = data
        const converted = editorResponseToState(uuid!)

        if (isError(converted)) {
          handleError(`editor: revision conversion | ${converted.error}`)
        } else {
          onSwitchRevision({
            ...(converted.initialState.state as T),
            revision: 0,
            id: 0,
            meta_title: '', // should we copy this?
          } as T)
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
