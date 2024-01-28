import type { ChangeEventHandler } from 'react'

interface BlankDraggableDummyInputProps {
  text: string
  swtichToPreviewMode: () => void
  onChange: ChangeEventHandler<HTMLInputElement>
}

export function BlankDraggableDummyInput(props: BlankDraggableDummyInputProps) {
  const { text, swtichToPreviewMode, onChange } = props

  return (
    <span className="serlo-autogrow-input mb-1 mr-2" data-value={text + '_'}>
      <input
        className="rounded-full border border-red-400 bg-editor-primary-100 outline-none"
        value={text}
        autoFocus
        size={4}
        onBlur={swtichToPreviewMode}
        onChange={onChange}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault()
            swtichToPreviewMode()
          }
        }}
      />
    </span>
  )
}
