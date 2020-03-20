import React, { useEffect, useState, useMemo, Children } from 'react'
import styled from 'styled-components'

import {
  createEditor,
  Node,
  Transforms,
  Editor,
  Element,
  Range,
  Path,
  Text
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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faExternalLinkAlt,
  faCaretDown,
  faCaretRight
} from '@fortawesome/free-solid-svg-icons'
import Tippy from '@tippyjs/react'

import Header from '../src/components/navigation/Header'
import Footer from '../src/components/navigation/Footer'
import Math from '../src/components/content/Math'
import { StyledP } from '../src/components/tags/StyledP'
import { StyledH2 } from '../src/components/tags/StyledH2'
import { StyledH3 } from '../src/components/tags/StyledH3'
import { StyledH4 } from '../src/components/tags/StyledH4'
import { StyledH5 } from '../src/components/tags/StyledH5'
import { StyledUl } from '../src/components/tags/StyledUl'
import { StyledOl } from '../src/components/tags/StyledOl'
import { StyledLi } from '../src/components/tags/StyledLi'
import { StyledA } from '../src/components/tags/StyledA'
import { StyledImg } from '../src/components/tags/StyledImg'
import { StyledH1 } from '../src/components/tags/StyledH1'
import { StyledMain } from '../src/components/tags/StyledMain'
import { HSpace } from '../src/components/content/HSpace'
import { MathCentered } from '../src/components/content/MathCentered'
import { ImgCentered } from '../src/components/content/ImgCentered'
import { Important } from '../src/components/content/Important'
import { LayoutRow } from '../src/components/content/LayoutRow'
import { Col } from '../src/components/content/Col'
import { SpoilerContainer } from '../src/components/content/SpoilerContainer'
import { SpoilerTitle } from '../src/components/content/SpoilerTitle'
import { SpoilerBody } from '../src/components/content/SpoilerBody'
import Modal from '../src/components/Modal'
import { hsl } from 'polished'
import { Transform } from 'stream'

/*
 *  Page
 */

const ModalContext = React.createContext<any>({})

