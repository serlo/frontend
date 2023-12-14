import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { cn } from '@serlo/frontend/src/helper/cn'

import type { SpoilerProps } from '.'
import { SpoilerRenderer } from './renderer'

export function SpoilerEditor(props: SpoilerProps) {
  const { state, id, focused } = props
  const editorStrings = useEditorStrings()

  return (
    <>
      {renderPluginToolbar()}
      <div
        className={cn(
          focused && '[&>div]:rounded-t-none',
          `
            [&>div>div]:mt-4
            [&_.plugin-toolbar]:ml-[2px]
            [&_.plugin-toolbar]:rounded-none
            [&_.rows-child:first-child_.plugin-toolbar:before]:hidden
          `
        )}
      >
        <SpoilerRenderer
          title={
            <input
              onChange={(e) => state.title.set(e.target.value)}
              value={state.title.value}
              placeholder={editorStrings.plugins.spoiler.enterATitle}
              className="-my-1 w-full rounded-md bg-transparent p-1 focus:bg-brand-100 focus:outline-none"
            />
          }
          content={state.content.render()}
          openOverwrite // should check focused but that's unreliable atm.
        />
      </div>
    </>
  )

  function renderPluginToolbar() {
    if (!focused) return null

    return (
      <PluginToolbar
        pluginType={EditorPluginType.Spoiler}
        pluginControls={<PluginDefaultTools pluginId={id} />}
        className="!left-[21px] top-[-33px] w-[calc(100%-37px)]"
      />
    )
  }
}
