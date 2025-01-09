import type {
  EditorImageDocument,
  EditorMultimediaDocument,
} from '@editor/package'
import { MultimediaStaticRenderer } from '@editor/plugins/multimedia/static'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import dynamic from 'next/dynamic'
import { useState } from 'react'

import { LightBoxProps } from '@/components/content/light-box'
import { EditorRenderer } from '@/serlo-editor-integration/editor-renderer'

const LightBox = dynamic<LightBoxProps>(() =>
  import('@/components/content/light-box').then((mod) => mod.LightBox)
)

// adds a dynamically loaded lightbox component to multimedia image elements
export function MultimediaSerloStaticRenderer(state: EditorMultimediaDocument) {
  const { multimedia } = state.state
  const [open, setOpen] = useState(false)

  const mediaChildIsImage = multimedia.plugin === EditorPluginType.Image

  return (
    <>
      <MultimediaStaticRenderer
        {...state}
        setOpen={mediaChildIsImage ? setOpen : undefined}
      />
      {renderLightBox()}
    </>
  )

  function renderLightBox() {
    if (!mediaChildIsImage || !open) return null
    const imageState = (multimedia as EditorImageDocument).state

    return (
      <LightBox
        onClose={() => setOpen(false)}
        alt={imageState.alt}
        label={<EditorRenderer document={imageState.caption} />}
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        src={String(imageState.src)}
      />
    )
  }
}
