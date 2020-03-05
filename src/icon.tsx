import styled from 'styled-components'

const Icon = props => {
  return <img className={props.className} src={props.src} />
}

export const StyledIcon = styled(Icon)`
  overflow: visible;
  width: 0.625em;
  display: inline-block;
  height: 1em;
  vertical-align: -0.125em;
`
