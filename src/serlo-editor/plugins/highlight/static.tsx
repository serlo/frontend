import { useContext } from 'react'

import { HighlightRenderer } from './renderer'
import { IsRevisionViewContext } from '@/contexts/is-revision-view'
import { RevisionViewExtraInfo } from '@/serlo-editor/static-renderer/revision-view-extra-info'
import { EditorHighlightPlugin } from '@/serlo-editor-integration/types/editor-plugins'

export function HighlightStaticRenderer({ state }: EditorHighlightPlugin) {
  const isRevisionView = useContext(IsRevisionViewContext)

  if (!state.code.trim().length) return null

  return (
    <>
      <HighlightRenderer {...state} />
      {isRevisionView ? (
        <RevisionViewExtraInfo>
          <>{state.language ?? '(no language)'}</>
        </RevisionViewExtraInfo>
      ) : null}
    </>
  )
}
