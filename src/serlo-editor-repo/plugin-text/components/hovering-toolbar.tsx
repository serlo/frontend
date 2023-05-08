import React, { useState, useRef, useEffect } from 'react'
import { Editor as SlateEditor, Range } from 'slate'

import type { TextEditorPluginConfig, ControlButton } from '../types'
import { isTouchDevice } from '../utils/is-touch-device'
import { HoveringToolbarControls } from './hovering-toolbar-controls'
import { InlineOverlay, InlineOverlayPosition } from './inline-overlay'
import { TimeoutBottomToolbarWrapper } from './timeout-bottom-toolbar-wrapper'

export interface HoveringToolbarProps {
  editor: SlateEditor
  config: TextEditorPluginConfig
  controls: ControlButton[]
  text: string
  focused: boolean
}

const initialPosition = isTouchDevice()
  ? InlineOverlayPosition.below
  : InlineOverlayPosition.above

export function HoveringToolbar(props: HoveringToolbarProps) {
  const [isBottomToolbarActive, setIsBottomToolbarActive] = useState(false)
  const { editor, config, controls, text, focused } = props
  const { selection } = editor
  const isSelectionCollapsed = selection && Range.isCollapsed(selection)

  // Save text for later reference
  const previousTextRef = useRef(text)

  useEffect(() => {
    let debounceTimeout: ReturnType<typeof setTimeout>

    // Reset the value of isBottomToolbarActive flag
    setIsBottomToolbarActive(false)

    // Compare the texts from previous and current render
    const hasValueChanged = previousTextRef.current !== text

    // Update the saved text with the current one
    previousTextRef.current = text

    // Set timeout duration relative to the type of the change
    // (longer for text change, shorter for selection change)
    const timeout = hasValueChanged ? 2500 : 1000

    // If selection is collapsed, start the timeout to show bottom toolbar
    if (isSelectionCollapsed) {
      debounceTimeout = setTimeout(
        () => setIsBottomToolbarActive(true),
        timeout
      )
    }

    // If the timeout is active when the component is unmounted, clear it
    return () => {
      debounceTimeout && clearTimeout(debounceTimeout)
    }
  }, [text, isSelectionCollapsed])

  return (
    <>
      {!isSelectionCollapsed && (
        <InlineOverlay
          config={config}
          initialPosition={initialPosition}
          hidden={
            !selection ||
            !focused ||
            isSelectionCollapsed ||
            SlateEditor.string(editor, selection) === ''
          }
        >
          <HoveringToolbarControls controls={controls} editor={editor} />
        </InlineOverlay>
      )}
      <TimeoutBottomToolbarWrapper
        isTouch={isTouchDevice()}
        visible={!!isSelectionCollapsed && isBottomToolbarActive}
      >
        {isBottomToolbarActive && (
          <HoveringToolbarControls controls={controls} editor={editor} />
        )}
      </TimeoutBottomToolbarWrapper>
    </>
  )
}
