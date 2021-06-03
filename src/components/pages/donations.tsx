import { faPaypal } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import styled from 'styled-components'

import { HeadTags } from '../head-tags'
import { PrivacyWrapper } from '@/components/content/privacy-wrapper'
import { PartnerList } from '@/components/landing/partner-list'
import { FooterNav } from '@/components/navigation/footer-nav'
import { Logo } from '@/components/navigation/logo'
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
      <header className="px-side pt-12 bg-brand-100 sm:text-center">
        <div className="pb-6">
          <Logo subline="" noLink />
        </div>
      </header>

      <section
        className={clsx(
          'serlo-responsive-margin mt-5 mb-16',
          'md:mt-12 md:px-8 lg:block'
        )}
      >
        <DonationCol className="max-w-xl mx-auto md:ml-0 lg:ml-auto">
          <h1 className="text-3.5xl text-brand border-0 font-bold my-5 sm:w-full">
            Deine Spende für freie Bildung
          </h1>
          <img
            className="serlo-img"
            id="main-image"
            src="/_assets/img/donations-image.jpg"
            alt="Kind beim Lernen mit Serlo"
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
          <h2
            id="no-formular"
            className="text-2.5xl text-brand font-bold my-11 sm:w-full"
          >
            Ohne Angabe von Daten spenden
          </h2>
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
            <a
              className="serlo-button serlo-make-interactive-transparent-green -ml-1 font-bold pt-1"
              href="https://www.paypal.me/serlo"
            >
              <FontAwesomeIcon icon={faPaypal} size="1x" /> Über PayPal spenden
            </a>
          </p>
        </DonationCol>
        <div
          className={clsx(
            'max-md:pt-16 max-md:mt-11 max-md:border-t-8 max-md:border-brand-150',
            'md:max-w-xs md:absolute md:right-0 md:top-48 md:pr-4'
          )}
        >
          <h3 className="font-bold my-4 text-xl">Dein Ansprechpartner</h3>
          <p>
            <img
              className="rounded-full w-52 h-52 object-cover object-top mb-7 mt-3"
              src="/_assets/img/donations-contact.jpg"
              alt="Ansprechpartner Wolfgang Schmid"
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
          <ul className="serlo-ul">
            <li className="serlo-li">Serverkosten</li>
            <li className="serlo-li">Betreuung ehrenamtlicher Autor*innen</li>
            <li className="serlo-li">Weiterentwicklung der Plattform</li>
          </ul>
          margin: 18px 0; display: block; width: 220px;
          <p>
            Eine genaue Aufstellung unserer Finanzen findest du unter
            www.serlo.org/transparenz
            <img
              className="serlo-img my-5 mx-0 block w-56"
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
        </div>
      </section>
      <BlueContainer
        className={clsx(
          'bg-brand text-white mt-24 p-7 serlo-responsive-padding'
        )}
      >
        <PartnerList />
      </BlueContainer>
      <FooterNav data={footerEntries} />
    </>
  )
}

const BlueContainer = styled.div`
  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    img {
      max-height: 60px !important;
    }
  }
`

const DonationCol = styled.div`
  iframe {
    margin-left: -20px;
  }
  p {
    font-size: 1.125rem;
  }
`
