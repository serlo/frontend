// Use `yarn tailwind:status` in root to run this script.

const fs = require('fs')

const knownExceptions = [
  'gcse-searchbox-only',
  'formula',
  'superspecial-abc',
  'superspecial-bio',
  'superspecial-new',
  'superspecial-blank',
  'superspecial-chem',
  'superspecial-math',
  'superspecial-noscript-hidden',
  'superspecial-sus',
  'superspecial-informatics',
  'special-no-page-breaks-inside',
]

const isFileRegex = /\/.+\..+/
const simpleClassNameRegex = /className="([^"]+)"/g
const clsxRegex = /className={clsx\(.+?\)}/gs
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

// process classnames -> check availability and variants

const classes = {}

const variants = {}

classNameMatches.forEach(({ classNames }) => {
  classNames.forEach((cn) =>
    cn.c.split(' ').forEach((c) => {
      if (c) {
        classes[c] = true
        while (c.includes(':')) {
          const index = c.indexOf(':')
          const variant = c.substr(0, index)
          variants[variant] = true
          c = c.substr(index + 1)
        }
      }
    })
  )
})

const classList = Object.keys(classes)
classList.sort()

const variantList = Object.keys(variants)
variantList.sort()

if (fs.existsSync('./.next/BUILD_ID')) {
  console.log(
    '\nClass name validation. Please make sure the build is up-to-date'
  )
  const files = fs
    .readdirSync('./.next/static/css')
    .filter((entry) => entry.endsWith('.css'))

  const css = fs.readFileSync(`./.next/static/css/${files[0]}`, 'utf8')

  const invalidClasses = []

  const unknownClasses = classList.filter((c) => {
    const cFiltered = c.replace(/[^a-z-0-9\/.:]/g, '')
    if (c !== cFiltered) {
      invalidClasses.push(c)
      return false
    } else {
      const escaped = cFiltered
        .replace(/\./g, '\\\\\\.')
        .replace(/\//g, '\\\\\\/')
        .replace(/:/g, '\\\\\\:')
      const regexStr = `\\.${escaped}(?![a-z-0-9\\\\])`
      return !new RegExp(regexStr, 'g').test(css)
    }
  })

  if (invalidClasses.length > 0) {
    console.log('\nInvalid class names:', invalidClasses.join(', '))
  }

  if (unknownClasses.length > 0) {
    console.log(
      '\nClass names not found in style sheet:\n ',
      unknownClasses
        .map((cls) =>
          knownExceptions.includes(cls) ? `${cls} (known exception)` : cls
        )
        .join('\n  ')
    )
  }

  const unkownClassNames = unknownClasses.filter(
    (cls) => !knownExceptions.includes(cls)
  )
  if (unknownClasses.some((cls) => !knownExceptions.includes(cls))) {
    throw new Error(`Unknown class name! ${unkownClassNames}`)
  }
} else {
  console.log('\nNo build found, skipping class name validation\n')
  console.log('\nClasses in use:\n', classList.join(', '))
}

console.log('\nVariants in use:', variantList.join(', '))

// output

/*console.log('\nExtracted class names:\n')
classNameMatches.forEach(({ file, classNames }) => {
  console.log(`  ${file.substr(6)}`)
  classNames.forEach((cn) => {
    console.log(`    ${cn.clsx ? '=' : '-'}`, [cn.c])
  })
  console.log()
})*/

console.log(
  '\n' + filesWithStyledComponents.length + ' files using styled-components:\n'
)
filesWithStyledComponents.forEach((file) => console.log(`  ${file.substr(6)}`))
