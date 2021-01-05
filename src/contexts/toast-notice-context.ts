import React from 'react'
import { notify } from 'react-notify-toast'

import { theme } from '@/theme'

export const ToastNoticeContext = React.createContext<typeof notify | null>(
  null
)

export const ToastNoticeProvider = ToastNoticeContext.Provider

export function useToastNotice() {
  const toastNotice = React.useContext(ToastNoticeContext)

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

  return (message: string, type?: 'default' | 'success' | 'warning') => {
    if (!toastNotice) return
    ;((toastNotice as unknown) as typeof notify['show'])(
      message,
      'custom',
      3000,
      colors[type || 'default']
    )
  }
}
