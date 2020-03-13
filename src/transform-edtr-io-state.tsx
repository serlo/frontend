// This is completely redundant work, for educational purposes only

import styled from 'styled-components'
import dynamic from 'next/dynamic'
import { transparentize, darken } from 'polished'

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

  return (
    <span>
      Unknown plugin {plugin}, state: {JSON.stringify(state)}
    </span>
  )
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
  width: 100%;
  margin-bottom: 12px;
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
  margin-left: 8px;
  margin-right: 8px;
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
    return <StyledP key={index}>{textPlugin(state.children)}</StyledP>
  }
  if (type === 'h') {
    const children = textPlugin(state.children)
    if (state.level === 2) {
      return <StyledH2 key={index}>{children}</StyledH2>
    }
    if (state.level === 3) {
      return <StyledH3 key={index}>{children}</StyledH3>
    }
  }
  if (type === 'a') {
    let href = state.href
    if (/\/[\d]+/.test(href)) {
      href = '/content' + href
      /*return (
        <Link href="/content/[id]" as={href} key={index}>
          <a key={index}>{textPlugin(state.children)}</a>
        </Link>
      )*/
    }
    return (
      <StyledA href={href} key={index}>
        {textPlugin(state.children)}
      </StyledA>
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

const StyledP = styled.p`
  margin: 0 15px 10px;
  hyphens: auto;
  line-height: 1.3;
  font-size: 18px;
`

const StyledH2 = styled.h2`
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 0;
  border-bottom: 1px solid
    ${props => transparentize(0.7, props.theme.colors.dark1)};
  padding-bottom: 6px;
  margin-bottom: 8px;
`

const StyledH3 = styled.h3`
  margin-left: 15px;
  margin-top: 0;
  margin-bottom: 0;
`

const StyledA = styled.a`
  color: ${props => darken(0.05, props.theme.colors.brandGreen)};
  text-decoration: none;
  font-weight: bold;
`
