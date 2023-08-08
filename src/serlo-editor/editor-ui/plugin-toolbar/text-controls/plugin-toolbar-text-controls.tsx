import { useState } from 'react'
import { Editor as SlateEditor } from 'slate'

import { PluginToolbarTextControlButton } from './plugin-toolbar-text-control-button'
import type { NestedControlButton, ControlButton } from './types'

export interface PluginToolbarTextControlsProps {
  controls: ControlButton[]
  editor: SlateEditor
}

function isNestedControlButton(
  control: ControlButton
): control is NestedControlButton {
  return Object.hasOwn(control, 'subMenuButtons')
}

export function PluginToolbarTextControls({
  controls,
  editor,
}: PluginToolbarTextControlsProps) {
  const [subMenu, setSubMenu] = useState<number>()

  const isMath = (control: ControlButton) =>
    Object.hasOwn(control, 'name') && control.name === 'math'

  const mathActive = controls.find(isMath)?.isActive(editor)

  if (typeof subMenu !== 'number') {
    return (
      <>
        {controls.map((control, index) => {
          if (mathActive && !isMath(control)) return null
          return (
            <PluginToolbarTextControlButton
              active={control.isActive(editor)}
              tooltipText={control.title}
              onMouseDown={(event) => {
                event.preventDefault()
                event.stopPropagation()
                isNestedControlButton(control)
                  ? setSubMenu(index)
                  : control.onClick(editor)
              }}
              key={index}
            >
              {control.renderIcon(editor)}
            </PluginToolbarTextControlButton>
          )
        })}
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
  const subMenuControls = [...activeControl.subMenuButtons, closeSubMenuControl]

  return (
    <>
      {subMenuControls.map((control, index) => (
        <PluginToolbarTextControlButton
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
        </PluginToolbarTextControlButton>
      ))}
    </>
  )
}
