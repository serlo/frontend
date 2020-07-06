import { lighten } from 'polished'
import styled from 'styled-components'

import { Link } from '../content/link'

const logoTargetWidth = 160

interface LogoProps {
  subline: string
  noLink?: boolean
}

export function Logo({ subline, noLink }: LogoProps) {
  return (
    <>
      <div>
        <Link href={noLink ? undefined : '/'}>
          <Image
            alt="Serlo"
            src="/_assets/img/serlo-logo.svg"
            width={logoTargetWidth}
            height="80"
          />
        </Link>
      </div>
      {subline && (
        <SublineWrap>
          <SublineLink className="subline icon" href={noLink ? undefined : '/'}>
            {subline}
          </SublineLink>
        </SublineWrap>
      )}
    </>
  )
}

const Image = styled.img``

const SublineWrap = styled.div`
  padding-left: 50px;
  padding-top: 5px;
`

const SublineLink = styled(Link)`
  color: ${(props) => lighten(0.25, props.theme.colors.darkgray)};
  font-weight: 500;
  font-size: 1.55rem;
  text-decoration: none !important;

  &:hover {
    color: ${(props) => props.theme.colors.brand};
  }

  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    font-size: 1.65rem;
    letter-spacing: 0.008em;
  }
`
