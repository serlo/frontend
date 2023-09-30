import {
  faBrain,
  faExclamationTriangle,
  faFileCircleCheck,
  faHandPointRight,
  faLightbulb,
  faMapSigns,
  faQuoteRight,
  faSplotch,
  faThumbtack,
} from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

import { FaIcon } from '@/components/fa-icon'
import { useInstanceData } from '@/contexts/instance-context'
import { tw } from '@/helper/tw'

export const boxTypeStyle = {
  blank: {},
  example: { icon: faSplotch },
  quote: { icon: faQuoteRight },
  approach: { icon: faMapSigns },
  remember: { icon: faBrain },
  attention: {
    icon: faExclamationTriangle,
    borderColorClass: 'border-red-100',
    colorClass: 'text-orange',
  },
  note: { icon: faHandPointRight },
  definition: { icon: faThumbtack },
  theorem: { icon: faLightbulb },
  proof: { icon: faFileCircleCheck },
}

export const defaultStyle = {
  icon: undefined,
  borderColorClass: 'border-brand-300',
  colorClass: 'text-brand',
}

export const types = Object.keys(boxTypeStyle)
export type BoxType = keyof typeof boxTypeStyle

interface BoxProps {
  boxType: BoxType
  anchorId: string
  children: JSX.Element
  title?: JSX.Element | string
}

export function BoxRenderer({ boxType, title, anchorId, children }: BoxProps) {
  const { strings } = useInstanceData()
  if (!children || !boxType) return null

  const isBlank = boxType === 'blank'

  const style = boxTypeStyle[boxType]
  const borderColorClass = Object.hasOwn(style, 'borderColorClass')
    ? style.borderColorClass
    : defaultStyle.borderColorClass
  const colorClass = Object.hasOwn(style, 'colorClass')
    ? style.colorClass
    : defaultStyle.colorClass
  const icon = Object.hasOwn(style, 'icon') ? style.icon : undefined

  return (
    <figure
      id={anchorId}
      className={clsx(
        tw`
          serlo-box relative mx-side mb-6 
          rounded-xl border-3 pb-2 pt-[2px]
        `,
        borderColorClass
      )}
    >
      {renderHeader()}
      {boxType === 'quote' ? <blockquote>{children}</blockquote> : children}
    </figure>
  )

  function renderHeader() {
    return (
      <figcaption className="px-side pt-2.5 text-lg">
        <a className="!no-underline">
          {isBlank ? null : (
            <span
              className={clsx(title && !isBlank ? 'mr-1.5' : '', colorClass)}
            >
              {icon ? <FaIcon className="mr-1" icon={icon} /> : null}
              {strings.content.boxTypes[boxType]}
            </span>
          )}
          {title}
        </a>
      </figcaption>
    )
  }
}
