import { AnchorProps } from '.'
import { styled } from '../../ui'

const Anchor = styled.a({
  visibility: 'hidden',
})

export function AnchorRenderer(props: AnchorProps) {
  return <Anchor id={props.state.value} />
}
