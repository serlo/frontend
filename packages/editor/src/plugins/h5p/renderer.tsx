import { H5PPlayerUI } from '@lumieducation/h5p-react'
import { useInstanceData } from '@serlo/frontend/src/contexts/instance-context'

export interface H5pRendererProps {
  url: string
}

export function parseH5pUrl(url: string) {
  const result = /https:\/\/app\.lumi\.education\/run\/([\w-]+)/i.exec(url)
  return result ? result[1] : null
}

export function H5pRenderer({ url }: H5pRendererProps) {
  const id = parseH5pUrl(url)
  const { strings } = useInstanceData()

  if (!id) {
    return <p className="serlo-p">{strings.errors.defaultMessage}</p>
  }

  return (
    <div className="mx-side mb-block" style={{ width: '727px' }}>
      <H5PPlayerUI
        contentId={id}
        loadContentCallback={async (contentId) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const data = await (
            await fetch(`/api/frontend/lumi/embed/${contentId}`)
          ).json()
          console.log(data)
          return data
        }}
      />
    </div>
  )
}
