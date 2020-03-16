import styled from 'styled-components'
import Math from '../src/math'

function HelloWorld() {
  return (
    <>
      <Paragraph>
        This changed the world:{' '}
        <Math formula={'c = \\pm\\sqrt{a^2 + b^2}'} inline />.
      </Paragraph>
      <Paragraph>This too:</Paragraph>
      <CenteredParagraph>
        <Math formula={'E = mc^2'} />
      </CenteredParagraph>
    </>
  )
}

const Paragraph = styled.p`
  margin: 20px;
  font-size: 18px;
`

const CenteredParagraph = styled.p`
  text-align: center;
  font-size: 18px;
`

export default HelloWorld
