import type { EditorTextDocument } from '@editor/types/editor-plugins'
import { Fragment } from 'react'

import { StaticSlate } from './static-components/static-slate'

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
