import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import clsx from 'clsx'

interface FaWrapper {
  icon: IconDefinition
  className?: string
}

export function FaWrapper({ icon, className }: FaWrapper) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      viewBox={`0 0 ${icon.icon[0]} ${icon.icon[1]}`}
      aria-hidden
      focusable={false}
      className={clsx('inline-block overflow-visible', className)}
      style={{ verticalAlign: '-.125em' }}
    >
      <path
        fill="currentColor"
        d={Array.isArray(icon.icon[4]) ? icon.icon[4][0] : icon.icon[4]}
      ></path>
    </svg>
  )
}
