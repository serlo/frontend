import React from 'react'
import styled from 'styled-components'

interface GeogebraProps {
  id: string
}

export default function Geogebra({ id }: GeogebraProps) {
  const [data, setData] = React.useState(undefined)
  React.useEffect(() => {
    fetch('https://www.geogebra.org/api/json.php', {
      method: 'POST',
      body: JSON.stringify({
        request: {
          '-api': '1.0.0',
          task: {
            '-type': 'fetch',
            fields: {
              field: [
                { '-name': 'width' },
                { '-name': 'height' },
                { '-name': 'preview_url' }
              ]
            },
            filters: {
              field: [{ '-name': 'id', '#text': id }]
            },
            limit: { '-num': '1' }
          }
        }
      })
    })
      .then(res => res.json())
      .then(res => {
        try {
          const data = res.responses.response.item
          if (data) {
            setData({ ratio: data.width / data.height })
          }
        } catch (e) {
          // ignore
        }
      })
  }, [id])
  if (!data) {
    return (
      <Placeholder>
        <img
          src="https://cdn.geogebra.org/static/img/GeoGebra-logo.png"
          alt="GeoGebra"
        />
      </Placeholder>
    )
  }
  return (
    <GeogebraContainer ratio={data.ratio}>
      <GeogebraFrame
        title={id}
        scrolling="no"
        src={'https://www.geogebra.org/material/iframe/id/' + id}
      />
    </GeogebraContainer>
  )
}

const Placeholder = styled.div`
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  border: 2px ${props => props.theme.colors.lightgray} solid;
  border-radius: 4px;
  padding: 10px;
`

const GeogebraFrame = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`

const GeogebraContainer = styled.div<{ ratio: number }>`
  position: relative;
  padding: 0;
  padding-top: ${props => 100 / props.ratio}%;
  display: block;
  height: 0;
  overflow: hidden;
`
