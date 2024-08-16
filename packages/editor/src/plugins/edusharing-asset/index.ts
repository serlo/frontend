import { EdusharingAssetEditor } from './editor'
import {
  object,
  string,
  optional,
  type EditorPluginProps,
  type EditorPlugin,
} from '../../plugin'

const state = object({
  edusharingAsset: optional(
    object({
      repositoryId: string(''),
      nodeId: string(''),
    })
  ),
  contentWidth: optional(string()), // Contains values like '40rem'. Possible values ['4rem', '6rem', ...]
})

export function createEdusharingAssetPlugin(): EditorPlugin<EdusharingAssetState> {
  return {
    Component: EdusharingAssetEditor,
    state,
    config: {},
    defaultTitle: 'Edu-sharing Inhalt',
    defaultDescription: 'Inhalte von edu-sharing einbinden',
  }
}

export type EdusharingAssetState = typeof state
export type EdusharingAssetProps = EditorPluginProps<EdusharingAssetState>
