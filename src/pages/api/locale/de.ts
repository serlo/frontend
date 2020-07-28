import { NextApiRequest, NextApiResponse } from 'next'

import { LoggedInData } from '@/data-types'

const loggedInData: LoggedInData = {
  authMenu: [
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
        { url: '/user/public', title: 'Öffentliches Profil' },
        {
          url: '/user/settings',
          title: 'Profil bearbeiten',
        },
        {
          url: '/auth/password/change',
          title: 'Passwort aktualisieren',
        },
        {
          url: '/event/history/user/me',
          title: 'Meine Aktivitäten',
        },
        {
          url: '/api/auth/logout',
          title: 'Ausloggen',
        },
      ],
    },
  ],
  strings: {
    tools: 'Weitere Tools',
  },
}

// need this to bypass CORS and cache responses
export default function de(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.json(loggedInData)
}
