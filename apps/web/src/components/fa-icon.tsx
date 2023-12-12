import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { cn } from '@serlo/tailwind/helper/cn'
import { CSSProperties } from 'react'

export interface FaIconProps {
  icon: IconDefinition
  className?: string
  style?: CSSProperties
}

export function FaIcon({ icon, className, style }: FaIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      viewBox={`0 0 ${icon.icon[0]} ${icon.icon[1]}`}
      aria-hidden
      focusable={false}
      className={cn('serlo-fa-icon', className)}
      style={style}
    >
      <path
        fill="currentColor"
        d={Array.isArray(icon.icon[4]) ? icon.icon[4][0] : icon.icon[4]}
      ></path>
    </svg>
  )
}
