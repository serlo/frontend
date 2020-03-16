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
  Important
} from '../visuals'
import Spoiler from '../spoiler'

const Math = dynamic(import('../math'))

export default function EdtrIoRenderer(props) {
  const { state } = props
  console.log('edtr-io')
  return transform(state)
}

// node kann array oder object sein
function transform(node, path = [], index = 0) {
  if (!node) return null
  // durchlaufe arrays
  if (node.length > 0) {
    return node.map((child, index) => transform(child, path, index))
  }

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

  console.log('missing', node)
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
  const full = path.includes('li')
  return (
    <StyledP key={index} full={full} slim={full}>
      {transform(node.children, [...path, 'p'])}
    </StyledP>
  )
}

function handleLink(node, path, index) {
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
  let result = node.text
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
