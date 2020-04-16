import { useEditor } from 'slate-react'
import { Path, Editor, Transforms, Node, Range } from 'slate'
import { articleSchema } from '../schema/articleNormalizer'
import { articleColors } from '../schema/articleRenderer'
import { getNextElementPath } from './helper'
import styled from 'styled-components'
import TipOver from './TipOver'

export default function Toolbar() {
  // Toolbar sollte Elemente nur nach ganz bestimmten Kriterien anzeigen
  const editor = useEditor()
  const { selection } = editor

  // Zeige nur sinnvolle Optionen an
  const selectType = []
  let selected = ''
  let selectBoxPath = []
  let allowedAdd = []
  let addCurrentNode
  let addCurrentPath
  if (selection) {
    const anchorParentPath = getNextElementPath(editor, selection.anchor.path)
    const focusParentPath = getNextElementPath(editor, selection.focus.path)
    if (Path.equals(anchorParentPath, focusParentPath)) {
      selectBoxPath = anchorParentPath
      let parent = Path.parent(anchorParentPath)
      let parentType =
        parent.length === 0 ? '#root' : Node.get(editor, parent).type
      const allowed = articleSchema[parentType]
      const node = Node.get(editor, anchorParentPath)
      if (node.level === 1) {
        selectType.push('h1')
        selected = 'h1'
      } else {
        if (allowed) {
          if (allowed.children.includes('p')) selectType.push('p')
          if (allowed.children.includes('important'))
            selectType.push('important')
          if (allowed.children.includes('h')) {
            selectType.push('h2', 'h3', 'h4', 'h5')
          }
        }
        selected = node.type + (node.level || '')
      }
      if (Range.isCollapsed(selection) && allowed) {
        // was darf man hier hinzufügen?
        ;[
          'img',
          'math',
          'spoiler-container',
          'ul',
          'ol',
          'row',
          'anchor',
          'table',
          'geogebra',
          'injection',
          'video'
        ].forEach(key => {
          if (allowed.children.includes(key)) {
            if (key === 'ul' || key === 'ol') {
              // check level
              if (anchorParentPath.length > 3) {
                return
              }
            }
            allowedAdd.push(key)
          }
        })
        addCurrentNode = Node.get(editor, anchorParentPath)
        addCurrentPath = anchorParentPath
      }
    }
  }

  // check marks
  let marks = Editor.marks(editor)
  if (!marks) marks = {}

  function handleMark(key, val) {
    if (marks[key] == val) {
      Editor.removeMark(editor, key)
    } else {
      Editor.addMark(editor, key, val)
    }
  }

  function buildColorOption(color, title) {
    return (
      <option
        onMouseDown={e => {
          e.preventDefault()
          handleMark('color', color)
        }}
        value={color}
        style={{ color: articleColors[color] }}
      >
        {title}
      </option>
    )
  }

  // Link behaviour
  let inLink = false
  let linkPath = []
  if (selection) {
    const inlineAnchorPath = getNextElementPath(
      editor,
      selection.anchor.path,
      false
    )
    const inlineFocusPath = getNextElementPath(
      editor,
      selection.focus.path,
      false
    )
    if (
      inlineAnchorPath.length > 0 &&
      Path.equals(inlineAnchorPath, inlineFocusPath) &&
      Node.get(editor, inlineAnchorPath).type === 'a'
    ) {
      inLink = true
      linkPath = inlineAnchorPath
    }
  }

  return (
    <StyledToolbox>
      {buildSelect(selectType, selected, (key, e) => {
        e.preventDefault()
        const newProps: any = {}
        if (/^h[\d]+$/.test(key)) {
          newProps.type = 'h'
          newProps.level = parseInt(key.substring(1))
        } else {
          newProps.type = key
        }
        Transforms.setNodes(editor, newProps, { at: selectBoxPath })
      })}{' '}
      <TipOver
        content={buildAdd(allowedAdd, (key, e) => {
          e.preventDefault()
          Transforms.splitNodes(editor)
          if (key in defaultInserts) {
            Transforms.insertNodes(
              editor,
              JSON.parse(JSON.stringify(defaultInserts[key]))
            )
          }
          if (
            addCurrentNode.type === 'p' &&
            addCurrentNode.children.length == 1 &&
            addCurrentNode.children[0].text == ''
          ) {
            Transforms.removeNodes(editor, { at: addCurrentPath })
          }
        })}
        trigger="click"
      >
        <button disabled={allowedAdd.length === 0}>Hinzufügen ...</button>
      </TipOver>{' '}
      <button
        style={{ fontWeight: marks.strong ? 'bold' : 'normal' }}
        onMouseDown={e => {
          e.preventDefault()
          handleMark('strong', true)
        }}
      >
        Fett
      </button>{' '}
      <button
        style={{ fontStyle: marks.em ? 'italic' : 'normal' }}
        onMouseDown={e => {
          e.preventDefault()
          handleMark('em', true)
        }}
      >
        Kursiv
      </button>{' '}
      <select value={marks.color || 'none'} onChange={() => {}}>
        <option
          onMouseDown={e => {
            e.preventDefault()
            Editor.removeMark(editor, 'color')
          }}
          value="none"
        >
          ohne Farbe
        </option>
        {buildColorOption('blue', 'blau')}
        {buildColorOption('green', 'grün')}
        {buildColorOption('orange', 'orange')}
      </select>{' '}
      <button
        onMouseDown={e => {
          if (inLink) {
            Transforms.unwrapNodes(editor, { at: linkPath })
          } else {
            if (selection && Range.isCollapsed(selection)) {
              Transforms.insertNodes(editor, {
                type: 'a',
                href: '',
                children: [{ text: 'neuer Link' }]
              })
            } else {
              Transforms.wrapNodes(
                editor,
                {
                  type: 'a',
                  href: '',
                  children: [{ text: '' }]
                },
                { split: true }
              )
            }
          }
          e.preventDefault()
        }}
      >
        {inLink ? 'Unlink' : '+ Link'}
      </button>{' '}
      <button
        onMouseDown={e => {
          e.preventDefault()
          Transforms.insertNodes(editor, {
            type: 'inline-math',
            formula: '',
            children: [{ text: '' }]
          })
        }}
        disabled={!selection || Range.isExpanded(selection)}
      >
        + Formel
      </button>
    </StyledToolbox>
  )
}

