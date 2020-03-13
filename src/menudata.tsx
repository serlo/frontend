import {
  faInfoCircle,
  faUserEdit,
  faGraduationCap,
  faUserCircle,
  faHandHoldingHeart,
  faUserFriends
} from '@fortawesome/free-solid-svg-icons'

export const menudata = [
  { url: '#', title: 'Über Serlo', icon: faInfoCircle },
  {
    url: '#',
    title: 'Fächer',
    icon: faGraduationCap,
    children: [
      { url: '#', title: 'Mathematik' },
      { url: '#', title: 'Biologie' },
      { url: '#', title: 'Angewandte Nachhaltigkeit' },
      { url: '#', title: 'Informatik' },
      { url: '#', title: 'Chemie' },
      { url: '#', title: 'Physik' },
      { url: '#', title: 'Fächer im Aufbau' }
    ]
  },
  {
    url: '#',
    title: 'Community',
    icon: faUserFriends,
    children: [
      { url: '#', title: 'Mitmachen', icon: faUserEdit },
      { url: '#', title: 'Startseite für Autor*innen' },
      { url: '#', title: 'Chat für Autor*innen' },
      { url: '#', title: 'Veranstaltungen für Autor*innen' },
      { url: '#', title: 'Ungeprüfte Bearbeitungen' }
    ]
  },
  { url: '#', title: 'Anmelden', icon: faUserCircle },
  { url: '#', title: 'Spenden', icon: faHandHoldingHeart }
]

export default menudata
