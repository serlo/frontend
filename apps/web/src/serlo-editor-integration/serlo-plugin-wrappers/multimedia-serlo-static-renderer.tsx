import { MultimediaStaticRenderer } from '@editor/plugins/multimedia/static'
import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import {
  EditorImageDocument,
  EditorMultimediaDocument,
} from '@editor/types/editor-plugins'
import dynamic from 'next/dynamic'
import { useState } from 'react'

import { LightBoxProps } from '@/components/content/light-box'

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
        label={<StaticRenderer document={imageState.caption} />}
        src={String(imageState.src)}
      />
    )
  }
}
