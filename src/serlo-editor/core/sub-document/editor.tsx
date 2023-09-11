import clsx from 'clsx'
import * as R from 'ramda'
import { useRef, useEffect, useMemo, useCallback } from 'react'

import type { SubDocumentProps } from '.'
import { useEnableEditorHotkeys } from './use-enable-editor-hotkeys'
import {
  focus,
  runChangeDocumentSaga,
  selectChildTreeOfParent,
  selectDocument,
  selectIsFocused,
  store,
  useAppDispatch,
  useAppSelector,
} from '../../store'
import type { StateUpdater } from '../../types/internal__plugin-state'
import { editorPlugins } from '@/serlo-editor/plugin/helpers/editor-plugins'

export function SubDocumentEditor({ id, pluginProps }: SubDocumentProps) {
  const dispatch = useAppDispatch()
  const document = useAppSelector((state) => selectDocument(state, id))

  const focused = useAppSelector((state) => selectIsFocused(state, id))

  const plugin = editorPlugins.getByType(document?.plugin ?? '')

  useEnableEditorHotkeys(id, plugin, focused)
  const containerRef = useRef<HTMLDivElement>(null)
  const autofocusRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null)

  console.log('render subdocument editor', id)

  useEffect(() => {
    if (focused) {
      setTimeout(() => {
        if (autofocusRef.current) {
          autofocusRef.current.focus()
        }
      })
    }
  }, [focused])

  useEffect(() => {
    if (
      focused &&
      containerRef.current &&
      document &&
      plugin &&
      !plugin.state.getFocusableChildren(document.state).length
    ) {
      containerRef.current.focus()
    }
    // `document` should not be part of the dependencies because we only want to call this once when the document gets focused
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focused, plugin])

  const handleFocus = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // Find closest document
      const target = (e.target as HTMLDivElement).closest('[data-document]')
      if (!focused && target === containerRef.current) {
        if (document?.plugin === 'rows') {
          const parent = selectChildTreeOfParent(store.getState(), id)
          if (parent) dispatch(focus(parent.id))
        } else {
          dispatch(focus(id))
        }
      }
    },
    [focused, id, dispatch, document]
  )

  return useMemo(() => {
    if (!document) {
      // eslint-disable-next-line no-console
      console.warn('SubDocumentEditor -> Document does not exist')
      return null
    }
    if (!plugin) {
      // eslint-disable-next-line no-console
      console.warn('SubDocumentEditor -> Plugin does not exist')
      return null
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const defaultConfig =
      typeof plugin.config === 'function' ? plugin.config() : plugin.config
    const overrideConfig = (pluginProps && pluginProps.config) || {}
    const config = R.mergeDeepRight(defaultConfig, overrideConfig)

    const onChange = (
      initial: StateUpdater<unknown>,
      additional: {
        executor?: ReturnType<
          typeof runChangeDocumentSaga
        >['payload']['state']['executor']
        reverse?: ReturnType<typeof runChangeDocumentSaga>['payload']['reverse']
      } = {}
    ) => {
      dispatch(
        runChangeDocumentSaga({
          id,
          state: {
            initial,
            executor: additional.executor,
          },
          reverse: additional.reverse,
        })
      )
    }

    // Take the default state for this plugin (set in serlo-editor/plugins/[plugin_type]/index.tsx) and add the individual plugin state obtained from the redux state.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const state = plugin.state.init(document.state, onChange)

    const isInlineChildEditor =
      Object.hasOwn(config, 'isInlineChildEditor') &&
      (config.isInlineChildEditor as boolean)

    const isTemplatePlugin = document.plugin.startsWith('type-')
    console.log('no useMemo in', id)
    return (
      <div
        className={clsx(
          `plugin-${document?.plugin}`,
          'outline-none',
          isInlineChildEditor || isTemplatePlugin
            ? ''
            : 'plugin-wrapper-container relative -ml-[7px] mb-6 min-h-[10px] pl-[5px]'
        )}
        onMouseDown={handleFocus}
        ref={containerRef}
        data-document
        tabIndex={-1}
      >
        <plugin.Component
          containerRef={containerRef}
          id={id}
          editable
          focused={focused}
          config={config}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          state={state}
          autofocusRef={autofocusRef}
        />
      </div>
    )
  }, [document, plugin, pluginProps, handleFocus, focused, id, dispatch])
}
