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
      <header className="px-side pt-6 text-center sm:text-left lg:px-side-lg">
        <Logo />
      </header>
      <div
        className={clsx(
          'md:ml-0 md:max-w-[100vw] md:text-left',
          '-mt-12 text-center',
          'text-gray-700'
        )}
      >
        <section
          className={clsx(
            'mt-20 flex flex-col-reverse sm:flex-row-reverse lg:mt-10',
            'font-bold sm:mx-side sm:text-left'
          )}
        >
          <div className="mt-2 w-full px-2 sm:mt-20 sm:ml-10">
            <h1
              className={clsx(
                'text-5xl font-extrabold',
                'leading-tight tracking-tight',
                'mx-auto mt-3 mb-6 max-w-md sm:ml-0'
              )}
            >
              Deine Spende macht einen{' '}
              <span className="underlined !pr-0 pb-2">Unterschied</span>.
            </h1>
          </div>
          <aside className="sm:w-full">
            <img
              src="/_assets/img/donations-image.jpg"
              alt="Kind beim Lernen mit Serlo"
              className={clsx(
                'aspect-square rounded-full object-cover object-center',
                'block max-w-[20rem] p-side mobile:mx-auto',
                'sm:mx-0 sm:ml-auto sm:h-[23rem] sm:w-[23rem] sm:max-w-none'
              )}
            />
          </aside>
        </section>
        <div
          className={clsx(
            'mt-12',
            'sm:mx-side-lg md:flex md:justify-evenly',
            'lg:mx-auto lg:max-w-5xl'
          )}
        >
          <div className="mx-auto max-w-2xl">
            <section>
              <p className="serlo-p text-left special-hyphens-initial">
                Fast eine halbe Million Kinder in der Sekundarstufe sind von
                Armut betroffen und haben erhebliche Probleme in der Schule.{' '}
                <b>Mit deiner Spende</b> leistest du einen wichtigen Beitrag,
                dass Kinder und Jugendliche kostenfreien Zugang zu digitalen
                Lernmaterialien erhalten.{' '}
                <b>Spende jetzt einmalig oder regelmäßig!</b>
              </p>
            </section>
            <section id="formular" className="mx-side mt-12">
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
              'pt-6 md:max-w-xs md:pt-0',
              'mx-auto max-w-md px-side text-left'
            )}
          >
            <h3 className="-mt-0.5 mb-5 text-xl font-bold">
              Dein Ansprechpartner
            </h3>
            <div className="mx-auto mobile:flex md:mx-auto md:block md:w-auto">
              <p className="mobile:min-w-[10rem]">
                <img
                  className="mx-auto mb-7 mt-3 -ml-1.5 h-40 w-40 rounded-full object-cover"
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
            <p className="mt-4 text-left md:mt-12 lg:ml-0">
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
            '-mb-20 -mt-28 bg-brand-100 p-7 px-side pt-28 text-center text-white'
          )}
        >
          <h3 className="mx-auto mb-8 text-lg font-bold text-almost-black">
            Partner und Förderer
          </h3>
          <PartnerList />
        </div>
        <div className="text-md mb-[3.5rem] bg-white py-8 text-center text-brand ">
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
        @font-face {
          font-family: 'Karmilla';
          font-style: bolder;
          font-weight: 800;
          src: url('/_assets/fonts/karmilla/karmilla-bolder.woff2')
              format('woff2'),
            url('/_assets/fonts/karmilla/karmilla-bold.woff') format('woff');
          font-display: swap;
        }

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
      <aside className="fixed bottom-0 left-0 right-0 z-20 bg-brand text-center">
        <p className="p-2.5 leading-9 text-white">
          <span className="hidden pl-4 mobile:ml-0 mobile:inline">
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
