import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { Fragment, useState } from 'react'
import { Editor as SlateEditor } from 'slate'

import { PluginToolbarTextControlButton } from './plugin-toolbar-text-control-button'
import type { NestedControlButton, ControlButton } from './types'
import { FaIcon } from '@/components/fa-icon'

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

  const isBlank = (control: ControlButton) =>
    Object.hasOwn(control, 'name') && control.name === 'textBlank'

  const mathActive = controls.find(isMath)?.isActive(editor)
  const blankActive = controls.find(isBlank)?.isActive(editor)
  const isSpecialMode = mathActive || blankActive

  if (typeof subMenu !== 'number') {
    return (
      <>
        {controls.map((control, index) => {
          if (mathActive && !isMath(control)) return null
          if (blankActive && !isBlank(control)) return null

          const next = controls.at(index + 1)
          const showSeparator =
            !isSpecialMode && !!next && next.group !== control.group

          return (
            <Fragment key={control.title}>
              <PluginToolbarTextControlButton
                active={control.isActive(editor)}
                tooltipText={
                  control.isActive(editor) &&
                  Object.hasOwn(control, 'activeTitle')
                    ? control.activeTitle
                    : control.title
                }
                onMouseDown={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  isNestedControlButton(control)
                    ? setSubMenu(index)
                    : control.onClick(editor)
                }}
              >
                {control.renderIcon(editor)}
              </PluginToolbarTextControlButton>
              {showSeparator ? <span className="opacity-30"> | </span> : null}
            </Fragment>
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
      return <FaIcon icon={faXmark} />
    },
    onClick() {
      setSubMenu(undefined)
    },
    title: activeControl.closeMenuTitle,
  }
  const subMenuControls = [...activeControl.subMenuButtons, closeSubMenuControl]

  return (
    <>
      {subMenuControls.map((control, index) => {
        return (
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
        )
      })}
    </>
  )
}
