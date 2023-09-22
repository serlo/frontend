import { editorRenderers } from '../plugin/helpers/editor-renderer'
import {
  SupportedEditorPlugin,
  UnknownEditorPlugin,
} from '@/serlo-editor-integration/types/editor-plugins'

// StaticRenderer expects serialzied plugin states and renders them
// compared to editor this renderer should have a small bundle size and
// be performance should be quite good

export type AnyEditorPlugin = SupportedEditorPlugin | UnknownEditorPlugin
interface StaticRendererProps {
  state: AnyEditorPlugin | AnyEditorPlugin[]
}

export function StaticRenderer({
  state,
}: StaticRendererProps): JSX.Element | null {
  if (!state) return null

  if (Array.isArray(state)) {
    return (
      <>
        {state.map((item) => (
          <StaticRenderer key={item.id} state={item} />
        ))}
      </>
    )
  }

  const Renderer = editorRenderers.getByType(state.plugin)

  // only while developing
  if (!Renderer)
    return (
      <div className="mx-side my-block pl-[14px]">
        <mark>{state.plugin}</mark>
      </div>
    )

  return <Renderer {...state} />
}
