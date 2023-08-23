import clsx from 'clsx'
import * as R from 'ramda'
import {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  FocusEvent,
} from 'react'

import type { SubDocumentProps } from '.'
import { useEnableEditorHotkeys } from './use-enable-editor-hotkeys'
import {
  runChangeDocumentSaga,
  focus,
  selectDocument,
  selectIsFocused,
  useAppSelector,
  useAppDispatch,
  insertPluginChildAfter,
  selectParent,
  store,
  selectMayManipulateSiblings,
  selectIsLastRowInRootRowsPlugin,
} from '../../store'
import type { StateUpdater } from '../../types/internal__plugin-state'
import { editorPlugins } from '@/serlo-editor/plugin/helpers/editor-plugins'
import { RowSeparator } from '@/serlo-editor/plugins/rows/components/row-separator'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

export enum DomFocus {
  focus = 'focus',
  focusWithin = 'focusWithin',
  focusWithinInline = 'focusWithinInline',
  notFocused = 'notFocused',
}

export function SubDocumentEditor({ id, pluginProps }: SubDocumentProps) {
  const dispatch = useAppDispatch()
  const document = useAppSelector((state) => selectDocument(state, id))
  const mayManipulateSiblings = useAppSelector((state) =>
    selectMayManipulateSiblings(state, id)
  )
  const isLastRowInRootRowsPlugin = useAppSelector((state) =>
    selectIsLastRowInRootRowsPlugin(state, id)
  )

  const focused = useAppSelector((state) => selectIsFocused(state, id))
  const [domFocusState, setDomFocus] = useState<DomFocus>(
    focused ? DomFocus.focusWithin : DomFocus.notFocused
  )

  const plugin = editorPlugins.getByType(document?.plugin ?? '')

  useEnableEditorHotkeys(id, plugin, domFocusState === DomFocus.focusWithin)
  const containerRef = useRef<HTMLDivElement>(null)
  const autofocusRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null)

  useEffect(() => {
    if (domFocusState !== 'focus') return
    setTimeout(() => autofocusRef.current?.focus())
  }, [domFocusState])

  const handleFocus = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // Find closest document
      const target = (e.target as HTMLDivElement).closest('[data-document]')
      if (!focused && target === containerRef.current) {
        dispatch(focus(id))
      }
    },
    [focused, id, dispatch]
  )

  const handleDomFocus = useCallback((e: FocusEvent<HTMLDivElement>) => {
    const target = containerRef.current
    if (!target) return

    // don't blur if new focus target is actually in container or it's not defined
    if (e.type === 'blur' && target.contains(e.relatedTarget)) return

    const getFocusWithin = () => {
      const focusedChild = target.querySelector(
        '[data-document-focusable]:focus-within'
      )
      const isFocusedChildInline = focusedChild?.hasAttribute(
        'data-document-inline-child-editor'
      )

      return target.contains(window.document.activeElement)
        ? focusedChild
          ? isFocusedChildInline
            ? DomFocus.focusWithinInline
            : DomFocus.focusWithin
          : DomFocus.focus
        : DomFocus.notFocused
    }

    setDomFocus(() => getFocusWithin())
  }, [])

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

    function handleChange(
      initial: StateUpdater<unknown>,
      additional: {
        executor?: ReturnType<
          typeof runChangeDocumentSaga
        >['payload']['state']['executor']
        reverse?: ReturnType<typeof runChangeDocumentSaga>['payload']['reverse']
      } = {}
    ) {
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

    function handleAddButtonClick() {
      const textPluginWithSuggestions = {
        plugin: EditorPluginType.Text,
        state: [{ type: 'p', children: [{ text: '/' }] }],
      }

      const parent = selectParent(store.getState(), id)
      if (!parent) return null

      setTimeout(() => {
        dispatch(
          insertPluginChildAfter({
            parent: parent.id,
            sibling: id,
            document: textPluginWithSuggestions,
          })
        )
      })
    }

    // Take the default state for this plugin (set in serlo-editor/plugins/[plugin_type]/index.tsx)
    // and add the individual plugin state obtained from the redux state.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const state = plugin.state.init(document.state, handleChange)

    const isInlineChildEditor =
      Object.hasOwn(config, 'isInlineChildEditor') &&
      (config.isInlineChildEditor as boolean)

    const isTemplatePlugin = document.plugin.startsWith('type-')

    const noVisualFocusHandling =
      isTemplatePlugin ||
      [EditorPluginType.Article, EditorPluginType.Rows].includes(
        document.plugin as EditorPluginType
      )

    return (
      <div
        className={clsx(
          'outline-none',
          isInlineChildEditor || isTemplatePlugin
            ? ''
            : 'plugin-wrapper-container relative -ml-[7px] mb-6 min-h-[10px] pl-[5px]',
          isLastRowInRootRowsPlugin ? '!mb-28' : ''
        )}
        tabIndex={-1} // removing this makes selecting e.g. images impossible somehow
        onMouseDown={handleFocus}
        onFocus={noVisualFocusHandling ? undefined : handleDomFocus}
        onBlur={noVisualFocusHandling ? undefined : handleDomFocus}
        ref={containerRef}
        data-document
        data-document-focusable={noVisualFocusHandling ? undefined : true}
        data-document-inline-child-editor={
          isInlineChildEditor ? true : undefined
        }
      >
        <plugin.Component
          containerRef={containerRef}
          id={id}
          editable
          domFocusWithin={domFocusState !== DomFocus.notFocused}
          domFocusState={domFocusState}
          config={config}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          state={state}
          autofocusRef={autofocusRef}
        />
        {mayManipulateSiblings ? (
          <RowSeparator
            focused={domFocusState === DomFocus.focus}
            onClick={(event: React.MouseEvent) => {
              event.preventDefault()
              handleAddButtonClick()
            }}
            visuallyEmphasizeAddButton={isLastRowInRootRowsPlugin}
          />
        ) : null}
      </div>
    )
  }, [
    document,
    plugin,
    pluginProps,
    handleFocus,
    handleDomFocus,
    id,
    domFocusState,
    mayManipulateSiblings,
    isLastRowInRootRowsPlugin,
    dispatch,
  ])
}
