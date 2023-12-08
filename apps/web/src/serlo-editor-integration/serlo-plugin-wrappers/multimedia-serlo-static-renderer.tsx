import dynamic from 'next/dynamic'
import { useState } from 'react'

import { MultimediaStaticRenderer } from '../../serlo-editor/plugins/multimedia/static'
import { LightBoxProps } from '@/components/content/light-box'
import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import { EditorPluginType } from '@/serlo-editor/types/editor-plugin-type'
import {
  EditorImageDocument,
  EditorMultimediaDocument,
} from '@/serlo-editor/types/editor-plugins'

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
