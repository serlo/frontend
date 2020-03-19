import React, { useEffect, useState, useMemo } from 'react'
import styled from 'styled-components'

import { createEditor, Node, Transforms, Editor, Element, Range } from 'slate'
import { Slate, Editable, withReact, useEditor, ReactEditor } from 'slate-react'
import { withHistory } from 'slate-history'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHeartBroken,
  faExternalLinkAlt,
  faCaretDown,
  faCaretRight
} from '@fortawesome/free-solid-svg-icons'

import Header from '../src/components/navigation/Header'
import Footer from '../src/components/navigation/Footer'
import Math from '../src/components/content/Math'
import {
  StyledSpoiler,
  SpoilerContent,
  SpoilerTitle
} from '../src/components/content/Spoiler'
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

function Create() {
  const editor = useMemo(
    () => withPlugin(withHistory(withReact(createEditor()))),
    []
  )
  const [value, setValue] = useState<Node[]>(initialValue)
  useEffect(() => {
    Editor.normalize(editor, { force: true })
    console.log(editor.children)
  }, [editor])
  return (
    <>
      <Header />
      <StyledMain>
        <HSpace amount={15} />
        <Slate
          editor={editor}
          value={value}
          onChange={value => {
            setValue(value)
          }}
        >
          <Toolbox />
          <Container>
            <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
          </Container>
        </Slate>
        <HSpace amount={200} />
      </StyledMain>
      <Footer />
    </>
  )
}

function Toolbox() {
  const editor = useEditor()
  return (
    <StyledToolbox>
      <FontAwesomeIcon
        icon={faHeartBroken}
        onClick={e => {
          editor.insertText('heartbroken')
          e.preventDefault()
        }}
      />
      <FontAwesomeIcon icon={faHeartBroken} />
    </StyledToolbox>
  )
}

