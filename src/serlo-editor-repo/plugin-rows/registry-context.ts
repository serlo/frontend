import { createContext } from 'react'

import type { RegistryPlugin } from '.'

export const RegistryContext = createContext<Registry>([])

export type Registry = RegistryPlugin[]
