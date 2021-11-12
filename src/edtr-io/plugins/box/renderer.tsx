import { faQuoteRight } from '@edtr-io/ui'
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import {
  faBrain,
  faExclamationCircle,
  faHandPointRight,
  faHeart,
  faMapSigns,
  faThumbtack,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'

import { BoxProps } from '.'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

const boxTypeIcons = {
  blank: faCircle,
  example: faHeart,
  quote: faQuoteRight,
  approach: faMapSigns,
  remember: faBrain,
  attention: faExclamationCircle,
  observe: faHandPointRight,
  definition: faThumbtack,
  proposition: faHeart,
  proof: faHeart,
}

const types = Object.keys(boxTypeIcons)
type BoxType = keyof typeof boxTypeIcons

export function BoxRenderer(props: BoxProps) {
  const { title, type, content } = props.state
  const typedValue = type.value as BoxType
  const isBlank = type.value === 'blank'

  const { strings } = useInstanceData()
  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const editorStrings = loggedInData.strings.editor

  return (
    <>
      <div className="border-l-6 pl-4 ml-7 border-brand-light pt-2 pb-2">
        {renderIcon()}
        {renderTitle()}
        {content.render()}
      </div>
      {renderSettings()}
    </>
  )

  function renderIcon() {
    return (
      <div className="absolute -ml-12 mt-1 text-brand">
        {isBlank ? null : <FontAwesomeIcon icon={boxTypeIcons[typedValue]} />}
      </div>
    )
  }

  function renderTitle() {
    return (
      <div className="pt-1 font-bold flex ml-3">
        {isBlank ? null : (
          <div>
            <span className="text-brand">
              {strings.content.boxTypes[typedValue]}
            </span>
            {' | '}
          </div>
        )}
        <div className="block -ml-1 max-h-6 min-w-[15rem]">
          {title.render({
            config: { placeholder: editorStrings.box.titlePlaceholder },
          })}
        </div>
      </div>
    )
  }

  function renderSettings() {
    const optionLis = types.map((boxType) => {
      const typedBoxType = boxType as BoxType

      return (
        <li key={typedBoxType} className="inline-block pr-4 pb-4">
          <button
            className="serlo-button serlo-make-interactive-light"
            onClick={(event) => {
              event.preventDefault()
              type.set(typedBoxType)
            }}
          >
            <FontAwesomeIcon icon={boxTypeIcons[typedBoxType]} />{' '}
            {strings.content.boxTypes[typedBoxType]}
          </button>
        </li>
      )
    })
    return props.renderIntoSettings(
      <>
        <b className="serlo-h4 block mt-6 ml-0 mb-4">
          {editorStrings.box.type}:
        </b>
        <ul className="pb-8">{optionLis}</ul>
      </>
    )
  }
}
