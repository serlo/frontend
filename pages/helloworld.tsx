import React from 'react'
import styled from 'styled-components'

function HelloWorld() {
  return <ClickMeTitle title="Welcome to the frontend!" />
}

function ClickMeTitle(props) {
  const { title } = props
  const [clicked, setClicked] = React.useState(false)
  return (
    <BigParagraph onClick={() => setClicked(!clicked)}>
      {title + (clicked ? ' :)' : '')}
    </BigParagraph>
  )
}

const BigParagraph = styled.p`
  text-align: center;
  font-size: 3em;
  color: lightgreen;
`

export default HelloWorld
