import IframeResizer from 'iframe-resizer-react'

export function SerloInjectionRenderer(props: {
  contentId: string | undefined
}) {
  const url = createURL(props.contentId ?? '')

  return (
    <IframeResizer
      key={url}
      src={url}
      checkOrigin={false}
      heightCalculationMethod="lowestElement"
      sizeHeight
      style={{
        width: '1px',
        minWidth: '100%',
        border: '1px solid #ddd',
        borderRadius: '2px',
      }}
    />
  )
}

function createURL(id: string) {
  const pureId =
    id.startsWith('/') || id.startsWith('\\') ? id.substring(1) : id
  return `https://de.serlo.org/${pureId}?contentOnly`
}
