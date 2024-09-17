import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import type { ModalWithCloseButtonProps } from '../modal-with-close-button'
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

const ModalWithCloseButton = dynamic<ModalWithCloseButtonProps>(() =>
  import('../modal-with-close-button').then((mod) => mod.ModalWithCloseButton)
)

export function NewsletterPopup() {
  const { lang } = useInstanceData()
  const [shouldLoad, setShouldLoad] = useState(false)
  const [alreadySeen, setAlreadySeen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useScrollUpTrigger(
    () => {
      setIsOpen(true)
      window.localStorage.setItem('newsletterAlreadyInvited', '1')
      setAlreadySeen(true)
    },
    shouldLoad && !isOpen && !alreadySeen
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
        className="top-8 max-h-[90vh] translate-y-0 overflow-y-auto p-0"
        title="Serlo Newsletter"
        extraTitleClassName="sr-only"
      >
        <Image
          src={imageSrc}
          alt="Das Serlo Team lädt dich ein den Newsletter zu abbonieren."
          priority
          sizes="500px"
          width={490}
          height={333}
          className="mt-12 max-h-[333px] max-w-full"
        />
        <p className="serlo-p mt-12">
          <b>Kurz und prägnant</b>:<br />
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