const StyledToolbox = styled.div`
  padding: 15px;
  background-color: white;
  svg:hover {
    color: lightblue;
    cursor: pointer;
  }
  svg {
    margin-right: 10px;
  }
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

export default Create

/*
------------------------------------------ Initial Value -------------------------------------
*/

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
    level: 2,
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
        href: 'https://google.de/',
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
    type: 'spoiler',
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
        type: 'spoiler-container',
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
            type: 'spoiler',
            title: 'Noch einer',
            children: [
              {
                type: 'spoiler-container',
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
        size: 6,
        children: [
          {
            type: 'p',
            children: [{ text: 'Spalte 3' }]
          }
        ]
      },
      {
        type: 'col',
        size: 6,
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

/*
------------------------------------------ Render Element -------------------------------------
*/

function renderElement(props) {
  const { element, attributes, children } = props
  if (element.type === 'h' && element.level === 1) {
    return (
      <StyledH1 {...attributes} editMode>
        {children}
      </StyledH1>
    )
  }
  if (element.type === 'h' && element.level === 2) {
    return <StyledH2 {...attributes}>{children}</StyledH2>
  }
  if (element.type === 'h' && element.level === 3) {
    return <StyledH3 {...attributes}>{children}</StyledH3>
  }
  if (element.type === 'h' && element.level === 4) {
    return <StyledH4 {...attributes}>{children}</StyledH4>
  }
  if (element.type === 'h' && element.level === 5) {
    return <StyledH5 {...attributes}>{children}</StyledH5>
  }
  if (element.type === 'p') {
    return <MyP {...props} />
  }
  if (element.type === 'math') {
    return (
      <MathCentered {...attributes} contentEditable={false}>
        <Math formula={element.formula} />
        {children}
      </MathCentered>
    )
  }
  if (element.type === 'spoiler') {
    return <MySpoiler {...props} />
  }
  if (element.type === 'spoiler-container') {
    return <MySpoilerContent {...props} />
  }
  if (element.type === 'spoiler-title') {
    return <MySpoilerTitle {...props} />
  }
  if (element.type === 'inline-math') {
    return (
      <span
        {...attributes}
        contentEditable={false}
        style={{ userSelect: 'none' }}
      >
        <Math formula={element.formula} inline />
        {children}
      </span>
    )
  }
  if (element.type === 'a') {
    if (element.href.startsWith('http')) {
      return (
        <StyledA href={element.href} {...attributes}>
          {children}
          <span contentEditable={false} style={{ userSelect: 'none' }}>
            {' '}
            <FontAwesomeIcon icon={faExternalLinkAlt} size="xs" />
          </span>
        </StyledA>
      )
    }
    return (
      <StyledA href={element.href} {...attributes}>
        {children}
      </StyledA>
    )
  }
  if (element.type === 'ul') {
    return <StyledUl {...attributes}>{children}</StyledUl>
  }
  if (element.type === 'ol') {
    return <StyledOl {...attributes}>{children}</StyledOl>
  }
  if (element.type === 'li') {
    return <StyledLi {...attributes}>{children}</StyledLi>
  }
  if (element.type === 'important') {
    return <Important {...attributes}>{children}</Important>
  }
  if (element.type === 'row') {
    return <MyLayout {...props} />
  }
  if (element.type === 'col') {
    return <MyCol {...props} />
  }
  if (element.type === 'img') {
    return <MyImg {...props} />
  }

  return <StyledP {...attributes}>{children}</StyledP>
}

/*
------------------------------------------ Render Leaf -------------------------------------
*/

const colors = {
  blue: '#1794c1',
  green: '#469a40',
  orange: '#ff6703'
}

function renderLeaf(props) {
  const { leaf, attributes, children } = props
  let result = children
  if (leaf.strong) {
    result = <strong>{result}</strong>
  }
  if (leaf.em) {
    result = <em>{result}</em>
  }
  if (leaf.color) {
    result = <span style={{ color: colors[leaf.color] }}>{result}</span>
  }
  return <span {...attributes}>{result}</span>
}

/*
------------------------------------------ Editor Plugin -------------------------------------
*/

function withPlugin(editor) {
  const { isVoid, isInline, normalizeNode } = editor

  editor.isVoid = element => {
    if (
      element.type == 'math' ||
      element.type == 'img' ||
      element.type == 'inline-math'
    ) {
      return true
    }
    return isVoid(element)
  }

  editor.isInline = element => {
    if (element.type == 'inline-math') {
      return true
    }
    if (element.type == 'a') {
      return true
    }
    return isInline(editor)
  }

  editor.normalizeNode = entry => {
    const [node, path] = entry

    if (editor.isVoid(node)) {
      if (
        !Array.isArray(node.children) ||
        node.children.length !== 1 ||
        node.children[0].text !== ''
      ) {
        Transforms.setNodes(editor, { children: [{ text: '' }] }, { at: path })
        return
      }
    }

    if (
      node.type === 'a' ||
      node.type === 'p' ||
      node.type === 'h' ||
      node.type === 'li'
    ) {
      // erlaube nur Inline
      if (!editor.isInline(node)) {
        Transforms.setNodes(editor, { children: [{ text: '' }] }, { at: path })
        return
      }
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i]
        if (Element.isElement(child) && !editor.isInline(child)) {
          Transforms.unwrapNodes(editor, { at: path.concat(i) })
          return
        }
      }
    }

    if (
      Element.isElement(node) &&
      (node.type === 'important' ||
        node.type === 'spoiler-container' ||
        node.type === 'col')
    ) {
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i]
        if (
          (Element.isElement(child) && editor.isInline(child)) ||
          child.text
        ) {
          // maybe merging text nodes?
          Transforms.wrapNodes(
            editor,
            { type: 'p', children: [] },
            { at: path.concat(i) }
          )
          return
        }
      }
      // erlaube nur Block
    }
    if (Element.isElement(node)) {
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i]
        const childpath = path.concat(i)
        if (
          node.type === 'spoiler' &&
          child.type !== 'spoiler-container' &&
          child.type !== 'spoiler-title'
        ) {
          Transforms.wrapNodes(
            editor,
            { type: 'spoiler-container', children: [] },
            { at: childpath }
          )
          return
        }
        if (node.type === 'row' && child.type !== 'col') {
          Transforms.wrapNodes(
            editor,
            { type: 'col', children: [] },
            { at: childpath }
          )
          return
        }
        if (node.type === 'ul' && child.type !== 'li') {
          Transforms.wrapNodes(
            editor,
            { type: 'li', children: [] },
            { at: childpath }
          )
          return
        }
        if (node.type === 'ol' && child.type !== 'li') {
          Transforms.wrapNodes(
            editor,
            { type: 'li', children: [] },
            { at: childpath }
          )
          return
        }
      }
    }
    if (Element.isElement(node)) {
      const parentType = Node.get(editor, path.slice(0, -1)).type
      if (node.type === 'spoiler-container') {
        if (path.length < 2 || parentType !== 'spoiler') {
          Transforms.removeNodes(editor, { at: path })
          return
        }
      }
      if (node.type === 'col') {
        if (path.length < 2 || parentType !== 'row') {
          Transforms.removeNodes(editor, { at: path })
          return
        }
      }
      if (node.type === 'li') {
        if (path.length < 2 || !(parentType === 'ul' || parentType === 'ol')) {
          Transforms.removeNodes(editor, { at: path })
          return
        }
      }
    }

    normalizeNode(entry)
  }

  return editor
}

/*
----------------------------------------- Adapted visuals -----------------------------------------
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
      <StyledSpoiler {...attributes}>{children}</StyledSpoiler>
    </SpoilerContext.Provider>
  )
}

function MySpoilerTitle(props) {
  const { attributes, children } = props
  const context = React.useContext(SpoilerContext)
  return (
    <SpoilerTitle {...attributes} as={'div'} style={{ cursor: 'inherit' }}>
      <span
        contentEditable={false}
        style={{ userSelect: 'none' }}
        onClick={() => {
          context.toggleOpen()
        }}
      >
        {context.open ? (
          <FontAwesomeIcon icon={faCaretDown} />
        ) : (
          <FontAwesomeIcon icon={faCaretRight} />
        )}{' '}
      </span>
      {children}
    </SpoilerTitle>
  )
}

function MySpoilerContent(props) {
  const { attributes, element, children } = props
  const context = React.useContext(SpoilerContext)
  return (
    <SpoilerContent
      {...attributes}
      style={{ display: context.open ? 'block' : 'none' }}
    >
      {children}
    </SpoilerContent>
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
  return (
    <LayoutRow
      {...attributes}
      style={{
        backgroundColor: highlight ? '#f5f5ff' : 'transparent'
      }}
    >
      {children}
    </LayoutRow>
  )
}

function MyCol(props) {
  const { attributes, element, children } = props
  const editor = useEditor()
  const { selection } = editor
  const path = ReactEditor.findPath(editor, element)
  let highlight = selection && Range.includes(selection, path)
  return (
    <Col
      {...attributes}
      size={element.size}
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
  return (
    <ImgCentered
      {...attributes}
      style={{ outline: highlight ? '1px solid lightblue' : 'none' }}
    >
      <StyledImg
        src={element.src}
        alt={element.alt}
        maxWidth={element.maxWidth ? element.maxWidth : 0}
        contentEditable={false}
      ></StyledImg>
      {children}
    </ImgCentered>
  )
}