function buildSelect(available, selected, handler) {
  function buildOption(key, value) {
    return available.includes(key) ? (
      <option onMouseDown={e => handler(key, e)} value={key}>
        {value}
      </option>
    ) : null
  }
  return (
    <select value={selected} style={{ width: '130px' }} onChange={() => {}}>
      {buildOption('h1', 'Titel')}
      {buildOption('p', 'Absatz')}
      {buildOption('h2', 'Überschrift 2')}
      {buildOption('h3', 'Überschrift 3')}
      {buildOption('h4', 'Überschrift 4')}
      {buildOption('h5', 'Überschrift 5')}
      {buildOption('important', ' zu Merkkasten ...')}
    </select>
  )
}

function buildAdd(allowed, handler) {
  function buildButton(key, value) {
    return allowed.includes(key) ? (
      <>
        <button
          style={{ marginBottom: '3px' }}
          onMouseDown={e => handler(key, e)}
        >
          {value}
        </button>
        <br />
      </>
    ) : null
  }
  return (
    <>
      {buildButton('img', 'Bild')}
      {buildButton('math', 'Formelblock')}
      {buildButton('spoiler-container', 'Spoiler')}
      {buildButton('ul', 'Liste')}
      {buildButton('ol', 'Aufzählung')}
      {buildButton('row', 'Spalten')}
      {buildButton('table', 'Tabelle')}
      {buildButton('anchor', 'Anchor')}
      {buildButton('geogebra', 'Applet')}
      {buildButton('injection', 'Injection')}
      {buildButton('video', 'Video')}
    </>
  )
}

const defaultInserts = {
  img: {
    type: 'img',
    alt: 'Bild',
    src: '',
    children: [{ text: '' }]
  },
  math: {
    type: 'math',
    formula: '',
    children: [{ text: '' }]
  },
  'spoiler-container': {
    type: 'spoiler-container',
    children: [
      {
        type: 'spoiler-title',
        children: [{ text: '' }]
      },
      {
        type: 'spoiler-body',
        children: [
          {
            type: 'p',
            children: [{ text: '' }]
          }
        ]
      }
    ]
  },
  ul: {
    type: 'ul',
    children: [
      {
        type: 'li',
        children: [
          {
            type: 'p',
            children: [{ text: '' }]
          }
        ]
      }
    ]
  },
  ol: {
    type: 'ol',
    children: [
      {
        type: 'li',
        children: [
          {
            type: 'p',
            children: [{ text: '' }]
          }
        ]
      }
    ]
  },
  row: {
    type: 'row',
    children: [
      {
        type: 'col',
        size: 4,
        children: [
          {
            type: 'p',
            children: [{ text: '' }]
          }
        ]
      },
      {
        type: 'col',
        size: 4,
        children: [
          {
            type: 'p',
            children: [{ text: '' }]
          }
        ]
      }
    ]
  },
  anchor: {
    type: 'anchor',
    id: '',
    children: [{ text: '' }]
  },
  table: {
    type: 'table',
    children: [
      {
        type: 'tr',
        children: [
          {
            type: 'th',
            children: [{ text: 'Titel 1' }]
          },
          {
            type: 'th',
            children: [{ text: 'Titel 2' }]
          }
        ]
      },
      {
        type: 'tr',
        children: [
          {
            type: 'td',
            children: [{ text: '' }]
          },
          {
            type: 'td',
            children: [{ text: '' }]
          }
        ]
      },
      {
        type: 'tr',
        children: [
          {
            type: 'td',
            children: [{ text: '' }]
          },
          {
            type: 'td',
            children: [{ text: '' }]
          }
        ]
      }
    ]
  },
  geogebra: {
    type: 'geogebra',
    id: '',
    children: [{ text: '' }]
  },
  injection: {
    type: 'injection',
    href: '/',
    children: [{ text: '' }]
  },
  video: {
    type: 'video',
    url: '',
    children: [{ text: '' }]
  }
}

const StyledToolbox = styled.div`
  padding: 5px;
  background-color: white;
  border: 1px solid lightblue;
  margin-bottom: 12px;
  position: sticky;
  top: 0;
  z-index: 100;
`
