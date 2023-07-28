import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { either as E } from 'fp-ts'
import * as t from 'io-ts'
import { useRef, useState } from 'react'

import { PasteHackPluginProps } from '.'
import { FaIcon } from '@/components/fa-icon'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { showToastNotice } from '@/helper/show-toast-notice'
import { tw } from '@/helper/tw'
import { usePlugins } from '@/serlo-editor/core/contexts/plugins-context'
import { PluginToolbar } from '@/serlo-editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@/serlo-editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import {
  store,
  selectParent,
  insertPluginChildBefore,
  selectSerializedDocument,
  removePluginChild,
  useAppDispatch,
} from '@/serlo-editor/store'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

const StateDecoder = t.strict({
  plugin: t.literal(EditorPluginType.Rows),
  state: t.array(
    t.strict({
      plugin: t.union([
        t.literal(EditorPluginType.Article),
        t.literal(EditorPluginType.ArticleIntroduction),
        t.literal(EditorPluginType.Geogebra),
        t.literal(EditorPluginType.Anchor),
        t.literal(EditorPluginType.Video),
        t.literal(EditorPluginType.SerloTable),
        t.literal(EditorPluginType.Highlight),
        t.literal(EditorPluginType.Injection),
        t.literal(EditorPluginType.Layout),
        t.literal(EditorPluginType.Multimedia),
        t.literal(EditorPluginType.Spoiler),
        t.literal(EditorPluginType.Box),
        t.literal(EditorPluginType.Image),
        t.literal(EditorPluginType.Text),
        t.literal(EditorPluginType.Equations),
      ]),
      state: t.unknown,
    })
  ),
})

export const PasteHackEditor: React.FunctionComponent<PasteHackPluginProps> = (
  props
) => {
  const { focused, id } = props
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const dispatch = useAppDispatch()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const plugins = usePlugins()

  function throwError(error?: unknown) {
    showToastNotice('⚠️ Sorry, something is wrong with the data.', 'warning')
    // eslint-disable-next-line no-console
    console.error(error)
    throw new Error(
      'JSON input data is not a valid edtr-state or contains unsupported plugins'
    )
  }

  function replaceWithStateString() {
    if (!textareaRef.current || !textareaRef.current.value) return

    try {
      const decoded = StateDecoder.decode(JSON.parse(textareaRef.current.value))

      if (E.isLeft(decoded)) return throwError()

      const content = decoded.right

      const parentPlugin = selectParent(store.getState(), props.id)

      if (
        parentPlugin === null ||
        selectSerializedDocument(store.getState(), parentPlugin.id)?.plugin !==
          EditorPluginType.Rows
      ) {
        const msg = 'Paste plugin can only be used inside a rows plugin!'
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
            plugins,
          })
        )
      }
      dispatch(
        removePluginChild({ parent: parentPlugin.id, child: props.id, plugins })
      )
    } catch (error) {
      throwError(error)
    }
  }

  return (
    <>
      {renderPluginToolbar()}
      <div>{renderDataImport()}</div>
    </>
  )

  function renderPluginToolbar() {
    if (!focused) return null

    const pasteHackButtonText = 'Import JSON data'

    return (
      <PluginToolbar
        pluginType={EditorPluginType.PasteHack}
        pluginControls={<PluginDefaultTools pluginId={id} />}
        pluginSettings={
          <>
            <button
              onClick={() => setShowSettingsModal(true)}
              className="mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
            >
              {pasteHackButtonText} <FaIcon icon={faPencilAlt} />
            </button>
            {showSettingsModal ? (
              <ModalWithCloseButton
                isOpen={showSettingsModal}
                onCloseClick={() => setShowSettingsModal(false)}
                className="!top-1/3 !max-w-xl"
              >
                {renderDataImport()}
              </ModalWithCloseButton>
            ) : null}
          </>
        }
      />
    )
  }

  function renderDataImport() {
    return (
      <div className="bg-editor-primary-50 p-4">
        <b className="serlo-h4 mb-4 ml-0 block">Experimental Import</b>
        <p className="mb-4">
          <a
            href="https://gist.github.com/elbotho/f3e39b0cdaf0cfc8e59e585e2650fb04"
            target="_blank"
            rel="noreferrer"
          >
            Example Data
          </a>
        </p>
        <textarea
          ref={textareaRef}
          className={tw`
            mb-7 mt-1 flex w-full items-center rounded-2xl
            border-2 border-editor-primary-100 bg-editor-primary-100
            p-2 focus-within:border-editor-primary focus-within:outline-none
          `}
          // make sure editor does not create new plugin on enter etc
          onKeyDown={(e) => e.stopPropagation()}
        />
        <button
          className="serlo-button-editor-secondary mb-12 text-base"
          onClick={replaceWithStateString}
        >
          Import JSON data now
        </button>
      </div>
    )
  }
}
