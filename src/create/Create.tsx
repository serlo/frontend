import React from 'react'
import styled from 'styled-components'

import { createEditor, Transforms } from 'slate'
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
  MyVideo,
  VoidSpan
} from './components'
import Toolbar from './Toolbar'
import withCreate from './withCreate'
import { ModalProvider } from './ModalContext'
import { makeMargin } from '../helper/csshelper'
import ScMcExercise from '../components/content/ScMcExercise'

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
  video: MyVideo,
  'scmc-exercise': MyScMcExercise,
  'scmc-choice': MyChoice,
  'scmc-choice-answer': MyAnswer,
  'scmc-choice-feedback': MyFeedback
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

function MyScMcExercise(props) {
  const edtrioState = {
    isSingleChoice: props.element.choiceType === 'SC',
    answers: props.element.children
      .filter(child => child.children.length == 2)
      .map(child => {
        return {
          content: child.children[0].children,
          isCorrect: child.isCorrect,
          feedback: child.children[1].children
        }
      })
  }
  return (
    <ScMcExerciseOuter>
      <VoidDiv>
        <ScMcExercise state={edtrioState} passThrough={true}></ScMcExercise>
      </VoidDiv>
      <div {...props.attributes}>{props.children}</div>
      <VoidDiv>
        <select
          value={props.element.choiceType}
          onChange={e => {
            Transforms.setNodes(
              props.editor,
              { choiceType: e.target.value },
              { at: props.path }
            )
          }}
        >
          <option>SC</option>
          <option>MC</option>
        </select>{' '}
        <button
          onClick={() => {
            Transforms.insertNodes(
              props.editor,
              {
                type: 'scmc-choice',
                isCorrect: false,
                children: [
                  {
                    type: 'scmc-choice-answer',
                    children: [{ type: 'p', children: [{ text: '' }] }]
                  },
                  {
                    type: 'scmc-choice-feedback',
                    children: [{ type: 'p', children: [{ text: '' }] }]
                  }
                ]
              },
              { at: props.path.concat(props.element.children.length) }
            )
          }}
        >
          Antwort hinzufügen
        </button>
      </VoidDiv>
    </ScMcExerciseOuter>
  )
}

const ScMcExerciseOuter = styled.div`
  ${makeMargin}
  border: 1px black solid;
  margin-bottom: ${props => props.theme.spacing.mb.block};
`

function MyChoice(props) {
  return (
    <ChoiceOuter {...props.attributes}>
      <VoidDiv>
        <input
          type="checkbox"
          checked={props.element.isCorrect}
          onChange={e => {
            Transforms.setNodes(
              props.editor,
              { isCorrect: e.target.checked },
              { at: props.path }
            )
          }}
        />{' '}
        Richtig
      </VoidDiv>
      {props.children}
    </ChoiceOuter>
  )
}

const ChoiceOuter = styled.div`
  margin: 5px;
  border: 1px blue solid;
`

export const VoidDiv = styled.div.attrs({ contentEditable: false })`
  user-select: none;
`

function MyAnswer(props) {
  return (
    <AnswerOuter {...props.attributes}>
      <VoidSpan>Antwort: </VoidSpan>
      {props.children}
    </AnswerOuter>
  )
}

const AnswerOuter = styled.div`
  border: 1px lightblue solid;
`

function MyFeedback(props) {
  return (
    <FeedbackOuter {...props.attributes}>
      <VoidSpan>Feedback: </VoidSpan>
      {props.children}
    </FeedbackOuter>
  )
}

const FeedbackOuter = styled.div`
  border: 1px lightblue solid;
`
