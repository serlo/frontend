import React from 'react'
import styled from 'styled-components'
import Tippy from '@tippyjs/react'
import Modal from '../components/Modal'
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
  useSelected
} from 'slate-react'
import { withHistory } from 'slate-history'

import { withArticle, articleSchema } from '../schema/articleNormalizer'
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
  renderSpoilerBody,
  renderA,
  articleColors,
  renderTR,
  renderTH,
  renderTD,
  renderTable,
  renderGeogebra
} from '../schema/articleRenderer'
import { checkArticleGuidelines } from '../schema/articleGuidelines'
import Hints from '../components/Hints'
import HSpace from '../components/content/HSpace'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnchor } from '@fortawesome/free-solid-svg-icons'
import SpecialCSS from '../components/content/SpecialCSS'
import SpoilerToggle from '../components/content/SpoilerToggle'

const ModalContext = React.createContext<any>({})

export default function Create({ value, onChange }) {
  const editor = React.useMemo(
    () => withPlugin(withArticle(withHistory(withReact(createEditor())))),
    []
  )

  const [modal, setModal] = React.useState(null)
  const [hints, setHints] = React.useState(() => checkArticleGuidelines(value))

  const renderElementWithEditor = React.useCallback(
    props => renderElement(props, editor),
    [editor]
  )

  const modalContext = React.useRef({ setModal })

  return (
    <ModalContext.Provider value={modalContext.current}>
      <Slate
        editor={editor}
        value={value}
        onChange={value => {
          onChange(value)
          setHints(checkArticleGuidelines(value))
        }}
      >
        <Toolbar />
        <Container>
          <SpecialCSS>
            {
              <Editable
                renderElement={renderElementWithEditor}
                renderLeaf={renderLeaf}
              />
            }
          </SpecialCSS>
        </Container>
        <Modal
          isOpen={modal !== null}
          style={{ overlay: { zIndex: 1000 } }}
          onRequestClose={() => setModal(null)}
        >
          {modal}
        </Modal>
        <HSpace amount={20} />
        <Hints hints={hints} />
        <HSpace amount={40} />
      </Slate>
    </ModalContext.Provider>
  )
}

function getNextElementPath(editor, p, block = true) {
  let path = p.slice(0)
  let node = Node.get(editor, path)
  while (
    path.length > 0 &&
    (!Element.isElement(node) || editor.isInline(node) === block)
  ) {
    path = Path.parent(path)
    node = Node.get(editor, path)
  }
  return path
}

function Toolbar() {
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
          'geogebra'
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
  }
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
    </>
  )
}

/*
 *  Renderer
 */

const simpleRenderer = {
  h: renderH,
  ul: renderUl,
  ol: renderOl,
  li: renderLi,
  important: renderImportant,
  table: renderTable,
  tr: renderTR,
  th: renderTH,
  td: renderTD,
  p: renderP
}

const componentRenderer = {
  img: MyImg,
  'spoiler-container': MySpoiler,
  'spoiler-title': MySpoilerTitle,
  'spoiler-body': MySpoilerBody,
  row: MyLayout,
  col: MyCol,
  a: MyA,
  'inline-math': MyInlineMath,
  math: MyMath,
  anchor: MyAnchor,
  geogebra: MyGeogebra
}

function renderElement(props, editor) {
  const { element } = props
  const type = element.type
  const path = ReactEditor.findPath(editor, element)

  if (type) {
    if (type in simpleRenderer) {
      return simpleRenderer[type](props)
    }
    if (type in componentRenderer) {
      const Comp = componentRenderer[type]
      return <Comp {...props} editor={editor} path={path} />
    }
  }

  console.log('unknown element, ignoring', element)
  return null
}

/*
 *  Schema
 */

function withPlugin(editor) {
  const { normalizeNode, insertBreak, insertNode } = editor

  editor.insertNode = entry => {
    insertNode(entry)
  }

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
              children: [{ text: '' }]
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
    if (Range.isCollapsed(selection)) {
      const enclosingBlockAnchorPath = getNextElementPath(
        editor,
        selection.anchor.path
      )
      const enclosingBlock = Node.get(editor, enclosingBlockAnchorPath)
      if (
        enclosingBlock.type === 'h' ||
        enclosingBlock.type === 'img' ||
        enclosingBlock.type === 'math'
      ) {
        enclosingBlockAnchorPath[enclosingBlockAnchorPath.length - 1]++
        Transforms.insertNodes(
          editor,
          { type: 'p', children: [{ text: '' }] },
          { at: enclosingBlockAnchorPath }
        )
        Transforms.select(editor, enclosingBlockAnchorPath)
        return
      }
      if (enclosingBlock.type === 'p') {
        const outerEnclosingBlockPath = getNextElementPath(
          editor,
          Path.parent(enclosingBlockAnchorPath)
        )
        const outerBlock = Node.get(editor, outerEnclosingBlockPath)
        if (Node.string(enclosingBlock) == '') {
          if (outerBlock.type === 'important') {
            outerEnclosingBlockPath[outerEnclosingBlockPath.length - 1]++
            Transforms.insertNodes(
              editor,
              {
                type: 'p',
                children: [{ text: '' }]
              },
              { at: outerEnclosingBlockPath }
            )
            Transforms.select(editor, outerEnclosingBlockPath)
            return
          }
          if (outerBlock.type === 'li') {
            const outerParentPath = Path.parent(outerEnclosingBlockPath)
            outerParentPath[outerParentPath.length - 1]++
            Transforms.insertNodes(
              editor,
              {
                type: 'p',
                children: [{ text: '' }]
              },
              { at: outerParentPath }
            )
            Transforms.select(editor, outerParentPath)
            return
          }
        }
        if (outerBlock.type === 'li') {
          outerEnclosingBlockPath[outerEnclosingBlockPath.length - 1]++
          Transforms.insertNodes(
            editor,
            {
              type: 'li',
              children: [
                {
                  type: 'p',
                  children: [{ text: '' }]
                }
              ]
            },
            { at: outerEnclosingBlockPath }
          )
          Transforms.select(editor, outerEnclosingBlockPath)
          return
        }
      }
    }

    insertBreak()
  }

  return editor
}

