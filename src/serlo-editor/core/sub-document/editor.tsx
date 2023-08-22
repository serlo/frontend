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
} from '../../store'
import type { StateUpdater } from '../../types/internal__plugin-state'
import { editorPlugins } from '@/serlo-editor/plugin/helpers/editor-plugins'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

export function SubDocumentEditor({ id, pluginProps }: SubDocumentProps) {
  const dispatch = useAppDispatch()
  const document = useAppSelector((state) => selectDocument(state, id))

  const focused = useAppSelector((state) => selectIsFocused(state, id))
  const [domFocus, setDomFocus] = useState<'focus' | 'focusWithin' | false>(
    focused ? 'focusWithin' : false
  )

  const plugin = editorPlugins.getByType(document?.plugin ?? '')

  useEnableEditorHotkeys(id, plugin, domFocus === 'focusWithin')
  const containerRef = useRef<HTMLDivElement>(null)
  const autofocusRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null)

  useEffect(() => {
    if (domFocus !== 'focus') return
    setTimeout(() => autofocusRef.current?.focus())
  }, [domFocus])

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
      const hasFocusedChild = !!target.querySelector(
        '[data-document-focusable]:focus-within'
      )
      return target.contains(window.document.activeElement)
        ? hasFocusedChild
          ? 'focusWithin'
          : 'focus'
        : false
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
            : 'plugin-wrapper-container relative -ml-[7px] mb-6 min-h-[10px] pl-[5px]'
        )}
        tabIndex={-1} // removing this makes selecting e.g. images impossible somehow
        onMouseDown={handleFocus}
        onFocus={noVisualFocusHandling ? undefined : handleDomFocus}
        onBlur={noVisualFocusHandling ? undefined : handleDomFocus}
        ref={containerRef}
        data-document
        data-document-focusable={noVisualFocusHandling ? undefined : true}
      >
        <plugin.Component
          containerRef={containerRef}
          id={id}
          editable
          domFocusWithin={domFocus !== false}
          domFocus={domFocus === 'focus'}
          config={config}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          state={state}
          autofocusRef={autofocusRef}
        />
      </div>
    )
  }, [
    document,
    plugin,
    pluginProps,
    handleFocus,
    handleDomFocus,
    id,
    domFocus,
    dispatch,
  ])
}
