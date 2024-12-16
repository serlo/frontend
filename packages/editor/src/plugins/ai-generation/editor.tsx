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
import { either as E } from 'fp-ts'

import { type AiGenerationPluginProps } from '.'
import { PromtForm } from './components/prompt-form'
import { StateDecoder } from './decoder'
import { mocked } from './mocked'

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

  function handleSubmit(prompt: string) {
    console.log(prompt)

    // TODO: fetch, validate, loading states etc.

    const decoded = StateDecoder.decode(mocked)

    if (E.isLeft(decoded)) return throwError()

    const content = decoded.right

    const parentPlugin = selectChildTreeOfParent(store.getState(), props.id)

    // for now make sure we only use it in rows plugin until we provide a list of allowed plugins
    if (
      parentPlugin === null ||
      selectStaticDocument(store.getState(), parentPlugin.id)?.plugin !==
        EditorPluginType.Rows
    ) {
      const msg = 'Ai generation can only be used inside a rows plugin!'
      showToastNotice(msg)
      // eslint-disable-next-line no-console
      console.error(msg)
      return
    }

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
      <PromtForm onSubmit={handleSubmit} />
    </EditorModal>
  )
}
