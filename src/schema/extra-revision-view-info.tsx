import { FrontendContentNode } from '@/frontend-node-types'

interface ExtraRevisionViewInfoProps {
  isRevisionView?: boolean
  element: FrontendContentNode
}

export function ExtraRevisionViewInfo({ element }: ExtraRevisionViewInfoProps) {
  if (
    !['a', 'img', 'anchor', 'injection', 'exercise', 'code'].includes(
      element.type
    )
  )
    return null

  return (
    <span className="text-sm px-1 bg-editor-primary-100 break-all">
      {(element.type === 'a' || element.type === 'injection') && element.href}
      {element.type === 'anchor' && element.id}
      {element.type === 'code' &&
        `${element.language || '(no language)'} ${
          element.showLineNumbers ? '(with line numbers)' : ''
        }`}
      {element.type === 'img' && (
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
