import Create from '../src/create/create'
import React from 'react'
import { HSpace } from '../src/components/content/HSpace'

function CreateDemo() {
  const [value, setValue] = React.useState([
    {
      type: 'h',
      level: 1,
      children: [{ text: 'Titel' }]
    },
    { type: 'p', children: [{ text: 'Schreibe etwas ...' }] },
    { type: 'p', children: [{ text: '' }] }
  ])
  return (
    <>
      <Create value={value} onChange={val => setValue(val)} />
      <HSpace amount={40} />
      <code>
        <pre style={{ overflow: 'auto' }}>{JSON.stringify(value)}</pre>
      </code>
    </>
  )
}

export default CreateDemo
