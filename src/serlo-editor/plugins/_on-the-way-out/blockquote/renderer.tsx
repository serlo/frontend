import { BlockquoteProps } from '.'

export function BlockquoteRenderer(props: BlockquoteProps) {
  return (
    <blockquote className="serlo-blockquote">{props.state.render()}</blockquote>
  )
}
