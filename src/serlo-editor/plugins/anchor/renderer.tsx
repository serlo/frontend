import type { AnchorProps } from '.'

export function AnchorRenderer(props: AnchorProps) {
  return <a className="invisible" id={props.state.value} />
}
