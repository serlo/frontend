import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import clsx from 'clsx'
import Head from 'next/head'
import { ReactNode } from 'react'

import { FaIcon } from './fa-icon'

const colorClasses = {
  warning: 'bg-orange-200',
  info: 'bg-brand-100',
  success: 'bg-brandgreen-lighter',
  failure: 'bg-red-100',
  gray: 'bg-truegray-100',
}

interface StaticInfoPanelProps {
  children: ReactNode
  icon: IconDefinition
  type?: keyof typeof colorClasses
  doNotIndex?: boolean
}

export function StaticInfoPanel({
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
      <div className={clsx('p-4 my-12 rounded-2xl font-bold', colorClass)}>
        <FaIcon icon={icon} /> {children}
      </div>
    </>
  )
}
