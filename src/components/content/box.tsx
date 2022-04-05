import {
  faScroll,
  faHandPointRight,
  faMapSigns,
  faThumbtack,
  faExclamationTriangle,
  faLightbulb,
  faQuoteRight,
} from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

import { FaIcon } from '../fa-icon'
import { useInstanceData } from '@/contexts/instance-context'
import { FrontendBoxNode } from '@/data-types'
import { hasOwnPropertyTs } from '@/helper/has-own-property-ts'
import { RenderNestedFunction } from '@/schema/article-renderer'

export const boxTypeStyle = {
  blank: {},
  example: {},
  quote: { icon: faQuoteRight },
  approach: { icon: faMapSigns },
  remember: { icon: faScroll },
  attention: {
    icon: faExclamationTriangle,
    borderColorClass: 'border-red-100',
    colorClass: 'text-orange',
  },
  note: { icon: faHandPointRight },
  definition: { icon: faThumbtack },
  theorem: { icon: faLightbulb },
  proof: {},
}

export const defaultStyle = {
  icon: undefined,
  borderColorClass: 'border-brand-300',
  colorClass: 'text-brand',
}

type BoxProps = FrontendBoxNode & { renderNested: RenderNestedFunction }

export function Box({
  boxType,
  title,
  anchorId,
  children,
  renderNested,
}: BoxProps) {
  const { strings } = useInstanceData()

  if (!children || !children.length) return null

  const isBlank = boxType === 'blank'

  const style = boxTypeStyle[boxType]
  const borderColorClass = hasOwnPropertyTs(style, 'borderColorClass')
    ? style.borderColorClass
    : defaultStyle.borderColorClass
  const colorClass = hasOwnPropertyTs(style, 'colorClass')
    ? style.colorClass
    : defaultStyle.colorClass
  const icon = hasOwnPropertyTs(style, 'icon') ? style.icon : undefined

  const content = renderNested(children, 'children')

  return (
    <figure
      id={anchorId}
      className={clsx(
        'mx-side border-3 pt-[7px] pb-side mb-6 rounded-xl relative',
        borderColorClass
      )}
    >
      {renderHeader()}
      {boxType === 'quote' ? (
        <blockquote>{content}</blockquote>
      ) : (
        <div>{content}</div>
      )}
    </figure>
  )

  function renderHeader() {
    return (
      <figcaption className="px-side pb-3 pt-1 text-lg">
        <a className="no-underline" href={'#' + anchorId}>
          {isBlank ? null : (
            <>
              <span
                className={clsx(title && !isBlank ? 'mr-1.5' : '', colorClass)}
              >
                {icon ? <FaIcon className="mr-1" icon={icon} /> : null}
                {strings.content.boxTypes[boxType]}
              </span>
            </>
          )}
          {title ? <b>{renderNested(title, 'title')}</b> : null}
        </a>
      </figcaption>
    )
  }
}
