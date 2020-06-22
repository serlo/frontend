import { faGithubSquare } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

import { serloDomain } from '../serlo-domain'

export const footerNavEntries = [
  {
    title: 'Allgemein',
    children: [
      { title: 'Über Serlo', url: '/serlo' },
      { title: 'Partner & Förderer', url: '/partner' },
      { title: 'Presse', url: '/presse' },
      { title: 'Kontakt', url: '/kontakt' },
      {
        title: 'Serlo in anderen Sprachen',
        url: `https://en.${serloDomain}.org/global`,
      },
      {
        title: 'Ins alte Design zurück',
        url: `https://de.${serloDomain}/disable-frontend`,
      },
      {
        title: 'API',
        url: `https://en.${serloDomain}/community/technology-and-development/content-api`,
      },
    ],
  },
  {
    title: 'Dabei bleiben',
    children: [
      {
        title: 'Newsletter',
        url:
          'https://serlo.us7.list-manage.com/subscribe?u=23f4b04bf70ea485a766e532d&amp;id=a7bb2bbc4f',
        icon: faEnvelope,
      },
      {
        title: 'GitHub',
        url: 'https://github.com/serlo',
        icon: faGithubSquare,
      },
    ],
  },
  {
    title: 'Rechtlich',
    children: [
      { title: 'Datenschutz', url: `https://de.${serloDomain}/privacy` },
      {
        title: 'Nutzungsbedingungen und Urheberrecht',
        url: `https://de.${serloDomain}/terms`,
      },
      { title: 'Impressum', url: `https://de.${serloDomain}/imprint` },
    ],
  },
]
