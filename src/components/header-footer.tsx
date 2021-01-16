import React from 'react'
import styled from 'styled-components'

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
      <MinHeightDiv>{children}</MinHeightDiv>
      <Footer />
    </>
  )
}

const MinHeightDiv = styled.div`
  min-height: 68vh;
`
