import React from 'react'

import { useInstanceData } from '@/contexts/instance-context'
import { useOrigin } from '@/contexts/origin-context'

export interface CommentsProps {
  id: number
}

export function Comments({ id }: CommentsProps) {
  const [data, setData] = React.useState<string>('')
  const { lang } = useInstanceData()
  const origin = useOrigin()
  React.useEffect(() => {
    void (async () => {
      const res = await fetch(
        origin +
          '/api/proxy/' +
          encodeURIComponent(`https://${lang}.serlo.org/${id}`)
      )
      const text = await res.text()
      setData(text)
    })()
  }, [id, lang, origin])

  if (!data) return null

  const commentsHTML = extractCommentsFromSinglePage(data)

  if (!commentsHTML) return <p>keine Kommentare</p>

  return <div dangerouslySetInnerHTML={{ __html: commentsHTML }}></div>
}

function extractCommentsFromSinglePage(html: string) {
  const startOfComments = html.indexOf('<section id="discussion-')
  if (startOfComments < 0) return ''
  const endOfComments1 = html.indexOf('<div id="horizon">', startOfComments)
  const endOfComments2 = html.indexOf(
    '<aside class="side-element side-context">',
    startOfComments
  )
  return html.substring(
    startOfComments,
    Math.min(
      endOfComments1 < 0 ? html.length : endOfComments1,
      endOfComments2 < 0 ? html.length : endOfComments2
    )
  )
}
