import dynamic from 'next/dynamic'
import {
  Img,
  StyledP,
  StyledH2,
  StyledH3,
  StyledH4,
  StyledA,
  ImgCentered,
  StyledH5,
  MathCentered,
  StyledUl,
  StyledOl,
  StyledLi,
  Important,
  LayoutRow,
  Col
} from '../components/visuals'
import Spoiler from '../components/spoiler'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Math = dynamic(import('../components/math'))

export default function EdtrIoRenderer(props) {
  const { state } = props
  return transform(state)
}

// node kann array oder object sein
function transform(node, path = [], index = 0) {
  if (!node || Object.keys(node).length === 0) {
    console.log('transform hat leeren Knoten erhalten', path)
    return null
  }
  // durchlaufe arrays
  if (Array.isArray(node)) {
    return node
      .filter(node => {
        if (node.type === 'p') {
          if (node.children.length === 1) {
            const child = node.children[0]
            if (child.text !== undefined && child.text.trim() === '') {
              // leerer Paragraph
              return false
            }
          }
        }
        return true
      })
      .map((child, index, arr) => {
        if (index < arr.length - 1) {
          if (child.type === 'p') {
            const next = arr[index + 1]
            if (next.type.includes('-list')) {
              child.listAhead = true
            }
            if (
              next.children &&
              next.children[0] &&
              next.children[0].type &&
              next.children[0].type.includes('-list')
            ) {
              child.listAhead = true
            }
          }
        }
        return transform(child, path, index)
      })
  }

  //console.log('>', path, index, node)

  if (node.plugin) {
    if (node.plugin === 'rows') {
      return transform(node.state, [...path, 'rows'])
    }
    if (node.plugin === 'text') {
      return transform(node.state, [...path, 'text'])
    }
    if (node.plugin === 'image') {
      return handleImage(node, path, index)
    }
    if (node.plugin === 'multimedia') {
      return handleMultimedia(node, path, index)
    }
    if (node.plugin === 'important') {
      return handleImportant(node, path, index)
    }
    if (node.plugin === 'spoiler') {
      return handleSpoiler(node, path, index)
    }
    if (node.plugin === 'injection') {
      return handleInjection(node, path, index)
    }
    if (node.plugin === 'geogebra') {
      return handleGeoGebra(node, path, index)
    }
    if (node.plugin === 'layout') {
      return handleLayout(node, path, index)
    }
    if (node.plugin === 'exercise') {
      return handleExercise(node, path, index)
    }
    if (node.plugin === 'solution') {
      return handleSolution(node, path, index)
    }
  }

  if (node.type) {
    if (node.type === 'p') {
      return handleParagraph(node, path, index)
    }
    if (node.type === 'a') {
      return handleLink(node, path, index)
    }
    if (node.type === 'h') {
      return handleHeading(node, path, index)
    }
    if (node.type === 'math') {
      return handleMath(node, path, index)
    }
    if (node.type === 'unordered-list' || node.type === 'ordered-list') {
      return handleList(node, path, index)
    }
    if (node.type === 'list-item') {
      return handleListItem(node, path, index)
    }
  }

  if (node.text) {
    return handleText(node, path, index)
  }

  if (node.text === '') {
    return null
  }

  console.log('missing', node, path)
  return (
    <StyledP>
      [fehlt: {node.plugin} / {node.type}]
    </StyledP>
  )
}

function handleImage(node, path, index) {
  const { state } = node
  return (
    <ImgCentered key={index}>
      <Img
        src={state.src}
        alt={state.alt}
        maxWidth={state.maxWidth ? state.maxWidth : 0}
      ></Img>
    </ImgCentered>
  )
}

function handleParagraph(node, path, index) {
  if (node.children.length === 1) {
    const child = node.children[0]
    if (child.type && child.type.includes('ordered-list')) {
      return transform(child, path, index)
    }
    if (child.type && child.type == 'math' && child.inline == false) {
      return transform(child, path, index)
    }
  }
  const full = path.includes('li')
  return (
    <StyledP key={index} full={full} slim={full} halfslim={node.listAhead}>
      {transform(node.children, [...path, 'p'])}
    </StyledP>
  )
}

function handleLink(node, path, index) {
  if (node.href.startsWith('http')) {
    return (
      <StyledA href={node.href} key={index}>
        {transform(node.children, [...path, 'a'])}{' '}
        <FontAwesomeIcon icon={faExternalLinkAlt} size="xs" />
      </StyledA>
    )
  }
  return (
    <StyledA href={node.href} key={index}>
      {transform(node.children, [...path, 'a'])}
    </StyledA>
  )
}

function handleHeading(node, path, index) {
  let Comp = StyledH5
  if (node.level === 4) {
    Comp = StyledH4
  } else if (node.level === 3) {
    Comp = StyledH3
  } else if (node.level === 2) {
    Comp = StyledH2
  }
  return (
    <Comp key={index}>
      {transform(node.children, [...path, 'h' + node.level])}
    </Comp>
  )
}

function handleMath(node, path, index) {
  if (node.inline) {
    return <Math formula={node.src} key={index} inline />
  }
  return (
    <MathCentered key={index}>
      <Math formula={node.src} />
    </MathCentered>
  )
}

function handleText(node, path, index) {
  let result = node.text || ''
  if (node.strong) {
    result = <strong key={index}>{result}</strong>
  }
  if (node.em) {
    result = <em key={index}>{result}</em>
  }
  return result
}

function handleMultimedia(node, path, index) {
  // unvollständig
  const { state } = node
  return [
    transform(state.multimedia, [...path, 'multimedia']),
    transform(state.explanation, [...path, 'explanation'])
  ]
}

function handleList(node, path, index) {
  const Comp = node.type.includes('unordered') ? StyledUl : StyledOl
  return (
    <Comp key={index}>{transform(node.children, [...path, node.type])}</Comp>
  )
}

function handleListItem(node, path, index) {
  return (
    <StyledLi key={index}>
      {transform(node.children[0].children, [...path, 'li'])}
    </StyledLi>
  )
}

function handleImportant(node, path, index) {
  return (
    <Important key={index}>
      {transform(node.state, [...path, 'important'])}
    </Important>
  )
}

function handleSpoiler(node, path, index) {
  const { state } = node
  return (
    <Spoiler key={index} title={state.title} defaultOpen={false}>
      {transform(state.content, [...path, 'spoiler'])}
    </Spoiler>
  )
}

function handleInjection(node, path, index) {
  const { state } = node
  return (
    <StyledP key={index}>
      [Injection: <StyledA href={state}>{state}</StyledA>]
    </StyledP>
  )
}

function handleGeoGebra(node, path, index) {
  const { state } = node
  return <StyledP key={index}>[GeoGebra: {state}]</StyledP>
}

function handleLayout(node, path, index) {
  const { state } = node
  return (
    <LayoutRow key={index}>
      {state.map((entry, index) => {
        return (
          <Col size={entry.width * 2} key={index}>
            {transform(entry.child, [...path, 'layout'])}
          </Col>
        )
      })}
    </LayoutRow>
  )
}

function handleExercise(node, path, index) {
  const { state } = node
  return transform(state.content, [...path, 'exercise'], index)
}

function handleSolution(node, path, index) {
  const { state } = node
  console.log(state)
  return [
    transform(state.strategy, [...path, 'solution'], index),
    transform(state.steps, [...path, 'solution'], index)
  ]
}
