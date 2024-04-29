import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { TextEditorFormattingOption } from '@editor/editor-ui/plugin-toolbar/text-controls/types'
import { selectIsFocused, useAppSelector } from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { cn } from '@serlo/frontend/src/helper/cn'
import { useEffect, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'

import type { SpoilerProps } from '.'
import { SpoilerRenderer } from './renderer'

const titleFormattingOptions = [
  TextEditorFormattingOption.code,
  TextEditorFormattingOption.math,
  TextEditorFormattingOption.richTextBold,
  TextEditorFormattingOption.richTextItalic,
]

export function SpoilerEditor(props: SpoilerProps) {
  const { state, id, focused } = props
  const { title, richTitle, content } = state
  const editorStrings = useEditorStrings()
  const richTitleId = useMemo(() => {
    return richTitle.defined ? richTitle.id : ''
    // richTitle.id should never change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [richTitle.defined])
  const isTitleFocused = useAppSelector((state) =>
    selectIsFocused(state, richTitleId)
  )
  const showToolbar = focused || isTitleFocused

  // Spoiler title used to be a string (`title`) and we now use an inline text-plugin instead (to allow math fomulas etc.)
  // This effect migrates the old state to the new state, for entities that don't have the new state (`richText`) at load time.
  useEffect(() => {
    if (richTitle.defined) return

    const newTitle = title.defined
      ? {
          plugin: EditorPluginType.Text,
          state: [{ type: 'p', children: [{ text: title.value }] }],
          id: uuidv4(),
        }
      : {
          plugin: EditorPluginType.Text,
          id: uuidv4(),
        }

    richTitle.create(newTitle)
  })

  if (!richTitle.defined) return null

  const titleConfig = {
    config: {
      placeholder: editorStrings.plugins.spoiler.enterATitle,
      formattingOptions: titleFormattingOptions,
      isInlineChildEditor: true,
    },
  }

  return (
    <>
      {renderPluginToolbar()}
      <div
        className={cn(
          showToolbar && '[&>div]:rounded-t-none',
          // making space for first toolbar, not wysiwyg
          '[&>div>button]:!mb-[17px]',
          // toolbar finetuning
          `
            [&_.plugin-toolbar]:rounded-none
            [&_.rows-child:first-child_.plugin-toolbar:before]:hidden
          `
        )}
      >
        <SpoilerRenderer
          title={<div className="grow">{richTitle.render(titleConfig)}</div>}
          content={content.render({
            config: { isInlineChildEditor: true },
          })}
          openOverwrite // should check focused but that's unreliable atm.
        />
      </div>
    </>
  )

  function renderPluginToolbar() {
    if (!showToolbar) return null

    return (
      <PluginToolbar
        pluginType={EditorPluginType.Spoiler}
        pluginControls={<PluginDefaultTools pluginId={id} />}
        className="!left-[21px] top-[-33px] w-[calc(100%-37px)]"
      />
    )
  }
}
