import clsx from 'clsx'
import { SetStateAction, useState } from 'react'

import { HeadTags } from '../head-tags'
import { PartnerListNew } from '../landing/rework/partner-list-new'
import { endpointEnmeshed } from '@/api/endpoint'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { Logo } from '@/components/navigation/logo'
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
      // TODO: When the workflow has been defined in the future we should revoke the object URL when done with:
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
      <header className="px-side pt-12 bg-brand-100 sm:text-center">
        <div className="pb-6">
          <Logo subline="" noLink />
        </div>
      </header>

      <section
        className={clsx(
          'serlo-responsive-margin mt-5 mb-20',
          'md:mt-12 md:px-8 lg:block'
        )}
      >
        <div className="max-w-xl sm:mx-auto text-lg">
          <h1 className="serlo-h1 text-brand mt-16 mb-5">
            Deine Daten. Deine Rechte.
          </h1>
          <p className="serlo-p">
            Wir gehen verantwortungsvoll mit deinen Daten um. Serlo ist dafür
            Projektpartner des Bildungsraums Digital (BIRD). BIRD setzt eine
            sogenannte „Data Wallet“ ein, die es dir ermöglicht, deine Daten
            sicher und direkt mit uns zu teilen.
          </p>
          <p className="serlo-p">
            Die Data Wallet ist auf deinem Smartphone, dort sind deine Daten
            sicher aufgehoben. Um Serlo dein Vertrauen zu schenken, ist eine
            einmalige Einrichtung erforderlich:
          </p>
          <ol className="serlo-ol text-lg mb-4">
            <li>
              Lade dir die{' '}
              <a
                className="serlo-link font-bold"
                href="https://enmeshed.eu/use/basics"
                target="_blank"
                rel="noreferrer"
              >
                Enmeshed App
              </a>{' '}
              auf dein Smartphone.
            </li>
            <li>
              Erstelle einen{' '}
              <a
                className="serlo-link font-bold cursor-pointer"
                onClick={() => createQRCode(setQrCode)}
              >
                QR-Code
              </a>
              .
              {qrCode &&
                ((qrCode === 'loading' && <LoadingSpinner noText />) || (
                  <img src={qrCode} />
                ))}
            </li>
            <li>
              Lege in deiner Enmeshed App ein neues Profil an und füge Serlo als
              Kontakt hinzu, indem du den QR-Code scannst.
            </li>
            <li>
              Sobald der Kontakt verifiziert wurde, erhältst du innerhalb
              weniger Minuten eine Benachrichtigung in deiner Enmeshed App.
            </li>
          </ol>
          <p className="serlo-p mt-16">
            Sollten dabei Probleme auftauchen,{' '}
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

      <footer className="partner font-bold text-center serlo-responsive-padding pb-1">
        <h2 className="font-bold pt-16 pb-12 text-center">
          Partner und Unterstützer
        </h2>
        <PartnerListNew />
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
