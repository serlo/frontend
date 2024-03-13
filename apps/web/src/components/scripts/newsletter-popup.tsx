import dynamic from 'next/dynamic'
import { ScriptProps } from 'next/script'
import { useEffect, useState } from 'react'

import { useInstanceData } from '@/contexts/instance-context'
import { Instance } from '@/fetcher/graphql-types/operations'

const Script = dynamic<ScriptProps>(() =>
  import('next/script').then((mod) => mod.default)
)

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
  '/presse',
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

export function NewsletterPopup() {
  const { lang } = useInstanceData()

  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    setShouldLoad(
      lang === Instance.De && pages.includes(window.location.pathname)
    )
    return () => document.getElementById('PopupSignupForm_0')?.remove()
  }, [lang])

  return shouldLoad ? (
    <>
      <Script
        id="mailchimp-popup"
        strategy="lazyOnload"
        src="//s3.amazonaws.com/downloads.mailchimp.com/js/signup-forms/popup/embed.js"
        data-dojo-config="usePlainJson: true, isDebug: false"
        onLoad={() => {
          setTimeout(() => {
            // @ts-expect-error custom mc code
            global.require(['mojo/signup-forms/Loader'], function (L) {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
              L.start({
                baseUrl: 'mc.us7.list-manage.com',
                uuid: '23f4b04bf70ea485a766e532d',
                lid: 'a7bb2bbc4f',
              })
            })
          }, 200)
        }}
      />
    </>
  ) : null
}
