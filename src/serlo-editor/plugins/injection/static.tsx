import { InjectionRenderer } from './renderer'
import { renderNested } from '@/schema/article-renderer'
import { EditorInjectionPlugin } from '@/serlo-editor-integration/types/editor-plugins'

// TODO: not working

export function InjectionStaticRenderer({
  state: injectionHref,
}: EditorInjectionPlugin) {
  if (!injectionHref) return null
  return (
    <InjectionRenderer
      href={injectionHref}
      renderNested={(value, ...prefix) => renderNested(value, [], prefix)}
    />
  )
}
