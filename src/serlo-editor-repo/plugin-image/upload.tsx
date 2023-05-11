import { useRef } from 'react'

import { ImagePluginConfig } from '.'

export function Upload(props: UploadProps) {
  const input = useRef<HTMLInputElement>(null)
  return (
    <>
      <button
        onClick={selectFile}
        className="serlo-button-editor-secondary text-base h-10 self-end"
      >
        {props.config.i18n.label}
      </button>
      <input
        type="file"
        multiple
        accept="image/*"
        style={{ display: 'none' }}
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
