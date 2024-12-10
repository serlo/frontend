import { EditorModal } from '@editor/editor-ui/editor-modal'
import { DropdownButton } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/dropdown-button'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { runReplaceDocumentSaga, useAppDispatch } from '@editor/store'
import { faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons'
import { useCallback, useState } from 'react'

import { PromtForm } from '../components/promt-form'
import { mockedTextPlugin } from '../mocked'

export function AiChangePluginTool({ pluginId }: { pluginId: string }) {
  const pluginStrings = useEditStrings().plugins

  const [modalOpen, setModalOpen] = useState(false)
  const dispatch = useAppDispatch()

  const handleSubmit = useCallback(
    (prompt: string) => {
      console.log(prompt)
      // TODO: fetch, validate, loading states etc.

      setModalOpen(false)
      dispatch(
        runReplaceDocumentSaga({
          id: pluginId,
          pluginType: mockedTextPlugin.plugin,
          state: mockedTextPlugin.state,
        })
      )
    },
    [pluginId, dispatch]
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
        <PromtForm onSubmit={handleSubmit} />
      </EditorModal>
    </>
  )
}
