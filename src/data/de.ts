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
  },
}
