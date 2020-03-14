import { fetchContent } from '../../src/fetchcontent'
import Main from '../../src/main'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTools } from '@fortawesome/free-solid-svg-icons'

function Content(props) {
  const { error, data } = props
  if (error) {
    return (
      <Ups>
        <FontAwesomeIcon icon={faTools} size="2x" />

        <p>Dieser Inhaltstyp wird noch nicht unterstützt.</p>
        <p>
          <button onClick={() => window.history.back()}>Zurück</button>
        </p>
      </Ups>
    )
  } else {
    return <Main data={data} />
  }
}

const Ups = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  text-align: center;
  margin-top: 50px;
  font-size: 28px;
`

Content.getInitialProps = async ({ query }) => {
  return await fetchContent(query.id)
}

export default Content
