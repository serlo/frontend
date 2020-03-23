import React, { useEffect, useState, useMemo } from 'react'
import styled from 'styled-components'
import Tippy from '@tippyjs/react'
import { hsl } from 'polished'

import {
  createEditor,
  Node,
  Transforms,
  Editor,
  Element,
  Range,
  Path
} from 'slate'
import {
  Slate,
  Editable,
  withReact,
  useEditor,
  ReactEditor,
  useSlate
} from 'slate-react'
import { withHistory } from 'slate-history'

import Header from '../components/navigation/Header'
import Footer from '../components/navigation/Footer'
import { StyledMain } from '../components/tags/StyledMain'
import { HSpace } from '../components/content/HSpace'
import Modal from '../components/Modal'
import withArticle from '../schema/articleNormalizer'
import {
  renderLeaf,
  renderH,
  renderUl,
  renderOl,
  renderLi,
  renderImportant,
  renderP,
  renderInlineMath,
  renderImg,
  renderMath,
  renderRow,
  renderCol,
  renderSpoilerContainer,
  renderSpoilerTitle,
  renderSpoilerToggle,
  renderSpoilerBody,
  renderA
} from '../schema/articleRenderer'
import checkArticleGuidelines from '../schema/articleGuidelines'
import { Hints } from '../components/Hints'

/*
 *  Page
 */

const ModalContext = React.createContext<any>({})

function Create({ defaultValue, onExit, onChange, title }) {
  const editor = useMemo(
    () => withPlugin(withArticle(withHistory(withReact(createEditor())))),
    []
  )
  const [value, setValue] = useState<Node[]>(
    [{ type: 'h', level: 1, children: [{ text: title }] }].concat(defaultValue)
  )
  const [ready, setReady] = useState(true)
  useEffect(() => {
    Editor.normalize(editor, { force: true })
    //console.log(editor.children)
    setReady(true)
  }, [editor])
  const [modalOpen, setModalOpen] = React.useState(false)
  const [comp, setComp] = React.useState(null)
  const [hints, setHints] = React.useState([])
  function doEdit(component) {
    setComp(component)
    setModalOpen(true)
  }
  function closeModal() {
    setModalOpen(false)
  }
  return (
    <>
      <HSpace amount={15} />
      <ModalContext.Provider value={{ doEdit, closeModal }}>
        <Slate
          editor={editor}
          value={value}
          onChange={value => {
            setValue(value)
            onChange(value)
            setHints(checkArticleGuidelines(value))
          }}
        >
          <Toolbox onExit={onExit} />
          <Hints hints={hints} />
          <Container>
            {ready && (
              <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
            )}
          </Container>
          <Modal
            isOpen={modalOpen}
            style={{ overlay: { zIndex: 1000 } }}
            onRequestClose={() => setModalOpen(false)}
          >
            {comp}
          </Modal>
        </Slate>
      </ModalContext.Provider>
      <HSpace amount={200} />
    </>
  )
}

