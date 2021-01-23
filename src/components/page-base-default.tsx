import React from 'react'

import { MaxWidthDiv } from './navigation/max-width-div'
import { RelativeContainer } from './navigation/relative-container'

export type PageBaseDefaultProps = React.PropsWithChildren<{
  showNav?: boolean
}>

export function PageBaseDefault({ children, showNav }: PageBaseDefaultProps) {
  return (
    <>
      <RelativeContainer>
        <MaxWidthDiv showNav={showNav}>
          <main>{children}</main>
        </MaxWidthDiv>
      </RelativeContainer>
    </>
  )
}
