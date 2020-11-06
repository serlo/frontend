import React from 'react'
import styled from 'styled-components'

import { PrivacyWrapper } from './privacy-wrapper'

export interface GeogebraProps {
  id: string
}

interface ResponseData {
  responses: {
    response: {
      item: {
        width: number
        height: number
      }
    }
  }
}

export function Geogebra({ id }: GeogebraProps) {
  const [data, setData] = React.useState<{ ratio: number } | undefined>(
    undefined
  )
  React.useEffect(() => {
    void fetch('https://www.geogebra.org/api/json.php', {
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
                { '-name': 'preview_url' },
              ],
            },
            filters: {
              field: [{ '-name': 'id', '#text': id }],
            },
            limit: { '-num': '1' },
          },
        },
      }),
    })
      .then((res) => res.json())
      .then((res: ResponseData) => {
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
    // TODO: Get real applet preview image
    <PrivacyWrapper
      type="applet"
      previewImageUrl="https://cdn.geogebra.org/static/img/GeoGebra-logo.png"
    >
      <GeogebraContainer ratio={data.ratio}>
        <GeogebraFrame
          title={id}
          scrolling="no"
          src={'https://www.geogebra.org/material/iframe/id/' + id}
        />
      </GeogebraContainer>
    </PrivacyWrapper>
  )
}

const Placeholder = styled.div`
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  border: 2px ${(props) => props.theme.colors.lightgray} solid;
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
  z-index: 6;
  background-color: rgba(0, 0, 0, 0.3);
`

const GeogebraContainer = styled.div<{ ratio: number }>`
  padding: 0;
  padding-top: ${(props) => 100 / props.ratio}%;
  display: block;
  height: 0;
  overflow: hidden;
`
