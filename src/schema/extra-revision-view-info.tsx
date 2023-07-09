import { FrontendContentNode, FrontendNodeType } from '@/frontend-node-types'

interface ExtraRevisionViewInfoProps {
  isRevisionView?: boolean
  element: FrontendContentNode
}

export function ExtraRevisionViewInfo({ element }: ExtraRevisionViewInfoProps) {
  if (
    ![
      FrontendNodeType.A,
      FrontendNodeType.Image,
      FrontendNodeType.Anchor,
      FrontendNodeType.Injection,
      FrontendNodeType.Exercise,
      FrontendNodeType.Code,
    ].includes(element.type)
  )
    return null

  return (
    <span className="break-all bg-editor-primary-100 px-1 text-sm">
      {element.type === FrontendNodeType.A && element.href}
      {element.type === FrontendNodeType.Injection && element.state}
      {element.type === FrontendNodeType.Anchor && element.state}
      {element.type === FrontendNodeType.Code &&
        `${element.state.language || '(no language)'} ${
          element.state.showLineNumbers ? '(with line numbers)' : ''
        }`}
      {element.type === FrontendNodeType.Image && (
        <>
          {element.alt}{' '}
          {element.href && (
            <>
              <b>href:</b> {element.href}
            </>
          )}
        </>
      )}
    </span>
  )
}
