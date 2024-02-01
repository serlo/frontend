import { TextEditorFormattingOption } from '@editor/editor-ui/plugin-toolbar/text-controls/types'
import { selectIsEmptyRows } from '@editor/plugins/rows'
import { selectIsFocused, useAppSelector } from '@editor/store'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { cn } from '@serlo/frontend/src/helper/cn'

import type { BoxProps } from '.'
import { EmptyWarning } from './components/empty-warning'
import { TypeChooserBox } from './components/type-chooser-box'
import { type BoxType, BoxRenderer } from './renderer'
import { BoxToolbar } from './toolbar'

const titleFormattingOptions = [
  TextEditorFormattingOption.math,
  TextEditorFormattingOption.code,
]

export function BoxEditor(props: BoxProps) {
  const { focused } = props
  const { title, type, content, anchorId } = props.state

  const hasNoType = type.value === ''
  const typedValue = (hasNoType ? 'blank' : type.value) as BoxType

  const editorStrings = useEditorStrings()

  const contentId = content.get()
  const isEmptyContent = useAppSelector((state) =>
    selectIsEmptyRows(state, contentId)
  )
  const isTitleFocused = useAppSelector((state) =>
    selectIsFocused(state, title.id)
  )

  const showToolbar = focused || isTitleFocused

  if (hasNoType) {
    return (
      <div data-qa="plugin-box">
        <TypeChooserBox typeState={type} />
      </div>
    )
  }

  const titleConfig = {
    config: {
      placeholder: editorStrings.plugins.box.titlePlaceholder,
      formattingOptions: titleFormattingOptions,
      isInlineChildEditor: true,
    },
  }

  return (
    <div data-qa="plugin-box">
      {showToolbar ? <BoxToolbar {...props} /> : null}

      <div
        className={cn(
          showToolbar && '[&>figure]:rounded-t-none',
          'transition-opacity',
          isEmptyContent && 'opacity-30 focus-within:opacity-100',
          showToolbar && '!opacity-100 ',
          '[&:focus-within_.box-warning]:hidden',
          // making space for first toolbar, not wysiwyg
          '[&>figure>figcaption]:!mb-9',
          // toolbar finetuning
          `
            [&_.plugin-toolbar]:rounded-none
            [&_.rows-child:first-child_.plugin-toolbar:before]:hidden
          `
        )}
      >
        {isEmptyContent && !showToolbar ? <EmptyWarning /> : null}

        <BoxRenderer
          boxType={typedValue}
          title={
            <div
              className="inline-block max-h-6 min-w-[15rem] font-bold"
              data-qa="plugin-box-title"
            >
              {title.render(titleConfig)}
            </div>
          }
          anchorId={anchorId.value}
        >
          <div data-qa="plugin-box-content" className="w-full">
            {content.render()}
          </div>
        </BoxRenderer>
      </div>
    </div>
  )
}
