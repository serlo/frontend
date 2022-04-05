import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import clsx from 'clsx'

interface FaIconProps {
  icon: IconDefinition
  className?: string
}

export function FaIcon({ icon, className }: FaIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      viewBox={`0 0 ${icon.icon[0]} ${icon.icon[1]}`}
      aria-hidden
      focusable={false}
      className={clsx('serlo-fa-icon', className)}
    >
      <path
        fill="currentColor"
        d={Array.isArray(icon.icon[4]) ? icon.icon[4][0] : icon.icon[4]}
      ></path>
    </svg>
  )
}
