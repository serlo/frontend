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

export const boxTypeIcons = {
  blank: undefined,
  example: faSplotch,
  quote: faQuoteRight,
  approach: faMapSigns,
  attention: faExclamationTriangle,
  remember: faBrain,
  note: faHandPointRight,
  definition: faThumbtack,
  theorem: faLightbulb,
  proof: faFileCircleCheck,
} as const

export type BoxType = keyof typeof boxTypeIcons
export const types = Object.keys(boxTypeIcons) as BoxType[]

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
  const isAttention = boxType === 'attention'

  const icon = boxTypeIcons[boxType] ? (
    <FaIcon className="mr-1" icon={boxTypeIcons[boxType]!} />
  ) : null

  return (
    <figure
      id={anchorId}
      className={clsx(
        tw`
          serlo-box relative mx-side mb-6 
          rounded-xl border-3 pb-side pt-[2px]
        `,
        isAttention ? 'border-red-100' : 'border-brand-300'
      )}
    >
      <figcaption className="px-side pb-2 pt-2.5 text-lg">
        <a className="!no-underline">
          {isBlank ? null : (
            <span
              className={clsx(
                title && !isBlank ? 'mr-1.5' : '',
                isAttention ? 'text-orange' : 'text-brand'
              )}
            >
              {icon}
              {strings.content.boxTypes[boxType]}
            </span>
          )}
          {title}
        </a>
      </figcaption>

      {boxType === 'quote' ? <blockquote>{children}</blockquote> : children}
    </figure>
  )
}
