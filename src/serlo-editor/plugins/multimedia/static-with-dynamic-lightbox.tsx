import dynamic from 'next/dynamic'
import { useState } from 'react'

import { MultimediaStaticRenderer } from './static'
import { LightBoxProps } from '@/components/content/light-box'
import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'
import {
  EditorImagePlugin,
  EditorMultimediaPlugin,
} from '@/serlo-editor-integration/types/editor-plugins'

const LightBox = dynamic<LightBoxProps>(() =>
  import('@/components/content/light-box').then((mod) => mod.LightBox)
)

export function MultimediaStaticRendererWithLightbox(
  state: EditorMultimediaPlugin
) {
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
    const imageState = (multimedia as EditorImagePlugin).state

    return (
      <LightBox
        onClose={() => setOpen(false)}
        alt={imageState.alt}
        label={<StaticRenderer state={imageState.caption} />}
        src={String(imageState.src)}
      />
    )
  }
}
