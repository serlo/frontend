import styled from 'styled-components'

export function PartnerList() {
  return (
    <PartnerWrap>
      <StyledH2>Partner und Förderer</StyledH2>
      <PartnerLogos>
        <PartnerLogo
          src="https://packages.serlo.org/serlo-org-static-assets@1/de/home/logo-beisheim.png"
          alt="Beisheim Stiftung"
          title="Beisheim Stiftung"
        />
        <PartnerLogo
          src="https://packages.serlo.org/serlo-org-static-assets@1/de/home/logo-lmu.svg"
          alt="Ludwig-Maximilians-Universität München"
          title="Ludwig-Maximilians-Universität München"
        />
        <PartnerLogo
          src="https://packages.serlo.org/serlo-org-static-assets@1/de/home/logo-tum.svg"
          alt="Technische Universität München"
          title="Technische Universität München"
        />
        <PartnerLogo
          src="https://packages.serlo.org/serlo-org-static-assets@1/de/home/logo-wikimedia.svg"
          alt="Wikimedia Deutschland"
          title="Wikimedia Deutschland"
        />
        <PartnerLogo
          src="https://packages.serlo.org/serlo-org-static-assets@1/de/home/logo-eu.svg"
          alt="Europäische Kommission"
          title="Europäische Kommission"
          // style={maxHeight: 60px}
        />
        <PartnerLogo
          src="https://packages.serlo.org/serlo-org-static-assets@1/de/home/logo-ashoka.png"
          alt="Ashoka Deutschland"
          title="Ashoka Deutschland"
        />
        <PartnerLogo
          src="https://packages.serlo.org/serlo-org-static-assets@1/de/home/logo-hpi.png"
          alt="Hasso-Plattner-Institut"
          title="Hasso-Plattner-Institut"
        />
      </PartnerLogos>
    </PartnerWrap>
  )
}

const PartnerWrap = styled.div`
  margin-top: auto;
  margin-bottom: 30px;
  width: 100%;
`

const StyledH2 = styled.h2`
  font-weight: 400;
  font-size: 1.125rem;
  margin-bottom: 20px;
`

const PartnerLogos = styled.div`
  color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`

const PartnerLogo = styled.img`
  max-height: 40px;
  @media (max-width: ${(props) => props.theme.breakpointsMax.sm}) {
    margin-bottom: 15px;
  }
`
