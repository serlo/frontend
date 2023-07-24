import { useRef } from 'react'

import { useEditorStrings } from '@/contexts/logged-in-data-context'

export interface UploadButtonProps {
  onFile: (file: File) => void
}

export function UploadButton({ onFile }: UploadButtonProps) {
  const editorStrings = useEditorStrings()
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <>
      <button
        onClick={selectFile}
        className="serlo-button-editor-secondary mb-side self-end text-base"
      >
        {editorStrings.plugins.image.upload}
      </button>
      <input
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        ref={inputRef}
        onChange={({ target }) => {
          if (target.files && target.files.length) onFile(target.files[0])
        }}
      />
    </>
  )

  function selectFile(e: React.MouseEvent) {
    e.preventDefault()
    if (inputRef.current) inputRef.current.click()
  }
}
