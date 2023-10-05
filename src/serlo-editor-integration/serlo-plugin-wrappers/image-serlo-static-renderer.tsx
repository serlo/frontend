import { useRouter } from 'next/router'
import { useContext } from 'react'

import { RevisionViewExtraInfo } from '../revision-view-extra-info'
import { EditorImagePlugin } from '../types/editor-plugins'
import { RevisionViewContext } from '@/contexts/revision-view-context'
import { ImageStaticRenderer } from '@/serlo-editor/plugins/image/static'

export function ImageSerloStaticRenderer(props: EditorImagePlugin) {
  const isRevisionView = useContext(RevisionViewContext)
  const pathNameBase = useRouter().asPath.split('/').pop()
  return (
    <>
      <ImageStaticRenderer {...props} pathNameBase={pathNameBase} />
      {isRevisionView ? (
        <>
          {props.state.alt ? (
            <RevisionViewExtraInfo>{`Alt: ${props.state.alt}`}</RevisionViewExtraInfo>
          ) : null}
          {props.state.link?.href ? (
            <RevisionViewExtraInfo>{`Link: ${props.state.link?.href}`}</RevisionViewExtraInfo>
          ) : null}
        </>
      ) : null}
    </>
  )
}