function Toolbox({ onExit }) {
  const editor = useSlate()
  let marks = Editor.marks(editor)
  if (!marks) marks = {}
  const { selection } = editor
  let showAdds = false
  if (Range.isRange(selection)) {
    if (Range.isCollapsed(selection)) {
      const parent = Node.get(editor, Path.parent(selection.anchor.path))
      if (
        parent.type == 'p' &&
        parent.children.length == 1 &&
        parent.children[0].text == ''
      ) {
        showAdds = true
      }
    }
  }
  return (
    <StyledToolbox>
      <ToolButton active={marks.strong} onMouseDown={() => onExit()}>
        <strong>EXIT</strong>
      </ToolButton>
      {'| '}
      <ToolButton
        active={marks.strong}
        onMouseDown={e => {
          if (marks.strong) Editor.removeMark(editor, 'strong')
          else Editor.addMark(editor, 'strong', true)
          e.preventDefault()
        }}
      >
        Fett
      </ToolButton>
      <ToolButton
        active={marks.em}
        onMouseDown={e => {
          if (marks.em) Editor.removeMark(editor, 'em')
          else Editor.addMark(editor, 'em', true)
          e.preventDefault()
        }}
      >
        Kursiv
      </ToolButton>
      <ToolButton
        active={marks.color == 'blue'}
        onMouseDown={e => {
          if (marks.color == 'blue') Editor.removeMark(editor, 'color')
          else Editor.addMark(editor, 'color', 'blue')
          e.preventDefault()
        }}
      >
        Blau
      </ToolButton>
      <ToolButton
        active={marks.color == 'green'}
        onMouseDown={e => {
          if (marks.color == 'green') Editor.removeMark(editor, 'color')
          else Editor.addMark(editor, 'color', 'green')
          e.preventDefault()
        }}
      >
        Grün
      </ToolButton>
      <ToolButton
        active={marks.color == 'orange'}
        onMouseDown={e => {
          if (marks.color == 'orange') Editor.removeMark(editor, 'color')
          else Editor.addMark(editor, 'color', 'orange')
          e.preventDefault()
        }}
      >
        Orange
      </ToolButton>
      <ToolButton
        onMouseDown={e => {
          Editor.removeMark(editor, 'color')
          Editor.removeMark(editor, 'strong')
          Editor.removeMark(editor, 'em')
          e.preventDefault()
        }}
      >
        Form. lös.
      </ToolButton>
      | &nbsp;
      {Range.isRange(selection) && Range.isExpanded(selection) && (
        <ToolButton
          onMouseDown={e => {
            e.preventDefault()
            Transforms.wrapNodes(
              editor,
              {
                type: 'a',
                href: '',
                children: [{ text: '' }]
              },
              { split: true }
            )
          }}
        >
          +A
        </ToolButton>
      )}
      {showAdds ? (
        <>
          <ToolButton
            onMouseDown={e => {
              e.preventDefault()
              Transforms.removeNodes(editor)
              Transforms.insertNodes(editor, {
                type: 'h',
                level: 2,
                children: [{ text: '' }]
              })
            }}
          >
            +H2
          </ToolButton>
          <ToolButton
            onMouseDown={e => {
              e.preventDefault()
              Transforms.removeNodes(editor)
              Transforms.insertNodes(editor, {
                type: 'h',
                level: 3,
                children: [{ text: '' }]
              })
            }}
          >
            +H3
          </ToolButton>
          <ToolButton
            onMouseDown={e => {
              e.preventDefault()
              Transforms.removeNodes(editor)
              Transforms.insertNodes(editor, {
                type: 'h',
                level: 4,
                children: [{ text: '' }]
              })
            }}
          >
            +H4
          </ToolButton>
          <ToolButton
            onMouseDown={e => {
              e.preventDefault()
              Transforms.removeNodes(editor)
              Transforms.insertNodes(editor, {
                type: 'spoiler-container',
                children: [
                  { type: 'spoiler-title', children: [{ text: '' }] },
                  { type: 'spoiler-body', children: [{ text: '' }] }
                ]
              })
            }}
          >
            +Sp.
          </ToolButton>
          <ToolButton
            onMouseDown={e => {
              e.preventDefault()
              Transforms.removeNodes(editor)
              Transforms.insertNodes(editor, {
                type: 'img',
                src: '',
                alt: '',
                children: [{ text: '' }]
              })
            }}
          >
            +Img
          </ToolButton>
          <ToolButton
            onMouseDown={e => {
              e.preventDefault()
              Transforms.removeNodes(editor)
              Transforms.insertNodes(editor, {
                type: 'important',
                children: [{ text: '' }]
              })
            }}
          >
            +Imp.
          </ToolButton>
          <ToolButton
            onMouseDown={e => {
              e.preventDefault()
              Transforms.removeNodes(editor)
              Transforms.insertNodes(editor, {
                type: 'ul',
                children: [{ type: 'li', children: [{ text: '' }] }]
              })
            }}
          >
            +Ul
          </ToolButton>
          <ToolButton
            onMouseDown={e => {
              e.preventDefault()
              Transforms.removeNodes(editor)
              Transforms.insertNodes(editor, {
                type: 'ol',
                children: [{ type: 'li', children: [{ text: '' }] }]
              })
            }}
          >
            +Ol
          </ToolButton>
          <ToolButton
            onMouseDown={e => {
              e.preventDefault()
              Transforms.removeNodes(editor)
              Transforms.insertNodes(editor, {
                type: 'math',
                formula: '',
                children: [{ text: '' }]
              })
            }}
          >
            +For.
          </ToolButton>
          <ToolButton
            onMouseDown={e => {
              e.preventDefault()
              Transforms.removeNodes(editor)
              Transforms.insertNodes(editor, {
                type: 'row',
                children: [
                  { type: 'col', size: 6, children: [{ text: '' }] },
                  { type: 'col', size: 6, children: [{ text: '' }] }
                ]
              })
            }}
          >
            +Lay.
          </ToolButton>
        </>
      ) : (
        <ToolButton
          onMouseDown={e => {
            e.preventDefault()
            Transforms.insertNodes(editor, {
              type: 'inline-math',
              formula: '',
              children: [{ text: '' }]
            })
          }}
        >
          +Formel
        </ToolButton>
      )}
    </StyledToolbox>
  )
}

