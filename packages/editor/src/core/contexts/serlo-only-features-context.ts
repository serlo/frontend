import type { ArticleProps } from '@editor/plugins/article'
import { createContext } from 'react'

export interface ArticleAddModalProps {
  open: boolean
  data: ArticleProps['state']
  setModalOpen: (open: boolean) => void
}

interface SerloOnlyFeaturesData {
  isRevisionView?: boolean
  licenses?: {
    id: number
    title: string
  }[]
  ArticleAddModal?: (props: ArticleAddModalProps) => JSX.Element
}

/**
 * Some features of the editor are only enabled on serlo.org.
 * This file provides types relating to these features, and a
 * React Context that handles data & components relating to these features.
 */
export const SerloOnlyFeaturesContext = createContext<SerloOnlyFeaturesData>({})
