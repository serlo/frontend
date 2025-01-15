import { EditorModal } from '@editor/editor-ui/editor-modal'
import { showToastNotice } from '@editor/editor-ui/show-toast-notice'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { EditorPluginType } from '@editor/package'
import {
  insertPluginChildBefore,
  removePluginChild,
  selectChildTreeOfParent,
  selectStaticDocument,
  useAppDispatch,
  useStore,
} from '@editor/store'
import { isRowsDocument } from '@editor/types/plugin-type-guards'
import { either as E } from 'fp-ts'

import { type AiGenerationPluginProps } from '.'
import { PromptForm } from './components/prompt-form'
import { StateDecoder } from './decoder'
import { extractTextAndLatex } from './helper/extract-text-and-latex'

export function AiGenerationEditor(props: AiGenerationPluginProps) {
  const aiStrings = useEditStrings().plugins.aiGeneration

  const store = useStore()
  const dispatch = useAppDispatch()

  // TODO: i18n
  function throwError(error?: unknown) {
    showToastNotice('⚠️ Sorry, something is wrong with the data.', 'warning')
    // eslint-disable-next-line no-console
    console.error(error)
    throw new Error(
      'JSON input data is not a valid editor-state or contains unsupported plugins'
    )
  }

  async function handleSubmit(prompt: string) {
    const parentPlugin = selectChildTreeOfParent(store.getState(), props.id)
    const rowsDocument = parentPlugin
      ? selectStaticDocument(store.getState(), parentPlugin.id)
      : undefined

    // for now make sure we only use it in rows plugin until we provide a list of allowed plugins
    if (!parentPlugin || !rowsDocument || !isRowsDocument(rowsDocument)) {
      const msg = 'Ai generation can only be used inside a rows plugin!'
      showToastNotice(msg)
      // eslint-disable-next-line no-console
      console.error(msg)
      return
    }

    const index = rowsDocument.state.findIndex(({ id }) => id === props.id)

    const beforeDocument = {
      plugin: EditorPluginType.Rows,
      state: rowsDocument.state.slice(0, index),
    }

    const afterDocument = {
      plugin: EditorPluginType.Rows,
      state: rowsDocument.state.slice(index),
    }

    const before = extractTextAndLatex(beforeDocument)
    const after = extractTextAndLatex(afterDocument)

    // for debug
    console.log({ before })
    console.log({ after })

    const response = await fetch(
      'https://editor.serlo.dev/ai/generate-content',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          before,
          after,
        }),
      }
    )

    const responseData = (await response.json()) as unknown

    const decoded = StateDecoder.decode(responseData)

    if (E.isLeft(decoded)) return throwError()

    const content = decoded.right

    for (const document of content.state) {
      dispatch(
        insertPluginChildBefore({
          parent: parentPlugin.id,
          sibling: props.id,
          document,
        })
      )
    }
    dispatch(removePluginChild({ parent: parentPlugin.id, child: props.id }))
  }

  return (
    <EditorModal
      title={aiStrings.modalTitle}
      isOpen
      setIsOpen={() => {}}
      className="top-8 max-w-xl translate-y-0 sm:top-24"
      extraTitleClassName="serlo-h3 mt-4"
    >
      <PromptForm onSubmit={handleSubmit} />
    </EditorModal>
  )
}
