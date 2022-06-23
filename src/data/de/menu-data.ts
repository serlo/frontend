import { serloDomain } from '../../helper/urls/serlo-domain'
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
  {
    url: '',
    title: 'Über Uns',
    icon: 'about',
    //as of now this is a duplicate of the secondary menu, but this might change?
    children: [
      { title: 'Über Serlo', url: '/serlo' },
      { title: 'So funktioniert die Lernplattform', url: '/features' },
      { title: 'Team', url: '/team' },
      { title: 'Jobs', url: '/jobs' },
      { title: 'Partner & Förderer', url: '/partner' },
      { title: 'Spenden', url: '/spenden' },
      { title: 'Wirkung', url: '/wirkung' },
      { title: 'Transparenz', url: '/transparenz' },
      { title: 'Die Geschichte von Serlo', url: '/geschichte' },
    ],
  },
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

export const secondaryMenus: InstanceData['secondaryMenus'] = [
  {
    // subject: 'mathe',
    rootId: 19767,
    entries: [
      { title: 'Alle Themen', id: 5 },
      { title: 'Gymnasium', id: 16042 },
      { title: 'Realschule', id: 16157 },
      { title: 'Mittelschule (Hauptschule)', id: 16259 },
      { title: 'FOS & BOS', id: 201593 },
      { title: 'Hochschule', id: 44323 },
      { title: 'Prüfungen', id: 83249 },
      { title: 'Inhalte bearbeiten und hinzufügen', id: 19880 },
      {
        title: 'Chat für Mathe-AutorInnen',
        url: 'https://community.serlo.org/channel/mathe',
      },
    ],
  },
  {
    // subject: 'informatik',
    rootId: 48492,
    entries: [
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
  },
  {
    // subject: 'physik',
    rootId: 41108,
    entries: [
      { title: 'Themen', id: 41107 },
      { title: 'Lehrplan', id: 50540 },
      { title: 'Bei Serlo-Physik mitarbeiten', id: 41134 },
    ],
  },
  {
    // subject: 'lerntipps',
    rootId: 182154,
    entries: [
      { title: 'Alle Themen', id: 181883 },
      { title: 'Bei Serlo-Lerntipps mitarbeiten', id: 242472 },
    ],
  },
  {
    // subject: 'chemie',
    rootId: 24706,
    entries: [
      { title: 'Themen', id: 18230 },
      { title: 'Bei Serlo-Chemie mitarbeiten', id: 26633 },
    ],
  },
  {
    // subject: 'nachhaltigkeit',
    rootId: 58771,
    entries: [
      { title: 'Alle Themen', id: 17744 },
      { title: 'Bei Serlo-Nachhaltigkeit mitmachen', id: 25294 },
      {
        title: 'Chat für Nachhaltigkeits-AutorInnen',
        url: 'https://community.serlo.org/channel/nachhaltigkeit',
      },
    ],
  },
  {
    // subject: 'biologie',
    rootId: 23950,
    entries: [
      { title: 'Themen', id: 23362 },
      { title: 'Bei Serlo-Biologie mitarbeiten', id: 25017 },
    ],
  },
  {
    // subject: 'englisch',
    rootId: 25985,
    entries: [
      { title: 'Themen', id: 25979 },
      { title: 'Taxonomy bearbeiten', url: '/taxonomy/term/organize/25979' },
    ],
  },
  {
    // subject: 'politik',
    rootId: 79157,
    entries: [{ title: 'Alle Themen', id: 79159 }],
  },
  {
    // community
    rootId: 19882,
    entries: [
      { title: 'Community', id: 19882 },
      { title: 'Hilfeseiten', id: 88059 },
      { title: 'Werte und Entscheidungen', id: 181028 },
      { title: 'Sandkasten für AutorInnen', id: 106082 },
      { title: 'Ressourcen für PädagogInnen', id: 88061 },
      { title: 'Veranstaltungen für AutorInnen', id: 145470 },
      { title: 'Alle Aktivitäten auf serlo.org', url: '/event/history' },
      { title: 'Übersicht aller Kommentare', url: '/discussions' },
      { title: 'Ungeprüfte Bearbeitungen', url: '/entity/unrevised' },
      { title: 'Community Übersicht', id: 87993 },
    ],
  },
  {
    entries: [
      { title: 'Über Serlo', id: 18922 },
      { title: 'So funktioniert die Lernplattform', id: 81862 },
      { title: 'Team', id: 21439 },
      { title: 'Jobs', id: 21563 },
      { title: 'Partner & Förderer', id: 21456 },
      { title: 'Wirkung', id: 21406 },
      { title: 'Transparenz', id: 21468 },
      { title: 'Die Geschichte von Serlo', id: 21413 },
    ],
  },
  {
    entries: [
      { title: 'Mitmachen', id: 19869 },
      { title: 'Jobs & Ehrenamt', id: 21563 },
      { title: 'Kontakt und Standorte', id: 21657 },
      { title: 'Spenden', url: '/spenden' },
    ],
  },
]
