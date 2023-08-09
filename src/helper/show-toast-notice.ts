import { notify } from 'react-notify-toast'

import { colors, articleColors } from '@/helper/colors'

const toastNotice = notify.createShowQueue()
const toastColors = {
  default: {
    background: colors.brand,
    text: '#fff',
  },
  success: {
    background: colors.brandGreen,
    text: '#fff',
  },
  warning: {
    background: articleColors.orange,
    text: '#000',
  },
}

export const showToastNotice = function (
  message: string,
  type?: 'default' | 'success' | 'warning',
  time?: number
) {
  if (!toastNotice) return
  ;(toastNotice as unknown as (typeof notify)['show'])(
    message,
    'custom',
    time ?? 3200,
    toastColors[type || 'default']
  )
}
