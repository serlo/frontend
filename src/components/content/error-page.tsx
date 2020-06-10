import { HSpace } from '@/components/content/h-space'
import { StyledA } from '@/components/tags/styled-a'
import { StyledH1 } from '@/components/tags/styled-h1'
import { StyledP } from '@/components/tags/styled-p'

interface ErrorPageProps {
  alias: string
}

//TODO: Differentiate Errors Types

export function ErrorPage({ alias }: ErrorPageProps) {
  return (
    <>
      <HSpace amount={100} />
      <StyledH1>404</StyledH1>
      <StyledP>Diese Seite konnte nicht geladen werden.</StyledP>
      {process.env.NODE_ENV !== 'production' && (
        <StyledP>
          Details:{' '}
          <StyledA href={`/api/frontend${alias}`}>
            /api/frontend
            {alias}
          </StyledA>
        </StyledP>
      )}
    </>
  )
}
