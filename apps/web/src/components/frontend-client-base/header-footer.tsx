import { ReactNode } from 'react'

import { Footer } from '../navigation/footer'
import { Header } from '../navigation/header/header'

export interface HeaderFooterProps {
  children: ReactNode
}

export function HeaderFooter({ children }: HeaderFooterProps) {
  return (
    <div
      className="h-[1000px] overflow-x-hidden bg-white sm:overflow-visible" /* needed for sticky menu */
    >
      <Header />
      <div
        id="content" //anchor
        className="max-w-full"
      >
        {children}
      </div>
    </div>
  )
}
