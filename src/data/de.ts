import { serloDomain } from '../helper/serlo-domain'
import { InstanceData } from '@/data-types'

export const deInstanceData: InstanceData = {
  lang: 'de',
  headerData: [
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
  ],
  footerData: {
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
  },
  strings: {
    header: {
      slogan: 'Die freie Lernplattform',
      search: 'Suche',
      login: 'Anmelden',
      title: 'lernen mit Serlo!',
    },
    footer: {
      summaryHeading: 'Serlo.org ist die Wikipedia fürs Lernen',
      summaryText:
        'Wir sind eine engagierte Gemeinschaft, die daran arbeitet, hochwertige Bildung weltweit frei verfügbar zu machen.',
      learnMore: 'Mehr Erfahren',
      participate: 'Mitmachen',
      donate: 'Spenden',
      toTop: 'Nach oben',
    },
    categories: {
      article: 'Artikel',
      course: 'Kurs',
      video: 'Video',
      applet: 'Applet',
      folder: 'Bereich',
      exercises: 'Aufgaben',
    },
    share: {
      button: 'Teilen',
      title: 'Weitergeben!',
      copyLink: 'Link kopieren',
      copySuccess: 'In Zwischenablage kopiert! ',
      close: 'Schließen',
    },
    edit: {
      button: 'Inhalt überarbeiten',
    },
    license: {
      readMore: 'Was bedeutet das?',
    },
    course: {
      showPages: 'Kursübersicht anzeigen',
      pages: 'Kursübersicht',
      next: 'Weiter',
    },
    taxonomy: {
      topicFolder: 'Aufgabensammlung',
    },
    content: {
      show: 'anzeigen',
      hide: 'ausblenden',
      prerequisite: 'Für diese Aufgabe benötigst Du folgendes Grundwissen:',
      solution: 'Lösung',
      exerciseGroup: 'Aufgabengruppe',
      right: 'Richtig',
      wrong: 'Falsch',
      check: "Stimmt's?",
      yourAnswer: 'Deine Antwort…',
      chooseOption: 'Klicke auf eine der Optionen',
    },
    cookie: {
      part1: 'Mit der Nutzung dieser Webseite erklärst du dich mit unserer',
      part2: 'und',
      part3: 'einverstanden.',
      link1: 'Datenschutzerklärung',
      link2: 'Nutzungsbedingungen',
      button: 'Verstanden',
    },
  },
}
