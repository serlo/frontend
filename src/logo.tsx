import styled from 'styled-components'
import { lighten } from 'polished'

export default function Logo(props) {
  const { subline } = props
  return (
    <>
      <div>
        <a href="#">
          <Image alt="Serlo" src={'/img/serlo-logo.svg'} width="160" height="80"/>
        </a>
      </div>
      {subline && (
        <SublineH2>
          <SublineLink className="subline icon" href="#">
            {subline}
          </SublineLink>
        </SublineH2>
      )}
    </>
  )
}

const Image = styled.img`
  padding-left: 6px;
`

const SublineH2 = styled.div`
  padding-left: 0;
  padding-top: 15px;
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
