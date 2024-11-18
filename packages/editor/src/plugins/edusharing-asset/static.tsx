import { EditorMetaContext } from '@editor/core/contexts/editor-meta-context'
import { EditorEdusharingAssetDocument } from '@editor/types/editor-plugins'
import { useContext } from 'react'

import { EdusharingAssetRenderer } from './renderer'

export function EdusharingAssetStaticRenderer(
  props: EditorEdusharingAssetDocument
) {
  const nodeId = props.state.edusharingAsset?.nodeId
  const repositoryId = props.state.edusharingAsset?.repositoryId
  const id = props.id

  const { contentWidth: widthInPercent } = props.state

  const { ltik } = useContext(EditorMetaContext)

  if (!ltik) return null

  return (
    <EdusharingAssetRenderer
      nodeId={nodeId}
      repositoryId={repositoryId}
      contentWidth={widthInPercent}
      ltik={ltik}
      id={id}
    />
  )
}
