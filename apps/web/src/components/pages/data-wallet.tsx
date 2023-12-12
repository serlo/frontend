import { cn } from '@serlo/tailwind/helper/cn'
import { useState } from 'react'

import { Link } from '../content/link'
import { HeadTags } from '../head-tags'
import { PartnerList } from '../landing/rework/partner-list'
import { Logo } from '../navigation/header/logo'
import { endpointBaseUrl } from '@/api/endpoint'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { triggerSentry } from '@/helper/trigger-sentry'

export const endpointEnmeshed = `${endpointBaseUrl}/enmeshed`

export function DataWallet() {
  const [qrCode, setQrCode] = useState('')

  function createQRCode() {
    setQrCode('loading')
    fetch(`${endpointEnmeshed}/init`, {
      method: 'POST',
      headers: {
        Accept: 'image/png',
      },
    })
      .then((res) => res.blob())
      .then((res) => {
        const urlCreator = window.URL || window.webkitURL
        setQrCode(urlCreator.createObjectURL(res))
        // When the workflow has been defined in the future we should revoke the object URL when done with:
        // urlCreator.revokeObjectUrl(qrCode)
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log(JSON.stringify(e))

        triggerSentry({
          message: `error while creating qr code: ${JSON.stringify(e)}`,
        })
      })
  }

  return (
    <>
      <HeadTags data={{ title: 'Data Wallet – Serlo.org' }} />
      <header className="bg-brand-100 px-side pt-12 sm:text-center">
        <div className="mr-40 pb-6">
          <Logo />
        </div>
      </header>

      <section
        className={cn(
          'serlo-responsive-margin mb-20 mt-5',
          'md:mt-12 md:px-8 lg:block'
        )}
      >
        <div className="max-w-xl text-lg sm:mx-auto">
          <h1 className="serlo-h1 mb-5 mt-16 text-brand">
            Deine Daten. Deine Rechte.
          </h1>
          <p className="serlo-p">
            Wir gehen verantwortungsvoll mit deinen Daten um. Serlo ist dafür
            Projektpartner der digitalen Vernetzugsinfrastruktur{' '}
            <a href="https://www.meinbildungsraum.de/" className="serlo-link">
              „Mein Bildungsraum“
            </a>
            . Dieses Projekt setzt eine sogenannte „Data Wallet“ ein, die es dir
            ermöglicht, deine Daten sicher und direkt mit uns zu teilen.
          </p>
          <p className="serlo-p">
            Die Data Wallet ist auf deinem Smartphone, dort sind deine Daten
            sicher aufgehoben. Um Serlo dein Vertrauen zu schenken, ist eine
            einmalige Einrichtung erforderlich:
          </p>
          <ol className="serlo-ol mb-4 text-lg">
            <li>
              Lade dir die App „Mein Bildungsraum: Wallet“ auf dein Smartphone.
            </li>
            <li>
              Erstelle einen{' '}
              <a
                className="serlo-link cursor-pointer font-bold"
                onClick={createQRCode}
              >
                QR-Code
              </a>
              .
              {qrCode &&
                ((qrCode === 'loading' && <LoadingSpinner noText />) || (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={qrCode} />
                ))}
            </li>
            <li>
              Lege in deiner Wallet App ein neues Profil an und füge Serlo als
              Kontakt hinzu, indem du den QR-Code scannst.
            </li>
            <li>
              Sobald der Kontakt verifiziert wurde, erhälst du innerhalb weniger
              Minuten eine Benachrichtigung in deiner Wallet App.
            </li>
          </ol>
          <p className="serlo-p mt-16">
            Sollten dabei Probleme auftauchen,{' '}
            <Link
              className="serlo-link font-bold"
              href="/kontakt#technischersupport"
            >
              kontaktiere
            </Link>{' '}
            uns gern.
          </p>
          <noscript>Bitte Javascript aktivieren</noscript>
        </div>
      </section>

      <footer className="partner serlo-responsive-padding pb-1 text-center font-bold">
        <h2 className="pb-12 pt-16 text-center font-bold">
          Partner und Unterstützer
        </h2>
        <PartnerList />
        <nav>
          <a
            href="https://de.serlo.org/serlo"
            target="_blank"
            rel="noreferrer"
            className="serlo-link"
          >
            Über Serlo
          </a>
          {' • '}
          <a
            href="https://de.serlo.org/privacy"
            target="_blank"
            rel="noreferrer"
            className="serlo-link"
          >
            Datenschutz
          </a>
          {' • '}
          <a
            href="https://de.serlo.org/legal"
            target="_blank"
            rel="noreferrer"
            className="serlo-link"
          >
            Impressum
          </a>
        </nav>
        <style jsx>
          {`
            .partner {
              border-bottom: 2rem solid #fff1db;
              background-image: url('/_assets/img/landing/about-container.svg');
              background-repeat: no-repeat, no-repeat;
              background-position: 77% 12%;
              background-size:
                200%,
                100vw 100%;
            }
          `}
        </style>
      </footer>
    </>
  )
}
