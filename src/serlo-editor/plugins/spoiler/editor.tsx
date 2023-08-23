import clsx from 'clsx'

import type { SpoilerProps } from '.'
import { SpoilerRenderer } from './renderer'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { tw } from '@/helper/tw'
import { PluginToolbar } from '@/serlo-editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@/serlo-editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

export function SpoilerEditor(props: SpoilerProps) {
  const { state, editable, autofocusRef, id, domFocusWithin, domFocus } = props
  const editorStrings = useEditorStrings()

  const title = editable ? (
    <input
      onChange={(e) => state.title.set(e.target.value)}
      value={state.title.value}
      placeholder={editorStrings.plugins.spoiler.enterATitle}
      ref={autofocusRef}
      className="-my-1 w-full rounded-md bg-transparent p-1 focus:bg-brand-100 focus:outline-none"
    />
  ) : (
    state.title.value
  )

  return (
    <>
      {renderPluginToolbar()}
      <SpoilerRenderer
        title={<>{title}</>}
        content={state.content.render()}
        openOverwrite={editable}
      />
    </>
  )

  function renderPluginToolbar() {
    if (!domFocusWithin) return null

    return domFocus ? (
      <PluginToolbar
        pluginType={EditorPluginType.Spoiler}
        pluginControls={<PluginDefaultTools pluginId={id} />}
      />
    ) : (
      <button
        className={clsx(
          tw`
            absolute -top-6 right-14 z-50 block h-6 rounded-t-md bg-gray-100
            px-2 pt-0.5 text-sm font-bold hover:bg-editor-primary-100
          `
        )}
        data-qa="plugin-spoiler-parent-button"
      >
        {editorStrings.plugins.spoiler.title}
      </button>
    )
  }
}
