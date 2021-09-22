import clsx from 'clsx'
import { ReactNode } from 'react'

import { Link, LinkProps } from '../content/link'

export function MenuSubButtonLink({
  children,
  onClick,
  ...props
}: LinkProps & { children: ReactNode; onClick?: () => void }) {
  const inner = (
    <button
      onClick={onClick}
      className={clsx(
        'serlo-button font-normal text-base rounded-[12px] special-hyphens-auto',
        'group-hover:text-white group-hover:bg-brand py-0.25 text-left'
      )}
    >
      {children}
    </button>
  )

  if (onClick || !props.href) {
    return <div className="py-[3px] group text-brand">{inner}</div>
  }

  return (
    <Link {...props} className="block py-[3px] group">
      {inner}
    </Link>
  )
}
