import clsx from 'clsx'

import type { BoxProps } from '.'
import {
  type BoxType,
  BoxRenderer,
  boxTypeStyle,
  defaultStyle,
  types,
} from './renderer'
import { BoxToolbar } from './toolbar'
import { FaIcon } from '@/components/fa-icon'
import { useInstanceData } from '@/contexts/instance-context'
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
  const { strings } = useInstanceData()
  const editorStrings = useEditorStrings()

  const isTitleFocused = useAppSelector((state) =>
    selectIsFocused(state, title.id)
  )

  const showToolbar = focused || isTitleFocused

  if (hasNoType) {
    return (
      <>
        <figure
          className={clsx(
            'relative mx-side rounded-xl border-3 p-4 pt-2',
            borderColorClass
          )}
        >
          <b className="block pb-3">{editorStrings.plugins.box.type}</b>
          <ul className="unstyled-list">{renderSettingsListItems()}</ul>
        </figure>
      </>
    )
  }

  return (
    <>
      {showToolbar ? <BoxToolbar {...props} /> : null}

      <div
        className={clsx(
          showToolbar && '[&>figure]:rounded-t-none',
          editable && isEmptyContent && 'opacity-30 focus-within:opacity-100 ',
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
        {renderWarning()}
      </div>
    </>
  )

  function renderSettingsListItems() {
    return types.map((boxType) => {
      const typedBoxType = boxType as BoxType
      const listStyle = boxTypeStyle[typedBoxType]
      const listIcon = Object.hasOwn(listStyle, 'icon')
        ? listStyle.icon
        : undefined

      return (
        <li key={typedBoxType} className="inline-block pb-3.5 pr-4">
          <button
            className="serlo-button-editor-secondary"
            onClick={(event) => {
              event.preventDefault()
              type.set(typedBoxType)
            }}
          >
            {listIcon ? <FaIcon className="mr-1" icon={listIcon} /> : null}
            {strings.content.boxTypes[typedBoxType]}
          </button>
        </li>
      )
    })
  }

  function renderWarning() {
    return isEmptyContent && editable ? (
      <div className="box-warning text-side absolute left-10 -mt-[1.65rem]">
        <span className="bg-editor-primary-100 px-1.5 py-0.5 text-sm">
          ⚠️ {editorStrings.plugins.box.emptyContentWarning}
        </span>
      </div>
    ) : null
  }
}
