import React from 'react'
import {
  renderSpoilerContainer,
  renderSpoilerTitle,
  renderSpoilerBody,
  renderMath,
  renderInlineMath,
  renderA,
  renderRow,
  renderCol,
  renderImg,
  renderGeogebra,
  renderInjection,
  renderVideo
} from '../schema/articleRenderer'
import SpoilerToggle from '../components/content/SpoilerToggle'
import ModalContext from './ModalContext'
import { useSelected, useEditor, ReactEditor } from 'slate-react'
import TipOver from './TipOver'
import { Transforms, Node } from 'slate'
import { hsl } from 'polished'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnchor } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

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

export function MySpoiler(props) {
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

export function MySpoilerTitle(props) {
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

export function MySpoilerBody(props) {
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

export function MyMath(props) {
  const { attributes, element, children, path } = props
  const { setModal } = React.useContext(ModalContext)
  let highlight = useSelected()
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

export function MyInlineMath(props) {
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

export function MyA(props) {
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

export function MyLayout(props) {
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

export function MyCol(props) {
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

export function MyImg(props) {
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

export function MyAnchor(props) {
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
  const { path, idKey = 'id' } = props
  const editor = useEditor()
  const element = Node.get(editor, path)
  const [id, setId] = React.useState(element[idKey])
  const { setModal } = React.useContext(ModalContext)
  return (
    <>
      <SettingsInput
        title="ID:"
        innerProps={{
          value: id,
          onChange: e => {
            setId(e.target.value)
            Transforms.setNodes(
              editor,
              { [idKey]: e.target.value },
              { at: path }
            )
          }
        }}
      />
      <button onClick={() => setModal(null)}>Fertig</button>
    </>
  )
}

export function MyGeogebra(props) {
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

export function MyInjection(props) {
  const { element, children } = props
  const editor = useEditor()
  const path = ReactEditor.findPath(editor, element)
  const { setModal } = React.useContext(ModalContext)

  return (
    <TipOver
      placement="top"
      content={
        <button
          onClick={() => setModal(<AnchorSettings path={path} idKey="href" />)}
        >
          Injection bearbeiten
        </button>
      }
    >
      <div contentEditable={false} {...props.attributes}>
        {renderInjection({ element })}
        {children}
      </div>
    </TipOver>
  )
}

export function MyVideo(props) {
  const { element, children } = props
  const editor = useEditor()
  const path = ReactEditor.findPath(editor, element)
  const { setModal } = React.useContext(ModalContext)

  return (
    <TipOver
      placement="top"
      content={
        <button
          onClick={() => setModal(<AnchorSettings path={path} idKey="url" />)}
        >
          Video bearbeiten
        </button>
      }
    >
      <div contentEditable={false} {...props.attributes}>
        {renderVideo({ element })}
        {children}
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

export const VoidSpan = styled.span.attrs({ contentEditable: false })`
  user-select: none;
`

const LatexInputArea = styled.textarea`
  width: 100%;
  height: 200px;
  font-size: 1.2rem;
  margin-top: 30px;
`
