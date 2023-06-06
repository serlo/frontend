import clsx from 'clsx'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import LazyLoad from 'react-lazyload'

import { isPrintMode } from '../print-mode'

export interface LazyProps {
  children: ReactNode
  slim?: boolean
  noPrint?: boolean
}

export function Lazy(props: LazyProps) {
  const router = useRouter()

  if (isPrintMode) {
    if (props.noPrint) return null
    return <>{props.children}</>
  }

  // disable lazy load if content-only and probably within iframe
  if (router.pathname.startsWith('/content-only/')) {
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
      <noscript>{props.children}</noscript>
    </>
  )
}
