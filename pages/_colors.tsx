import styled from 'styled-components'
import { theme } from '../src/theme'
import { getLuminance } from 'polished'

export default function ColorOverview() {
  return (
    <Wrapper>
      {Object.entries(theme.colors).map(([colorName, colorValue]) => {
        //console.log(getLuminance(colorValue))
        return (
          <ColorSquare key={colorName} color={colorValue}>
            <span>{colorName}</span>
            <p>{colorValue}</p>
          </ColorSquare>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  border: 2px solid white;
`

const ColorSquare = styled.div<{ color: string }>`
  height: 16.4vw;
  width: 16.4vw;
  background-color: ${props => props.color};
  border: 2px solid white;
  box-sizing: border-box;
  padding: 1rem;
  color: ${props => (getLuminance(props.color) > 0.5 ? '#000' : '#fff')};
  span {
    display: block;
  }
`
