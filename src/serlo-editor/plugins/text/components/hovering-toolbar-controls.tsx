import * as R from 'ramda'
import { useState } from 'react'
import { Editor as SlateEditor } from 'slate'

import { HoveringToolbarButton } from './hovering-toolbar-button'
import type { NestedControlButton, ControlButton } from '../types'

export interface HoveringToolbarControlsProps {
  controls: ControlButton[]
  editor: SlateEditor
}

function isNestedControlButton(
  control: ControlButton
): control is NestedControlButton {
  return R.has('children', control)
}

export function HoveringToolbarControls({
  controls,
  editor,
}: HoveringToolbarControlsProps) {
  const [subMenu, setSubMenu] = useState<number>()

  if (typeof subMenu !== 'number') {
    return (
      <>
        {controls.map((control, index) => (
          <HoveringToolbarButton
            active={control.isActive(editor)}
            tooltipText={control.title}
            onMouseDown={(event) => {
              event.preventDefault()
              event.stopPropagation()
              isNestedControlButton(control)
                ? setSubMenu(index)
                : control.onClick(editor)
            }}
            onClick={(event) => {
              event.stopPropagation()
            }}
            key={index}
          >
            {control.renderIcon(editor)}
          </HoveringToolbarButton>
        ))}
      </>
    )
  }

  const activeControl = controls[subMenu]

  if (!isNestedControlButton(activeControl)) return null

  const closeSubMenuControl = {
    isActive() {
      return false
    },
    renderIcon() {
      return activeControl.renderCloseMenuIcon()
    },
    onClick() {
      setSubMenu(undefined)
    },
    title: activeControl.closeMenuTitle,
  }
  const subMenuControls = [...activeControl.children, closeSubMenuControl]

  return (
    <>
      {subMenuControls.map((control, index) => (
        <HoveringToolbarButton
          active={control.isActive(editor)}
          tooltipText={control.title}
          onMouseDown={(event) => {
            event.preventDefault()
            control.onClick(editor)
            setSubMenu(undefined)
          }}
          key={index}
        >
          {control.renderIcon(editor)}
        </HoveringToolbarButton>
      ))}
    </>
  )
}
