import { ReactNode } from 'react'

import type { FrontendContentNode } from '@/frontend-node-types'

export type NodePath = (number | string)[]

export type RenderNestedFunction = (
  value: FrontendContentNode[],
  ...pathPrefix: string[]
) => JSX.Element | null | ReactNode[]

export function renderArticle(
  _value: FrontendContentNode[],
  ..._pathPrefix: string[]
) {
  return null
  // return _renderArticle(value, true, pathPrefix)
}

export function renderNested(
  _value: FrontendContentNode[],
  _previousPath: NodePath,
  _pathPrefix: NodePath
) {
  return null
}

interface RenderLeafProps {
  leaf: FrontendContentNode & {
    color?: 'blue' | 'green' | 'orange'
    em?: boolean
    strong?: boolean
    code?: boolean
  }
  key: number
  children: ReactNode
}

export function renderLeaf(_props: RenderLeafProps) {
  return null
}
