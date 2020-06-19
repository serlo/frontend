import React from 'react'

interface Toast {
  type?: 'success' | 'warning' | 'notice' | 'error'
  text: string
}
export type ToastContextValue = Toast[]
// [
// ,
// React.Dispatch<React.SetStateAction<never[]>>
// ]

export const ToastContext = React.createContext<ToastContextValue>([])
export const ToastProvider = ToastContext.Provider
