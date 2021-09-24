import * as React from 'react'

import { Footer } from './navigation/footer'
import { Header } from './navigation/header'

export interface HeaderFooterProps {
  children: React.ReactNode
}

export function HeaderFooter({ children }: HeaderFooterProps) {
  return (
    <>
      <Header />
      <div
        className="min-h-[68vh] max-w-full overflow-x-hidden lg:overflow-visible" /* needed for sticky menu*/
      >
        {children}
      </div>
      <Footer />
    </>
  )
}
