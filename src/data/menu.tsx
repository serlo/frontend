import { HeaderData } from '@/data-types'

export function getMenuData(): HeaderData {
  return [
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
  ]
}

export const authMenuData: HeaderData = [
  {
    url: '/user/notifications',
    title: 'Benachrichtigungen',
    icon: 'notifications',
  },
  {
    url: '',
    title: 'Benutzer',
    icon: 'user',
    children: [
      { url: '/user/profile', title: 'Öffentliches Profil' },
      { url: '/user/profile', title: 'Profil bearbeiten' },
      { url: '/user/profile', title: 'Passwort aktualisieren' },
      { url: '/user/profile', title: 'Meine Aktivitäten' },
      {
        url: '/api/auth/logout',
        title: 'Ausloggen',
      },
    ],
  },
]

export const noAuthMenuData: HeaderData = [
  {
    url: '/api/auth/login',
    title: 'Anmelden',
    icon: 'login',
  },
]
