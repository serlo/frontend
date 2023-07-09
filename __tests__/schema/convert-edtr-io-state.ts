//@ts-nocheck

import { FrontendNodeType } from '@/frontend-node-types'
import { convert } from '@/schema/convert-edtr-io-state'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

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
        plugin: EditorPluginType.Image,
        state: {
          src: 'https://assets.serlo.org/logo.jpg',
        },
      })
      expect(result).toEqual([
        {
          type: FrontendNodeType.Image,
          src: 'https://assets.serlo.org/logo.jpg',
          alt: '',
        },
      ])
    })
    test('with "maxWidth"', () => {
      const result = convert({
        plugin: EditorPluginType.Image,
        state: {
          src: 'https://assets.serlo.org/logo.jpg',
          maxWidth: true,
        },
      })
      expect(result[0].maxWidth).toBe(true)
    })
    test('with alt attribute', () => {
      const result = convert({
        plugin: EditorPluginType.Image,
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
      plugin: EditorPluginType.Important,
      state: {
        plugin: EditorPluginType.Text,
        state: [
          { type: FrontendNodeType.P, children: [{ text: '"Merksatz"' }] },
        ],
      },
    })
    expect(result).toEqual([
      {
        type: FrontendNodeType.Important,
        children: [
          {
            type: FrontendNodeType.SlateContainer,
            children: [
              {
                type: FrontendNodeType.SlateP,
                children: [{ type: FrontendNodeType.Text, text: '"Merksatz"' }],
              },
            ],
          },
        ],
      },
    ])
  })

  describe('plugin: layout', () => {
    test('default', () => {
      const result = convert({
        plugin: EditorPluginType.Layout,
        state: [
          {
            child: {
              plugin: EditorPluginType.Rows,
              state: [
                {
                  plugin: EditorPluginType.Text,
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
          type: FrontendNodeType.Row,
          children: [
            {
              type: FrontendNodeType.Col,
              size: 6,
              children: [
                { type: FrontendNodeType.SlateContainer, children: [] },
              ],
            },
          ],
        },
      ])
    })
  })

  test('plugin: anchor', () => {
    const result = convert({
      plugin: EditorPluginType.Anchor,
      state: 'AnchorTest',
    })
    expect(result).toEqual([
      { type: FrontendNodeType.Anchor, id: 'AnchorTest' },
    ])
  })

  test('plugin: blockquote', () => {
    const result = convert({
      plugin: EditorPluginType.Blockquote,
      state: {
        plugin: EditorPluginType.Text,
        state: [{ type: FrontendNodeType.P, children: [{ text: 'A quote' }] }],
      },
    })
    expect(result).toEqual([
      {
        type: FrontendNodeType.Blockquote,
        children: [
          {
            type: FrontendNodeType.SlateContainer,
            children: [
              {
                type: FrontendNodeType.SlateP,
                children: [{ type: FrontendNodeType.Text, text: 'A quote' }],
              },
            ],
          },
        ],
      },
    ])
  })

  describe('plugin: geogebra', () => {
    test('default', () => {
      const result = convert({
        plugin: EditorPluginType.Geogebra,
        state: 'jybewqhg',
      })
      expect(result).toEqual([
        { type: FrontendNodeType.Geogebra, id: 'jybewqhg' },
      ])
    })

    test('compat: full url', () => {
      const result = convert({
        plugin: EditorPluginType.Geogebra,
        state: 'https://www.geogebra.org/m/jybewqhg',
      })
      expect(result).toEqual([
        { type: FrontendNodeType.Geogebra, id: 'jybewqhg' },
      ])
    })

    //TODO: return empty instead of faulty url? should probably be checked in edtr
    test('no geogebra url', () => {
      const result = convert({
        plugin: EditorPluginType.Geogebra,
        state: 'https://www.github.com',
      })
      expect(result).toEqual([
        { type: FrontendNodeType.Geogebra, id: 'https://www.github.com' },
      ])
    })
  })

  test('plugin: highlight', () => {
    const result = convert({
      plugin: EditorPluginType.Highlight,
      state: {
        code: '\n<html>Code</html>',
        language: 'html',
        showLineNumbers: true,
      },
    })
    expect(result).toEqual([
      {
        type: FrontendNodeType.Code,
        code: '\n<html>Code</html>',
        language: 'html',
        showLineNumbers: true,
      },
    ])
  })

  describe('plugin: multimedia', () => {
    test('with width value: returns calulated sizes', () => {
      const result = convert({
        plugin: EditorPluginType.Multimedia,
        state: {
          explanation: {
            plugin: EditorPluginType.Rows,
            state: [
              {
                plugin: EditorPluginType.Text,
                state: [],
              },
            ],
          },
          multimedia: {
            plugin: EditorPluginType.Image,
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
          type: FrontendNodeType.Multimedia,
          mediaWidth: 20,
          media: [{ type: FrontendNodeType.Image, src: 'test.jpg', alt: '' }],
          children: [{ type: FrontendNodeType.SlateContainer, children: [] }],
        },
      ])
    })
    test('no width value provided: returns 50 / 50 size', () => {
      const result = convert({
        plugin: EditorPluginType.Multimedia,
        state: {
          explanation: {
            plugin: EditorPluginType.Rows,
            state: [],
          },
          multimedia: {
            plugin: EditorPluginType.Image,
            state: {
              src: 'test.jpg',
            },
          },
        },
      })
      expect(result).toEqual([
        {
          type: FrontendNodeType.Multimedia,
          mediaWidth: 50,
          media: [{ type: FrontendNodeType.Image, src: 'test.jpg', alt: '' }],
          children: [],
        },
      ])
    })
  })

  test('plugin: rows just returns children', () => {
    const result = convert({
      plugin: EditorPluginType.Rows,
      state: [
        {
          plugin: EditorPluginType.Text,
          state: {
            type: FrontendNodeType.H,
            level: 2,
            children: [],
          },
        },
        {
          plugin: EditorPluginType.Image,
          state: {
            src: 'bild.jpg',
            alt: '',
          },
        },
      ],
    })
    expect(result).toEqual([
      {
        type: FrontendNodeType.SlateContainer,
        children: [{ type: FrontendNodeType.H, level: 2, children: [] }],
      },
      {
        type: FrontendNodeType.Image,
        src: 'bild.jpg',
        alt: '',
        maxWidth: undefined,
      },
    ])
  })

  test('plugin: serloInjection', () => {
    const result = convert({
      plugin: EditorPluginType.Injection,
      state: '/145590',
    })
    expect(result).toEqual([
      { type: FrontendNodeType.Injection, href: '/145590' },
    ])
  })

  test('plugin: spoiler', () => {
    const result = convert({
      plugin: EditorPluginType.Spoiler,
      state: {
        title: 'More info',
        content: { plugin: EditorPluginType.Rows, state: [] },
      },
    })
    expect(result).toEqual([
      {
        type: FrontendNodeType.SpoilerContainer,
        children: [
          {
            type: FrontendNodeType.SpoilerTitle,
            children: [{ type: FrontendNodeType.Text, text: 'More info' }],
          },
          { type: FrontendNodeType.SpoilerBody, children: [] },
        ],
      },
    ])
  })

  test('plugin: table', () => {
    const result = convert({
      plugin: EditorPluginType.Table,
      state: '|||\n|||\n|Week 1|Intro into something|\n',
    })

    expect(result).toEqual([
      {
        type: FrontendNodeType.Table,
        children: [
          {
            type: FrontendNodeType.Tr,
            children: [
              { type: FrontendNodeType.Th, children: [] },
              { type: FrontendNodeType.Th, children: [] },
            ],
          },
          {
            type: FrontendNodeType.Tr,
            children: [
              {
                type: FrontendNodeType.Td,
                children: [
                  {
                    type: FrontendNodeType.P,
                    children: [{ type: FrontendNodeType.Text, text: 'Week 1' }],
                  },
                ],
              },
              {
                type: FrontendNodeType.Td,
                children: [
                  {
                    type: FrontendNodeType.P,
                    children: [
                      {
                        type: FrontendNodeType.Text,
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
    ])
  })

  test('plugin: text', () => {
    const result = convert({
      plugin: EditorPluginType.Text,
      state: {
        type: FrontendNodeType.H,
        level: 2,
        children: [],
      },
    })
    expect(result).toEqual([
      {
        type: FrontendNodeType.SlateContainer,
        children: [
          {
            type: FrontendNodeType.H,
            level: 2,
            children: [],
          },
        ],
      },
    ])
  })

  test('plugin: video', () => {
    const result = convert({
      plugin: EditorPluginType.Video,
      state: {
        src: 'https://www.youtube.com/watch?v=IPOnn9EBX74',
        alt: 'Beschreibung.',
      },
    })
    expect(result).toEqual([
      {
        type: FrontendNodeType.Video,
        src: 'https://www.youtube.com/watch?v=IPOnn9EBX74',
      },
    ])
  })
})

describe('text types', () => {
  describe('just text', () => {
    test('default', () => {
      const result = convert({ text: 'onto the street' })

      expect(result).toEqual([
        {
          type: FrontendNodeType.Text,
          text: 'onto the street',
        },
      ])
    })
    test('with umlauts and special chars', () => {
      const result = convert({ text: 'Rösängärtüß>"&´' })

      expect(result).toEqual([
        {
          type: FrontendNodeType.Text,
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
      expect(result[0].color).toBe(0)
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
          type: FrontendNodeType.Text,
          text: 'wow text',
          em: true,
          strong: true,
          color: 2,
        },
      ])
    })
  })

  describe('text-type: p', () => {
    test('default', () => {
      const result = convert({
        type: FrontendNodeType.P,
        children: [{ text: 'test' }],
      })
      expect(result).toEqual([
        {
          type: FrontendNodeType.SlateP,
          children: [{ type: FrontendNodeType.Text, text: 'test' }],
        },
      ])
    })
    // no automagic anymore
    /*describe('compat: unwrap math from p if math is only child', () => {
      test('is only child', () => {
        const result = convert({
          type: FrontendNodeType.P,
          children: [{ type: FrontendNodeType.Math, src: '123' }],
        })
        expect(result).toEqual([
          {
            type: FrontendNodeType.Math,
            formula: '123',
            formulaSource: '123',
            alignCenter: true,
          },
        ])
      })
    })*/

    //compat: unwrap ul/ol from p if only child

    describe('compat: handle newlines in text and math in list items', () => {
      test('text with breaks', () => {
        const result = convert({
          type: 'list-item',
          children: [{ text: 'line1\nline2' }],
        })
        expect(result).toEqual([
          {
            type: FrontendNodeType.Li,
            children: [
              {
                type: FrontendNodeType.SlateP,
                children: [{ type: FrontendNodeType.Text, text: 'line1' }],
              },
              {
                type: FrontendNodeType.SlateP,
                children: [{ type: FrontendNodeType.Text, text: 'line2' }],
              },
            ],
          },
        ])
      })
    })

    //compat: extract math formulas, cant reproduce, see comment in file
  })

  describe('text-type: a', () => {
    test('anchor link', () => {
      const result = convert({
        type: FrontendNodeType.A,
        href: '#top',
        children: [{ text: 'anchor link' }],
      })
      expect(result).toEqual([
        {
          type: FrontendNodeType.A,
          href: '#top',
          children: [{ type: FrontendNodeType.Text, text: 'anchor link' }],
        },
      ])
    })

    test('no href set', () => {
      const result = convert({
        type: FrontendNodeType.A,
        children: [{ text: 'link' }],
      })
      expect(result).toEqual([{ type: FrontendNodeType.Text, text: 'link' }])
    })
  })

  describe('text-type: h', () => {
    test('default h1', () => {
      const result = convert({
        type: FrontendNodeType.H,
        level: 1,
        children: [{ text: 'H1' }],
      })
      expect(result).toEqual([
        {
          type: FrontendNodeType.H,
          level: 1,
          children: [{ type: FrontendNodeType.Text, text: 'H1' }],
        },
      ])
    })
    test('level higher than 5: returns level 5', () => {
      const result = convert({
        type: FrontendNodeType.H,
        level: 6,
        children: [{ text: 'H6 maybe' }],
      })
      expect(result[0].level).toBe(5)
    })
    test('no level set: returns level 5', () => {
      const result = convert({
        type: FrontendNodeType.H,
        children: [{ text: 'Hwhatever' }],
      })
      expect(result[0].level).toBe(5)
    })
  })

  test('text-type: math (inline)', () => {
    const result = convert({
      type: FrontendNodeType.Math,
      src: '\\tan^{-1}',
      inline: true,
      children: [{ text: '\\tan^{-1}', strong: true }],
    })
    expect(result).toEqual([
      {
        type: FrontendNodeType.InlineMath,
        formula: '\\tan^{-1}',
        formulaSource: '\\tan^{-1}',
      },
    ])
  })

  test('text-type: math (block)', () => {
    const result = convert({
      type: FrontendNodeType.Math,
      src: 'Math Block',
      inline: false,
      children: [{ text: '' }],
    })
    expect(result).toEqual([
      {
        type: FrontendNodeType.Math,
        formula: 'Math Block',
        formulaSource: 'Math Block',
        alignCenter: true,
      },
    ])
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
        type: FrontendNodeType.Ul,
        children: [
          {
            type: FrontendNodeType.Li,
            children: [],
          },
          {
            type: FrontendNodeType.Li,
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
        type: FrontendNodeType.Ol,
        children: [
          {
            type: FrontendNodeType.Li,
            children: [],
          },
          {
            type: FrontendNodeType.Li,
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
        type: FrontendNodeType.Li,
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
        { type: FrontendNodeType.Text, text: 'item-child' },
      ])
    })

    test('compat: ps will not be wrapped in another p', () => {
      const result = convert({
        type: 'list-item-child',
        children: [
          {
            type: FrontendNodeType.P,
            children: [{ text: 'text' }],
          },
          {
            type: FrontendNodeType.P,
            children: [{ text: 'text' }],
          },
        ],
      })
      expect(result).toEqual([
        {
          type: FrontendNodeType.SlateP,
          children: [{ type: FrontendNodeType.Text, text: 'text' }],
        },
        {
          type: FrontendNodeType.SlateP,
          children: [{ type: FrontendNodeType.Text, text: 'text' }],
        },
      ])
    })

    //TODO: This is probably a bug! Check again
    test('compat: inline-math returns empty', () => {
      const result = convert({
        type: 'list-item-child',
        children: [
          {
            type: FrontendNodeType.InlineMath,
            formula: '\\tan^{-1}',
          },
        ],
      })
      expect(result).toEqual([])
    })

    test('compat: a gets wrapped in p', () => {
      const result = convert({
        type: 'list-item',
        children: [
          {
            type: FrontendNodeType.A,
            href: '/123',
            children: [{ text: 'log text' }],
          },
        ],
      })
      expect(result).toEqual([
        {
          type: FrontendNodeType.Li,
          children: [
            {
              type: FrontendNodeType.SlateP,
              children: [
                {
                  type: FrontendNodeType.A,
                  href: '/123',
                  children: [{ type: FrontendNodeType.Text, text: 'log text' }],
                },
              ],
            },
          ],
        },
      ])
    })
  })
})