export default Create

/*
 *  Renderer
 */

const simpleRenderer = {
  h: renderH,
  ul: renderUl,
  ol: renderOl,
  li: renderLi,
  important: renderImportant
}

const componentRenderer = {
  p: MyP,
  img: MyImg,
  'spoiler-container': MySpoiler,
  'spoiler-title': MySpoilerTitle,
  'spoiler-body': MySpoilerBody,
  row: MyLayout,
  col: MyCol,
  a: MyA,
  'inline-math': MyInlineMath,
  math: MyMath
}

function renderElement(props) {
  const { element } = props
  const type = element.type

  if (type) {
    if (type in simpleRenderer) {
      return simpleRenderer[type](props)
    }
    if (type in componentRenderer) {
      const Comp = componentRenderer[type]
      return <Comp {...props} />
    }
  }

  console.log('unknown element, ignoring', element)
  return null
}

/*
 *  Schema
 */

function withPlugin(editor) {
  const { normalizeNode, insertBreak } = editor

  editor.normalizeNode = entry => {
    const [node, path] = entry as [Node, Path]

    if (Element.isElement(node) || path.length === 0) {
      // layout begins with h1 and ends with empty paragraph
      if (path.length === 0) {
        const childCount = editor.children.length
        if (
          childCount < 1 ||
          editor.children[0].type !== 'h' ||
          editor.children[0].level !== 1
        ) {
          console.log('create: missing h1')
          Transforms.insertNodes(
            editor,
            {
              type: 'h',
              level: 1,
              children: [{ text: 'Überschrift des Artikels' }]
            },
            { at: [0], voids: true }
          )
          return
        }
        if (
          childCount < 1 ||
          editor.children[childCount - 1].type !== 'p' ||
          editor.children[childCount - 1].children.length !== 1 ||
          editor.children[childCount - 1].children[0].text !== ''
        ) {
          console.log('create: missing ending paragraph')
          Transforms.insertNodes(
            editor,
            {
              type: 'p',
              children: [{ text: '' }]
            },
            { at: [childCount], voids: true }
          )
          return
        }
      }
    }
    normalizeNode(entry)
  }

  editor.insertBreak = () => {
    const { selection } = editor
    insertBreak()
  }

  return editor
}

/*
 *  Components
 */

const SpoilerContext = React.createContext<any>({})

function MySpoiler(props) {
  const [open, setOpen] = React.useState(true)
  const { attributes, children } = props
  function toggleOpen() {
    setOpen(!open)
  }
  return (
    <SpoilerContext.Provider value={{ open, toggleOpen }}>
      {renderSpoilerContainer({ attributes, children })}
    </SpoilerContext.Provider>
  )
}

function MySpoilerTitle(props) {
  const { attributes, children } = props
  const context = React.useContext(SpoilerContext)
  return renderSpoilerTitle({
    attributes: { ...attributes, style: { cursor: 'inherit' } },
    children: (
      <>
        <VoidSpan
          onClick={() => {
            context.toggleOpen()
          }}
          role="button"
        >
          {renderSpoilerToggle(context.open)}
        </VoidSpan>
        {children}
      </>
    )
  })
}

function MySpoilerBody(props) {
  const { attributes, children } = props
  const context = React.useContext(SpoilerContext)
  return renderSpoilerBody({
    attributes: {
      ...attributes,
      style: { display: context.open ? 'block' : 'none' }
    },
    children
  })
}

