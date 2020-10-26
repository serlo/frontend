import {
  faChevronUp,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled from 'styled-components'

import DonateIcon from '@/assets-webkit/img/footer-donate.svg'
import ParticipateIcon from '@/assets-webkit/img/footer-participate.svg'
import { Link } from '@/components/content/link'
import { FooterNav } from '@/components/navigation/footer-nav'
import { useInstanceData } from '@/contexts/instance-context'
import { makeResponsivePadding, makeTransparentButton } from '@/helper/css'

export function Footer() {
  const { footerData } = useInstanceData()
  return (
    <footer>
      <About />
      <FooterNav data={footerData.footerNavigation} />
    </footer>
  )
}

function About() {
  const { footerData, strings } = useInstanceData()
  return (
    <AboutContainer>
      <LogoContainer>
        <TopButton
          onClick={() => window.scrollTo(0, 0)}
          title={strings.footer.toTop}
        >
          <FontAwesomeIcon icon={faChevronUp} size="lg" />
        </TopButton>
      </LogoContainer>
      <InfoContainer>
        <Summary>
          <SummaryHeading>{strings.footer.summaryHeading}</SummaryHeading>
          <SummaryText>{strings.footer.summaryText}</SummaryText>
          <SummaryButtonBox>
            <SummaryButton href={footerData.aboutHref}>
              <FontAwesomeIcon icon={faChevronCircleRight} size="sm" />{' '}
              {strings.footer.learnMore}
            </SummaryButton>
          </SummaryButtonBox>
        </Summary>
        <Support>
          <ImageLink href={footerData.participationHref}>
            <ParticipateIcon />
            <SupportButton>{strings.footer.participate}</SupportButton>
          </ImageLink>
          <ImageLink href={footerData.donationHref}>
            <DonateIcon />
            <SupportButton>{strings.footer.donate}</SupportButton>
          </ImageLink>
        </Support>
      </InfoContainer>
    </AboutContainer>
  )
}

const AboutContainer = styled.div`
  margin-top: 32px;
  display: flex;
  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: column;
  }
`

const LogoContainer = styled.div`
  background-color: ${(props) => props.theme.colors.brand};
  position: relative;
  min-height: 54px;
  width: 100%;
`

const TopButton = styled.div`
  right: 16px;
  top: 7px;
  height: 40px;
  width: 40px;
  position: absolute;
  color: white;
  &:hover {
    background-color: ${(props) => props.theme.colors.lightblue};
  }
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  transition: background-color 0.2s;
  cursor: pointer;
`

const InfoContainer = styled.div`
  flex-shrink: 2;
  width: 100%;
`

const Summary = styled.div`
  background-color: ${(props) => props.theme.colors.lightblue};
  padding-top: 32px;
  padding-bottom: 16px;
  ${makeResponsivePadding}
  font-size: 18px;
  line-height: 24px;
  color: white;
`

const SummaryHeading = styled.div`
  font-weight: bold;
  margin-top: 4px;
  margin-bottom: 6px;
`

/*const SerloLink = styled(Link)`
  &:hover {
    text-decoration: underline;
  }
  color: white;
  text-decoration: none;
`*/

const SummaryText = styled.div`
  margin: 16px 0;
`
const SummaryButtonBox = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`

const SummaryButton = styled(Link)`
  ${makeTransparentButton}
  color: #fff;
`

const Support = styled.div`
  background-color: ${(props) => props.theme.colors.brandGreen};
  display: flex;
  justify-content: space-around;
  padding-top: 16px;
  padding-bottom: 16px;
  color: white;

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    justify-content: start;
  }
`

const ImageLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none !important;
  > svg {
    width: 60px;
  }
  cursor: pointer;

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    &:first-child {
      ${makeResponsivePadding}
      margin-left: -6px;
    }
  }
`

const SupportButton = styled.div`
  margin-top: 3px;
  ${makeTransparentButton}
  color: #fff;
  ${ImageLink}:hover & {
    background-color: ${(props) => props.theme.colors.brand};
  }
  transition: background-color 0.2s;
`
