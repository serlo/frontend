import { ReactNode } from 'react'

import { isPrintMode } from '../print-mode'
import { SpoilerRenderer } from '@/serlo-editor/plugins/spoiler/renderer'

export interface SpoilerProps {
  body: ReactNode
  title: ReactNode
}

// after db migration of legacy stuff:
// replace FrontendSpoilerContainerNode FrontendSpoilerTitleNode FrontendSpoilerBodyNode with FrontendSpoilerNode

export function Spoiler({ body, title }: SpoilerProps) {
  return (
    <SpoilerRenderer
      title={<>{title}</>}
      content={<>{body}</>}
      openOverwrite={isPrintMode ? true : undefined}
    />
  )
}
