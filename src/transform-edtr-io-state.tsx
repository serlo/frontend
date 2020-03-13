// This is completely redundant work, for educational purposes only

import styled from 'styled-components'
import dynamic from 'next/dynamic'
import Link from 'next/link'

// @ts-ignore
const Math = dynamic(import('./mathcomponent'))

export default function EdtrIoRenderer(props) {
  const { state } = props
  return matchUp(state)
}

function matchUp(state) {
  const plugin = state.plugin
  if (plugin === 'rows') {
    return handleRow(state.state, matchUp)
  }
  if (plugin === 'image') {
    return handleImage(state.state, matchUp)
  }
  if (plugin === 'text') {
    return handleText(state.state, matchUp)
  }

  return <span>Unknown plugin {plugin}</span>
}

function handleRow(state, next) {
  return (
    <Rows>
      {state.map((entry, index) => (
        <Row key={index}>{next(entry)}</Row>
      ))}
    </Rows>
  )
}

const Rows = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const Row = styled.div`
  margin-bottom: 10px;
  width: 100%;
`

function handleImage(state, next) {
  return (
    <ImgWrapper maxWidth={state.maxWidth ? state.maxWidth : 0}>
      <Img src={state.src} alt={state.alt}></Img>
    </ImgWrapper>
  )
}

const ImgWrapper = styled.div<{ maxWidth: number }>`
  max-width: ${props => (props.maxWidth > 0 ? props.maxWidth + 'px' : '')};
  display: block;
  margin-left: auto;
  margin-right: auto;
`

const Img = styled.img`
  max-width: 100%;
  display: block;
  margin-left: auto;
  margin-right: auto;
`

function handleText(state, next) {
  return textPlugin(state)
}

function textPlugin(state, index = 0) {
  if (state.length > 0) {
    return <>{state.map((entry, index) => textPlugin(entry, index))}</>
  }
  const { type } = state
  if (state.text && state.strong) {
    return <b key={index}>{state.text}</b>
  }
  if (state.text !== undefined) {
    return <span key={index}>{state.text}</span>
  }
  if (type === 'p') {
    return <p key={index}>{textPlugin(state.children)}</p>
  }
  if (type === 'h') {
    const children = textPlugin(state.children)
    if (state.level === 2) {
      return <h2 key={index}>{children}</h2>
    }
    if (state.level === 3) {
      return <h3 key={index}>{children}</h3>
    }
  }
  if (type === 'a') {
    let href = state.href
    if (/\/[\d]+/.test(href)) {
      href = '/content' + href
      return (
        <Link href="/content/[id]" as={href} key={index}>
          <a key={index}>{textPlugin(state.children)}</a>
        </Link>
      )
    }
    return (
      <a href={href} key={index}>
        {textPlugin(state.children)}
      </a>
    )
  }
  if (type === 'math') {
    return <Math key={index} inline={state.inline} formula={state.src} />
  }
  if (type === 'unordered-list') {
    return <ul key={index}>{textPlugin(state.children)}</ul>
  }
  if (type === 'list-item') {
    return <li key={index}>{textPlugin(state.children)}</li>
  }
  if (type === 'list-item-child') {
    return <div key={index}>{textPlugin(state.children, index)}</div>
  }

  return <>Unknown</>
}
