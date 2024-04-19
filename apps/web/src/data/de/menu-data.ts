import { serloDomain } from '../../helper/urls/serlo-domain'
import { FooterIcon, InstanceData, LandingSubjectsData } from '@/data-types'

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
      { url: '/mathe', title: 'Mathe' },
      { url: '/mathe-pruefungen', title: 'Mathe Abschlussprüfungen' },
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
      { title: 'Pädagogisches Konzept', url: '/21423/pädagogisches-konzept' },
      { title: 'So funktioniert die Lernplattform', url: '/features' },
      { title: 'Team', url: '/team' },
      { title: 'Jobs', url: '/jobs' },
      { title: 'Partner & Förderer', url: '/partner' },
      { title: 'Wirkung', url: '/wirkung' },
      { title: 'Transparenz', url: '/transparenz' },
      { title: 'Die Geschichte von Serlo', url: '/geschichte' },
      { title: 'Kontakt & Standorte', url: '/21657/kontakt-und-standorte' },
    ],
  },
  { url: '/spenden', title: 'Spenden', icon: 'donate' },
  {
    url: '',
    title: 'Mitmachen',
    icon: 'participate',
    children: [
      {
        title: 'Neu hier?',
        url: '/community',
        children: [
          {
            title: 'Mach den Einführungskurs',
            url: '/community',
          },
        ],
      },
      {
        title: "Was gibt's zu tun?",
        url: '/community#wasgibtszutun',
        children: [
          {
            title: 'Hilf in einem Fach',
            url: '/256320/hilf-in-unseren-f%C3%A4chern',
          },
          {
            title: 'Teste den Editor',
            url: '/community/106082/testbereich',
          },
          {
            title: 'Schreibe Kommentare',
            url: '/discussions',
          },
          {
            title: 'Überprüfe Bearbeitungen',
            url: '/entity/unrevised',
          },
        ],
      },
      {
        title: 'Zusammenarbeit',
        url: '/community#zusammenarbeit',
        children: [
          {
            title: 'Communitychat',
            url: 'https://community.serlo.org/channel/general',
          },
          {
            title: 'Veranstaltungen',
            url: '/community/145470/veranstaltungs%C3%BCbersicht',
          },
          {
            title: 'Hilfe',
            url: '/community/88059/hilfe',
          },
          {
            title: 'Aktivitäten auf der Seite',
            url: '/event/history',
          },
        ],
      },
    ],
  },
]

export const footerData: InstanceData['footerData'] = {
  footerNavigation: [
    {
      title: 'Allgemein',
      children: [
        { title: 'Über Serlo', url: '/serlo' },
        { title: 'Kontakt', url: '/kontakt' },
        {
          title: 'Other Languages',
          url: `https://en.${serloDomain}/global`,
        },
      ],
    },
    {
      title: 'Dabei sein',
      children: [
        {
          title: 'Newsletter',
          url: 'https://serlo.us7.list-manage.com/subscribe?u=23f4b04bf70ea485a766e532d&amp;id=a7bb2bbc4f',
          icon: FooterIcon.newsletter,
        },
        {
          title: 'Jobs',
          url: `https://de.${serloDomain}/jobs`,
          icon: FooterIcon.job,
        },
        {
          title: 'GitHub',
          url: 'https://github.com/serlo',
          icon: FooterIcon.github,
        },
        { title: 'Community', url: '/community' },
      ],
    },
    {
      title: 'Products',
      children: [
        {
          title: 'Serlo Editor',
          url: `https://en.${serloDomain}/editor`,
        },
        {
          title: 'Metadata API',
          url: 'https://en.serlo.org/metadata',
        },
        {
          title: 'iFrame API',
          url: 'https://github.com/serlo/documentation/wiki/iframe-API',
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
        { title: 'Impressum', url: `https://de.${serloDomain}/legal` },
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
    rootId: 5,
    rootName: 'Mathematik',
    landingUrl: '/mathe',
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
    rootId: 47899,
    landingUrl: '/informatik',
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
    rootId: 41107,
    landingUrl: '/physik',
    entries: [
      { title: 'Themen', id: 41107 },
      { title: 'Lehrplan', id: 50540 },
      { title: 'Bei Serlo-Physik mitarbeiten', id: 253504 },
    ],
  },
  {
    // subject: 'lerntipps',
    rootId: 181883,
    landingUrl: '/lerntipps',
    entries: [
      { title: 'Alle Themen', id: 181883 },
      { title: 'Bei Serlo-Lerntipps mitarbeiten', id: 242472 },
    ],
  },
  {
    // subject: 'chemie',
    rootId: 18230,
    landingUrl: '/chemie',
    entries: [
      { title: 'Themen', id: 18230 },
      { title: 'Bei Serlo-Chemie mitarbeiten', id: 26633 },
    ],
  },
  {
    // subject: 'nachhaltigkeit',
    rootId: 17744,
    rootName: 'Angewandte Nachhaltigkeit',
    landingUrl: '/nachhaltigkeit',
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
    rootId: 23362,
    landingUrl: '/biologie',
    entries: [
      { title: 'Themen', id: 23362 },
      { title: 'Bei Serlo-Biologie mitarbeiten', id: 25017 },
    ],
  },
  {
    // subject: 'englisch',
    rootId: 25979,
    landingUrl: '/englisch',
    entries: [{ title: 'Themen', id: 25979 }],
  },
  {
    // subject: 'politik',
    rootId: 79159,
    landingUrl: '/politik',
    entries: [{ title: 'Alle Themen', id: 79159 }],
  },
  {
    // community
    rootId: 87993,
    landingUrl: '/community',
    entries: [
      { title: 'Community', id: 19882 },
      { title: 'Hilfeseiten', id: 88059 },
      { title: 'Werte und Entscheidungen', id: 181028 },
      { title: 'Testbereich', id: 106082 },
      { title: 'Ressourcen für PädagogInnen', id: 88061 },
      { title: 'Veranstaltungen für AutorInnen', id: 145470 },
      { title: 'Alle Aktivitäten auf serlo.org', url: '/event/history' },
      { title: 'Übersicht aller Kommentare', url: '/discussions' },
      { title: 'Ungeprüfte Bearbeitungen', url: '/entity/unrevised' },
      { title: 'Community Übersicht', id: 87993 },
    ],
  },
  {
    // special area for chancenwerk
    rootId: 268835,
    landingUrl: '/mathe/268835/chancenwerk',
    entries: [
      {
        title: 'Chancenwerk auf Serlo',
        url: '/mathe/268835/chancenwerk',
        id: 268835,
      },
      {
        title: 'Ungeprüfte Bearbeitungen',
        url: '/entity/unrevised#chancenwerk',
      },
      {
        title: 'Zum Chancencampus',
        url: 'https://www.chancencampus.org/authentication/login',
      },
      { title: 'Serlo Mathematik', url: '/mathe' },
    ],
  },
  {
    entries: [
      { title: 'Über Serlo', id: 18922 },
      { title: 'Pädagogisches Konzept', id: 21423 },
      { title: 'So funktioniert die Lernplattform', id: 81862 },
      { title: 'Team', id: 21439 },
      { title: 'Jobs', id: 21563 },
      { title: 'Partner & Förderer', id: 21456 },
      { title: 'Wirkung', id: 21406 },
      { title: 'Transparenz', id: 21468 },
      { title: 'Die Geschichte von Serlo', id: 21413 },
      { title: 'Kontakt & Standorte', id: 21657 },
    ],
  },
]
