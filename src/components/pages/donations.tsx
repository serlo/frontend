import { faPaypal } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

import { HeadTags } from '../head-tags'
import { PrivacyWrapper } from '@/components/content/privacy-wrapper'
import { PartnerList } from '@/components/landing/partner-list'
import { FooterNav } from '@/components/navigation/footer-nav'
import { Logo } from '@/components/navigation/logo'
import { StyledImg } from '@/components/tags/styled-img'
import { StyledUl } from '@/components/tags/styled-ul'
import {
  makeGreenTransparentButton,
  makeResponsivePadding,
  makePadding,
} from '@/helper/css'
import { ExternalProvider } from '@/helper/use-consent'

const footerEntries = [
  {
    title: '',
    children: [
      { title: 'Datenschutz', url: '/datenschutz' },
      { title: 'Impressum', url: '/impressum' },
    ],
  },
]

export function Donations() {
  const twingleID = '0001'

  const loadTwingle = function () {
    const script = document.createElement('script')

    script.src =
      'https://spenden.twingle.de/embed/serlo-education-e-v/serlo-org/tw5bcec90da9d45/widget/' +
      twingleID
    script.async = true
    script.defer = true
    script.type = 'text/javascript'

    document.body.appendChild(script)
  }

  return (
    <>
      <HeadTags data={{ title: 'Spenden für freie Bildung – Serlo.org' }} />

      <BlueHeader>
        <PaddedDiv>
          <Logo subline="" noLink />
        </PaddedDiv>
      </BlueHeader>

      <Section>
        <DonationCol>
          <StyledH1 className="font-bold my-5">
            Deine Spende für freie Bildung
          </StyledH1>
          <StyledImg
            id="main-image"
            src="/_assets/img/donations-image.jpg"
            alt="test"
            title=""
          />
          <p>
            Mit deiner Spende ermöglichst du es Kindern und Jugendlichen im
            eigenen Tempo zu lernen und ihr Potential zu entfalten - unabhängig
            vom Geldbeutel ihrer Eltern.
          </p>

          <PrivacyWrapper
            type="twingle"
            provider={ExternalProvider.Twingle}
            twingleCallback={loadTwingle}
          >
            <div id={`twingle-public-embed-${twingleID}`} />
          </PrivacyWrapper>

          <noscript>Bitte Javascript aktivieren</noscript>

          <StyledH2 id="no-formular" className="font-bold my-5">
            Ohne Angabe von Daten spenden
          </StyledH2>
          <h3 id="spendenkonto" className="font-bold my-4 text-xl">
            Spendenkonto
          </h3>

          <p>
            Serlo Education e.V. <br />
            IBAN: DE98 4306 0967 8204 5906 00 <br />
            BIC: GENODEM1GLS (GLS Bank)
          </p>

          <h3 id="paypal" className="font-bold my-4 text-xl">
            PayPal
          </h3>
          <p>
            <Button href="https://www.paypal.me/serlo">
              <FontAwesomeIcon icon={faPaypal} size="1x" /> Über PayPal spenden
            </Button>
          </p>
        </DonationCol>
        <ContactCol>
          <h3 className="font-bold my-4 text-xl">Dein Ansprechpartner</h3>
          <p>
            <RoundedImage
              src="/_assets/img/donations-contact.jpg"
              alt="Wolfgang Schmid"
              title=""
            />
          </p>
          <p>
            <b>Wolfgang Schmid</b>
            <br />
            <i>(Mitglied des Vorstandes und Mitgründer)</i>
          </p>
          <br />
          <p>
            <b>Bei Fragen gern melden über:</b>
            <br />
            <a className="serlo-link" href="mailto:spenden@serlo.org">
              spenden@serlo.org
            </a>
          </p>
          <br />
          <p>
            <b>Deine Spende fließt vor allem in:</b>
          </p>
          <StyledUl>
            <li className="serlo-li">Serverkosten</li>
            <li className="serlo-li">Betreuung ehrenamtlicher Autor*innen</li>
            <li className="serlo-li">Weiterentwicklung der Plattform</li>
          </StyledUl>
          <p>
            Eine genaue Aufstellung unserer Finanzen findest du unter
            www.serlo.org/transparenz
            <ITZImg
              src="/_assets/img/donations-itz.png"
              alt="Initiative Transparente Zivilgesellschaft"
            />
          </p>
          <br />
          <p>
            <b>Steuerliche Begünstigungen</b>
          </p>
          <p>
            Serlo Education ist ein anerkannter gemeinnütziger Verein. Deine
            Spende ist daher steuerlich <b>voll abzugsfähig</b>.
          </p>
          <br />
          <p>
            <b>Ohne Angabe von Daten spenden</b>
          </p>
          <p>
            Du kannst auch via{' '}
            <a className="serlo-link" href="#no-formular">
              Überweisung oder PayPal
            </a>{' '}
            spenden.
          </p>
          <br />
        </ContactCol>
      </Section>

      <BlueContainer>
        <PartnerList />
      </BlueContainer>
      <FooterNav data={footerEntries} />
    </>
  )
}

const BlueHeader = styled.header`
  ${makePadding}
  padding-top: 46px;
  background-color: ${(props) => props.theme.colors.bluewhite};

  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    text-align: center;
  }
`

const PaddedDiv = styled.div`
  padding-bottom: 24px;
`

const Section = styled.section`
  margin-top: 20px;
  margin-bottom: 60px;
  ${makeResponsivePadding}

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    margin-top: 50px;
    padding-left: 32px;
    padding-right: 32px;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    display: block;
  }
`

const ContactCol = styled.div`
  @media (max-width: ${(props) => props.theme.breakpointsMax.md}) {
    border-top: 8px solid ${(props) => props.theme.colors.lightBlueBackground};
    padding-top: 30px;
    margin-top: 45px;
  }
  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    max-width: 300px;
    position: absolute;
    right: 0;
    top: 197px;
    padding-right: 15px;
  }
`

const DonationCol = styled.div`
  max-width: 600px;

  margin-right: auto;
  margin-left: auto;

  @media (min-width: ${(props) =>
      props.theme.breakpoints.md}) AND (max-width: 1320px) {
    margin-left: inherit;
  }

  iframe {
    margin-left: -20px;
  }
  p {
    font-size: 1.125rem;
  }
`

const StyledH1 = styled.h1`
  font-size: 2rem;
  color: ${(props) => props.theme.colors.brand};
  border: 0;
  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    width: 100%;
  }
`

const StyledH2 = styled.h2`
  font-size: 1.66rem;
  color: ${(props) => props.theme.colors.brand};
  border: 0;
  margin-top: 45px;
  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    width: 100%;
  }
`

const Button = styled.a`
  ${makeGreenTransparentButton}
  margin-left: -3px;
  font-weight: bold;
  padding-top: 3px;
  padding-top: 3px;
`

const RoundedImage = styled.img`
  object-fit: cover;
  object-position: top;
  width: 200px;
  height: 200px;
  border-radius: 200px;
`

const BlueContainer = styled.div`
  background-color: ${(props) => props.theme.colors.brand};
  color: #fff;
  margin-top: 100px;
  ${makeResponsivePadding}
  padding: 30px;

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    img {
      max-height: 60px !important;
    }
  }
`

const ITZImg = styled(StyledImg)`
  margin: 18px 0;
  display: block;
  width: 220px;
`
