import { notify } from 'react-notify-toast'

import { theme } from '@/theme'

const toastNotice = notify.createShowQueue()
const colors = {
  default: {
    background: theme.colors.brand,
    text: '#fff',
  },
  success: {
    background: theme.colors.brandGreen,
    text: '#fff',
  },
  warning: {
    background: theme.colors.orange,
    text: '#000',
  },
}

export const showToastNotice = function (
  message: string,
  type?: 'default' | 'success' | 'warning',
  time?: number
) {
  console.log('ja')
  if (!toastNotice) return
  ;((toastNotice as unknown) as typeof notify['show'])(
    message,
    'custom',
    time ?? 3200,
    colors[type || 'default']
  )
}
