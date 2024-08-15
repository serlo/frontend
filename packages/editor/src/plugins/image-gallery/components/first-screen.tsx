import IconChoose from '@editor/editor-ui/assets/plugin-icons/image-gallery/icon-layered-images.svg'
import React from 'react'

export function FirstScreen() {
  return (
    <div
      className="mx-auto my-auto flex items-center justify-center rounded-md bg-yellow-50 p-8 shadow-md"
      data-qa="plugin-image-empty-wrapper"
    >
      <IconChoose className="my-20 text-editor-primary-100 hover:cursor-pointer hover:text-editor-primary-200" />
    </div>
  )
}
