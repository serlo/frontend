import { createContext, useContext } from 'react'
import { EdusharingAssetRenderer } from './renderer'
import { EditorEdusharingAssetDocument } from '@editor/types/editor-plugins'

export const LtikContext = createContext<string | undefined>(undefined)

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
