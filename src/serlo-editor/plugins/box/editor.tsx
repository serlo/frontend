import clsx from 'clsx'

import { BoxProps } from '.'
import {
  BoxType,
  Renderer,
  boxTypeStyle,
  defaultStyle,
  types,
} from './renderer'
import { FaIcon } from '@/components/fa-icon'
import { useInstanceData } from '@/contexts/instance-context'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { selectIsEmptyRows } from '@/serlo-editor/plugins/rows'
import { useAppSelector } from '@/serlo-editor/store'

export function BoxEditor(props: BoxProps) {
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

  if (hasNoType) {
    return (
      <>
        <figure
          className={clsx(
            'relative rounded-xl border-3 p-4 pt-2',
            borderColorClass
          )}
        >
          {renderInlineSettings()}
        </figure>
        {renderSettings()}
      </>
    )
  }

  return (
    <>
      <Renderer
        boxType={typedValue}
        title={
          <div className="-ml-1 inline-block max-h-6 min-w-[15rem] font-bold">
            {title.render({
              config: {
                placeholder: editorStrings.plugins.box.titlePlaceholder,
              },
            })}
          </div>
        }
        anchorId={anchorId.value}
      >
        <div className="-ml-3 px-side">{content.render()}</div>
      </Renderer>
      {renderWarning()}
      {renderSettings()}
    </>
  )

  function renderInlineSettings() {
    return (
      <>
        <b className="block pb-4">{editorStrings.plugins.box.type}</b>
        <ul className="unstyled-list pb-8">{renderSettingsLis()}</ul>
      </>
    )
  }

  function renderSettings() {
    return props.renderIntoSettings(
      <>
        <b className="serlo-h4 mt-6 ml-0 mb-4 block">
          {editorStrings.plugins.box.type}:
        </b>
        <ul className="pb-8">{renderSettingsLis()}</ul>

        {anchorId.value === '' ? null : (
          <p className="mb-4">
            <b>{editorStrings.plugins.box.anchorId}: </b>#{anchorId.value}
          </p>
        )}
      </>
    )
  }

  function renderSettingsLis() {
    return types.map((boxType) => {
      const typedBoxType = boxType as BoxType
      const listStyle = boxTypeStyle[typedBoxType]
      const listIcon = Object.hasOwn(listStyle, 'icon')
        ? listStyle.icon
        : undefined

      return (
        <li key={typedBoxType} className="inline-block pr-4 pb-4">
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
