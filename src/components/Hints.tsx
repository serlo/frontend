import styled from 'styled-components'
import { lighten } from 'polished'

interface HintsProps {
  hints: string[]
}

export default function Hints(props: HintsProps) {
  const { hints } = props
  return hints.length > 0 ? (
    <>
      {hints.map((hint, index) => (
        <HintBlock key={index}>{hint}</HintBlock>
      ))}
    </>
  ) : null
}

const HintBlock = styled.div`
  font-size: 1rem;
  background-color: ${lighten('0.4', 'yellow')};
  padding: 2px;
  margin-bottom: 5px;
  margin-left: 15px;
  margin-right: 15px;
`
