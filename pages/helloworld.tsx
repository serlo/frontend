import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCandyCane } from '@fortawesome/free-solid-svg-icons'
import { lighten } from 'polished'

function HelloWorld() {
  const [lighter, setLighter] = React.useState(0)
  return (
    <>
      <p>Click it:</p>
      <BigIcon lighter={lighter} onClick={() => setLighter(lighter + 0.01)}>
        <FontAwesomeIcon icon={faCandyCane} size="1x" />
      </BigIcon>
    </>
  )
}

const BigIcon = styled.div<{ lighter: number }>`
  text-align: center;
  font-size: 3rem;
  color: ${props => lighten(props.lighter, 'pink')};
  margin: 30px;
`

export default HelloWorld