/*
 *  Components
 */

function SettingsInput(props) {
  const { innerProps, title } = props
  return (
    <>
      <label>
        {title}
        <br />
        <input type="text" size={50} {...innerProps} />
      </label>
      <br />
      <br />
    </>
  )
}

const SpoilerContext = React.createContext<any>({})

function TipOver(props) {
  return (
    <Tippy
      interactive
      zIndex={50}
      appendTo={typeof document !== 'undefined' ? document.body : undefined}
      {...props}
    />
  )
}

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
          <SpoilerToggle open={context.open} />
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
  const { attributes, element, children, path } = props
  const { setModal } = React.useContext(ModalContext)
  let highlight = useSelected()
  console.log('render math')
  return renderMath({
    element,
    attributes,
    children,
    wrapFormula: comp => (
      <>
        <TipOver
          content={
            <button onClick={() => setModal(<MathSettings path={path} />)}>
              Formel bearbeiten
            </button>
          }
        >
          <span style={{ outline: highlight ? '1px solid lightblue' : 'none' }}>
            {element.formula ? comp : '[leere Formel]'}
          </span>
        </TipOver>
        {children}
      </>
    )
  })
}

function MyInlineMath(props) {
  const { attributes, element, children, path } = props
  const { setModal } = React.useContext(ModalContext)
  let highlight = useSelected()
  return (
    <VoidSpan {...attributes}>
      <TipOver
        content={
          <button onClick={() => setModal(<MathSettings path={path} />)}>
            Formel bearbeiten
          </button>
        }
      >
        <span style={{ outline: highlight ? '1px solid lightblue' : 'none' }}>
          {element.formula ? renderInlineMath({ element }) : '[leere Formel]'}
        </span>
      </TipOver>
      {children}
    </VoidSpan>
  )
}

function MathSettings(props) {
  const { path } = props
  const editor = useEditor()
  const element = Node.get(editor, path)
  const [formula, setFormula] = React.useState(element.formula)
  const { setModal } = React.useContext(ModalContext)
  const [alignLeft, setAlignLeft] = React.useState(element.alignLeft)
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
      <label>
        <input
          type="checkbox"
          checked={alignLeft}
          onChange={e => {
            setAlignLeft(e.target.checked)
            if (e.target.checked) {
              Transforms.setNodes(editor, { alignLeft: true }, { at: path })
            } else {
              Transforms.unsetNodes(editor, 'alignLeft', { at: path })
            }
          }}
        />{' '}
        Linksbündig anzeigen
      </label>
      <br />
      <br />
      <button onClick={() => setModal(null)}>Fertig</button>
      <br />
      <br />
      <hr />
      {renderMath({ element: { formula, alignLeft } })}
    </>
  )
}

function MyA(props) {
  const { attributes, element, children, path } = props
  const { setModal } = React.useContext(ModalContext)
  return (
    <TipOver
      content={
        <button onClick={() => setModal(<ASettings path={path} />)}>
          Link bearbeiten
        </button>
      }
      placement="top-end"
    >
      {renderA({
        element,
        attributes,
        children,
        wrapExtInd: comp => <VoidSpan>{comp}</VoidSpan>
      })}
    </TipOver>
  )
}

