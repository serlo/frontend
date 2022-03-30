import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'

import { BoxProps } from '.'
import { boxTypeStyle, defaultStyle } from '@/components/content/box'
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
      {renderSettings()}
    </>
  )

  function renderHeader() {
    return (
      <figcaption className="pt-1 flex text-lg">
        {isBlank ? null : (
          <div>
            <span className={colorClass + ' mr-1'}>
              {icon ? <FontAwesomeIcon className="mr-1" icon={icon} /> : null}
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
            {listIcon ? (
              <FontAwesomeIcon className="mr-1" icon={listIcon} />
            ) : null}
            {strings.content.boxTypes[typedBoxType]}
          </button>
        </li>
      )
    })
  }

  function generateAnchorId() {
    const random = (Math.random() + 1).toString(36).substr(2, 5) //random string
    anchorId.set(`box-${random}`)
  }
}
