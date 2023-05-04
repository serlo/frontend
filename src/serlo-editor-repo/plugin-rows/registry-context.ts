import * as React from 'react'

import type { RegistryPlugin } from '.'

// TODO: If suggestions don't appear in deployed app, return the default plugins
export const RegistryContext = React.createContext<Registry>([])

export type Registry = RegistryPlugin[]