function ASettings(props) {
  const { path } = props
  const editor = useEditor()
  const element = Node.get(editor, path)
  const [href, setHref] = React.useState(element.href)
  const [preview, setPreview] = React.useState(false)
  const { setModal } = React.useContext(ModalContext)
  return (
    <>
      <SettingsInput
        title="Link-Adresse:"
        innerProps={{
          value: href,
          onChange: e => {
            setHref(e.target.value)
            Transforms.setNodes(editor, { href: e.target.value }, { at: path })
          }
        }}
      />
      <button
        onClick={() => {
          Transforms.unwrapNodes(editor, { at: path })
          setModal(null)
        }}
      >
        Löschen
      </button>{' '}
      <button onClick={() => setModal(null)}>Fertig</button>
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

function MyLayout(props) {
  const { attributes, children, path } = props
  let highlight = useSelected()
  const { setModal } = React.useContext(ModalContext)
  return (
    <TipOver
      content={
        <VoidSpan>
          <button onClick={() => setModal(<LayoutSettings path={path} />)}>
            Layout bearbeiten
          </button>
        </VoidSpan>
      }
      placement="top-end"
    >
      {renderRow({
        attributes: {
          ...attributes,
          style: { backgroundColor: highlight ? '#f5f5ff' : 'transparent' }
        },
        children
      })}
    </TipOver>
  )
}

function LayoutSettings(props) {
  const { path } = props
  const editor = useEditor()
  const element = Node.get(editor, path)
  const { setModal } = React.useContext(ModalContext)
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
          setModal(null)
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
                children: <>&nbsp;</>
              })
            )}
          </>
        )
      })}
    </>
  )
}

function MyCol(props) {
  const { attributes, element, children, path } = props
  let highlight = useSelected()
  return renderCol({
    element,
    attributes: {
      ...attributes,
      style: { outline: highlight ? '1px solid lightblue' : 'none' }
    },
    children
  })
}

function MyImg(props) {
  const { attributes, element, children, path } = props
  let highlight = useSelected()
  const { setModal } = React.useContext(ModalContext)

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
      <TipOver
        content={
          <button onClick={() => setModal(<ImgSettings path={path} />)}>
            Bild bearbeiten
          </button>
        }
        placement="top-end"
      >
        {comp}
      </TipOver>
    )
  })
}

function ImgSettings(props) {
  const { path } = props
  const editor = useEditor()
  const element = Node.get(editor, path)
  const [src, setSrc] = React.useState(element.src)
  const [alt, setAlt] = React.useState(element.alt)
  const [href, setHref] = React.useState(element.href)
  const [maxWidth, setMaxWidth] = React.useState(element.maxWidth)
  const { setModal } = React.useContext(ModalContext)
  return (
    <>
      <SettingsInput
        title="Bildquelle:"
        innerProps={{
          value: src,
          onChange: e => {
            setSrc(e.target.value)
            Transforms.setNodes(editor, { src: e.target.value }, { at: path })
          }
        }}
      />
      <SettingsInput
        title="Beschreibung:"
        innerProps={{
          value: alt,
          onChange: e => {
            setAlt(e.target.value)
            Transforms.setNodes(editor, { alt: e.target.value }, { at: path })
          }
        }}
      />
      <SettingsInput
        title="Verlinkung (optional):"
        innerProps={{
          value: href || '',
          onChange: e => {
            setHref(e.target.value)
            Transforms.setNodes(editor, { href: e.target.value }, { at: path })
          }
        }}
      />
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
      <button onClick={() => setModal(null)}>Fertig</button>
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

function MyAnchor(props) {
  const { attributes, children, path } = props
  let highlight = useSelected()
  const { setModal } = React.useContext(ModalContext)

  return (
    <StyledAnchorPlaceholder
      {...attributes}
      contentEditable={false}
      style={{ userSelect: 'none' }}
    >
      <TipOver
        placement="right"
        content={
          <button onClick={() => setModal(<AnchorSettings path={path} />)}>
            Anchor bearbeiten
          </button>
        }
      >
        <StyledIconWrapper
          style={{ outline: highlight ? '1px solid lightblue' : 'none' }}
        >
          <FontAwesomeIcon icon={faAnchor} size="1x" />
        </StyledIconWrapper>
      </TipOver>
      {children}
    </StyledAnchorPlaceholder>
  )
}

function AnchorSettings(props) {
  const { path } = props
  const editor = useEditor()
  const element = Node.get(editor, path)
  const [id, setId] = React.useState(element.id)
  const { setModal } = React.useContext(ModalContext)
  return (
    <>
      <SettingsInput
        title="ID:"
        innerProps={{
          value: id,
          onChange: e => {
            setId(e.target.value)
            Transforms.setNodes(editor, { id: e.target.value }, { at: path })
          }
        }}
      />
      <button onClick={() => setModal(null)}>Fertig</button>
    </>
  )
}

function MyGeogebra(props) {
  const { element } = props
  const editor = useEditor()
  const path = ReactEditor.findPath(editor, element)
  const { setModal } = React.useContext(ModalContext)

  return (
    <TipOver
      placement="top"
      content={
        <button onClick={() => setModal(<AnchorSettings path={path} />)}>
          Applet bearbeiten
        </button>
      }
    >
      <div contentEditable={false} style={{ userSelect: 'none' }}>
        {renderGeogebra(props)}
      </div>
    </TipOver>
  )
}

const StyledAnchorPlaceholder = styled.div`
  position: relative;
  height: 0;
  width: 100%;
`

const StyledIconWrapper = styled.div`
  position: absolute;
  left: 2px;
  bottom: -4px;
`

const StyledToolbox = styled.div`
  padding: 5px;
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
