import { serloDomain } from '../../helper/serlo-domain'
import { InstanceData, LandingSubjectsData } from '@/data-types'

export const landingSubjectsData: LandingSubjectsData = {
  subjects: [
    { url: '/mathe', title: 'Mathematik', icon: 'math' },
    {
      url: '/nachhaltigkeit',
      title: 'Nachhaltigkeit',
      icon: 'sustainability',
    },
    { url: '/biologie', title: 'Biologie', icon: 'biology' },
    { url: '/chemie', title: 'Chemie', icon: 'chemistry' },
    { url: '/informatik', title: 'Informatik', icon: 'informatics' },
    {
      url: '/community/neue-fächer-themen',
      title: 'Fächer im Aufbau',
      icon: 'new',
    },
  ],
  additionalLinks: [],
}

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
      { url: '/lerntipps', title: 'Lerntipps' },
      {
        url: '/community/neue-fächer-themen',
        title: 'Fächer im Aufbau',
      },
    ],
  },
  { url: '/serlo', title: 'Über Serlo', icon: 'about' },
  { url: '/mitmachen', title: 'Mitmachen', icon: 'participate' },
  { url: '/spenden', title: 'Spenden', icon: 'donate' },
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
      { url: '/88059', title: 'Hilfeseiten' },
      {
        url: '/community/veranstaltungen/veranstaltungsübersicht',
        title: 'Veranstaltungen für Autor*innen',
      },
      { url: '/entity/unrevised', title: 'Ungeprüfte Bearbeitungen' },
      { url: '/discussions', title: 'Liste aller Kommentare' },
    ],
  },
]

export const footerData: InstanceData['footerData'] = {
  footerNavigation: [
    {
      title: 'Allgemein',
      children: [
        { title: 'Über Serlo', url: '/serlo' },
        { title: 'Community', url: '/community' },
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
          url: 'https://serlo.us7.list-manage.com/subscribe?u=23f4b04bf70ea485a766e532d&amp;id=a7bb2bbc4f',
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
          title: 'Einwilligungen widerrufen',
          url: `/consent`,
        },
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
