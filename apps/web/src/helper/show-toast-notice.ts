import toast from 'react-hot-toast'

import { colors } from './colors'

const toastClasses = {
  default: '!bg-brand-100',
  warning: '!bg-orange-100 !text-black',
}

export const showToastNotice = function (
  message: string,
  type?: 'default' | 'success' | 'warning',
  time?: number
) {
  if (type === 'success') {
    toast.success(message, {
      duration: time ?? 3200,
      iconTheme: {
        primary: colors.brandGreen,
        secondary: '#fff',
      },
    })
    return
  }
  toast(message, {
    duration: time ?? 3200,
    className: toastClasses[type ?? 'default'],
  })
}
