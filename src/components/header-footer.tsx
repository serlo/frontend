import React from 'react'

import { Footer } from './navigation/footer'
import { Header } from './navigation/header'

export interface HeaderFooterProps {
  children: React.ReactNode
  onSearchPage?: boolean
}

export function HeaderFooter({ children, onSearchPage }: HeaderFooterProps) {
  return (
    <>
      <Header onSearchPage={onSearchPage} />
      {children}
      <Footer />
    </>
  )
}
