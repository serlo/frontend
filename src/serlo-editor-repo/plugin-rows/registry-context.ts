import { createContext } from 'react'

import type { RegistryPlugin } from '.'

// TODO: If suggestions don't appear in deployed app, return the default plugins
export const RegistryContext = createContext<Registry>([])

export type Registry = RegistryPlugin[]
