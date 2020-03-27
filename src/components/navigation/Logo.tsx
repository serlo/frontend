import styled from 'styled-components'
import { lighten } from 'polished'

const logoWordmarkPaddingLeft = 77
const logoPaddingLeft = 6
const logoTargetWidth = 160
const logoOriginalWidth = 237

export default function Logo({ subline }: { subline: string }) {
  return (
    <>
      <div>
        <a href="/">
          <Image
            alt="Serlo"
            src={'/img/serlo-logo.svg'}
            width={logoTargetWidth}
            height="80"
          />
        </a>
      </div>
      {subline && (
        <SublineH2>
          <SublineLink className="subline icon" href="/">
            {subline}
          </SublineLink>
        </SublineH2>
      )}
    </>
  )
}

const Image = styled.img`
  padding-left: ${logoPaddingLeft}px;
`

const sublineH2PaddingLeft =
  logoPaddingLeft +
  (logoWordmarkPaddingLeft * logoTargetWidth) / logoOriginalWidth

const SublineH2 = styled.div`
  padding-left: ${sublineH2PaddingLeft}px;
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
