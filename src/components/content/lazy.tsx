import clsx from 'clsx'
import { ReactNode } from 'react'
import LazyLoad from 'react-lazyload'

import { isPrintMode } from '../print-mode'

export interface LazyProps {
  children: ReactNode
  slim?: boolean
  noPrint?: boolean
  noNoScript?: boolean
}

export function Lazy(props: LazyProps) {
  if (isPrintMode) {
    if (props.noPrint) return null
    return <>{props.children}</>
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
      {!props.noNoScript && <noscript>{props.children}</noscript>}
    </>
  )
}
