import { ReactNode } from 'react'

import { Footer } from './navigation/footer'
import { Header } from './navigation/header'

export interface HeaderFooterProps {
  children: ReactNode
}

export function HeaderFooter({ children }: HeaderFooterProps) {
  return (
    <>
      <Header />
      <div
        id="content" //anchor
        className="min-h-[68vh] max-w-full overflow-x-hidden sm:overflow-visible" /* needed for sticky menu*/
      >
        {children}
      </div>
      <Footer />
    </>
  )
}
