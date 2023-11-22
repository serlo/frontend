import { either as E } from 'fp-ts'
import * as t from 'io-ts'
import { useRef } from 'react'

import type { PasteHackPluginProps } from '.'
import { showToastNotice } from '@/helper/show-toast-notice'
import { tw } from '@/helper/tw'
import { PluginToolbar } from '@/serlo-editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@/serlo-editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import {
  store,
  selectChildTreeOfParent,
  insertPluginChildBefore,
  selectStaticDocument,
  removePluginChild,
  useAppDispatch,
} from '@/serlo-editor/store'
import { EditorPluginType } from '@/serlo-editor/types/editor-plugin-type'

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
        t.literal(EditorPluginType.Audio),
        t.literal(EditorPluginType.SerloTable),
        t.literal(EditorPluginType.Highlight),
        t.literal(EditorPluginType.Injection),
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
  const dispatch = useAppDispatch()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function throwError(error?: unknown) {
    showToastNotice('⚠️ Sorry, something is wrong with the data.', 'warning')
    // eslint-disable-next-line no-console
    console.error(error)
    throw new Error(
      'JSON input data is not a valid editor-state or contains unsupported plugins'
    )
  }

  function replaceWithStateString() {
    if (!textareaRef.current || !textareaRef.current.value) return

    try {
      const decoded = StateDecoder.decode(JSON.parse(textareaRef.current.value))

      if (E.isLeft(decoded)) return throwError()

      const content = decoded.right

      const parentPlugin = selectChildTreeOfParent(store.getState(), props.id)

      if (
        parentPlugin === null ||
        selectStaticDocument(store.getState(), parentPlugin.id)?.plugin !==
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
          })
        )
      }
      dispatch(removePluginChild({ parent: parentPlugin.id, child: props.id }))
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

    return (
      <PluginToolbar
        pluginType={EditorPluginType.PasteHack}
        pluginControls={<PluginDefaultTools pluginId={id} />}
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
            className="serlo-link"
          >
            Example Data
          </a>
        </p>
        <textarea
          autoFocus
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
