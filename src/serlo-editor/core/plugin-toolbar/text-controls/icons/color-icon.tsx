import styled from 'styled-components'

export const ColorIcon = styled.div<{ color: string }>(({ color }) => ({
  display: 'inline-block',
  backgroundColor: color,
  borderRadius: ' 100%',
  width: '19px',
  height: '19px',
  margin: '3px',
  verticalAlign: 'middle',
}))