function MyMath(props) {
  const { attributes, element, children } = props
  const editor = useEditor()
  const path = ReactEditor.findPath(editor, element)
  const { doEdit } = React.useContext(ModalContext)
  const { selection } = editor
  let highlight = selection && Range.includes(selection, path)
  return renderMath({
    element,
    attributes,
    children,
    wrapFormula: comp => (
      <>
        <Tippy
          content={
            <button onClick={() => doEdit(<MathSettings path={path} />)}>
              Formel bearbeiten
            </button>
          }
          interactive
          zIndex={50}
          appendTo={document.body}
        >
          <span style={{ outline: highlight ? '1px solid lightblue' : 'none' }}>
            {element.formula ? comp : '[leere Formel]'}
          </span>
        </Tippy>
        {children}
      </>
    )
  })
}

function MyInlineMath(props) {
  const { attributes, element, children } = props
  const editor = useEditor()
  const path = ReactEditor.findPath(editor, element)
  const { doEdit } = React.useContext(ModalContext)
  const { selection } = editor
  let highlight = selection && Range.includes(selection, path)
  return (
    <VoidSpan {...attributes}>
      <Tippy
        content={
          <button onClick={() => doEdit(<MathSettings path={path} />)}>
            Formel bearbeiten
          </button>
        }
        interactive
        zIndex={50}
        appendTo={document.body}
      >
        <span style={{ outline: highlight ? '1px solid lightblue' : 'none' }}>
          {element.formula ? renderInlineMath({ element }) : '[leere Formel]'}
        </span>
      </Tippy>
      {children}
    </VoidSpan>
  )
}

function MathSettings(props) {
  const { path } = props
  const editor = useEditor()
  const element = Node.get(editor, path)
  const [formula, setFormula] = React.useState(element.formula)
  const { closeModal } = React.useContext(ModalContext)
  return (
    <>
      <LatexInputArea
        onChange={e => {
          setFormula(e.target.value)
          Transforms.setNodes(editor, { formula: e.target.value }, { at: path })
        }}
        value={formula}
      />
      <br />
      <br />
      <button onClick={() => closeModal()}>Fertig</button>
      <br />
      <br />
      <hr />
      {renderMath({ element: { formula } })}
    </>
  )
}

function MyA(props) {
  const { attributes, element, children } = props
  const editor = useEditor()
  const path = ReactEditor.findPath(editor, element)
  const { doEdit } = React.useContext(ModalContext)
  return (
    <Tippy
      content={
        <button onClick={() => doEdit(<ASettings path={path} />)}>
          Link bearbeiten
        </button>
      }
      interactive
      zIndex={50}
      placement="top-end"
      appendTo={document.body}
    >
      {renderA({
        element,
        attributes,
        children,
        wrapExtInd: comp => <VoidSpan>{comp}</VoidSpan>
      })}
    </Tippy>
  )
}

function ASettings(props) {
  const { path } = props
  const editor = useEditor()
  const element = Node.get(editor, path)
  const [href, setHref] = React.useState(element.href)
  const [preview, setPreview] = React.useState(false)
  const { closeModal } = React.useContext(ModalContext)
  return (
    <>
      <label>
        Link-Adresse:
        <br />
        <input
          type="text"
          value={href}
          size={50}
          onChange={e => {
            setHref(e.target.value)
            Transforms.setNodes(editor, { href: e.target.value }, { at: path })
          }}
        />
      </label>
      <br />
      <br />
      <button
        onClick={() => {
          Transforms.unwrapNodes(editor, { at: path })
          closeModal()
        }}
      >
        Löschen
      </button>{' '}
      <button onClick={() => closeModal()}>Fertig</button>
      <br />
      <br />
      <hr />
      <input
        type="checkbox"
        checked={preview}
        onChange={e => setPreview(e.target.checked)}
      />
      Vorschau (funktioniert nicht bei jeder externen Website):
      <br />
      <br />
      {preview && (
        <iframe src={href} style={{ width: '100%', height: '600px' }} />
      )}
    </>
  )
}

function MyP(props) {
  const { attributes, element, children } = props
  const editor = useEditor()
  const path = ReactEditor.findPath(editor, element)

  return renderP({
    attributes: { ...attributes },
    children,
    value: editor,
    path
  })
}

