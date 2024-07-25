import Head from 'next/head'
import { useEffect, useState } from 'react'

import { ModalWithCloseButton } from '../modal-with-close-button'
import { useInstanceData } from '@/contexts/instance-context'
import { Instance } from '@/fetcher/graphql-types/operations'
import { useScrollUpTrigger } from '@/helper/use-scroll-up-trigger'

const pages = [
  '/abc',
  '/community-werte',
  '/community',
  '/community/ressourcen-paedagoginnen',
  '/eltern',
  '/features',
  '/grundprinzipien',
  '/jahresberichte',
  '/jobs',
  '/kontakt',
  '/lehrkraefte',
  '/biologie-community-neu-hier',
  '/mathe-community-willkommen',
  '/permakultur-community-neu-hier',
  '/informatik-community-neu-hier',
  '/chemie-community-neu-hier',
  '/physik-community-neu-hier',
  '/mathe/hochschule',
  '/mitmachen',
  '/neue-faecher',
  '/nutzungszahlen',
  '/paedagogik-konzept',
  '/partner',
  '/plenum',
  '/qualitaet',
  '/richtlinien-horizont',
  '/schule',
  '/serlo-geschichte',
  '/serlo',
  '/software',
  '/team',
  '/transparenz',
  '/wirkung',
]

const imageSrc =
  'https://assets.serlo.org/db99f830-6f49-11ed-b282-836733dd2d87/SerloStandorte.jpg'

export function NewsletterPopup() {
  const { lang } = useInstanceData()
  const [shouldLoad, setShouldLoad] = useState(false)
  const [alredySeen, setAlredySeen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useScrollUpTrigger(
    () => {
      setIsOpen(true)
      window.localStorage.setItem('newsletterAlreadyInvited', '1')
      setAlredySeen(true)
    },
    shouldLoad && !isOpen && !alredySeen
  )

  useEffect(() => {
    setShouldLoad(
      lang === Instance.De &&
        pages.includes(window.location.pathname) &&
        !window.localStorage.getItem('newsletterAlreadyInvited')
    )
  }, [lang])

  if (!shouldLoad) return null

  return (
    <>
      <Head>
        <link rel="preload" href={imageSrc} as="image" />
      </Head>
      <ModalWithCloseButton
        isOpen={isOpen}
        setIsOpen={() => setIsOpen(!isOpen)}
        className="top-8 max-h-[90vh] translate-y-0 overflow-y-auto"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt="Das Serlo Team läd dich ein den Newsletter zu abbonieren."
          className="mt-12"
        />
        <p className="serlo-p mt-12">
          <b>Kurs und prägnant</b>:<br />
          Unser Newsletter mit Updates zu Serlo, digitaler Bildung und
          Bildungsgerechtigkeit.
          <br />
        </p>
        <div className="text-center">
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            target="_blank"
            rel="noreferrer"
            className="serlo-new-landing-button serlo-button-with-wings mt-2 inline-block"
            href="https://serlo.us7.list-manage.com/subscribe?u=23f4b04bf70ea485a766e532d&id=a7bb2bbc4f"
          >
            Jetzt anmelden!
          </a>
        </div>
      </ModalWithCloseButton>
    </>
  )
}
