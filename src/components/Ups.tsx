import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTools } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

function Ups(props) {
  const { type } = props
  return (
    <UpsDiv>
      <FontAwesomeIcon icon={faTools} size="2x" />
      <p>{type}:</p>
      <p>Dieser Inhaltstyp wird noch nicht unterstützt.</p>
      <p>
        <button onClick={() => window.history.back()}>Zurück</button>
      </p>
    </UpsDiv>
  )
}

const UpsDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  text-align: center;
  margin-top: 50px;
  margin-left: 15px;
  margin-right: 15px;
  font-size: 24px;
`
export default Ups
