import Create from '../src/create/create'
import React from 'react'
import HSpace from '../src/components/content/HSpace'
import styled from 'styled-components'
import absoluteUrl from 'next-absolute-url'

function CreateDemo(props) {
  const [value, setValue] = React.useState(() =>
    props.value
      ? props.value
      : [
          {
            type: 'h',
            level: 1,
            children: [{ text: 'Titel' }]
          },
          { type: 'p', children: [{ text: 'Schreibe etwas ...' }] },
          { type: 'p', children: [{ text: '' }] }
        ]
  )
  const [log, setLog] = React.useState([])
  //
  return (
    <>
      <div
        style={{ maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}
      >
        <Create
          value={value}
          onChange={val => setValue(val)}
          onNormalize={msg => {
            setLog(log => [msg, ...log])
          }}
        />
        <HSpace amount={40} />
      </div>
      <code>
        <pre style={{ overflow: 'auto' }}>{JSON.stringify(value)}</pre>
      </code>
      <Log>
        {log.map((entry, i) => (
          <p key={entry + '_' + i}>{entry}</p>
        ))}
      </Log>
    </>
  )
}

const Log = styled.div`
  height: 300px;
  overflow: auto;
  border: 1px solid black;
  box-sizing: border-box;
  padding: 15px;
  margin: 10px;
`

export async function getServerSideProps(props) {
  if (props.query.id) {
    const { origin } = absoluteUrl(props.req)
    const res = await fetch(
      `${origin}/api/${encodeURIComponent(props.query.id)}`
    )
    const data = await res.json()
    const value = [
      {
        type: 'h',
        level: 1,
        children: [{ text: data.data.title }]
      },
      ...data.data.value.children
    ]
    return { props: { value } }
  } else {
    return { props: {} }
  }
}

export default CreateDemo
