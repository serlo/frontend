import postcss from 'postcss'
import { useState } from 'react'
import nesting from 'tailwindcss/nesting'

const processor = postcss().use(nesting)

export default function Convert() {
  const [css, setCss] = useState('')
  let output = ''

  try {
    output = processor.process(css).css
  } catch (e) {
    output = e.toString()
  }
  return (
    <div className="ml-4 mt-4">
      Input:
      <br />
      <textarea
        value={css}
        onChange={(e) => {
          setCss(e.target.value)
        }}
        className="w-full"
      ></textarea>
      <div>
        <p>Output:</p>
        <pre>{output}</pre>
      </div>
    </div>
  )
}
