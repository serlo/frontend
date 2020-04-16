import React from 'react'
import styled from 'styled-components'
import absoluteUrl from 'next-absolute-url'
import { createEditor, Editor } from 'slate'

import Create from '../src/create/Create'
import HSpace from '../src/components/content/HSpace'
import Hints from '../src/components/Hints'

import { withArticle } from '../src/schema/articleNormalizer'
import { checkArticleGuidelines } from '../src/schema/articleGuidelines'

const initialValue = [
  {
    type: 'h',
    level: 1,
    children: [{ text: 'Titel' }]
  },
  { type: 'p', children: [{ text: 'Schreibe etwas ...' }] },
  { type: 'p', children: [{ text: '' }] }
]

function CreateDemo(props) {
  // load initial value
  const [value, setValue] = React.useState(() =>
    props.value ? props.value : initialValue
  )

  // log normalize actions
  const [log, setLog] = React.useState([])

  function addLogMsg(msg) {
    setLog(log => [...log, msg])
  }

  // show hints
  const [hints, setHints] = React.useState(() => checkArticleGuidelines(value))

  // normalize value on startup
  React.useEffect(() => {
    const editor = withArticle(createEditor(), addLogMsg)
    editor.children = value
    Editor.normalize(editor, { force: true })
    setValue(editor.children)
  }, [])

  return (
    <Container>
      <Create
        value={value}
        onChange={val => {
          setValue(val)
          setHints(checkArticleGuidelines(val))
        }}
        onNormalize={addLogMsg}
      />
      <HSpace amount={20} />
      <Hints hints={hints} />
      <Log>
        {log.map((entry, i) => (
          <div key={entry + '_' + i}>{entry}</div>
        ))}
      </Log>
      <code>
        <StyledPre>{JSON.stringify(value)}</StyledPre>
      </code>
      <HSpace amount={40} />
    </Container>
  )
}

export async function getServerSideProps({ query, req }) {
  const { id } = query
  if (id) {
    const { origin } = absoluteUrl(req)
    const res = await fetch(`${origin}/api/${encodeURIComponent(id)}`)
    const data = await res.json()
    return {
      props: {
        value: [
          {
            type: 'h',
            level: 1,
            children: [{ text: data.data.title }]
          },
          ...data.data.value.children
        ]
      }
    }
  }
  return { props: {} }
}

const Container = styled.div`
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`

const Log = styled.div`
  height: 300px;
  overflow: auto;
  border: 1px solid black;
  box-sizing: border-box;
  padding: 3px;
  margin: 10px;
`

const StyledPre = styled.div`
  word-wrap: break-word;
  white-space: pre-wrap;
  margin: 10px;
`
export default CreateDemo
