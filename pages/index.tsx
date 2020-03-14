import styled from 'styled-components'
import React from 'react'

function Index() {
  const serloId = React.useRef()
  return (
    <Container>
      <h1>Serlo.org Frontend</h1>
      <hr />
      <h2>Ein paar Beispielseiten:</h2>
      <p>
        <a href="/content/72788">Aufgabenstellung</a>
      </p>
      <p>
        <a href="/content/72793">Lösung</a>
      </p>
      <p>
        <a href="/content/72232">Aufgabengruppe</a>
      </p>
      <p>
        <a href="/content/1495">Artikel (neuer Editor)</a>
      </p>
      <p>
        <a href="/content/1627">Artikel (alter Editor)</a>
      </p>
      <p>
        <a href="/content/107911">Video</a>
      </p>
      <p>
        <a href="/content/112238">Applet</a>
      </p>
      <p>
        <a href="/content/72843">Auswahlaufgabe</a>
      </p>
      <form
        onSubmit={e => {
          const node: any = serloId.current
          if (node) {
            window.location.href = '/content/' + node.value
          }
          e.preventDefault()
        }}
      >
        <label>
          Serlo-ID: <input type="input" ref={serloId}></input>
        </label>
        <input type="submit" value="Aufrufen"></input>
      </form>
    </Container>
  )
}

const Container = styled.div`
  margin-top: 200px;
  text-align: center;
`

export default Index
