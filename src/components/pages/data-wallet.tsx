import clsx from 'clsx'
import { useState } from 'react';

import { HeadTags } from '../head-tags'
import { endpointEnmeshed } from "@/api/endpoint";
import { PartnerList } from '@/components/landing/partner-list'
import {LoadingSpinner} from "@/components/loading/loading-spinner";
import { FooterNav } from '@/components/navigation/footer-nav'
import { Logo } from '@/components/navigation/logo'
import {triggerSentry} from "@/helper/trigger-sentry";

const footerEntries = [
  {
    title: '',
    children: [
      { title: 'Datenschutz', url: '/datenschutz' },
      { title: 'Impressum', url: '/impressum' },
    ],
  },
]

export function DataWallet() {
  const [qrCode, setQrCode] = useState("");

  function createQRCode() {
    setQrCode("loading")
    fetch(`${endpointEnmeshed}/init`, {
      method: "POST",
      headers: {
        "Accept": "image/png"
      }
    })
      .then(res => res.blob())
      .then((res) => {
        const urlCreator = window.URL || window.webkitURL;
        setQrCode(urlCreator.createObjectURL(res));
        // TODO: When the workflow has been defined in the future we should revoke the object URL when done with:
        // urlCreator.revokeObjectUrl(qrCode)
      })
      .catch(e => {
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
        <div className="max-w-xl mx-auto md:ml-0 lg:ml-auto text-lg">
          <h1 className="text-3.5xl text-brand border-0 font-bold my-5 sm:w-full">
            Deine Daten. Deine Rechte.
          </h1>
          <p className="mb-2">
            Wir gehen verantwortungsvoll mit deinen Daten um. Serlo ist dafür Projektpartner des Bildungsraums Digital
            (BIRD). BIRD setzt eine sogenannte „Data Wallet“ ein, die es dir ermöglicht, deine Daten sicher und direkt
            mit uns zu teilen.
          </p>
          <p className="mb-2">
            Das Data Wallet ist auf deinem Smartphone, dort sind deine Daten sicher aufgehoben. Um Serlo dein Vertrauen
            zu schenken, ist eine einmalige Einrichtung erforderlich:
          </p>
          <ol className="serlo-ol text-lg mb-4">
            <li>
              Lade dir die
              <a
                className="serlo-button serlo-make-interactive-transparent-green -ml-1 font-bold pt-1"
                href="https://enmeshed.eu/use/basics"
                target="_blank"
                rel="noreferrer">
                Enmeshed App
              </a>
              auf dein Smartphone.
            </li>
            <li>
              Erstelle einen
              <a
                className="serlo-button serlo-make-interactive-transparent-green -ml-1 font-bold pt-1"
                onClick={createQRCode}
              >
                QR-Code.
              </a>
              {qrCode && (
                (qrCode === "loading" && <LoadingSpinner noText />) || (
                  <img src={qrCode} />
                )
              )}
            </li>
            <li>
              Lege in deiner Enmeshed App ein neues Profil an und füge Serlo als Kontakt hinzu, indem du den QR-Code
              scannst.
            </li>
            <li>
              Sobald der Kontakt verifiziert wurde, erhälst du innerhalb weniger Minuten eine Benachrichtigung
              in deiner Enmashed App.
            </li>
          </ol>
          <p>
            Sollten dabei Probleme auftauchen, kannst du uns gern
            <a
              className="serlo-button serlo-make-interactive-transparent-green -ml-1 font-bold pt-1"
              href="/kontakt">
              kontaktieren.
            </a>
          </p>
          <noscript>Bitte Javascript aktivieren</noscript>
        </div>
      </section>
      <div
        className={clsx(
          'bg-brand text-white mt-24 p-7 serlo-responsive-padding'
        )}
      >
        <PartnerList higher />
      </div>
      <FooterNav data={footerEntries} />
    </>
  )
}
