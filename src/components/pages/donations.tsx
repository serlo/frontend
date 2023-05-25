import { faPaypal } from '@fortawesome/free-brands-svg-icons'
import clsx from 'clsx'

import { TestimonialDonationsPage } from '../content/donations-banner-experiment/testimonial-donations-page'
import { FaIcon } from '../fa-icon'
import { HeadTags } from '../head-tags'
import { PartnerList } from '../landing/rework/partner-list'
import { PrivacyWrapper } from '@/components/content/privacy-wrapper'
import { Logo } from '@/components/navigation/header/logo'
import { ExternalProvider } from '@/helper/use-consent'

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
      <header className="px-side lg:px-side-lg pt-6 text-center sm:text-left">
        <Logo />
      </header>
      <div
        className={clsx(
          'md:text-left md:max-w-[100vw] md:ml-0',
          '-mt-12 text-center',
          'text-gray-700'
        )}
      >
        <section
          className={clsx(
            'mt-20 lg:mt-10 flex flex-col-reverse sm:flex-row-reverse',
            'sm:text-left font-bold sm:mx-side'
          )}
        >
          <div className="w-full px-2 mt-2 sm:mt-20 sm:ml-10">
            <h1
              className={clsx(
                'text-5xl font-extrabold',
                'tracking-tight leading-tight',
                'max-w-md mt-3 mb-6 mx-auto sm:ml-0'
              )}
            >
              Deine Spende macht einen{' '}
              <span className="!pr-0 pb-2 underlined">Unterschied</span>.
            </h1>
          </div>
          <aside className="sm:w-full">
            <img
              src="/_assets/img/donations-image.jpg"
              alt="Kind beim Lernen mit Serlo"
              className={clsx(
                'rounded-full object-cover object-center aspect-square',
                'block max-w-[20rem] p-side mobile:mx-auto',
                'sm:max-w-none sm:w-[23rem] sm:h-[23rem] sm:mx-0 sm:ml-auto'
              )}
            />
          </aside>
        </section>
        <div
          className={clsx(
            'mt-12',
            'sm:mx-side-lg md:flex md:justify-evenly',
            'lg:max-w-5xl lg:mx-auto'
          )}
        >
          <div className="max-w-2xl mx-auto">
            <section>
              <p className="serlo-p special-hyphens-initial text-left">
                Fast eine halbe Million Kinder in der Sekundarstufe sind von
                Armut betroffen und haben erhebliche Probleme in der Schule.{' '}
                <b>Mit deiner Spende</b> leistest du einen wichtigen Beitrag,
                dass Kinder und Jugendliche kostenfreien Zugang zu digitalen
                Lernmaterialien erhalten.{' '}
                <b>Spende jetzt einmalig oder regelmäßig!</b>
              </p>
            </section>
            <section id="formular" className="mt-12 mx-side">
              <PrivacyWrapper
                type="twingle"
                provider={ExternalProvider.Twingle}
                twingleCallback={loadTwingle}
              >
                <div id={`twingle-public-embed-${twingleID}`} />
              </PrivacyWrapper>

              <noscript>
                Bitte Javascript aktivieren um über das Formular zu Spenden
              </noscript>
            </section>
          </div>

          <section
            className={clsx(
              'md:max-w-xs pt-6 md:pt-0',
              'max-w-md mx-auto text-left px-side'
            )}
          >
            <h3 className="font-bold -mt-0.5 mb-5 text-xl">
              Dein Ansprechpartner
            </h3>
            <div className="mobile:flex mx-auto md:block md:mx-auto md:w-auto">
              <p className="mobile:min-w-[10rem]">
                <img
                  className="rounded-full w-40 h-40 object-cover mb-7 mt-3 mx-auto -ml-1.5"
                  src="/_assets/img/donations-contact.jpg"
                  alt="Ansprechpartner Wolfgang Schmid"
                />
              </p>
              <div className="text-left mobile:ml-5 mobile:mt-5 md:mt-0 md:ml-0">
                <p>
                  <b>Wolfgang Schmid</b>
                  <br />
                  <i>(Vorstand & Mitgründer)</i>
                </p>

                <p className="mt-3">
                  Du hast Fragen? Schreib mir <br className="hidden md:block" />{' '}
                  gerne an{' '}
                  <a className="serlo-link" href="mailto:spenden@serlo.org">
                    spenden@serlo.org
                  </a>
                </p>
              </div>
            </div>
            <p className="mt-4 md:mt-12 text-left lg:ml-0">
              <b>Transparenz</b>
              <br />
              Als gemeinnütziger Verein legen wir großen Wert auf Transparenz:
              Unsere Finanz- und Wirkungsreports findest du{' '}
              <a className="serlo-link" href="/transparenz" target="_blank">
                hier
              </a>
              .<br />
              <img
                className="serlo-img my-5 mx-0 block w-56"
                src="/_assets/img/donations-itz.png"
                alt="Initiative Transparente Zivilgesellschaft"
              />
            </p>
            <p className="mt-12 text-left lg:ml-0">
              <b>Steuerliche Begünstigungen</b>
              <br />
              Serlo Education ist ein anerkannter gemeinnütziger Verein. Deine
              Spende ist daher steuerlich <b>voll abzugsfähig</b>.
            </p>

            <p className="mt-12 text-left lg:ml-0">
              <b>Spendenkonto</b>
              <br />
              Serlo Education e.V. <br />
              IBAN: DE98 4306 0967 8204 5906 00 <br />
              BIC: GENODEM1GLS (GLS Bank){' '}
            </p>
          </section>
        </div>
        <TestimonialDonationsPage />
      </div>

      <footer>
        <div
          className={clsx(
            'bg-brand-100 text-white p-7 px-side -mb-20 text-center pt-28 -mt-28'
          )}
        >
          <h3 className="text-almost-black font-bold mx-auto text-lg mb-8">
            Partner und Förderer
          </h3>
          <PartnerList />
        </div>
        <div className="bg-white py-8 text-center text-md text-brand mb-[3.5rem] ">
          <a className="hover:underline" href="/datenschutz" target="_blank">
            Datenschutz
          </a>
          {' • '}
          <a className="hover:underline" href="/impressum" target="_blank">
            Impressum
          </a>
        </div>
      </footer>
      {renderFloatingBanner()}
      <style jsx>{`
        .underlined {
          padding-right: 1rem;
          white-space: nowrap;
          background: url('/_assets/img/landing/simple-underline.svg') no-repeat
            bottom;
        }
      `}</style>
    </>
  )

  function renderFloatingBanner() {
    return (
      <aside className="fixed z-20 bottom-0 left-0 right-0 bg-brand text-center">
        <p className="p-2.5 text-white leading-9">
          <span className="hidden mobile:inline pl-4 mobile:ml-0">
            <b className="hidden md:inline">Spendenkonto:</b>
            <span className="md:ml-4">
              <b>IBAN</b> DE98 4306 0967 8204 5906 00
            </span>
            <span className="ml-4">
              <b>BIC</b> GENODEM1GLS
            </span>
            <span className="ml-4 hidden sm:inline">GLS Bank</span>
          </span>
          <a
            className="serlo-button-green mobile:ml-8"
            href="https://www.paypal.me/serlo"
            target="_blank"
            rel="noreferrer"
          >
            <FaIcon icon={faPaypal} /> Mit PayPal spenden
          </a>
        </p>
      </aside>
    )
  }
}
