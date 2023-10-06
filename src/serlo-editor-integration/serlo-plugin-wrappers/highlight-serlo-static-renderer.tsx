import { useContext } from 'react'

import { RevisionViewExtraInfo } from '../revision-view-extra-info'
import { EditorHighlightPlugin } from '../types/editor-plugins'
import { RevisionViewContext } from '@/contexts/revision-view-context'
import { HighlightStaticRenderer } from '@/serlo-editor/plugins/highlight/static'

export function HighlightSerloStaticRenderer(props: EditorHighlightPlugin) {
  const isRevisionView = useContext(RevisionViewContext)
  return (
    <>
      <HighlightStaticRenderer {...props} />
      {isRevisionView ? (
        <RevisionViewExtraInfo>
          <>{props.state.language ?? '(no language)'}</>
        </RevisionViewExtraInfo>
      ) : null}
    </>
  )
}
