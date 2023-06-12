import { useRef } from 'react'

import { ImagePluginConfig } from '.'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

export function Upload(props: UploadProps) {
  const editorStrings = useLoggedInData()!.strings.editor
  const input = useRef<HTMLInputElement>(null)
  return (
    <>
      <button
        onClick={selectFile}
        className="serlo-button-editor-secondary h-10 self-end text-base"
      >
        {editorStrings.image.upload}
      </button>
      <input
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        ref={input}
        onChange={(event) => {
          if (event.target.files && event.target.files.length) {
            props.onFile(event.target.files[0])
          }
        }}
      />
    </>
  )

  function selectFile(e: React.MouseEvent) {
    e.preventDefault()
    if (input.current) {
      input.current.click()
    }
  }
}

export interface UploadProps {
  config: ImagePluginConfig
  inOverlay?: boolean
  onFile: (file: File) => void
}
