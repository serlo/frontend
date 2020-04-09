import React from 'react'
import dynamic from 'next/dynamic'

const Math = dynamic(() => import('../src/components/content/Math'))

export default function Test() {
  const [click, setClick] = React.useState(false)
  return (
    <>
      <button onClick={() => setClick(true)}>Lade Mathe</button>
      {click && <Math formula="a^2 + b^2 = c^2" />}
    </>
  )
}
