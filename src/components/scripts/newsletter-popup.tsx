import { useEffect } from 'react';

const pages = [
  '/abc',
  '/community-werte',
  '/community',
  '/community/ressourcen-paedagoginnen',
  '/eltern',
  '/feature-suggestions',
  '/grundprinzipien',
  '/hilfe-startseite',
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
  useEffect(() => {
    const tenant = window.location.hostname.split('.')[0]
    if (
      (tenant === 'de' || tenant === 'localhost') &&
      pages.indexOf(window.location.pathname) > -1
    ) {
      const mcscriptTag = document.createElement('script')
      mcscriptTag.src =
        '//s3.amazonaws.com/downloads.mailchimp.com/js/signup-forms/popup/embed.js'
      mcscriptTag.setAttribute(
        'dojo-config',
        'usePlainJson: true, isDebug: false'
      )
      document.body.appendChild(mcscriptTag)
      mcscriptTag.onload = () => {
        const customScriptTag = document.createElement('script')
        const inlineScript = document.createTextNode(`
        require(['mojo/signup-forms/Loader'], function(L) {
          L.start({
              baseUrl: 'mc.us7.list-manage.com',
              uuid: '23f4b04bf70ea485a766e532d',
              lid: 'a7bb2bbc4f'
          })})`)
        customScriptTag.appendChild(inlineScript)
        document.body.appendChild(customScriptTag)
      }
    }
  }, [])

  return null
}
