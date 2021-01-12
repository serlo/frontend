import React from 'react'

import { Footer } from './navigation/footer'
import { Header } from './navigation/header'
import { PageData } from '@/data-types'

export interface HeaderFooterProps {
  children: React.ReactNode
  page: PageData
}

export function HeaderFooter({ children, page }: HeaderFooterProps) {
  return (
    <>
      <Header onSearchPage={page.kind === 'search'} />
      {children}
      <Footer />
    </>
  )
}
