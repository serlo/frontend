import { serloDomain } from '../../helper/serlo-domain'
import { InstanceData } from '@/data-types'

export const headerData: InstanceData['headerData'] = [
  {
    url: '',
    title: 'Fächer',
    icon: 'subject',
    children: [
      { url: '/mathe', title: 'Mathematik' },
      { url: '/biologie', title: 'Biologie' },
      {
        url: '/nachhaltigkeit',
        title: 'Angewandte Nachhaltigkeit',
      },
      { url: '/informatik', title: 'Informatik' },
      { url: '/chemie', title: 'Chemie' },
      { url: '/physik', title: 'Physik' },
      {
        url: '/community/neue-fächer-themen',
        title: 'Fächer im Aufbau',
      },
    ],
  },
  { url: '/serlo', title: 'Über Serlo', icon: 'about' },
  { url: '/mitmachen', title: 'Mitmachen', icon: 'participate' },
  {
    url: '',
    title: 'Community',
    icon: 'community',
    children: [
      {
        url: '/community',
        title: 'Startseite für Autor*innen',
      },
      { url: 'https://community.serlo.org/', title: 'Chat für Autor*innen' },
      {
        url: '/community/veranstaltungen/veranstaltungsübersicht',
        title: 'Veranstaltungen für Autor*innen',
      },
      { url: '/entity/unrevised', title: 'Ungeprüfte Bearbeitungen' },
    ],
  },
  { url: '/spenden', title: 'Spenden', icon: 'donate' },
]

export const footerData: InstanceData['footerData'] = {
  footerNavigation: [
    {
      title: 'Allgemein',
      children: [
        { title: 'Über Serlo', url: '/serlo' },
        { title: 'Partner & Förderer', url: '/partner' },
        { title: 'Presse', url: '/presse' },
        { title: 'Kontakt', url: '/kontakt' },
        {
          title: 'Serlo in anderen Sprachen',
          url: `https://en.${serloDomain}/global`,
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
          icon: 'newsletter',
        },
        {
          title: 'GitHub',
          url: 'https://github.com/serlo',
          icon: 'github',
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
  ],
  aboutHref: '/serlo',
  participationHref: '/mitmachen',
  donationHref: '/spenden',
}
