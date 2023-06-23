import {
  HighlightRenderer,
  HighlightRendererProps,
} from '@/serlo-editor/plugins/highlight/renderer'

export type CodeProps = HighlightRendererProps

export function Code(props: HighlightRendererProps) {
  return (
    <div className="mx-side">
      <HighlightRenderer {...props} />
    </div>
  )
}
