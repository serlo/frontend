import clsx from 'clsx'
import * as React from 'react'
import LazyLoad from 'react-lazyload'

import { isPrintMode } from '@/helper/print-mode'

export interface LazyProps {
  children: React.ReactNode
  slim?: boolean
}

export function Lazy(props: LazyProps) {
  if (isPrintMode) {
    return <>props.children</>
  }

  return (
    <>
      <LazyLoad
        once
        offset={220}
        placeholder={
          <div
            className={clsx(
              'superspecial-noscript-hidden h-auto bg-brand-100',
              props.slim ? 'pb-12' : 'pb-2/3'
            )}
          />
        }
      >
        {props.children}
      </LazyLoad>
      <noscript>{props.children}</noscript>
    </>
  )
}
