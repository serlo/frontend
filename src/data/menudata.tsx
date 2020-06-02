import {
  faInfoCircle,
  faUserEdit,
  faGraduationCap,
  faUserCircle,
  faHandHoldingHeart,
  faUserFriends,
} from '@fortawesome/free-solid-svg-icons'

export const menudata = [
  {
    url: '#',
    title: 'Fächer',
    icon: faGraduationCap,
    children: [
      { url: '/mathe', title: 'Mathematik' },
      { url: '/biologie', title: 'Biologie' },
      { url: '/nachhaltigkeit', title: 'Angewandte Nachhaltigkeit' },
      { url: '/informatik', title: 'Informatik' },
      { url: '/chemie', title: 'Chemie' },
      { url: '/physik', title: 'Physik' },
      { url: '/community/neue-fächer-themen', title: 'Fächer im Aufbau' },
    ],
  },
  { url: '/serlo', title: 'Über Serlo', icon: faInfoCircle },
  { url: '/mitmachen', title: 'Mitmachen', icon: faUserEdit },
  {
    url: '#',
    title: 'Community',
    icon: faUserFriends,
    children: [
      { url: '/community', title: 'Startseite für Autor*innen' },
      { url: 'https://community.serlo.org/', title: 'Chat für Autor*innen' },
      {
        url: '/community/veranstaltungen/veranstaltungsübersicht',
        title: 'Veranstaltungen für Autor*innen',
      },
      { url: '/entity/unrevised', title: 'Ungeprüfte Bearbeitungen' },
    ],
  },
  { url: '/spenden', title: 'Spenden', icon: faHandHoldingHeart },
  { url: '/auth/login', title: 'Anmelden', icon: faUserCircle },
]

export default menudata
