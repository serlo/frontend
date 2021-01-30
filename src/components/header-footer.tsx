import * as React from 'react';
import styled from 'styled-components'

import { Footer } from './navigation/footer'
import { Header } from './navigation/header'

export interface HeaderFooterProps {
  children: React.ReactNode
}

export function HeaderFooter({ children }: HeaderFooterProps) {
  return (
    <>
      <Header />
      <MinHeightDiv className="_">{children}</MinHeightDiv>
      <Footer />
    </>
  )
}

const MinHeightDiv = styled.div`
  min-height: 68vh;
`
