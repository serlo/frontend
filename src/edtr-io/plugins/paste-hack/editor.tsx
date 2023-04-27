import { useScopedStore } from '@edtr-io/core'
import {
  getParent,
  insertChildBefore,
  serializeDocument,
  removeChild,
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
  const store = useScopedStore()
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

      const parentPlugin = getParent(props.id)(store.getState())

      if (
        parentPlugin === null ||
        serializeDocument(parentPlugin.id)(store.getState())?.plugin !== 'rows'
      ) {
        const msg = 'Paste plugin can only be used inside a rows plugin!'
        showToastNotice(msg)
        // eslint-disable-next-line no-console
        console.error(msg)
        return
      }

      for (const document of content.state) {
        store.dispatch(
          insertChildBefore({
            parent: parentPlugin.id,
            sibling: props.id,
            document,
          })
        )
      }
      store.dispatch(removeChild({ parent: parentPlugin.id, child: props.id }))
    } catch (error) {
      throwError(error)
    }
  }

  return <div>{renderDataImport()}</div>

  function renderDataImport() {
    return (
      <div className="bg-yellow-50 p-4">
        <b className="serlo-h4 block ml-0 mb-4">Experimental Import</b>
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
            'mt-1 mb-7 flex items-center rounded-2xl w-full p-2',
            'bg-brand-200 border-2 border-brand-200 focus-within:outline-none focus-within:border-brand-500'
          )}
          // make sure editor does not create new plugin on enter etc
          onKeyDown={(e) => e.stopPropagation()}
        />
        <button
          className="serlo-button bg-yellow-200 hover:bg-yellow focus:bg-yellow mb-12 text-base"
          onClick={replaceWithStateString}
        >
          Import JSON data now
        </button>
      </div>
    )
  }
}
