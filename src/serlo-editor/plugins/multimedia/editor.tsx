import clsx from 'clsx'
import { useState } from 'react'

import { MultimediaProps } from '.'
import { MultimediaRenderer } from './renderer'
import { MultimediaToolbar } from './toolbar'
import { tw } from '@/helper/tw'

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
          // fix add button position
          '[&_.add-trigger]:relative [&_.add-trigger]:-left-1/4',

          // Improve toolbars for multimedia children.
          // hacky but this way the complexity is contained in the parent plugin

          '[&_.explanation-wrapper_.plugin-toolbar]:ml-[1px]',
          // make multimedia child toolbar span full width of multimedia plugin
          '[&_.media-wrapper:focus-within_.plugin-wrapper-container]:!static',
          // media-wrapper needs to be relative to be clickable (is float:right)
          // but needs to be static to not restrict toolbar width
          '[&_.media-wrapper:focus-within]:!static',
          // margin and size improvement
          tw`
          [&_.media-wrapper_.plugin-toolbar]:!-top-[1.3rem] [&_.media-wrapper_.plugin-toolbar]:!left-auto
          [&_.media-wrapper_.plugin-toolbar]:mx-side [&_.media-wrapper_.plugin-toolbar]:w-[calc(100%-37px)]
          `,

          // first explanation toolbar: small position tweak
          tw`
          [&_.explanation-wrapper_.rows-child.first_.plugin-toolbar]:!-top-[65px]
          [&_.explanation-wrapper_.rows-child.first_.plugin-toolbar]:w-[calc(100%+2px)]
          `
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
