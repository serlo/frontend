//@ts-nocheck

import { convert } from '@/schema/convert-edtr-io-state'

describe('returns an empty array when unsupported values are given', () => {
  test('argument is undefined', () => {
    const result = convert(undefined)
    expect(result).toEqual([])
  })

  test('argument is empty object', () => {
    const result = convert({})
    expect(result).toEqual([])
  })

  test('argument is unsupported plugin', () => {
    const result = convert({ plugin: 'woah-nice-plugin', state: [] })
    expect(result).toEqual([])
  })

  test('argument is unsupported text type', () => {
    const result = convert({ type: 'super-bold', children: [] })
    expect(result).toEqual([])
  })
})

describe('edtr io plugins', () => {
  // plugin: files currently not supported in editor or frontend
  // plugin: inputExercise not handled in converter
  // plugin: scMcExercise not handled in converter
  //TODO: Add test for equations in equations PR

  describe('plugin: image', () => {
    test('default, return with "src" set', () => {
      const result = convert({
        plugin: 'image',
        state: {
          src: 'https://assets.serlo.org/logo.jpg',
        },
      })
      expect(result).toEqual([
        {
          type: 'img',
          src: 'https://assets.serlo.org/logo.jpg',
        },
      ])
    })
    test('with "maxWidth"', () => {
      const result = convert({
        plugin: 'image',
        state: {
          src: 'https://assets.serlo.org/logo.jpg',
          maxWidth: true,
        },
      })
      expect(result[0].maxWidth).toBe(true)
    })
    test('with alt attribute', () => {
      const result = convert({
        plugin: 'image',
        state: {
          src: 'https://assets.serlo.org/logo.jpg',
          alt: 'Description',
        },
      })
      expect(result[0].alt).toBe('Description')
    })
  })

  test('plugin: important', () => {
    const result = convert({
      plugin: 'important',
      state: {
        plugin: 'text',
        state: [{ type: 'p', children: [{ text: '"Merksatz"' }] }],
      },
    })
    expect(result).toEqual([
      {
        type: 'important',
        children: [
          { type: 'p', children: [{ type: 'text', text: '"Merksatz"' }] },
        ],
      },
    ])
  })

  describe('plugin: layout', () => {
    test('default', () => {
      const result = convert({
        plugin: 'layout',
        state: [
          {
            child: {
              plugin: 'rows',
              state: [
                {
                  plugin: 'text',
                  state: [],
                },
              ],
            },
            width: 6,
          },
        ],
      })
      expect(result).toEqual([
        {
          type: 'row',
          children: [{ type: 'col', size: 6, children: [] }],
        },
      ])
    })

    test('compat: align math children left', () => {
      const result = convert({
        plugin: 'layout',
        state: [
          {
            child: {
              plugin: 'rows',
              state: [
                {
                  plugin: 'text',
                  state: [{ type: 'math' }],
                },
              ],
            },
            width: 6,
          },
        ],
      })
      expect(result[0].children[0].children[0].alignLeft).toBe(true)
    })
  })

  test('plugin: anchor', () => {
    const result = convert({ plugin: 'anchor', state: 'AnchorTest' })
    expect(result).toEqual([{ type: 'anchor', id: 'AnchorTest' }])
  })

  test('plugin: blockquote', () => {
    const result = convert({
      plugin: 'blockquote',
      state: {
        plugin: 'text',
        state: [{ type: 'p', children: [{ text: 'A quote' }] }],
      },
    })
    expect(result).toEqual([
      {
        type: 'blockquote',
        children: [
          { type: 'p', children: [{ type: 'text', text: 'A quote' }] },
        ],
      },
    ])
  })

  describe('plugin: geogebra', () => {
    test('default', () => {
      const result = convert({ plugin: 'geogebra', state: 'jybewqhg' })
      expect(result).toEqual([{ type: 'geogebra', id: 'jybewqhg' }])
    })

    test('compat: full url', () => {
      const result = convert({
        plugin: 'geogebra',
        state: 'https://www.geogebra.org/m/jybewqhg',
      })
      expect(result).toEqual([{ type: 'geogebra', id: 'jybewqhg' }])
    })

    //TODO: return empty instead of faulty url? should probably be checked in edtr
    test('no geogebra url', () => {
      const result = convert({
        plugin: 'geogebra',
        state: 'https://www.github.com',
      })
      expect(result).toEqual([
        { type: 'geogebra', id: 'https://www.github.com' },
      ])
    })
  })

  test('plugin: highlight', () => {
    const result = convert({
      plugin: 'highlight',
      state: {
        code: '\n<html>Code</html>',
        language: 'html',
        showLineNumbers: true,
      },
    })
    expect(result).toEqual([{ type: 'code', code: '\n<html>Code</html>' }])
  })

  describe('plugin: multimediaExplanation', () => {
    test('with width value: returns calulated sizes', () => {
      const result = convert({
        plugin: 'multimedia',
        state: {
          explanation: {
            plugin: 'rows',
            state: [
              {
                plugin: 'text',
                state: [],
              },
            ],
          },
          multimedia: {
            plugin: 'image',
            state: {
              src: 'test.jpg',
            },
          },
          illustrating: true,
          width: 20,
        },
      })
      expect(result).toEqual([
        {
          type: 'multimedia',
          mediaWidth: 20,
          float: 'right',
          media: [{ type: 'img', src: 'test.jpg' }],
          children: [],
        },
      ])
    })
    test('no width value provided: returns 50 / 50 size', () => {
      const result = convert({
        plugin: 'multimedia',
        state: {
          explanation: {
            plugin: 'rows',
            state: [],
          },
          multimedia: {
            plugin: 'image',
            state: {
              src: 'test.jpg',
            },
          },
        },
      })
      expect(result).toEqual([
        {
          type: 'multimedia',
          mediaWidth: 50,
          float: 'right',
          media: [{ type: 'img', src: 'test.jpg' }],
          children: [],
        },
      ])
    })
  })

  test('plugin: rows just returns children', () => {
    const result = convert({
      plugin: 'rows',
      state: [
        {
          plugin: 'text',
          state: {
            type: 'h',
            level: 2,
            children: [],
          },
        },
        {
          plugin: 'image',
          state: {
            src: '',
            alt: '',
          },
        },
      ],
    })
    expect(result).toEqual([
      { type: 'h', level: 2, children: [] },
      {
        type: 'img',
        src: '',
        alt: '',
        maxWidth: undefined,
      },
    ])
  })

  test('plugin: serloInjection', () => {
    const result = convert({ plugin: 'injection', state: '/145590' })
    expect(result).toEqual([{ type: 'injection', href: '/145590' }])
  })

  test('plugin: spoiler', () => {
    const result = convert({
      plugin: 'spoiler',
      state: {
        title: 'More info',
        content: { plugin: 'rows', state: [] },
      },
    })
    expect(result).toEqual([
      {
        type: 'spoiler-container',
        children: [
          {
            type: 'spoiler-title',
            children: [{ type: 'text', text: 'More info' }],
          },
          { type: 'spoiler-body', children: [] },
        ],
      },
    ])
  })

  test('plugin: table', () => {
    const result = convert({
      plugin: 'table',
      state: '|||\n|||\n|Week 1|Intro into something|\n',
    })

    expect(result).toEqual([
      { type: 'text', text: ' ' },
      {
        type: 'table',
        children: [
          {
            type: 'tr',
            children: [
              { type: 'th', children: [] },
              { type: 'th', children: [] },
            ],
          },
          {
            type: 'tr',
            children: [
              {
                type: 'td',
                children: [
                  { type: 'p', children: [{ type: 'text', text: 'Week 1' }] },
                ],
              },
              {
                type: 'td',
                children: [
                  {
                    type: 'p',
                    children: [
                      {
                        type: 'text',
                        text: 'Intro into something',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      { type: 'text', text: ' ' },
    ])
  })

  test('plugin: text', () => {
    const result = convert({
      plugin: 'text',
      state: {
        plugin: 'text',
        state: [
          {
            type: 'h',
            level: 2,
            children: [],
          },
        ],
      },
    })
    expect(result).toEqual([{ type: 'h', level: 2, children: [] }])
  })

  test('plugin: video', () => {
    const result = convert({
      plugin: 'video',
      state: {
        src: 'https://www.youtube.com/watch?v=IPOnn9EBX74',
        alt: 'Beschreibung.',
      },
    })
    expect(result).toEqual([
      { type: 'video', src: 'https://www.youtube.com/watch?v=IPOnn9EBX74' },
    ])
  })
})

describe('text types', () => {
  describe('just text', () => {
    test('default', () => {
      const result = convert({ text: 'onto the street' })

      expect(result).toEqual([
        {
          type: 'text',
          text: 'onto the street',
        },
      ])
    })
    test('with umlauts and special chars', () => {
      const result = convert({ text: 'Rösängärtüß>"&´' })

      expect(result).toEqual([
        {
          type: 'text',
          text: 'Rösängärtüß>"&´',
        },
      ])
    })
    test('returns [] on empty string', () => {
      const result = convert({ text: '' })
      expect(result).toEqual([])
    })
    test('with color', () => {
      const result = convert({ text: 'colored', color: 0 })
      expect(result[0].color).toBe('blue')
    })
    test('strong', () => {
      const result = convert({ text: 'bold text', strong: true })
      expect(result[0].strong).toBe(true)
    })
    test('italic', () => {
      const result = convert({ text: 'italic text', em: true })
      expect(result[0].em).toBe(true)
    })
    test('strong, em and colored, woohoo', () => {
      const result = convert({
        text: 'wow text',
        strong: true,
        em: true,
        color: 2,
      })
      expect(result).toEqual([
        {
          type: 'text',
          text: 'wow text',
          em: true,
          strong: true,
          color: 'orange',
        },
      ])
    })
  })

  describe('text-type: p', () => {
    test('default', () => {
      const result = convert({
        type: 'p',
        children: [{ text: 'test' }],
      })
      expect(result).toEqual([
        {
          type: 'p',
          children: [{ type: 'text', text: 'test' }],
        },
      ])
    })
    describe('compat: unwrap math from p if math is only child', () => {
      test('is only child', () => {
        const result = convert({
          type: 'p',
          children: [{ type: 'math' }],
        })
        expect(result).toEqual([{ type: 'math' }])
      })
      test('has sibling', () => {
        const result = convert({
          type: 'p',
          children: [{ type: 'math' }, { text: 'brother' }],
        })
        expect(result).toEqual([
          {
            type: 'p',
            children: [{ type: 'math' }, { type: 'text', text: 'brother' }],
          },
        ])
      })
    })

    //compat: unwrap ul/ol from p if only child

    describe('compat: handle newlines in text and math', () => {
      test('text with breaks', () => {
        const result = convert({
          type: 'p',
          children: [{ text: 'line1\nline2' }],
        })
        expect(result).toEqual([
          { type: 'p', children: [{ type: 'text', text: 'line1' }] },
          { type: 'p', children: [{ type: 'text', text: 'line2' }] },
        ])
      })
    })

    //compat: extract math formulas, cant reproduce, see comment in file
  })

  describe('text-type: a', () => {
    test('anchor link', () => {
      const result = convert({
        type: 'a',
        href: '#top',
        children: [{ text: 'anchor link' }],
      })
      expect(result).toEqual([
        {
          type: 'a',
          href: '#top',
          children: [{ type: 'text', text: 'anchor link' }],
        },
      ])
    })

    test('no href set', () => {
      const result = convert({
        type: 'a',
        children: [{ text: 'link' }],
      })
      expect(result).toEqual([
        {
          type: 'a',
          href: '',
          children: [{ type: 'text', text: 'link' }],
        },
      ])
    })
  })

  describe('text-type: h', () => {
    test('default h1', () => {
      const result = convert({
        type: 'h',
        level: 1,
        children: [{ text: 'H1' }],
      })
      expect(result).toEqual([
        { type: 'h', level: 1, children: [{ type: 'text', text: 'H1' }] },
      ])
    })
    test('level higher than 5: returns level 5', () => {
      const result = convert({
        type: 'h',
        level: 6,
        children: [{ text: 'H6 maybe' }],
      })
      expect(result[0].level).toBe(5)
    })
    test('no level set: returns level 5', () => {
      const result = convert({
        type: 'h',
        children: [{ text: 'Hwhatever' }],
      })
      expect(result[0].level).toBe(5)
    })
  })

  test('text-type: math (inline)', () => {
    const result = convert({
      type: 'math',
      src: '\\tan^{-1}',
      inline: true,
      children: [{ text: '\\tan^{-1}', strong: true }],
    })
    expect(result).toEqual([
      {
        type: 'inline-math',
        formula: '\\sf \\tan^{-1}',
      },
    ])
  })

  test('text-type: math (block)', () => {
    const result = convert({
      type: 'math',
      src: 'Math Block',
      inline: false,
      children: [{ text: '' }],
    })
    expect(result).toEqual([{ type: 'math', formula: '\\sf Math Block' }])
  })

  test('text-type: unodered-list', () => {
    const result = convert({
      type: 'unordered-list',
      children: [
        {
          type: 'list-item',
          children: [],
        },
        {
          type: 'list-item',
          children: [],
        },
      ],
    })
    expect(result).toEqual([
      {
        type: 'ul',
        children: [
          {
            type: 'li',
            children: [],
          },
          {
            type: 'li',
            children: [],
          },
        ],
      },
    ])
  })

  test('text-type: ordered-list', () => {
    const result = convert({
      type: 'ordered-list',
      children: [
        {
          type: 'list-item',
          children: [],
        },
        {
          type: 'list-item',
          children: [],
        },
      ],
    })
    expect(result).toEqual([
      {
        type: 'ol',
        children: [
          {
            type: 'li',
            children: [],
          },
          {
            type: 'li',
            children: [],
          },
        ],
      },
    ])
  })

  test('text-type: list-item', () => {
    const result = convert({
      type: 'list-item',
      children: [{ type: 'list-item-child', children: [] }],
    })
    expect(result).toEqual([
      {
        type: 'li',
        children: [],
      },
    ])
  })

  describe('text-type: list-item-child', () => {
    test('default', () => {
      const result = convert({
        type: 'list-item-child',
        children: [{ text: 'item-child' }],
      })
      expect(result).toEqual([
        { type: 'p', children: [{ type: 'text', text: 'item-child' }] },
      ])
    })

    test('compat: ps will not be wrapped in another p', () => {
      const result = convert({
        type: 'list-item-child',
        children: [
          {
            type: 'p',
            children: [{ text: 'text' }],
          },
          {
            type: 'p',
            children: [{ text: 'text' }],
          },
        ],
      })
      expect(result).toEqual([
        {
          type: 'p',
          children: [{ type: 'text', text: 'text' }],
        },
        {
          type: 'p',
          children: [{ type: 'text', text: 'text' }],
        },
      ])
    })

    //TODO: This is probably a bug! Check again
    test('compat: inline-math returns empty', () => {
      const result = convert({
        type: 'list-item-child',
        children: [
          {
            type: 'inline-math',
            formula: '\\tan^{-1}',
          },
        ],
      })
      expect(result).toEqual([])
    })

    test('compat: a gets wrapped in p', () => {
      const result = convert({
        type: 'list-item-child',
        children: [
          {
            type: 'a',
            children: [{ text: 'log text' }],
          },
        ],
      })
      expect(result).toEqual([
        {
          type: 'p',
          children: [
            {
              type: 'a',
              href: '',
              children: [{ type: 'text', text: 'log text' }],
            },
          ],
        },
      ])
    })
  })
})
