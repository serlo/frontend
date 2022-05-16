import { FrontendContentNode } from '@/data-types'

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
    <span className="text-sm px-1 bg-yellow-200">
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
