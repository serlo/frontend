import { faLightbulb, faQuoteRight } from '@edtr-io/ui'
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import {
  faScroll,
  faHandPointRight,
  faMapSigns,
  faThumbtack,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { BoxProps } from '.'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

const boxTypeIcons = {
  blank: faCircle,
  example: faCircle,
  quote: faQuoteRight,
  approach: faMapSigns,
  remember: faScroll,
  attention: faExclamationTriangle,
  note: faHandPointRight,
  definition: faThumbtack,
  theorem: faLightbulb,
  proof: faCircle,
}

const types = Object.keys(boxTypeIcons)
type BoxType = keyof typeof boxTypeIcons

export function BoxRenderer(props: BoxProps) {
  const { title, type, content, anchorId } = props.state
  const hasNoType = type.value === ''
  const typedValue = type.value as BoxType
  const isBlank = typedValue === 'blank'

  const { strings } = useInstanceData()
  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const editorStrings = loggedInData.strings.editor

  const colorClass =
    typedValue === 'attention' ? 'text-red-100' : 'text-brand-150'
  const bgClass =
    typedValue === 'attention' ? 'border-red-100' : 'border-brand-150'

  return (
    <>
      <div className={'p-4 rounded-2xl relative border-4 ' + bgClass}>
        {hasNoType ? (
          renderInlineSettings()
        ) : (
          <>
            {renderTitle()}
            {renderContent()}
            {renderIcon()}
          </>
        )}
      </div>
      {renderSettings()}
    </>
  )

  function renderIcon() {
    const icon = boxTypeIcons[typedValue]
    return (
      <div className={'absolute top-4 right-2 w-16 text-center ' + colorClass}>
        {icon === faCircle ? null : (
          <FontAwesomeIcon
            icon={icon}
            size="2x"
            className={'mr-2 ' + colorClass}
          />
        )}
      </div>
    )
  }

  function renderTitle() {
    return (
      <div className="pt-1 flex font-bold" id={anchorId.value}>
        {isBlank ? null : (
          <div>
            <span
              className={typedValue === 'attention' ? 'text-red' : 'text-brand'}
            >
              {strings.content.boxTypes[typedValue]}
            </span>
            {' | '}
          </div>
        )}
        <div className="block -ml-1 max-h-6 min-w-[15rem] font-bold">
          {title.render({
            config: { placeholder: editorStrings.box.titlePlaceholder },
          })}
        </div>
      </div>
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

      return (
        <li key={typedBoxType} className="inline-block pr-4 pb-4">
          <button
            className="serlo-button serlo-make-interactive-light"
            onClick={(event) => {
              event.preventDefault()
              type.set(typedBoxType)
              if (anchorId.value === '') generateAnchorId(typedBoxType)
            }}
          >
            <FontAwesomeIcon icon={boxTypeIcons[typedBoxType]} />{' '}
            {strings.content.boxTypes[typedBoxType]}
          </button>
        </li>
      )
    })
  }

  function generateAnchorId(type: BoxType) {
    const typeName = strings.content.boxTypes[type].toLowerCase()
    const random = (Math.random() + 1).toString(36).substr(2, 5) //random string
    anchorId.set(`${typeName}-${random}`)
  }
}
