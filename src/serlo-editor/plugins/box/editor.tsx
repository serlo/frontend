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
import { TextEditorFormattingOption } from '@/serlo-editor/editor-ui/plugin-toolbar/text-controls/types'
import { selectIsEmptyRows } from '@/serlo-editor/plugins/rows'
import { selectIsFocused, useAppSelector } from '@/serlo-editor/store'

const titleFormattingOptions = [
  TextEditorFormattingOption.math,
  TextEditorFormattingOption.code,
]

export function BoxEditor(props: BoxProps) {
  const { focused } = props
  const { title, type, content, anchorId } = props.state
  const hasNoType = type.value === ''
  const typedValue = (hasNoType ? 'blank' : type.value) as BoxType

  const style = boxTypeStyle[typedValue]
  const borderColorClass = Object.hasOwn(style, 'borderColorClass')
    ? style.borderColorClass
    : defaultStyle.borderColorClass
  const contentId = content.get()
  const contentIsEmpty = useAppSelector((state) =>
    selectIsEmptyRows(state, contentId)
  )
  const { strings } = useInstanceData()
  const editorStrings = useEditorStrings()

  const isTitleFocused = useAppSelector((state) =>
    selectIsFocused(state, title.id)
  )

  const hasFocus = focused || isTitleFocused

  if (hasNoType) {
    return (
      <>
        <figure
          className={clsx(
            'relative rounded-xl border-3 p-4 pt-2',
            borderColorClass
          )}
        >
          <b className="block pb-4">{editorStrings.plugins.box.type}</b>
          <ul className="unstyled-list pb-8">{renderSettingsList()}</ul>
        </figure>
      </>
    )
  }

  return (
    <>
      {hasFocus ? <BoxToolbar {...props} /> : null}

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
    </>
  )

  function renderSettingsList() {
    return types.map((boxType) => {
      const typedBoxType = boxType as BoxType
      const listStyle = boxTypeStyle[typedBoxType]
      const listIcon = Object.hasOwn(listStyle, 'icon')
        ? listStyle.icon
        : undefined

      return (
        <li key={typedBoxType} className="inline-block pb-4 pr-4">
          <button
            className="serlo-button-editor-secondary"
            onClick={(event) => {
              event.preventDefault()
              type.set(typedBoxType)
              if (anchorId.value === '') generateAnchorId()
            }}
          >
            {listIcon ? <FaIcon className="mr-1" icon={listIcon} /> : null}
            {strings.content.boxTypes[typedBoxType]}
          </button>
        </li>
      )
    })
  }

  function generateAnchorId() {
    anchorId.set(`box${Math.floor(10000 + Math.random() * 90000)}`)
  }

  function renderWarning() {
    return contentIsEmpty && props.editable ? (
      <div className="mt-1 text-right">
        <span className="bg-editor-primary-100 p-0.5 text-sm">
          ⚠️ {editorStrings.plugins.box.emptyContentWarning}
        </span>
      </div>
    ) : null
  }
}
