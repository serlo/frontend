import type { ChangeEventHandler, FocusEventHandler } from 'react'

interface BlankDraggableDummyInputProps {
  text: string
  onBlur: FocusEventHandler
  onChange: ChangeEventHandler<HTMLInputElement>
}

export function BlankDraggableDummyInput(props: BlankDraggableDummyInputProps) {
  const { text, onBlur, onChange } = props

  return (
    <span className="serlo-autogrow-input mb-1 mr-2" data-value={text + '_'}>
      <input
        className="rounded-full border border-red-temp bg-editor-primary-100 outline-none"
        value={text}
        autoFocus
        size={4}
        onBlur={onBlur}
        onChange={onChange}
      />
    </span>
  )
}
