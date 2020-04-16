import React from 'react'
import styled from 'styled-components'

import { createEditor } from 'slate'
import { Slate, Editable, withReact, ReactEditor, useEditor } from 'slate-react'
import { withHistory } from 'slate-history'

import {
  renderLeaf,
  renderH,
  renderUl,
  renderOl,
  renderLi,
  renderImportant,
  renderP,
  renderTR,
  renderTH,
  renderTD,
  renderTable
} from '../schema/articleRenderer'
import SpecialCSS from '../components/content/SpecialCSS'
import { withArticle } from '../schema/articleNormalizer'

import {
  MyImg,
  MySpoiler,
  MySpoilerTitle,
  MySpoilerBody,
  MyLayout,
  MyCol,
  MyA,
  MyInlineMath,
  MyMath,
  MyAnchor,
  MyGeogebra,
  MyInjection,
  MyVideo
} from './components'
import Toolbar from './Toolbar'
import withCreate from './withCreate'
import { ModalProvider } from './ModalContext'

export default function Create({ value, onChange, onNormalize }) {
  const editor = React.useMemo(() => {
    // slate functionality
    const baseEditor = withHistory(withReact(createEditor()))
    // custom behaviour
    return withCreate(withArticle(baseEditor, onNormalize))
  }, [])

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={value => {
        onChange(value)
      }}
    >
      <ModalProvider>
        <Toolbar />
        <Container>
          <SpecialCSS>
            <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
          </SpecialCSS>
        </Container>
      </ModalProvider>
    </Slate>
  )
}

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
  geogebra: MyGeogebra,
  injection: MyInjection,
  video: MyVideo
}

function renderElement(props) {
  const { element } = props
  const editor = useEditor()
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

const Container = styled.div`
  padding-top: 30px;
  border: 1px solid lightgreen;
`
