import { useRouter } from 'next/router'

import { EditorImageDocument } from '../../serlo-editor/types/editor-plugins'
import { ExtraInfoIfRevisionView } from '../extra-info-if-revision-view'
import { ImageStaticRenderer } from '@/serlo-editor/plugins/image/static'

export function ImageSerloStaticRenderer(props: EditorImageDocument) {
  const pathNameBase = useRouter().asPath.split('/').pop()
  return (
    <>
      <ImageStaticRenderer {...props} pathNameBase={pathNameBase} />
      <ExtraInfoIfRevisionView>
        {props.state.alt ? `Alt: ${props.state.alt}` : `Alt: (kein alt text)`}
      </ExtraInfoIfRevisionView>
      <ExtraInfoIfRevisionView>
        {props.state.link?.href
          ? `Link: ${props.state.link.href}`
          : `Link: (kein Link)`}
      </ExtraInfoIfRevisionView>
    </>
  )
}
