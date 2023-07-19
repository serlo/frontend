import { Editor as SlateEditor } from 'slate'

export enum TextEditorFormattingOption {
  code = 'code',
  colors = 'colors',
  headings = 'headings',
  katex = 'katex',
  links = 'links',
  lists = 'lists',
  math = 'math',
  paragraphs = 'paragraphs',
  richText = 'richText',
}

export type ControlButton = ActionControlButton | NestedControlButton

interface ActionControlButton {
  name: TextEditorFormattingOption
  title: string
  isActive(editor: SlateEditor): boolean
  onClick(editor: SlateEditor): void
  renderIcon(editor: SlateEditor): React.ReactNode
}

export interface NestedControlButton {
  title: string
  closeMenuTitle: string
  children: ActionControlButton[]
  isActive(editor: SlateEditor): boolean
  renderIcon(editor: SlateEditor): React.ReactNode
  renderCloseMenuIcon(): React.ReactNode
}
