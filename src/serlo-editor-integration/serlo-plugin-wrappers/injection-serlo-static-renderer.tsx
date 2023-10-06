import { useContext } from 'react'

import { RevisionViewExtraInfo } from '../revision-view-extra-info'
import { EditorInjectionPlugin } from '../types/editor-plugins'
import { RevisionViewContext } from '@/contexts/revision-view-context'
import { InjectionStaticRenderer } from '@/serlo-editor/plugins/injection/static'

export function InjectionSerloStaticRenderer(state: EditorInjectionPlugin) {
  const isRevisionView = useContext(RevisionViewContext)
  return (
    <>
      <InjectionStaticRenderer {...state} />
      {isRevisionView ? (
        <RevisionViewExtraInfo>{state.state}</RevisionViewExtraInfo>
      ) : null}
    </>
  )
}
