import { EditorEdusharingAssetDocument } from '@editor/types/editor-plugins'
import { useContext } from 'react'

import { LtikContext } from './ltik-context'
import { EdusharingAssetRenderer } from './renderer'

export function EdusharingAssetStaticRenderer(
  props: EditorEdusharingAssetDocument
) {
  const nodeId = props.state.edusharingAsset?.nodeId
  const repositoryId = props.state.edusharingAsset?.repositoryId

  const { contentWidth: widthInPercent } = props.state

  const ltik = useContext(LtikContext)

  if (!ltik) return null

  return (
    <EdusharingAssetRenderer
      nodeId={nodeId}
      repositoryId={repositoryId}
      contentWidth={widthInPercent}
      ltik={ltik}
    />
  )
}
