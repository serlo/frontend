import { ReactNode } from 'react'

import { Footer } from './navigation/footer'
import { Header } from './navigation/header/header'

export interface HeaderFooterProps {
  children: ReactNode
}

export function HeaderFooter({ children }: HeaderFooterProps) {
  return (
    <div
      className="overflow-x-hidden sm:overflow-visible" /* needed for sticky menu*/
    >
      <Header />
      <div
        id="content" //anchor
        className="min-h-[68vh] max-w-full"
      >
        {children}
      </div>
      <Footer />
    </div>
  )
}
