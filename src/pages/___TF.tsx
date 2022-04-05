import { useState } from 'react'

export default function TF() {
  const [value, setValue] = useState('')

  const match = /import {([^}]+)} from '([^']+)'/g.exec(value)

  const icons = []

  let source = ''

  if (match) {
    const t = match[1]
      .split(',')
      .map((x) => x.trim())
      .filter((x) => x)
    icons.push(...t)
    icons.sort()
    source = match[2]
  }

  return (
    <div className="mt-10 ml-24">
      <textarea
        className="w-96 h-60 border-2 mb-2"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
      <pre>
        {icons.map((i) => `import { ${i} } from '${source}/${i}'`).join('\n')}
      </pre>
    </div>
  )
}
