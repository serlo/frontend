import { useScopedStore } from '@edtr-io/core'
import { isEmpty } from '@edtr-io/store'
import clsx from 'clsx'

import { BoxProps } from '.'
import { boxTypeStyle, defaultStyle } from '@/components/content/box'
import { FaIcon } from '@/components/fa-icon'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { hasOwnPropertyTs } from '@/helper/has-own-property-ts'

const types = Object.keys(boxTypeStyle)
export type BoxType = keyof typeof boxTypeStyle

export function BoxRenderer(props: BoxProps) {
  const { title, type, content, anchorId } = props.state
  const hasNoType = type.value === ''
  const typedValue = (hasNoType ? 'blank' : type.value) as BoxType
  const isBlank = typedValue === 'blank'

  const style = boxTypeStyle[typedValue]
  const borderColorClass = hasOwnPropertyTs(style, 'borderColorClass')
    ? style.borderColorClass
    : defaultStyle.borderColorClass
  const colorClass = hasOwnPropertyTs(style, 'colorClass')
    ? style.colorClass
    : defaultStyle.colorClass
  const icon = hasOwnPropertyTs(style, 'icon') ? style.icon : undefined
  const store = useScopedStore()
  const { strings } = useInstanceData()
  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const editorStrings = loggedInData.strings.editor

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
    return <div className="-ml-3">{content.render()}</div>
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
      const listIcon = hasOwnPropertyTs(listStyle, 'icon')
        ? listStyle.icon
        : undefined

      return (
        <li key={typedBoxType} className="inline-block pr-4 pb-4">
          <button
            className="serlo-button serlo-make-interactive-light"
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
    return hackedIsEmpty() ? (
      <div className="text-right mt-1">
        <span className="bg-amber-100 p-0.5 text-sm">
          ⚠️ {editorStrings.box.emptyContentWarning}
        </span>
      </div>
    ) : null
  }

  function hackedIsEmpty() {
    // workaround for https://github.com/edtr-io/edtr-io/issues/384
    // unfortunately only updates when user clicks outside of any editor component

    const rowState = store.getState().documents[content.id].state as []
    const rowChildrenValues = rowState.map(
      (child: { id: string; value: string }) => child.value
    )
    return rowChildrenValues.every((valId) => isEmpty(valId)(store.getState()))
  }
}
