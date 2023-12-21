import {
  isEmptyCustomText,
  isEmptyDescendant,
} from '@serlo/editor/src/plugins/text/utils/static-is-empty'

const text = { text: 'abc123' }
const emptyText = { text: '' }
const math = {
  type: 'math' as const,
  src: 'x=1',
  inline: false,
  children: [{ text: 'x=1' }],
}
const emptyMath = {
  type: 'math' as const,
  src: '',
  inline: false,
  children: [{ text: '' }],
}

describe('text-plugin: isCustomTextEmpty', () => {
  test('empty string', () => {
    const result = isEmptyCustomText(emptyText)
    expect(result).toBe(true)
  })

  test('string "123', () => {
    const result = isEmptyCustomText(text)
    expect(result).toBe(false)
  })

  test('string only spaces', () => {
    const result = isEmptyCustomText({ text: '   ' })
    expect(result).toBe(true)
  })

  test('empty string but other fields', () => {
    const result = isEmptyCustomText({
      text: '',
      strong: true,
      color: 3,
    })
    expect(result).toBe(true)
  })
})

describe('text-plugin: isDescendantEmpty', () => {
  test('empty string', () => {
    const result = isEmptyDescendant(emptyText)
    expect(result).toBe(true)
  })

  test('string "123', () => {
    const result = isEmptyDescendant(text)
    expect(result).toBe(false)
  })

  test('empty paragraph', () => {
    const result = isEmptyDescendant({ type: 'p', children: [emptyText] })
    expect(result).toBe(true)
  })

  test('paragraph with content', () => {
    const result = isEmptyDescendant({ type: 'p', children: [text] })
    expect(result).toBe(false)
  })

  test('paragraph with one empty and one with content child', () => {
    const result = isEmptyDescendant({
      type: 'p',
      children: [emptyText, text],
    })
    expect(result).toBe(false)
  })

  test('paragraph with math', () => {
    const result = isEmptyDescendant({ type: 'p', children: [math] })
    expect(result).toBe(false)
  })

  test('paragraph with empty math', () => {
    const result = isEmptyDescendant({ type: 'p', children: [emptyMath] })
    expect(result).toBe(true)
  })

  test('paragraph with empty math and text', () => {
    const result = isEmptyDescendant({ type: 'p', children: [emptyMath, text] })
    expect(result).toBe(false)
  })

  test('paragraph with empty header', () => {
    const result = isEmptyDescendant({
      type: 'h',
      level: 2,
      children: [emptyText],
    })
    expect(result).toBe(true)
  })
})

// describe('text-plugin: isCustomTextEmpty', () => {
//   test('empty string', () => {
//     const result = isCustomTextEmpty({ text: '' })
//     expect(result).toBe(true)
//   })

//   test('string "123', () => {
//     const result = isCustomTextEmpty({ text: '123' })
//     expect(result).toBe(false)
//   })

//   test('string only spaces', () => {
//     const result = isCustomTextEmpty({ text: '   ' })
//     expect(result).toBe(true)
//   })

//   test('empty string but other fields', () => {
//     const result = isCustomTextEmpty({
//       text: '',
//       strong: true,
//       color: 3,
//     })
//     expect(result).toBe(true)
//   })
// })
