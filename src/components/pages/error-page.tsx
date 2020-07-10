import React from 'react'

import { MaxWidthDiv } from '../navigation/max-width-div'
import { RelativeContainer } from '../navigation/relative-container'
import { HSpace } from '@/components/content/h-space'
import { StyledA } from '@/components/tags/styled-a'
import { StyledH1 } from '@/components/tags/styled-h1'
import { StyledP } from '@/components/tags/styled-p'

//TODO: Differentiate errors types, always 404 is missleading for users and search engines

export function ErrorPage() {
  const [path, setPath] = React.useState('')
  React.useEffect(() => {
    setPath(window.location.pathname)
  }, [])
  return (
    <RelativeContainer>
      <MaxWidthDiv>
        <HSpace amount={100} />
        <StyledH1>404</StyledH1>
        <StyledP>Diese Seite konnte nicht geladen werden.</StyledP>
        {process.env.NODE_ENV !== 'production' && (
          <StyledP>
            Details:{' '}
            <StyledA href={`/api/frontend${path}`}>
              /api/frontend
              {path}
            </StyledA>
          </StyledP>
        )}
        <HSpace amount={100} />
      </MaxWidthDiv>
    </RelativeContainer>
  )
}