function MyLayout(props) {
  const { attributes, element, children } = props
  const editor = useEditor()
  const { selection } = editor
  const path = ReactEditor.findPath(editor, element)
  let highlight = selection && Range.includes(selection, path)
  const { doEdit } = React.useContext(ModalContext)
  return (
    <Tippy
      content={
        <VoidSpan>
          <button onClick={() => doEdit(<LayoutSettings path={path} />)}>
            Layout bearbeiten
          </button>
        </VoidSpan>
      }
      interactive
      placement="top-end"
      zIndex={50}
      appendTo={document.body}
    >
      {renderRow({
        attributes: {
          ...attributes,
          style: { backgroundColor: highlight ? '#f5f5ff' : 'transparent' }
        },
        children
      })}
    </Tippy>
  )
}

function LayoutSettings(props) {
  const { path } = props
  const editor = useEditor()
  const element = Node.get(editor, path)
  const { closeModal } = React.useContext(ModalContext)
  return (
    <>
      <p>Verhältnis der Spalten:</p>
      {element.children.map((entry, index) => (
        <input
          type="number"
          value={entry.size}
          key={index}
          min={1}
          onChange={e => {
            Transforms.setNodes(
              editor,
              { size: parseInt(e.target.value) },
              { at: path.concat(index) }
            )
          }}
        />
      ))}
      <button
        onClick={() => {
          Transforms.insertNodes(
            editor,
            {
              type: 'col',
              size: 4,
              children: [{ text: '' }]
            },
            { at: path.concat(element.children.length) }
          )
        }}
      >
        Spalte hinzu
      </button>
      <br />
      <br />
      <button
        onClick={() => {
          for (const [child, childpath] of Node.children(editor, path)) {
            Transforms.setNodes(editor, { size: 9999 }, { at: childpath })
            Transforms.setNodes(editor, { size: child.size }, { at: childpath })
          }
          closeModal()
        }}
      >
        Fertig
      </button>
      <br />
      <br />
      <hr />
      <br />
      <br />
      {renderRow({
        children: (
          <>
            {element.children.map((entry, index) =>
              renderCol({
                element: entry,
                attributes: {
                  key: index,
                  style: { backgroundColor: hsl(index * 200, 0.75, 0.4) }
                },
                children: <>&nbsp;</>,
                value: editor,
                path: path.concat(index)
              })
            )}
          </>
        )
      })}
    </>
  )
}

function MyCol(props) {
  const { attributes, element, children } = props
  const editor = useEditor()
  const { selection } = editor
  const path = ReactEditor.findPath(editor, element)
  let highlight = selection && Range.includes(selection, path)

  return renderCol({
    element,
    attributes: {
      ...attributes,
      style: { outline: highlight ? '1px solid lightblue' : 'none' }
    },
    children,
    value: editor,
    path
  })
}

function MyImg(props) {
  const { attributes, element, children } = props
  const editor = useEditor()
  const { selection } = editor
  const path = ReactEditor.findPath(editor, element)
  let highlight = selection && Range.includes(selection, path)
  const { doEdit } = React.useContext(ModalContext)

  return renderImg({
    element,
    attributes: {
      ...attributes,
      style: {
        outline: highlight ? '1px solid lightblue' : 'none'
      }
    },
    children,
    wrapImg: comp => (
      <Tippy
        content={
          <button onClick={() => doEdit(<ImgSettings path={path} />)}>
            Bild bearbeiten
          </button>
        }
        interactive
        zIndex={50}
        placement="top-end"
        appendTo={document.body}
      >
        {comp}
      </Tippy>
    )
  })
}

