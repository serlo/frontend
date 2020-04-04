import 'regenerator-runtime/runtime'
import { Editor } from '../external/edtr-io/editor'
import styled from 'styled-components'

export default function EdtrIo() {
  return (
    <Container>
      <Editor initialState={{ plugin: 'rows' }} />
    </Container>
  )
}

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  padding: 30px;
  max-width: 800px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
`
