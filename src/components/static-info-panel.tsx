import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { ReactNode } from 'react'

const colorClasses = {
  warning: 'bg-yellow-200',
  info: 'bg-brand-100',
  success: 'bg-brandgreen-lighter',
  failure: 'bg-red-100',
  gray: 'bg-truegray-100',
}

interface StaticInfoPanelProps {
  children: ReactNode
  icon: IconProp
  type?: keyof typeof colorClasses
}

export function StaticInfoPanel({
  icon,
  children,
  type = 'gray',
}: StaticInfoPanelProps) {
  const colorClass = colorClasses[type]

  return (
    <div className={clsx('p-4 my-12 rounded-2xl font-bold', colorClass)}>
      <FontAwesomeIcon icon={icon} /> {children}
    </div>
  )
}
