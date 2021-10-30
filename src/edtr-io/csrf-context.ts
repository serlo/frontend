import React from 'react'

export const CsrfContext = React.createContext<() => string>(() => '')
