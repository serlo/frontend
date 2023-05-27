import {
  store,
  selectParent,
  insertPluginChildBefore,
  selectSerializedDocument,
  removePluginChild,
  useAppDispatch,
} from '@edtr-io/store'
import clsx from 'clsx'
import { either as E } from 'fp-ts'
import * as t from 'io-ts'
import { useRef } from 'react'

import { PasteHackPluginProps } from '.'
import { showToastNotice } from '@/helper/show-toast-notice'

const StateDecoder = t.strict({
  plugin: t.literal('rows'),
  state: t.array(
    t.strict({
      plugin: t.union([
        t.literal('article'),
        t.literal('articleIntroduction'),
        t.literal('geogebra'),
        t.literal('anchor'),
        t.literal('video'),
        t.literal('serloTable'),
        t.literal('highlight'),
        t.literal('injection'),
        t.literal('layout'),
        t.literal('multimedia'),
        t.literal('spoiler'),
        t.literal('box'),
        t.literal('image'),
        t.literal('text'),
        t.literal('equations'),
      ]),
      state: t.unknown,
    })
  ),
})

export const PasteHackEditor: React.FunctionComponent<PasteHackPluginProps> = (
  props
) => {
  const dispatch = useAppDispatch()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

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
          'rows'
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

  return <div>{renderDataImport()}</div>

  function renderDataImport() {
    return (
      <div className="bg-editor-primary-50 p-4">
        <b className="serlo-h4 ml-0 mb-4 block">Experimental Import</b>
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
          className={clsx(
            'mt-1 mb-7 flex w-full items-center rounded-2xl p-2',
            'border-2 border-editor-primary-100 bg-editor-primary-100 focus-within:border-editor-primary focus-within:outline-none'
          )}
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
