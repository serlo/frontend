import type { GenericContentTypePluginProps } from '.'
import { GenericContentTypeRenderer } from './renderer'

export function GenericContentTypeEditor({ state }: GenericContentTypePluginProps) {
  return <GenericContentTypeRenderer content={state.content.render()} />
}
