import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import { cn } from '@serlo/frontend/src/helper/cn'
import * as R from 'ramda'
import { useRef, useMemo, useCallback } from 'react'

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

export function SubDocumentEditor({ id, pluginProps }: SubDocumentProps) {
  const dispatch = useAppDispatch()
  const document = useAppSelector((state) => selectDocument(state, id))

  const focused = useAppSelector((state) => selectIsFocused(state, id))

  const plugin = editorPlugins.getByType(document?.plugin ?? '')

  useEnableEditorHotkeys(id, plugin, focused)
  const containerRef = useRef<HTMLDivElement>(null)

  // main focus event
  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // Find closest document
      const target = (e.target as HTMLDivElement).closest('[data-document]')
      if (!focused && target === containerRef.current) {
        if (document?.plugin === 'rows') {
          const parent = selectChildTreeOfParent(store.getState(), id)
          if (parent) dispatch(focus(parent.id))
        } else {
          // default focus dispatch
          dispatch(focus(id))
        }
      }
    },
    [focused, id, dispatch, document]
  )

  // additional focus check to set focus when using tab navigation
  const handleFocus = useCallback(
    (e: React.FocusEvent) => {
      if (!document) return
      if (['rows', 'exercise'].includes(document?.plugin)) return

      // if after a short delay dom focus is not set inside focused plugin
      // we overwrite it here (because it's probably because of tab navigation)
      setTimeout(() => {
        // fixes a bug in table plugin with disappearing buttons
        if (['button', 'select'].includes(e.target.nodeName?.toLowerCase())) {
          return
        }

        // find closest document
        const target = (e.target as HTMLDivElement).closest('[data-document]')

        if (!focused && target === containerRef.current) {
          dispatch(focus(id))
        }
        // 10ms is an arbitrary value:
        // as low as possible but after the other focus handler is done rerendering
      }, 10)
    },
    [document, focused, dispatch, id]
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
    if (!document.plugin) {
      // eslint-disable-next-line no-console
      console.warn('SubDocumentEditor -> Document is invalid')
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

    return (
      <div
        className={cn(
          `plugin-${document?.plugin}`,
          'outline-none',
          isInlineChildEditor || isTemplatePlugin
            ? ''
            : 'plugin-wrapper-container relative mb-6 min-h-[10px]'
        )}
        onMouseDown={handleMouseDown}
        onFocus={handleFocus}
        ref={containerRef}
        data-document
        tabIndex={-1}
      >
        <plugin.Component
          containerRef={containerRef}
          id={id}
          focused={focused}
          config={config}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          state={state}
        />
      </div>
    )
  }, [
    document,
    plugin,
    pluginProps,
    handleMouseDown,
    handleFocus,
    focused,
    id,
    dispatch,
  ])
}
