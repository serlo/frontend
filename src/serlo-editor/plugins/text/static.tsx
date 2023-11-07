import { Fragment } from 'react'

import { StaticSlate } from './static-components/static-slate'
import type { EditorTextDocument } from '@/serlo-editor-integration/types/editor-plugins'

export function TextStaticRenderer({ state }: EditorTextDocument) {
  if (!state) return null

  return (
    <>
      {Object.values(state).map((item, index) => {
        return (
          <Fragment key={index}>
            <StaticSlate element={item} />
          </Fragment>
        )
      })}
    </>
  )
}
