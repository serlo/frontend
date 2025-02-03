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
import { either as E } from 'fp-ts'
import { useCallback, useState } from 'react'

import { PromptForm } from '../components/prompt-form'
import { StateDecoder } from '../decoder'

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

      const response = await fetch(
        'https://editor.serlo.dev/ai/change-content',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            prompt,
            content: JSON.stringify(document),
          }),
        }
      )

      const responseData = (await response.json()) as unknown
      const decoded = StateDecoder.decode(responseData)
      if (E.isLeft(decoded)) {
        showToastNotice(
          '⚠️ Sorry, something is wrong with the data.',
          'warning'
        )
        const errorMessage =
          'JSON input data is not a valid editor-state or contains unsupported plugins'
        throw new Error(errorMessage)
      }
      const content = decoded.right

      setModalOpen(false)
      dispatch(
        runReplaceDocumentSaga({
          id: pluginId,
          pluginType: content.plugin,
          state: content.state,
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
        title={pluginStrings.aiGeneration.modalChangeTitle}
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
      >
        <PromptForm type="change" onSubmit={handleSubmit} />
      </EditorModal>
    </>
  )
}
