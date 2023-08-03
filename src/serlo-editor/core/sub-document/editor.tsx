import * as R from 'ramda'
import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { createPortal } from 'react-dom'

import { SubDocumentProps } from '.'
import { useEnableEditorHotkeys } from './use-enable-editor-hotkeys'
import {
  runChangeDocumentSaga,
  focus,
  selectDocument,
  selectIsFocused,
  useAppSelector,
  useAppDispatch,
  selectParent,
  store,
} from '../../store'
import { StateUpdater } from '../../types/internal__plugin-state'
import { usePlugin, usePlugins } from '../contexts/plugins-context'
import { SideToolbarAndWrapper } from '@/serlo-editor/editor-ui/side-toolbar-and-wrapper'
import { EditorPlugin } from '@/serlo-editor/types/internal__plugin'

export function SubDocumentEditor({ id, pluginProps }: SubDocumentProps) {
  const [hasSideToolbar, setHasSideToolbar] = useState(false)
  const dispatch = useAppDispatch()
  const document = useAppSelector((state) => selectDocument(state, id))

  const focused = useAppSelector((state) => selectIsFocused(state, id))
  const plugins = usePlugins()
  const plugin = usePlugin(document?.plugin)?.plugin as EditorPlugin

  useEnableEditorHotkeys(id, plugin, focused)
  const containerRef = useRef<HTMLDivElement>(null)
  const sideToolbarRef = useRef<HTMLDivElement>(
    window.document.createElement('div')
  )
  const autofocusRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null)

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

  const handleFocusChange = useCallback(
    (e: React.FocusEvent<HTMLDivElement, HTMLDivElement>) => {
      // find closest document parent
      const target = e.target.closest('[data-document]')

      if (target && !focused && target === containerRef.current) {
        const focusTarget =
          document?.plugin === 'rows'
            ? selectParent(store.getState(), id)?.id
            : id
        if (focusTarget) dispatch(focus(focusTarget))
      }
      if (focused) {
        dispatch(focus(null))
      }
    },
    // do not run again when focused change to avoid loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, document?.plugin, id]
  )

  const renderIntoSideToolbar = useCallback(
    (children: React.ReactNode) => {
      return (
        <RenderIntoSideToolbar
          setHasSideToolbar={setHasSideToolbar}
          sideToolbarRef={sideToolbarRef}
        >
          {children}
        </RenderIntoSideToolbar>
      )
    },
    [sideToolbarRef]
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
          plugins,
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

    return (
      <div
        className="outline-none"
        onFocus={handleFocusChange}
        onBlur={handleFocusChange}
        ref={containerRef}
        data-document
        tabIndex={-1}
      >
        <SideToolbarAndWrapper
          hasSideToolbar={hasSideToolbar}
          focused={focused}
          renderSideToolbar={pluginProps && pluginProps.renderSideToolbar}
          isInlineChildEditor={isInlineChildEditor}
          sideToolbarRef={sideToolbarRef}
        >
          <plugin.Component
            renderIntoSideToolbar={renderIntoSideToolbar}
            containerRef={containerRef}
            id={id}
            editable
            focused={focused}
            config={config}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            state={state}
            autofocusRef={autofocusRef}
          />
        </SideToolbarAndWrapper>
      </div>
    )
  }, [
    document,
    plugin,
    pluginProps,
    handleFocusChange,
    hasSideToolbar,
    focused,
    renderIntoSideToolbar,
    id,
    dispatch,
    plugins,
  ])
}

function RenderIntoSideToolbar({
  children,
  setHasSideToolbar,
  sideToolbarRef,
}: {
  children: React.ReactNode
  setHasSideToolbar: (value: boolean) => void
  sideToolbarRef: React.MutableRefObject<HTMLDivElement>
}) {
  useEffect(() => {
    setHasSideToolbar(true)
  })
  if (!sideToolbarRef.current) return null
  return createPortal(children, sideToolbarRef.current)
}
