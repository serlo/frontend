import Create from '../src/create/create'
import React from 'react'

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
  return <Create value={value} onChange={val => setValue(val)} />
}

export default CreateDemo
