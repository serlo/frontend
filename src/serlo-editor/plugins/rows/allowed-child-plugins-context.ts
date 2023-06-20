import { createContext } from 'react'

import { EditorPluginType } from '@/serlo-editor/core/editor'

export const AllowedChildPlugins = createContext<
  EditorPluginType[] | undefined
>([])
