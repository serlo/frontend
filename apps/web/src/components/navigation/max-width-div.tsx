import { ReactNode } from 'react'

import { cn } from '@/helper/cn'

interface MaxWidthDivProps {
  showNav?: boolean
  noMarginBottom?: boolean
  children?: ReactNode
}

export function MaxWidthDiv({
  showNav,
  noMarginBottom,
  children,
}: MaxWidthDivProps) {
  return (
    <div
      className={cn(
        'mx-auto max-w-screen-sm sm:ml-[51px]',
        !noMarginBottom && 'mb-24',
        showNav ? 'md:ml-[200px] lg:ml-auto' : 'md:ml-auto'
      )}
    >
      {children}
    </div>
  )
}
