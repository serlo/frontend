import clsx from 'clsx'
import React, { useRef, useEffect } from 'react'
import { Editor as SlateEditor, Range, Node } from 'slate'

import { HoveringToolbarControls } from './hovering-toolbar-controls'
import type { TextEditorPluginConfig, ControlButton } from '../types'

export interface HoveringToolbarProps {
  editor: SlateEditor
  config: TextEditorPluginConfig
  controls: ControlButton[]
  focused: boolean
}

export function HoveringToolbar({
  editor,
  controls,
  focused,
}: HoveringToolbarProps) {
  const { selection } = editor
  const text = Node.string(editor)
  const isSelectionCollapsed = selection && Range.isCollapsed(selection)

  // Save text for later reference
  const previousTextRef = useRef(text)

  useEffect(() => {
    let debounceTimeout: ReturnType<typeof setTimeout>

    // Update the saved text with the current one
    previousTextRef.current = text

    // If the timeout is active when the component is unmounted, clear it
    return () => {
      debounceTimeout && clearTimeout(debounceTimeout)
    }
  }, [text, isSelectionCollapsed])

  return (
    <>
      <div
        className={clsx(
          'absolute top-[-40px] z-50 rounded-md',
          !focused && 'hidden'
        )}
      >
        <HoveringToolbarControls controls={controls} editor={editor} />
      </div>
    </>
  )
}
