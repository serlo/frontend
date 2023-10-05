import { useContext } from 'react'

import { RevisionViewExtraInfo } from '../revision-view-extra-info'
import { EditorHighlightPlugin } from '../types/editor-plugins'
import { HighlightStaticRenderer } from '@/serlo-editor/plugins/highlight/static'
import { IsRevisionViewContext } from '@/serlo-editor-integration/context/is-revision-view'

export function HighlightSerloStaticRenderer(props: EditorHighlightPlugin) {
  const isRevisionView = useContext(IsRevisionViewContext)

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
