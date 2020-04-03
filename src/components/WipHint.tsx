import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTools } from '@fortawesome/free-solid-svg-icons'

interface WipHintProps {
  part: string
}

export default function WipHint(props: WipHintProps) {
  const { part } = props
  return (
    <Hint>
      <FontAwesomeIcon icon={faTools} />
      <HintText>
        <b>{part}</b>: Dieser Teil der Website befindet sich noch im Aufbau.
      </HintText>
    </Hint>
  )
}

const Hint = styled.div`
  margin: 15px;
  background-color: #ffee7d;
  display: flex;
  align-items: center;
  padding: 10px;
`

const HintText = styled.p`
  margin: 0 10px;
`
