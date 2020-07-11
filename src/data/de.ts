import { footerNavEntries } from './footer'
import { getMenuData } from './menu'
import { InstanceData } from '@/data-types'

export const deInstanceData: InstanceData = {
  lang: 'de',
  headerData: getMenuData(),
  footerData: {
    footerNavigation: footerNavEntries,
    aboutHref: '/serlo',
    participationHref: '/mitmachen',
    donationHref: '/spenden',
  },
  strings: {
    header: {
      slogan: 'Die freie Lernplattform',
      search: 'Suche',
      login: 'Anmelden',
      logout: 'Abmelden',
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
      button: 'Teilen!',
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
  },
}
