import { faGithubSquare } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

export const footerNavEntries = [
  {
    title: 'Allgemein',
    children: [
      { title: 'Über Serlo', url: '/serlo' },
      { title: 'Partner & Förderer', url: '/partner' },
      { title: 'Presse', url: '/presse' },
      { title: 'Kontakt', url: '/kontakt' },
      { title: 'Serlo in anderen Sprachen', url: '/93321' },
      { title: 'API', url: '/105250' }
    ]
  },
  {
    title: 'Dabei bleiben',
    children: [
      {
        title: 'Newsletter',
        url:
          'https://serlo.us7.list-manage.com/subscribe?u=23f4b04bf70ea485a766e532d&amp;id=a7bb2bbc4f',
        icon: faEnvelope
      },
      {
        title: 'Github',
        url: 'https://github.com/',
        icon: faGithubSquare
      }
    ]
  },
  {
    title: 'Rechtlich',
    children: [
      { title: 'Datenschutz', url: '/datenschutz' },
      {
        title: 'Nutzungsbedingungen und Urheberrecht',
        url: '/nutzungsbedingungen'
      },
      { title: 'Impressum', url: '/impressum' },
      {
        title: 'Diese Plattform basiert auf Open Source Technologie von ORY.',
        url: 'https://www.ory.am/'
      }
    ]
  }
]
