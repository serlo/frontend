import { EditorModal } from '@editor/editor-ui/editor-modal'
import { DropdownButton } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/dropdown-button'
import { showToastNotice } from '@editor/editor-ui/show-toast-notice'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import {
  DocumentState,
  runReplaceDocumentSaga,
  useAppDispatch,
  useStore,
} from '@editor/store'
import { getStaticDocument } from '@editor/store/documents/helpers'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons'
import * as t from 'io-ts'
import { useCallback, useState } from 'react'

import { PromptForm } from '../components/prompt-form'

export function AiChangePluginTool({ pluginId }: { pluginId: string }) {
  const pluginStrings = useEditStrings().plugins

  const [modalOpen, setModalOpen] = useState(false)
  const dispatch = useAppDispatch()
  const store = useStore()

  const handleSubmit = useCallback(
    async (prompt: string) => {
      const document = getStaticDocument({
        id: pluginId,
        documents: store.getState().documents,
      }) as { plugin: EditorPluginType.Rows; state: DocumentState[] }

      const response = await fetch('http://localhost:3000/ai/change-content', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          content: JSON.stringify(document),
        }),
      })

      const responseData = (await response.json()) as unknown

      if (
        !t
          .type({
            plugin: t.string,
            state: t.unknown,
          })
          .is(responseData)
      ) {
        showToastNotice(
          '⚠️ Sorry, something is wrong with the data.',
          'warning'
        )
        const errorMessage =
          'JSON input data is not a valid editor-state or contains unsupported plugins'
        throw new Error(errorMessage)
      }

      setModalOpen(false)
      dispatch(
        runReplaceDocumentSaga({
          id: pluginId,
          pluginType: responseData.plugin, // no rows
          state: responseData.state,
        })
      )
    },
    [pluginId, store, dispatch]
  )

  return (
    <>
      <DropdownButton
        onClick={() => setModalOpen(true)}
        label={pluginStrings.aiGeneration.menuText}
        icon={faWandMagicSparkles}
        dataQa="duplicate-plugin-button"
      />
      <EditorModal
        title={pluginStrings.aiGeneration.modalTitle}
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
      >
        <PromptForm onSubmit={handleSubmit} />
      </EditorModal>
    </>
  )
}
