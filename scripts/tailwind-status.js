// Use `yarn tailwind:status` in root to run this script.

const fs = require('fs')

const isFileRegex = /\/.+\..+/
const simpleClassNameRegex = /className="([^"]+)"/g
const clsxRegex = /className=\{clsx\(.+?\)\}/gs
const strRegex = /'(.+?)'/g

function walkDir(path) {
  return fs.readdirSync(path).flatMap((dir) => {
    const newPath = `${path}/${dir}`
    return dir.endsWith('.tsx')
      ? [newPath]
      : isFileRegex.test(newPath)
      ? []
      : walkDir(newPath)
  })
}

// run through all files, detect styled components usage and extract classnames

const files = walkDir('./src')

const filesWithStyledComponents = []

const classNameMatches = []

files.forEach((file) => {
  const content = fs.readFileSync(file, 'utf-8')
  if (content.includes("from 'styled-components'")) {
    filesWithStyledComponents.push(file)
  }
  const classNames = []
  for (const m of content.matchAll(clsxRegex)) {
    const cur = []
    for (const str of m[0].matchAll(strRegex)) {
      cur.push(str[1])
    }
    classNames.push({ c: cur.join(' '), clsx: true })
  }
  for (const m of content.matchAll(simpleClassNameRegex)) {
    classNames.push({ c: m[1], simple: true })
  }
  if (classNames.length > 0) {
    classNameMatches.push({ file, classNames })
  }
})

// output

console.log(
  '\n' + filesWithStyledComponents.length + ' files using styled-components:\n'
)
filesWithStyledComponents.forEach((file) => console.log(`  ${file.substr(6)}`))

console.log('\nExtracted class names:\n')
classNameMatches.forEach(({ file, classNames }) => {
  console.log(`  ${file.substr(6)}`)
  classNames.forEach((cn) => {
    console.log(`    ${cn.clsx ? '=' : '-'}`, [cn.c])
  })
  console.log()
})
