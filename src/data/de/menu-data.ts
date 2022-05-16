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
        {
          title: 'Jobs',
          url: `https://de.${serloDomain}/jobs`,
          icon: 'job',
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

export const subjectMenus: InstanceData['subjectMenus'] = {
  mathe: null,
  48492: [
    //informatik
    { title: 'Alle Themen', url: '/informatik/47899/informatik', id: 47899 },
    {
      title: 'Programmieren lernen',
      url: '/75274/programmieren-lernen',
      id: 75274,
    },
    { title: 'Gymnasium', url: '/informatik/60396/gymnasium', id: 60396 },
    {
      title: 'Bei Serlo-Informatik mitarbeiten',
      url: '/49982/mitmachen-in-informatik',
      id: 49982,
    },
  ],
}

export const pageMenus: InstanceData['pageMenus'] = [
  [
    { title: 'So funktioniert die Lernplattform', url: '/81862', id: 81862 },
    { title: 'Wirkung', url: '/21406', id: 21406 },
    { title: 'Team', url: '/21439', id: 21439 },
    { title: 'Die Geschichte von Serlo', url: '/21413', id: 21413 },
    { title: 'Partner und Förderer', url: '/21456', id: 21456 },
    { title: 'Transparenz', url: '/21468', id: 21468 },
    { title: 'Spenden', url: '/spenden' },
  ],
]
