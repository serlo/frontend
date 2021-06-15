import * as React from 'react'
import styled from 'styled-components'

import { Footer } from './navigation/footer'
import { Header } from './navigation/header'

export interface HeaderFooterProps {
  children: React.ReactNode
  headerOnly?: boolean
}

export function HeaderFooter({ children, headerOnly }: HeaderFooterProps) {
  return (
    <>
      <Header />
      {headerOnly ? children : <MinHeightDiv>{children}</MinHeightDiv>}
      {!headerOnly && <Footer />}
    </>
  )
}

const MinHeightDiv = styled.div`
  min-height: 68vh;
`
