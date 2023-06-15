import { createContext } from 'react'

import { RegistryPlugin } from '@/serlo-editor/plugins/rows'

export const PluginRegistryContext = createContext<Registry>([])

export type Registry = RegistryPlugin[]
