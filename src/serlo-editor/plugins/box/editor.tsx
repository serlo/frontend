import clsx from 'clsx'

import type { BoxProps } from '.'
import { EmptyWarning } from './components/empty-warning'
import { TypeChooserBox } from './components/type-chooser-box'
import {
  type BoxType,
  BoxRenderer,
  boxTypeStyle,
  defaultStyle,
} from './renderer'
import { BoxToolbar } from './toolbar'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { tw } from '@/helper/tw'
import { TextEditorFormattingOption } from '@/serlo-editor/editor-ui/plugin-toolbar/text-controls/types'
import { selectIsEmptyRows } from '@/serlo-editor/plugins/rows'
import { selectIsFocused, useAppSelector } from '@/serlo-editor/store'

const titleFormattingOptions = [
  TextEditorFormattingOption.math,
  TextEditorFormattingOption.code,
]

export function BoxEditor(props: BoxProps) {
  const { focused, editable } = props
  const { title, type, content, anchorId } = props.state
  const hasNoType = type.value === ''
  const typedValue = (hasNoType ? 'blank' : type.value) as BoxType

  const style = boxTypeStyle[typedValue]
  const borderColorClass = Object.hasOwn(style, 'borderColorClass')
    ? style.borderColorClass
    : defaultStyle.borderColorClass

  const contentId = content.get()
  const isEmptyContent = useAppSelector((state) =>
    selectIsEmptyRows(state, contentId)
  )

  const editorStrings = useEditorStrings()

  const isTitleFocused = useAppSelector((state) =>
    selectIsFocused(state, title.id)
  )

  const showToolbar = focused || isTitleFocused

  if (hasNoType) {
    return (
      <TypeChooserBox typeState={type} borderColorClass={borderColorClass} />
    )
  }

  return (
    <>
      {showToolbar ? <BoxToolbar {...props} /> : null}

      <div
        className={clsx(
          showToolbar && '[&>figure]:rounded-t-none',
          'transition-opacity',
          editable && isEmptyContent && 'opacity-30 focus-within:opacity-100',
          showToolbar && '!opacity-100 ',
          // making space for first toolbar, not wysiwyg
          '[&>figure>figcaption]:!mb-9',
          // toolbar finetuning
          editable &&
            tw`
            [&_.plugin-toolbar]:ml-[-2px]
            [&_.plugin-toolbar]:mr-[-16px]
            [&_.plugin-toolbar]:rounded-none
            [&_.rows-child:first-child_.plugin-toolbar:before]:hidden
          `
        )}
      >
        <BoxRenderer
          boxType={typedValue}
          title={
            <div className="-ml-1 inline-block max-h-6 min-w-[15rem] font-bold">
              {title.render({
                config: {
                  placeholder: editorStrings.plugins.box.titlePlaceholder,
                  formattingOptions: titleFormattingOptions,
                  isInlineChildEditor: true,
                },
              })}
            </div>
          }
          anchorId={anchorId.value}
        >
          <div className="-ml-3 px-side">{content.render()}</div>
        </BoxRenderer>
        {isEmptyContent && editable ? <EmptyWarning /> : null}
      </div>
    </>
  )
}
