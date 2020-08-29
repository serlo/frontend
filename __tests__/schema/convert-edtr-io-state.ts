//@ts-nocheck

import { convert } from '@/schema/convert-edtr-io-state'

function log(result) {
  console.log('-------------------------')
  console.log(JSON.stringify(result))
  console.log('-------------------------')
}

describe('general compat cases / sanity checks', () => {
  test('undefined node, return empty array', () => {
    const result = convert(undefined)
    expect(result).toEqual([])
  })

  test('node is empty object, return empty array', () => {
    const result = convert({})
    expect(result).toEqual([])
  })

  test('unsupported plugin, return empty array', () => {
    const result = convert({ plugin: 'woah-nice-plugin', state: [] })
    expect(result).toEqual([])
  })

  test('unsupported text type, return empty array', () => {
    const result = convert({ type: 'super-bold', children: [] })
    expect(result).toEqual([])
  })
})

describe('edtr io plugins', () => {
  // plugin: files currently not supported in editor or frontend
  // plugin: inputExercise not handled in converter
  // plugin: scMcExercise not handled in converter

  //TODO: Add test for Equations

  describe('plugin: image', () => {
    test('default', () => {
      const result = convert({
        plugin: 'image',
        state: {
          src:
            'https://assets.serlo.org/5c77cd8b27d83_b56b69f307447a110a5ae915e517c73e385c37e8.jpg',
          alt: 'Lernen im eigenen Tempo mit serlo.org',
        },
      })
      expect(result).toEqual([
        {
          type: 'img',
          src:
            'https://assets.serlo.org/5c77cd8b27d83_b56b69f307447a110a5ae915e517c73e385c37e8.jpg',
          alt: 'Lernen im eigenen Tempo mit serlo.org',
          maxWidth: undefined,
        },
      ])
    })
    test('with maxWidth', () => {
      const result = convert({
        plugin: 'image',
        state: {
          src:
            'https://assets.serlo.org/5c77cd8b27d83_b56b69f307447a110a5ae915e517c73e385c37e8.jpg',
          alt: 'Lernen im eigenen Tempo mit serlo.org',
          maxWidth: true,
        },
      })
      expect(result).toEqual([
        {
          type: 'img',
          src:
            'https://assets.serlo.org/5c77cd8b27d83_b56b69f307447a110a5ae915e517c73e385c37e8.jpg',
          alt: 'Lernen im eigenen Tempo mit serlo.org',
          maxWidth: true,
        },
      ])
    })
    test('alt missing', () => {
      const result = convert({
        plugin: 'image',
        state: {
          src:
            'https://assets.serlo.org/5c77cd8b27d83_b56b69f307447a110a5ae915e517c73e385c37e8.jpg',
        },
      })
      expect(result).toEqual([
        {
          type: 'img',
          src:
            'https://assets.serlo.org/5c77cd8b27d83_b56b69f307447a110a5ae915e517c73e385c37e8.jpg',
          alt: undefined,
        },
      ])
    })
  })

  test('plugin: important?', () => {
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

  //TODO: is this a regular plugin?
  describe('plugin: layout?', () => {
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
          children: [
            { type: 'col', size: 6, children: [] },
            { type: 'col', size: 6, children: [] },
          ],
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
          {
            child: {
              plugin: 'rows',
              state: [],
            },
            width: 6,
          },
        ],
      })
      expect(result).toEqual([
        {
          type: 'row',
          children: [
            {
              type: 'col',
              size: 6,
              children: [{ type: 'math', alignLeft: true }],
            },
            { type: 'col', size: 6, children: [] },
          ],
        },
      ])
    })
  })

  test('plugin: anchor', () => {
    const result = convert({ plugin: 'anchor', state: 'AnchorTest' })
    expect(result).toEqual([{ type: 'anchor', id: 'AnchorTest' }])
  })

  //TODO: currently unsupported in frontend
  test('plugin: blockquote', () => {
    const result = convert({
      plugin: 'blockquote',
      state: { plugin: 'text', state: [] },
    })
    expect(result).toEqual([])
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

    //TODO: return empty instead of faulty url? should probably be checkd in edtr
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
    test('manual width', () => {
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
          type: 'row',
          children: [
            { type: 'col', size: 80, children: [] },
            {
              type: 'col',
              size: 20,
              children: [{ type: 'img', src: 'test.jpg' }],
            },
          ],
        },
      ])
    })
    test('no width', () => {
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
          type: 'row',
          children: [
            { type: 'col', size: 50, children: [] },
            {
              type: 'col',
              size: 50,
              children: [{ type: 'img', src: 'test.jpg' }],
            },
          ],
        },
      ])
    })
  })

  test('plugin: rows', () => {
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
        title: 'Mehr Infos',
        content: { plugin: 'rows', state: [] },
      },
    })
    expect(result).toEqual([
      {
        type: 'spoiler-container',
        children: [
          {
            type: 'spoiler-title',
            children: [{ type: 'text', text: 'Mehr Infos' }],
          },
          { type: 'spoiler-body', children: [] },
        ],
      },
    ])
  })

  test('plugin: table', () => {
    const result = convert({
      plugin: 'table',
      state:
        '|||\n' +
        '|||\n' +
        '|Woche 1|Einstieg in die redaktionelle Arbeit|\n' +
        '|Woche 2|Vertiefung der redaktionellen Arbeit|\n' +
        '|Woche 3|Mitarbeit im Projektmanagement der Redaktion|\n' +
        '|Woche 4|vertiefte Mitarbeit im Projektmanagement der Redaktion|',
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
                  { type: 'p', children: [{ type: 'text', text: 'Woche 1' }] },
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
                        text: 'Einstieg in die redaktionelle Arbeit',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: 'tr',
            children: [
              {
                type: 'td',
                children: [
                  { type: 'p', children: [{ type: 'text', text: 'Woche 2' }] },
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
                        text: 'Vertiefung der redaktionellen Arbeit',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: 'tr',
            children: [
              {
                type: 'td',
                children: [
                  { type: 'p', children: [{ type: 'text', text: 'Woche 3' }] },
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
                        text: 'Mitarbeit im Projektmanagement der Redaktion',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: 'tr',
            children: [
              {
                type: 'td',
                children: [
                  { type: 'p', children: [{ type: 'text', text: 'Woche 4' }] },
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
                        text:
                          'vertiefte Mitarbeit im Projektmanagement der Redaktion',
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
          { type: 'p', children: [] },
        ],
      },
    })
    expect(result).toEqual([
      { type: 'h', level: 2, children: [] },
      { type: 'p', children: [] },
    ])
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
    test('default with umlauts', () => {
      const result = convert({ text: ' auf die Straße. äÖü"' })

      expect(result).toEqual([
        {
          type: 'text',
          text: ' auf die Straße. äÖü"',
          em: undefined,
          strong: undefined,
          color: undefined,
        },
      ])
    })
    test('empty sting', () => {
      const result = convert({ text: '' })
      expect(result).toEqual([])
    })
    test('with color', () => {
      const result = convert({ text: 'colored', color: 0 })
      expect(result).toEqual([{ type: 'text', text: 'colored', color: 'blue' }])
    })
    test('strong', () => {
      const result = convert({ text: 'bold text', strong: true })
      expect(result).toEqual([
        { type: 'text', text: 'bold text', strong: true },
      ])
    })
    test('italic', () => {
      const result = convert({ text: 'italic text', em: true })
      expect(result).toEqual([{ type: 'text', text: 'italic text', em: true }])
    })
    test('all together now', () => {
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
        children: [{ text: 'test' }, { text: 'test2' }],
      })
      expect(result).toEqual([
        {
          type: 'p',
          children: [
            { type: 'text', text: 'test' },
            { type: 'text', text: 'test2' },
          ],
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
    //compat: unwrap ul/ol from p if only child -> can't reproduce, does not seem to happen

    describe('compat: handle newlines in text and math', () => {
      //TODO: this test works, but can't reproduce any of this with actual editor output. so we need to define the expected behaviours first
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
    test('default h2', () => {
      const result = convert({
        type: 'h',
        level: 1,
        children: [{ text: 'H1' }],
      })
      expect(result).toEqual([
        { type: 'h', level: 1, children: [{ type: 'text', text: 'H1' }] },
      ])
    })
    test('level higher than 5', () => {
      const result = convert({
        type: 'h',
        level: 6,
        children: [{ text: 'H6 maybe' }],
      })
      expect(result).toEqual([
        { type: 'h', level: 5, children: [{ type: 'text', text: 'H6 maybe' }] },
      ])
    })
    test('no level set', () => {
      const result = convert({
        type: 'h',
        children: [{ text: 'Hwhatever' }],
      })
      expect(result).toEqual([
        {
          type: 'h',
          level: 5,
          children: [{ type: 'text', text: 'Hwhatever' }],
        },
      ])
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
        formula: '\\tan^{-1}',
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
    expect(result).toEqual([{ type: 'math', formula: 'Math Block' }])
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
