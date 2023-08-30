import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import LazyLoad from 'react-lazyload'

import { isPrintMode } from '../print-mode'
import { useAB } from '@/contexts/ab'

export interface LazyProps {
  children: ReactNode
  slim?: boolean
  noPrint?: boolean
}

export function Lazy(props: LazyProps) {
  const pathname = usePathname() ?? ''
  const ab = useAB()

  if (isPrintMode) {
    if (props.noPrint) return null
    return <>{props.children}</>
  }

  // disable lazy load if content-only and probably within iframe
  if (
    pathname.startsWith('/content-only/') ||
    ab?.experiment === 'dreisatzv0'
  ) {
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
