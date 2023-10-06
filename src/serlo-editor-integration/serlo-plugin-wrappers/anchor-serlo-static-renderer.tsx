import { useContext } from 'react'

import { RevisionViewExtraInfo } from '../revision-view-extra-info'
import { EditorAnchorPlugin } from '../types/editor-plugins'
import { RevisionViewContext } from '@/contexts/revision-view-context'
import { AnchorStaticRenderer } from '@/serlo-editor/plugins/anchor/static'

export function AnchorSerloStaticRenderer(state: EditorAnchorPlugin) {
  const isRevisionView = useContext(RevisionViewContext)

  return (
    <>
      <AnchorStaticRenderer {...state} />
      {isRevisionView ? (
        <RevisionViewExtraInfo>{state.state}</RevisionViewExtraInfo>
      ) : null}
    </>
  )
}
