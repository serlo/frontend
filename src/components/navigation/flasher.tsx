import React from 'react'

import { useOrigin } from '@/contexts/origin-context'
import { serloDomain } from '@/helper/serlo-domain'

export function Flasher() {
  const origin = useOrigin()
  const [html, setHtml] = React.useState<string | undefined>()
  React.useEffect(() => {
    void (async () => {
      try {
        const res = await fetch(
          'https://de.' + serloDomain + '/api/frontend/flash'
        )
        const flasher = (await res.json()).html
        if (flasher.length > 50) setHtml(flasher)
      } catch (e) {
        //
      }
    })()
  }, [origin])
  return html ? (
    <div
      style={{ border: 'black 1px solid', margin: '20px' }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  ) : null
}
