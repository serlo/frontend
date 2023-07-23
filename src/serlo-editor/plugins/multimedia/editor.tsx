import clsx from 'clsx'
import { useState } from 'react'

import { MultimediaProps } from '.'
import { MultimediaRenderer } from './renderer'
import { MultimediaToolbar } from './toolbar'

export function MultimediaEditor(props: MultimediaProps) {
  const { state, editable, focused } = props
  const { explanation, multimedia, width } = state
  const [showSettingsModal, setShowSettingsModal] = useState(false)

  return (
    <>
      {editable && focused ? (
        <MultimediaToolbar
          {...props}
          showSettingsModal={showSettingsModal}
          setShowSettingsModal={setShowSettingsModal}
        />
      ) : null}
      <div
        className={clsx(
          'focus-within:[&>div]:border-editor-primary-100',
          '[&_.add-trigger]:relative [&_.add-trigger]:-left-1/4' // fix add button position
        )}
      >
        <MultimediaRenderer
          media={<>{multimedia.render()}</>}
          explanation={<>{explanation.render()}</>}
          mediaWidth={width.value}
        />
      </div>
    </>
  )
}
