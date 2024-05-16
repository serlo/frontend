import clsx from 'clsx'
import { SetStateAction, useState } from 'react'

import { endpointEnmeshed } from '@/api/endpoint'
import { HeadTags } from '@/components/head-tags'
import { PartnerList } from '@/components/landing/rework/partner-list'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { Logo } from '@/components/navigation/header/logo'
import { triggerSentry } from '@/helper/trigger-sentry'

export function createQRCode(
  stateSetter: (value: SetStateAction<string>) => void
) {
  stateSetter('loading')
  fetch(`${endpointEnmeshed}/init`, {
    method: 'POST',
    headers: {
      Accept: 'image/png',
    },
  })
    .then((res) => res.blob())
    .then((res) => {
      const urlCreator = window.URL || window.webkitURL
      stateSetter(urlCreator.createObjectURL(res))
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

export function DataWallet() {
  const [qrCode, setQrCode] = useState('')

  return (
    <>
      <HeadTags data={{ title: 'Data Wallet – Serlo.org' }} />
      <header className="bg-brand-100 px-side pt-12 sm:text-center">
        <div className="pb-6">
          <Logo />
        </div>
      </header>

      <section
        className={clsx(
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
            Projektpartner vom Mein Bildungsraum. Mein Bildungsraum setzt eine
            sogenannte „Data Wallet“ ein, die es dir ermöglicht, deine Daten
            sicher und direkt mit uns zu teilen.
          </p>
          <p className="serlo-p">
            Die Data Wallet ist auf deinem Smartphone, dort sind deine Daten
            sicher aufgehoben. Um Serlo dein Vertrauen zu schenken, ist eine
            einmalige Einrichtung erforderlich:
          </p>
          <ol className="serlo-ol mb-4 text-lg">
            <li>
              Lade dir die App{' '}
              <a
                className="serlo-link font-bold"
                href="https://play.google.com/store/apps/details?id=de.bildungsraum.wallet.beta"
                target="_blank"
                rel="noreferrer"
              >
                Mein Bildungsraum: Wallet
              </a>{' '}
              auf dein Smartphone.
            </li>
            <li>
              Erstelle einen{' '}
              <a
                className="serlo-link cursor-pointer font-bold"
                onClick={() => createQRCode(setQrCode)}
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
              Lege in deiner Wallet-App ein neues Profil an und füge Serlo als
              Kontakt hinzu, indem du den QR-Code scannst.
            </li>
            <li>
              Sobald der Kontakt verifiziert wurde, erhältst du innerhalb
              weniger Minuten eine Benachrichtigung in deiner Wallet-App.
            </li>
          </ol>
          <p className="serlo-p mt-16">
            Sollten dabei Probleme auftauchen,{' '}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              className="serlo-link font-bold"
              href="/kontakt#technischersupport"
            >
              kontaktiere
            </a>{' '}
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
            href="https://de.serlo.org/imprint"
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
              background: url('/_assets/img/landing/about-container.svg');
              border-bottom: 2rem solid #ffefda;
              background-size: cover;
            }
          `}
        </style>
      </footer>
    </>
  )
}
