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
  useSlate
} from 'slate-react'
import { withHistory } from 'slate-history'

import withArticle, { onlySomeBlocksAllowed } from '../schema/articleNormalizer'
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
  renderA,
  articleColors
} from '../schema/articleRenderer'
import checkArticleGuidelines from '../schema/articleGuidelines'
import { Hints } from '../components/Hints'
import { HSpace } from '../components/content/HSpace'

const ModalContext = React.createContext<any>({})

export default function Create({ value, onChange }) {
  const editor = React.useMemo(
    () => withPlugin(withArticle(withHistory(withReact(createEditor())))),
    []
  )
  const [modal, setModal] = React.useState(null)
  const [hints, setHints] = React.useState(() => checkArticleGuidelines(value))
  return (
    <ModalContext.Provider
      value={{
        doEdit: comp => {
          setModal(comp)
        },
        closeModal: () => setModal(null)
      }}
    >
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
          {<Editable renderElement={renderElement} renderLeaf={renderLeaf} />}
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

function Toolbar() {
  // Toolbar sollte Elemente nur nach ganz bestimmten Kriterien anzeigen
  const editor = useEditor()
  const { selection } = editor

  // Zeige nur sinnvolle Optionen an
  function getNextElementPath(p, block = true) {
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
  const selectType = []
  let selected = ''
  let selectBoxPath = []
  let allowedAdd = []
  let addCurrentNode
  let addCurrentPath
  if (selection) {
    const anchorParentPath = getNextElementPath(selection.anchor.path)
    const focusParentPath = getNextElementPath(selection.focus.path)
    if (Path.equals(anchorParentPath, focusParentPath)) {
      selectBoxPath = anchorParentPath
      let parent = Path.parent(anchorParentPath)
      let parentType =
        parent.length === 0 ? '#root' : Node.get(editor, parent).type
      const allowed = onlySomeBlocksAllowed.filter(
        obj => obj.parent == parentType
      )
      const node = Node.get(editor, anchorParentPath)
      if (node.level === 1) {
        selectType.push('h1')
        selected = 'h1'
      } else {
        if (allowed.length > 0) {
          if (allowed[0].children.includes('p')) selectType.push('p')
          if (allowed[0].children.includes('important'))
            selectType.push('important')
          if (allowed[0].children.includes('h')) {
            selectType.push('h2', 'h3', 'h4', 'h5')
          }
        }
        selected = node.type + (node.level || '')
      }
      if (Range.isCollapsed(selection) && allowed.length > 0) {
        // was darf man hier hinzufügen?
        ;['img', 'math', 'spoiler-container', 'ul', 'ol', 'row'].forEach(
          key => {
            if (allowed[0].children.includes(key)) allowedAdd.push(key)
          }
        )
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
    const inlineAnchorPath = getNextElementPath(selection.anchor.path, false)
    const inlineFocusPath = getNextElementPath(selection.focus.path, false)
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
            Transforms.insertNodes(editor, defaultInserts[key])
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
        children: [{ text: '' }]
      }
    ]
  },
  ol: {
    type: 'ol',
    children: [
      {
        type: 'li',
        children: [{ text: '' }]
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
  const { normalizeNode, insertBreak, insertNode } = editor

  editor.insertNode = entry => {
    console.log('hi')
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
        <TipOver
          content={
            <button onClick={() => doEdit(<MathSettings path={path} />)}>
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
  const { attributes, element, children } = props
  const editor = useEditor()
  const path = ReactEditor.findPath(editor, element)
  const { doEdit } = React.useContext(ModalContext)
  const { selection } = editor
  let highlight = selection && Range.includes(selection, path)
  return (
    <VoidSpan {...attributes}>
      <TipOver
        content={
          <button onClick={() => doEdit(<MathSettings path={path} />)}>
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
    <TipOver
      content={
        <button onClick={() => doEdit(<ASettings path={path} />)}>
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
  const { closeModal } = React.useContext(ModalContext)
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
    <TipOver
      content={
        <VoidSpan>
          <button onClick={() => doEdit(<LayoutSettings path={path} />)}>
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
      <TipOver
        content={
          <button onClick={() => doEdit(<ImgSettings path={path} />)}>
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
  const [maxWidth, setMaxWidth] = React.useState(element.maxWidth)
  const { closeModal } = React.useContext(ModalContext)
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
