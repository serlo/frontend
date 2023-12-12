import { faPaypal } from '@fortawesome/free-brands-svg-icons'
import { cn } from '@serlo/tailwind/helper/cn'
import Image from 'next/image'

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
        className={cn(`
          -mt-12 text-center text-gray-700
          md:ml-0 md:max-w-[100vw]
          md:text-left
        `)}
      >
        <section
          className={cn(`
            mt-20 flex flex-col-reverse font-bold sm:mx-side
            sm:flex-row-reverse sm:text-left lg:mt-10
          `)}
        >
          <div className="mt-2 w-full px-2 sm:ml-10 sm:mt-20">
            <h1
              className={cn(`
                mx-auto mb-6 mt-3 max-w-md
                text-5xl font-extrabold leading-tight tracking-tight sm:ml-0
              `)}
            >
              Deine Spende macht einen{' '}
              <span className="serlo-underlined !pr-0 pb-2">Unterschied</span>.
            </h1>
          </div>
          <aside className="sm:w-full">
            <div className="w-[90vw]sm:mx-0 relative mx-auto mb-12 aspect-square h-80 sm:ml-auto sm:mr-side">
              <Image
                src="/_assets/img/donations-image.jpg"
                alt="Kind beim Lernen mit Serlo"
                fill
                priority
                sizes="23rem"
                className={cn(`
                  block aspect-square !h-80 !w-80 rounded-full
                  object-cover object-center mobile:mx-auto
                  sm:mx-0 sm:ml-auto sm:!h-[23rem] sm:!w-[23rem] sm:max-w-none
              `)}
              />
            </div>
          </aside>
        </section>
        <div
          className={cn(`
            mt-12 sm:mx-side-lg md:flex md:justify-evenly
            lg:mx-auto lg:max-w-5xl
          `)}
        >
          <div className="mx-auto max-w-2xl">
            <section>
              <p className="serlo-p hyphens-manual text-left">
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
            className={cn(`
              mx-auto max-w-md px-side
              pt-6 text-left md:max-w-xs md:pt-0
            `)}
          >
            <h3 className="-mt-0.5 mb-5 text-xl font-bold">
              Dein Ansprechpartner
            </h3>
            <div className="mx-auto mobile:flex md:mx-auto md:block md:w-auto">
              <p className="mobile:min-w-[10rem]">
                <Image
                  width={160}
                  height={160}
                  className="mx-auto -ml-1.5 mb-7 mt-3 rounded-full object-cover"
                  src="/_assets/img/donations-contact.jpg"
                  alt="Ansprechpartner Wolfgang Schmid"
                />
              </p>
              <div className="text-left mobile:ml-5 mobile:mt-5 md:ml-0 md:mt-0">
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
              <Image
                width={224}
                height={63}
                className="serlo-img mx-0 my-5 block h-auto w-auto"
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
          className={cn(`
            -mb-20 -mt-28 bg-brand-100 p-7 px-side pt-28 text-center text-white
          `)}
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
          <a className="hover:underline" href="/legal" target="_blank">
            Impressum
          </a>
        </div>
      </footer>
      {renderFloatingBanner()}
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
