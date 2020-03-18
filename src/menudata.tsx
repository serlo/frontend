import {
  faInfoCircle,
  faUserEdit,
  faGraduationCap,
  faUserCircle,
  faHandHoldingHeart,
  faUserFriends
} from '@fortawesome/free-solid-svg-icons'

export const menudata = [
  { url: '/serlo', title: 'Über Serlo', icon: faInfoCircle },
  {
    url: '#',
    title: 'Fächer',
    icon: faGraduationCap,
    children: [
      { url: '/mathematik', title: 'Mathematik' },
      { url: '/biologie', title: 'Biologie' },
      { url: '/nachhaltigkeit', title: 'Angewandte Nachhaltigkeit' },
      { url: '/informatik', title: 'Informatik' },
      { url: '/chemie', title: 'Chemie' },
      { url: '/physik', title: 'Physik' },
      { url: '/community/neue-fächer-themen', title: 'Fächer im Aufbau' }
    ]
  },
  {
    url: '#',
    title: 'Community',
    icon: faUserFriends,
    children: [
      { url: '/mitmachen', title: 'Mitmachen', icon: faUserEdit },
      { url: '/community', title: 'Startseite für Autor*innen' },
      { url: 'https://community.serlo.org/', title: 'Chat für Autor*innen' },
      {
        url: '/community/veranstaltungen/veranstaltungsübersicht',
        title: 'Veranstaltungen für Autor*innen'
      },
      { url: '#', title: 'Ungeprüfte Bearbeitungen' }
    ]
  },
  { url: '#', title: 'Anmelden', icon: faUserCircle },
  { url: '#', title: 'Spenden', icon: faHandHoldingHeart }
]

export default menudata
