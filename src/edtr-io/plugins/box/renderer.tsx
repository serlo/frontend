import { useScopedStore } from '@edtr-io/core'
import { isEmptyRows } from '@edtr-io/plugin-rows'
import clsx from 'clsx'
import { useState } from 'react'

import { BoxProps } from '.'
import { boxTypeStyle, defaultStyle } from '@/components/content/box'
import { FaIcon } from '@/components/fa-icon'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

const types = Object.keys(boxTypeStyle)
export type BoxType = keyof typeof boxTypeStyle

export function BoxRenderer(props: BoxProps) {
  const { title, type, content, anchorId } = props.state
  const hasNoType = type.value === ''
  const typedValue = (hasNoType ? 'blank' : type.value) as BoxType
  const isBlank = typedValue === 'blank'

  const style = boxTypeStyle[typedValue]
  const borderColorClass = Object.hasOwn(style, 'borderColorClass')
    ? style.borderColorClass
    : defaultStyle.borderColorClass
  const colorClass = Object.hasOwn(style, 'colorClass')
    ? style.colorClass
    : defaultStyle.colorClass
  const icon = Object.hasOwn(style, 'icon') ? style.icon : undefined
  const store = useScopedStore()
  const [contentIsEmpty, setContentIsEmpty] = useState(true)
  const { strings } = useInstanceData()
  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const editorStrings = loggedInData.strings.editor

  const checkContentEmpty = () => {
    const isEmptyNow = isEmptyRows(content.get())(store.getState()) ?? true
    if (isEmptyNow !== contentIsEmpty) setContentIsEmpty(isEmptyNow)
  }

  return (
    <>
      <figure
        id={anchorId.value}
        className={clsx(
          'border-3 p-4 pt-2 rounded-xl relative',
          borderColorClass
        )}
      >
        {hasNoType ? (
          renderInlineSettings()
        ) : (
          <>
            {renderHeader()}
            {renderContent()}
          </>
        )}
      </figure>
      {renderWarning()}
      {renderSettings()}
    </>
  )

  function renderHeader() {
    return (
      <figcaption className="pt-1 flex text-lg">
        {isBlank ? null : (
          <div>
            <span className={colorClass + ' mr-1'}>
              {icon ? <FaIcon className="mr-1" icon={icon} /> : null}
              {strings.content.boxTypes[typedValue]}
            </span>
          </div>
        )}
        <div className="block -ml-1 max-h-6 min-w-[15rem] font-bold">
          {title.render({
            config: { placeholder: editorStrings.box.titlePlaceholder },
          })}
        </div>
      </figcaption>
    )
  }

  function renderContent() {
    return (
      <div className="-ml-3" onKeyUp={checkContentEmpty}>
        {content.render()}
      </div>
    )
  }

  function renderInlineSettings() {
    return (
      <>
        <b className="block pb-4">{editorStrings.box.type}</b>
        <ul className="pb-8 unstyled-list">{renderSettingsLis()}</ul>
      </>
    )
  }

  function renderSettings() {
    return props.renderIntoSettings(
      <>
        <b className="serlo-h4 block mt-6 ml-0 mb-4">
          {editorStrings.box.type}:
        </b>
        <ul className="pb-8">{renderSettingsLis()}</ul>

        {anchorId.value === '' ? null : (
          <p className="mb-4">
            <b>{editorStrings.box.anchorId}: </b>#{anchorId.value}
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
            className="serlo-button-light"
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
    return contentIsEmpty ? (
      <div className="text-right mt-1">
        <span className="bg-amber-100 p-0.5 text-sm">
          ⚠️ {editorStrings.box.emptyContentWarning}
        </span>
      </div>
    ) : null
  }
}
