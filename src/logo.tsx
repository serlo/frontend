import styled from 'styled-components'
import { lighten } from 'polished'

export default function Logo(props) {
  return (
    <>
      <h1>
        <a href="#">
          <Image alt="Serlo" src={'/img/serlo-logo.svg'} />
        </a>
      </h1>
      {!props.subline ? null : (
        <SublineH2>
          <SublineLink className="subline icon" href="#">
            {props.subline}
          </SublineLink>
        </SublineH2>
      )}
    </>
  )
}

const Image = styled.img`
  width: 9.3rem;
  padding: 0.8rem 0 0 0.67rem;
`

const SublineH2 = styled.h2`
  padding-left: 1.5rem;
  padding-top: 0.8rem;

  @media screen and (min-width: 18rem) {
    padding-left: 3.5rem;
  }

  @media screen and (max-width: 15rem) {
    padding-left: 0.5rem;
  }
`

const SublineLink = styled.a`
  color: ${props => lighten(0.25, props.theme.colors.darkgray)};
  font-weight: 500;
  font-size: 1.66rem;
  letter-spacing: 0.04rem;
  text-decoration: none;

  &:hover {
    color: ${props => props.theme.colors.brand};
  }
`