function Create() {
  const editor = useMemo(
    () => withPlugin(withHistory(withReact(createEditor()))),
    []
  )
  const [value, setValue] = useState<Node[]>(initialValue)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    Editor.normalize(editor, { force: true })
    console.log(editor.children)
    setReady(true)
  }, [editor])
  const [modalOpen, setModalOpen] = React.useState(false)
  const [comp, setComp] = React.useState(null)
  function doEdit(component) {
    setComp(component)
    setModalOpen(true)
  }
  function closeModal() {
    setModalOpen(false)
  }
  return (
    <>
      <Header />
      <StyledMain>
        <HSpace amount={15} />
        <ModalContext.Provider value={{ doEdit, closeModal }}>
          <Slate
            editor={editor}
            value={value}
            onChange={value => {
              setValue(value)
            }}
          >
            <Toolbox />
            <Container>
              {ready && (
                <Editable
                  renderElement={renderElement}
                  renderLeaf={renderLeaf}
                />
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
      </StyledMain>
      <Footer />
    </>
  )
}

function Toolbox() {
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

const StyledHx = {
  1: StyledH1,
  2: StyledH2,
  3: StyledH3,
  4: StyledH4,
  5: StyledH5
}

const simpleRenderer = {
  h: ({ element, attributes, children }) => {
    const Comp = StyledHx[element.level]
    return <Comp {...attributes}>{children}</Comp>
  },
  ul: ({ attributes, children }) => (
    <StyledUl {...attributes}>{children}</StyledUl>
  ),
  ol: ({ attributes, children }) => (
    <StyledOl {...attributes}>{children}</StyledOl>
  ),
  li: ({ attributes, children }) => (
    <StyledLi {...attributes}>{children}</StyledLi>
  ),
  important: ({ attributes, children }) => (
    <Important {...attributes}>{children}</Important>
  )
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
  const { element, attributes, children } = props

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

  return <StyledP {...attributes}>{children}</StyledP>
}

const colors = {
  blue: '#1794c1',
  green: '#469a40',
  orange: '#ff6703'
}

function renderLeaf(props) {
  const { leaf, attributes, children } = props
  const styles: any = {}
  if (leaf.color) {
    styles.color = colors[leaf.color]
  }
  if (leaf.strong) {
    styles.fontWeight = 'bold'
  }
  if (leaf.em) {
    styles.fontStyle = 'italic'
  }
  return (
    <span {...attributes} style={styles}>
      {children}
    </span>
  )
}

/*
 *  Schema
 */

const voidElements = ['math', 'img', 'inline-math']
const inlineElements = ['inline-math', 'a']
const onlyInlineChildren = ['a', 'p', 'h', 'li', 'spoiler-title']
const onlySomeBlocksAllowed = [
  {
    parent: 'spoiler-body',
    children: ['p', 'img', 'math', 'ul', 'ol', 'row'],
    wrap: 'p'
  },
  {
    parent: 'col',
    children: ['p', 'img', 'math', 'ul', 'ol'],
    wrap: 'p'
  },
  {
    parent: 'important',
    children: ['p', 'img', 'math', 'ul', 'ol', 'row'],
    wrap: 'p'
  },
  {
    parent: '#root',
    children: [
      'p',
      'h',
      'img',
      'math',
      'spoiler-container',
      'ul',
      'ol',
      'row',
      'important'
    ],
    wrap: 'p'
  },
  {
    parent: 'ul',
    children: ['li'],
    wrap: 'li'
  },
  {
    parent: 'ol',
    children: ['li'],
    wrap: 'li'
  },
  {
    parent: 'row',
    children: ['col'],
    wrap: 'col'
  }
]

function withPlugin(editor) {
  const { isVoid, isInline, normalizeNode, insertBreak } = editor

  editor.isVoid = element =>
    voidElements.includes(element.type) || isVoid(element)

  editor.isInline = element =>
    inlineElements.includes(element.type) || isInline(editor)

  editor.normalizeNode = entry => {
    const [node, path] = entry as [Node, Path]

    if (Element.isElement(node) || path.length === 0) {
      // void elements contain exactly one empty text node
      if (editor.isVoid(node)) {
        const children = node.children
        if (children.length > 0) {
          if (children.length !== 1 || children[0].text !== '') {
            console.log('n: remove children from void nodes')
            Transforms.removeNodes(editor, { at: path.concat(0), voids: true })
            return
          }
        }
      }
      // some elements only allow inline children
      if (onlyInlineChildren.includes(node.type)) {
        for (const [child, childpath] of Node.children(editor, path)) {
          if (Element.isElement(child) && !editor.isInline(child)) {
            console.log('n: only inlines allowed, unwrapping')
            Transforms.unwrapNodes(editor, { at: childpath, voids: true })
            return
          }
        }
      }
      // disallow nesting of anchors
      if (node.type === 'a') {
        for (const [anchestor] of Node.ancestors(editor, path, {
          reverse: true
        })) {
          if (Element.isElement(anchestor) && anchestor.type === 'a') {
            console.log('n: disallow a nesting, unwrapping inner')
            Transforms.unwrapNodes(editor, { at: path, voids: true })
            return
          }
        }
      }
      // check for allowed children
      for (const { parent, children, wrap } of onlySomeBlocksAllowed) {
        if (node.type === parent || (parent === '#root' && path.length === 0)) {
          for (const [child, childpath] of Node.children(editor, path)) {
            if (Text.isText(child)) {
              console.log('n: should be block, wrapping')
              Transforms.wrapNodes(
                editor,
                { type: wrap, children: [{ text: '' }] },
                { at: childpath, voids: true }
              )
              return
            }
            if (Element.isElement(child) && !children.includes(child.type)) {
              console.log('n: child not allowed, unwrapping')
              Transforms.unwrapNodes(editor, { at: childpath, voids: true })
              return
            }
          }
        }
      }
      // spoiler has exactly one title and one body
      if (node.type === 'spoiler-container') {
        if (
          node.children.length !== 2 ||
          node.children[0].type !== 'spoiler-title' ||
          node.children[1].type !== 'spoiler-body'
        ) {
          if (
            node.children.length < 2 ||
            node.children[0].type !== 'spoiler-title'
          ) {
            console.log('n: incomplete spoiler')
            Transforms.removeNodes(editor, { at: path, voids: true })
            return
          }

          let hasTitle = false
          let hasBody = false

          for (const [child, childpath] of Node.children(editor, path)) {
            if (child.type == 'spoiler-title') {
              if (hasTitle) {
                console.log('n: spoiler has too many titles')
                Transforms.removeNodes(editor, { at: childpath, voids: true })
                return
              }
              hasTitle = true
            } else if (child.type == 'spoiler-body') {
              if (hasBody || !hasTitle) {
                console.log('n: spoiler has too many bodys')
                Transforms.removeNodes(editor, { at: childpath, voids: true })
                return
              }
              hasBody = true
            } else {
              console.log('n: spoiler has invalid child')
              Transforms.removeNodes(editor, { at: childpath, voids: true })
              return
            }
          }
        }
      }
      // layout begins with h1 and ends with empty paragraph
      if (path.length === 0) {
        const childCount = editor.children.length
        if (
          childCount < 1 ||
          editor.children[0].type !== 'h' ||
          editor.children[0].level !== 1
        ) {
          console.log('n: missing h1')
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
          console.log('n: missing ending paragraph')
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
      // headings only on topleve and h1 only at beginning
      if (node.type === 'h') {
        if (!Number.isInteger(node.level) || node.level < 1 || node.level > 5) {
          console.log('n: heading is missing / has wrong level, removing')
          Transforms.removeNodes(editor, { at: path, voids: true })
          return
        }
        if (node.level == 1 && (path.length !== 1 || path[0] !== 0)) {
          console.log('n: h1 within document, unwrapping')
          Transforms.unwrapNodes(editor, { at: path, voids: true })
        }
      }
      // cols should have proper sizes
      if (node.type === 'col') {
        if (!Number.isInteger(node.size) || node.size <= 0) {
          console.log('n: col is missing / has wrong size', node.size)
          Transforms.setNodes(editor, { size: 4 }, { at: path, voids: true })
          return
        }
      }
      // remove empty links
      if (node.type === 'a') {
        if (node.children.length === 1 && node.children[0].text === '') {
          console.log('n: empty link, removing')
          Transforms.removeNodes(editor, { at: path })
          return
        }
      }
      // adjacent unordered lists should be merged
      for (let i = 1; i < node.children.length; i++) {
        if (
          node.children[i].type === node.children[i - 1].type &&
          (node.children[i].type === 'ul' || node.children[i].type === 'ol')
        ) {
          console.log('n: adjacent lists found, merging')
          Transforms.mergeNodes(editor, { at: path.concat(i), voids: true })
          return
        }
      }
    }

    normalizeNode(entry)
  }

  editor.insertBreak = () => {
    const { selection } = editor
    console.log(selection)
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
      <SpoilerContainer {...attributes}>{children}</SpoilerContainer>
    </SpoilerContext.Provider>
  )
}

function MySpoilerTitle(props) {
  const { attributes, children } = props
  const context = React.useContext(SpoilerContext)
  return (
    <SpoilerTitle {...attributes} style={{ cursor: 'inherit' }}>
      <VoidSpan
        onClick={() => {
          context.toggleOpen()
        }}
        role="button"
      >
        {context.open ? (
          <FontAwesomeIcon icon={faCaretDown} />
        ) : (
          <FontAwesomeIcon icon={faCaretRight} />
        )}{' '}
      </VoidSpan>
      {children}
    </SpoilerTitle>
  )
}

function MySpoilerBody(props) {
  const { attributes, element, children } = props
  const context = React.useContext(SpoilerContext)
  return (
    <SpoilerBody
      {...attributes}
      style={{ display: context.open ? 'block' : 'none' }}
    >
      {children}
    </SpoilerBody>
  )
}

function MyMath(props) {
  const { attributes, element, children } = props
  const editor = useEditor()
  const path = ReactEditor.findPath(editor, element)
  const { doEdit } = React.useContext(ModalContext)
  const { selection } = editor
  let highlight = selection && Range.includes(selection, path)
  return (
    <MathCentered {...attributes} contentEditable={false}>
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
          {element.formula ? (
            <Math formula={element.formula} />
          ) : (
            '[leere Formel]'
          )}
        </span>
      </Tippy>
      {children}
    </MathCentered>
  )
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
          {element.formula ? (
            <Math formula={element.formula} inline />
          ) : (
            '[leere Formel]'
          )}
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
      <MathCentered>
        <Math formula={formula} />
      </MathCentered>
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
      <StyledA href={element.href} {...attributes}>
        {children}
        {element.href.startsWith('http') && (
          <VoidSpan>
            {' '}
            <FontAwesomeIcon icon={faExternalLinkAlt} size="xs" />
          </VoidSpan>
        )}
      </StyledA>
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
  const parent = Node.parent(editor, path)
  const full = parent.type === 'li'

  const myIndex = path[path.length - 1]
  let halfslim = false
  if (myIndex < parent.children.length - 1) {
    const next = parent.children[myIndex + 1]
    if (next.type == 'ul' || next.type == 'ol') {
      halfslim = true
    }
  }

  return (
    <StyledP {...attributes} full={full} slim={full} halfslim={halfslim}>
      {children}
    </StyledP>
  )
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
      <LayoutRow
        {...attributes}
        style={{
          backgroundColor: highlight ? '#f5f5ff' : 'transparent'
        }}
      >
        {children}
      </LayoutRow>
    </Tippy>
  )
}

function LayoutSettings(props) {
  const { path } = props
  const editor = useEditor()
  const element = Node.get(editor, path)
  const { closeModal } = React.useContext(ModalContext)
  let sizeSum = 0
  for (const [child] of Node.children(editor, path)) {
    sizeSum += child.size
  }
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
            Transforms.unsetNodes(editor, 'size', { at: childpath })
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
      <LayoutRow>
        {element.children.map((entry, index) => (
          <Col
            cSize={(entry.size / sizeSum) * 24}
            key={index}
            style={{ backgroundColor: hsl(index * 200, 0.75, 0.4) }}
          >
            &nbsp;
          </Col>
        ))}
      </LayoutRow>
    </>
  )
}

function MyCol(props) {
  const { attributes, element, children } = props
  const editor = useEditor()
  const { selection } = editor
  const path = ReactEditor.findPath(editor, element)
  let highlight = selection && Range.includes(selection, path)
  const parent = Path.parent(path)
  let sizeSum = 0
  for (const [child] of Node.children(editor, parent)) {
    sizeSum += child.size
  }
  return (
    <Col
      {...attributes}
      cSize={(element.size / sizeSum) * 24}
      style={{ outline: highlight ? '1px solid lightblue' : 'none' }}
    >
      {children}
    </Col>
  )
}

function MyImg(props) {
  const { attributes, element, children } = props
  const editor = useEditor()
  const { selection } = editor
  const path = ReactEditor.findPath(editor, element)
  let highlight = selection && Range.includes(selection, path)
  const { doEdit } = React.useContext(ModalContext)

  return (
    <ImgCentered
      {...attributes}
      style={{ outline: highlight ? '1px solid lightblue' : 'none' }}
    >
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
        <StyledImg
          src={element.src}
          alt={element.alt || 'leeres Bild'}
          maxWidth={element.maxWidth ? element.maxWidth : 0}
          contentEditable={false}
        ></StyledImg>
      </Tippy>
      {children}
    </ImgCentered>
  )
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
      <ImgCentered>
        <StyledImg src={src} alt={alt} maxWidth={maxWidth} />
      </ImgCentered>
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
