import { Editor as SlateEditor } from 'slate'

import { ToolbarButton } from './toolbar-button'

export enum CaptionEditorFormattingOption {
  code = 'code',
  links = 'links',
  math = 'math',
  richText = 'richText',
}

export interface ControlButton {
  name: CaptionEditorFormattingOption
  title: string
  isActive(editor: SlateEditor): boolean
  onClick(editor: SlateEditor): void
  renderIcon(editor: SlateEditor): React.ReactNode
}

export interface ToolbarControlsProps {
  controls: ControlButton[]
  editor: SlateEditor
}

export function ToolbarControls({ controls, editor }: ToolbarControlsProps) {
  return (
    <>
      {controls.map((control, index) => (
        <ToolbarButton
          active={control.isActive(editor)}
          tooltipText={control.title}
          onMouseDown={(event) => {
            event.preventDefault()
            control.onClick(editor)
          }}
          key={index}
        >
          {control.renderIcon(editor)}
        </ToolbarButton>
      ))}
    </>
  )
}
