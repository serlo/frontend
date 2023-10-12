import { Fragment } from 'react'

import { StaticSlate } from './static-slate'
import type { EditorTextPlugin } from '@/serlo-editor-integration/types/editor-plugins'

export function TextStaticRenderer({ state }: EditorTextPlugin) {
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
