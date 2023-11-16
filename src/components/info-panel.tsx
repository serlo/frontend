import clsx from 'clsx'
import Head from 'next/head'
import { ReactNode } from 'react'

import { FaIcon, FaIconProps } from './fa-icon'

const colorClasses = {
  warning: 'bg-orange-200',
  info: 'bg-brand-100',
  success: 'bg-brandgreen-50',
  failure: 'bg-red-100',
  gray: 'bg-gray-100',
}

interface StaticInfoPanelProps {
  children: ReactNode
  icon?: FaIconProps['icon']
  type?: keyof typeof colorClasses
  doNotIndex?: boolean
}

export function InfoPanel({
  icon,
  children,
  type = 'gray',
  doNotIndex,
}: StaticInfoPanelProps) {
  const colorClass = colorClasses[type]

  return (
    <>
      {doNotIndex ? (
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
      ) : null}
      <div className={clsx('my-12 rounded-2xl p-4 font-bold', colorClass)}>
        {icon ? (
          <>
            <FaIcon icon={icon} />{' '}
          </>
        ) : null}
        {children}
      </div>
    </>
  )
}
