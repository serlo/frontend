import type { RootWithOptionalsProps } from '.'
import { RootWithOptionalsRenderer } from './renderer'

export function RootWithOptionalsEditor({ state }: RootWithOptionalsProps) {
  return <RootWithOptionalsRenderer content={state.content.render()} />
}
