import {
  faInfoCircle,
  faUserEdit,
  faGraduationCap,
  faUserCircle,
  faHandHoldingHeart,
  faUserFriends,
} from '@fortawesome/free-solid-svg-icons'

import { AuthPayload } from '@/auth/use-auth'

export function getMenuData(auth: AuthPayload) {
  return [
    {
      url: '#',
      title: 'Fächer',
      icon: faGraduationCap,
      children: [
        { url: '/mathe', title: 'Mathematik', clientside: true },
        { url: '/biologie', title: 'Biologie', clientside: true },
        {
          url: '/nachhaltigkeit',
          title: 'Angewandte Nachhaltigkeit',
          clientside: true,
        },
        { url: '/informatik', title: 'Informatik', clientside: true },
        { url: '/chemie', title: 'Chemie', clientside: true },
        { url: '/physik', title: 'Physik', clientside: true },
        {
          url: '/community/neue-fächer-themen',
          title: 'Fächer im Aufbau',
          clientside: true,
        },
      ],
    },
    {
      url: '/serlo',
      title: 'Über Serlo',
      icon: faInfoCircle,
      clientside: true,
    },
    {
      url: '/mitmachen',
      title: 'Mitmachen',
      icon: faUserEdit,
      clientside: true,
    },
    {
      url: '#',
      title: 'Community',
      icon: faUserFriends,
      children: [
        {
          url: '/community',
          title: 'Startseite für Autor*innen',
          clientside: true,
        },
        { url: 'https://community.serlo.org/', title: 'Chat für Autor*innen' },
        {
          url: '/community/veranstaltungen/veranstaltungsübersicht',
          title: 'Veranstaltungen für Autor*innen',
          clientside: true,
        },
        { url: '/entity/unrevised', title: 'Ungeprüfte Bearbeitungen' },
      ],
    },
    { url: '/spenden', title: 'Spenden', icon: faHandHoldingHeart },
    auth
      ? { url: '/api/auth/logout', title: 'Abmelden', icon: faUserCircle }
      : { url: '/api/auth/login', title: 'Anmelden', icon: faUserCircle },
  ]
}
