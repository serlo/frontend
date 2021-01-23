import React from 'react'

import { HeaderFooter } from './header-footer'
import { MaxWidthDiv } from './navigation/max-width-div'
import { RelativeContainer } from './navigation/relative-container'

export type PageBaseDefaultProps = React.PropsWithChildren<{
  showNav?: boolean
}>

export function PageBaseDefault({ children, showNav }: PageBaseDefaultProps) {
  return (
    <>
      <HeaderFooter>
        <RelativeContainer>
          <MaxWidthDiv showNav={showNav}>
            <main>{children}</main>
          </MaxWidthDiv>
        </RelativeContainer>
      </HeaderFooter>
    </>
  )
}
