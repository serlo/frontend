import React from 'react'
import styled from 'styled-components'

import { MaxWidthDiv } from '../navigation/max-width-div'
import { RelativeContainer } from '../navigation/relative-container'
import { HSpace } from '@/components/content/h-space'
import { StyledA } from '@/components/tags/styled-a'
import { StyledH1 } from '@/components/tags/styled-h1'
import { StyledP } from '@/components/tags/styled-p'
import { useInstanceData } from '@/contexts/instance-context'
import { ErrorData } from '@/data-types'
import { makeDefaultButton, inputFontReset } from '@/helper/css'

export function ErrorPage({ code, message }: ErrorData) {
  const [path, setPath] = React.useState('')
  const [hasSerloBacklink, setHasSerloBacklink] = React.useState(false)
  const { strings } = useInstanceData()

  React.useEffect(() => {
    console.log(message)
    setPath(window.location.pathname)

    const previousPage = sessionStorage.getItem('previousPathname')

    setHasSerloBacklink(previousPage ? previousPage.length > 0 : false)
  }, [])

  const isProbablyTemporary = code > 500

  return (
    <RelativeContainer>
      <MaxWidthDiv>
        <HSpace amount={100} />
        <StyledH1>{strings.errors.title}</StyledH1>
        <_StyledP>
          {strings.errors.defaultMessage}{' '}
          {!isProbablyTemporary && (
            <>
              <br />
              {strings.errors.permanent}
            </>
          )}
        </_StyledP>
        <_StyledP>{isProbablyTemporary && strings.errors.temporary}</_StyledP>
        <StyledP>{renderButtons()}</StyledP>
        <HSpace amount={70} />
        <StyledP>
          <b>Error: {code}</b>
        </StyledP>
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

  function renderButtons() {
    return (
      <>
        {isProbablyTemporary ? (
          renderSmartBacklink()
        ) : (
          <>
            {renderBacklink()}
            {renderHomeLink()}
          </>
        )}
        {isProbablyTemporary && (
          <Button onClick={() => window.location.reload()}>
            {strings.errors.refreshNow}
          </Button>
        )}
      </>
    )
  }

  function renderHomeLink() {
    //no csr here
    return (
      <Button as="a" href="/">
        {strings.errors.backToHome}
      </Button>
    )
  }

  function renderBacklink() {
    if (!hasSerloBacklink) return null
    return (
      <Button onClick={() => window.history.back()}>
        {strings.errors.backToPrevious}
      </Button>
    )
  }

  function renderSmartBacklink() {
    if (hasSerloBacklink) return renderBacklink()
    return renderHomeLink()
  }
}

const _StyledP = styled(StyledP)`
  font-size: 1.5rem;
`

const Button = styled.button`
  ${makeDefaultButton}
  ${inputFontReset}
  font-weight: bold;
  font-size: 1.125rem;
  padding: 4px 9px;
  margin-right: 16px;
  margin-top: 16px;
  text-decoration: none !important;
  background-color: ${(props) => props.theme.colors.brand};
  color: #fff;
  &:hover {
    background-color: ${(props) => props.theme.colors.lighterblue};
    color: #fff;
  }
`
