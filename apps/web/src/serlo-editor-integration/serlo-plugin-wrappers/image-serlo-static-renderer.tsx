import type { EditorImageDocument } from '@editor/package'
import { ImageStaticRenderer } from '@editor/plugins/image/static'
import { useRouter } from 'next/router'

import { ExtraInfoIfRevisionView } from '../extra-info-if-revision-view'

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