function ImgSettings(props) {
  const { path } = props
  const editor = useEditor()
  const element = Node.get(editor, path)
  const [src, setSrc] = React.useState(element.src)
  const [alt, setAlt] = React.useState(element.alt)
  const [maxWidth, setMaxWidth] = React.useState(element.maxWidth)
  const { closeModal } = React.useContext(ModalContext)
  return (
    <>
      <label>
        Bildquelle:
        <br />
        <input
          type="text"
          size={50}
          value={src}
          onChange={e => {
            setSrc(e.target.value)
            Transforms.setNodes(editor, { src: e.target.value }, { at: path })
          }}
        />
      </label>
      <br />
      <br />
      <label>
        Beschreibung
        <br />
        <input
          type="text"
          size={50}
          value={alt}
          onChange={e => {
            setAlt(e.target.value)
            Transforms.setNodes(editor, { alt: e.target.value }, { at: path })
          }}
        />
      </label>
      <br />
      <br />
      <label>
        Maximale Breite in pixel (0 = volle Breite)
        <br />
        <input
          type="number"
          size={50}
          min={0}
          step={50}
          value={maxWidth || 0}
          onChange={e => {
            setMaxWidth(e.target.value)
            Transforms.setNodes(
              editor,
              { maxWidth: e.target.value },
              { at: path }
            )
          }}
        />
      </label>
      <br />
      <br />
      <button onClick={() => closeModal()}>Fertig</button>
      <br />
      <br />
      <hr />
      Vorschau:
      <br />
      <br />
      {renderImg({ element })}
    </>
  )
}

const StyledToolbox = styled.div`
  padding-top: 5px;
  padding-left: 5px;
  background-color: white;
  border: 1px solid lightblue;
  margin-bottom: 12px;
  position: sticky;
  top: 0;
  z-index: 100;
`

const Container = styled.div`
  padding-top: 30px;
  border: 1px solid lightgreen;
`

const VoidSpan = styled.span.attrs({ contentEditable: false })`
  user-select: none;
`

const LatexInputArea = styled.textarea`
  width: 100%;
  height: 200px;
  font-size: 1.2rem;
  margin-top: 30px;
`

const ToolButton = styled.button<{ active?: boolean }>`
  color: black;
  background-color: ${props => (props.active ? 'lightblue' : 'transparent')};
  border: 1px solid black;
  padding: 4px;
  margin-right: 10px;
  margin-bottom: 5px;
`

/*
 *  Value
 */

const testMakeInlineVoidNodesVoid = [
  {
    type: 'p',
    children: [
      {
        type: 'inline-math',
        formula: 'a^2 + b^2 = c^2',
        children: [{ text: '123' }, { text: '45' }]
      }
    ]
  }
]

const testTopLevelTextNodes = [{ text: '123' }]

const testUnwrapBlockInInline = [
  {
    type: 'p',
    children: [
      {
        type: 'a',
        href: 'https://serlo.de',
        children: [
          {
            type: 'p',
            children: [
              {
                type: 'p',
                children: [{ text: 'hallo' }]
              }
            ]
          }
        ]
      }
    ]
  }
]

const testDisallowANesting = [
  {
    type: 'p',
    children: [
      {
        type: 'a',
        href: 'https://serlo.de',
        children: [
          {
            type: 'a',
            href: 'https://serlo.de',
            children: [
              {
                text: '123'
              }
            ]
          }
        ]
      }
    ]
  }
]

const testCheckAllowedChildren = [
  {
    type: 'col',
    size: 12,
    children: [
      { text: '123' },
      {
        type: 'important',
        children: [{ text: '' }]
      }
    ]
  }
]

const testSpoilerNormalization = [
  {
    type: 'spoiler-container',
    children: [
      { type: 'spoiler-body', children: [{ text: 't1' }] },
      { type: 'spoiler-title', children: [{ text: 't2' }] }
    ]
  }
]

const testMergeLists = [
  {
    type: 'ol',
    children: [
      {
        type: 'li',
        children: [{ text: 'entry 1' }]
      }
    ]
  },

  {
    type: 'ol',
    children: [
      {
        type: 'li',
        children: [{ text: 'entry 2' }]
      }
    ]
  }
]

