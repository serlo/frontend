import { ArticleProps } from '@editor/plugins/article'
import { createContext } from 'react'

// duplicated
interface LicenseData {
  id: number
  title: string
  url: string
  isDefault?: boolean
  shortTitle?: string
  agreement: string
}

export interface ArticleAddModalProps {
  open: boolean
  data: ArticleProps['state']
  setModalOpen: (open: boolean) => void
}

interface SerloExtraData {
  isSerlo?: boolean
  licenses?: LicenseData[]
  ArticleAddModal?: (props: ArticleAddModalProps) => JSX.Element
}

/** used to enable features only in a serlo context and not e.g. on edusharing */
export const SerloExtraContext = createContext<SerloExtraData>({})
