import { ReactNode } from 'react'

import { cn } from '@/helper/cn'

export function MainTask({ children }: { children: ReactNode }) {
  return <h2 className="text-2xl">{children}</h2>
}

const highlightClasses =
  'mt-3 inline-block rounded-md bg-opacity-20 p-1 px-3 text-2xl'

export function HighlightGreen({ children }: { children: ReactNode }) {
  return <span className={cn(highlightClasses, 'bg-newgreen')}>{children}</span>
}
export function HighlightGray({ children }: { children: ReactNode }) {
  return <span className={cn(highlightClasses, 'bg-gray-300')}>{children}</span>
}