const initialValue = [
  { type: 'h', level: 1, children: [{ text: 'Titel des Artikels' }] },
  {
    type: 'spoiler-container',
    children: [
      {
        type: 'p',
        children: [{ text: '???' }]
      }
    ]
  },
  {
    type: 'h',
    level: 10,
    children: [{ text: 'Das ist die Hauptüberschrift (h2)' }]
  },
  {
    type: 'p',
    children: [
      { text: 'Hallo Welt!' },
      { text: 'dudu ', strong: true, em: true },
      {
        type: 'inline-math',
        formula: 'a^2 + b^2 = c^2',
        children: [{ text: '' }]
      },
      { text: 'das ist cool udn hier: ', color: 'blue' },
      {
        type: 'a',
        href: 'https://de.serlo.org/',
        children: [{ text: 'Hier lang!' }]
      },
      {
        text: ' omg, this is mind blowing'
      }
    ]
  },
  {
    type: 'math',
    formula: 'E=mc^2',
    children: [{ text: '' }]
  },
  {
    type: 'h',
    level: 3,
    children: [{ text: 'Ein Teilbereich davon ist (h3)' }]
  },
  {
    type: 'h',
    level: 1,
    children: [{ text: 'ein streun\nener Titel' }]
  },
  {
    type: 'spoiler-container',
    children: [
      {
        type: 'spoiler-title',
        children: [
          {
            text:
              'Klapp mich dslkfjs lfkjd lkjsf ljk lskfjlskjf lsdjkfl skfjklsfj lskjflskdfj lsfj klsj l'
          }
        ]
      },
      {
        type: 'spoiler-body',
        children: [
          {
            type: 'p',
            children: [{ text: 'Hier bin ich!' }]
          },
          {
            type: 'p',
            children: [{ text: 'Und noch mehr!' }]
          },
          {
            type: 'spoiler-container',
            title: 'Noch einer',
            children: [
              {
                type: 'spoiler-body',
                children: [
                  { text: '...', color: 'blue' },
                  { text: '---', color: 'green' },
                  { text: '***', color: 'orange' }
                ]
              },
              {
                type: 'p',
                children: [{ text: 'ich sollte hier nicht sein' }]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    type: 'p',
    children: [{ text: 'Und jetzt kommt eine Liste:' }]
  },
  {
    type: 'ul',
    children: [
      {
        type: 'li',
        children: [
          {
            type: 'p',
            children: [{ text: ' das erste Element' }]
          }
        ]
      },
      {
        type: 'p',
        children: [{ text: 'auch ich sollte nicht sichtbar sein' }]
      },
      {
        type: 'li',
        children: [
          {
            type: 'p',
            children: [{ text: 'Das zweite Item auf der Liste' }]
          }
        ]
      }
    ]
  },
  { type: 'p', children: [{ text: 'Ein wenig Abstand' }] },
  {
    type: 'h',
    level: 4,
    children: [{ text: 'Ein ganz kleine Überschrift (h4)' }]
  },
  { type: 'p', children: [{ text: 'Eine kleine Stilkritik' }] },
  { type: 'h', level: 5, children: [{ text: 'Ein Überschriftchen (h5)' }] },
  { type: 'p', children: [{ text: 'Und hier eine Aufzählung:' }] },
  {
    type: 'ol',
    children: [
      {
        type: 'li',
        children: [{ text: 'Gehe 100 Schritte' }]
      },
      {
        type: 'li',
        children: [{ text: 'Drehe dich 90 Grad' }]
      },
      {
        type: 'li',
        children: [{ text: 'Hüpfe' }]
      }
    ]
  },
  {
    type: 'important',
    children: [
      {
        type: 'p',
        children: [
          {
            text:
              'Aufgepasst, eine wichtige Durchsage! Es geht um die Erstellung einer ganz ordentlich schönen Aufgabe. Dieser Text ist voll gaga'
          }
        ]
      }
    ]
  },
  {
    type: 'row',
    children: [
      {
        type: 'col',
        size: 6,
        children: [
          {
            type: 'p',
            children: [{ text: 'Spalte 1' }]
          }
        ]
      },
      {
        type: 'col',
        size: 6,
        children: [
          {
            type: 'p',
            children: [{ text: 'Spalte 2' }]
          }
        ]
      },
      {
        type: 'col',
        size: -6,
        children: [
          {
            type: 'p',
            children: [{ text: 'Spalte 3' }]
          }
        ]
      },
      {
        type: 'col',
        size: 20,
        children: [
          {
            type: 'p',
            children: [{ text: 'Spalte 4' }]
          }
        ]
      }
    ]
  },
  {
    type: 'img',
    src: 'http://loremflickr.com/500/300',
    alt: 'some lorem pixel',
    children: [{ text: '' }]
  }
]
