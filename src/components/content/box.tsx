import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'

import { useInstanceData } from '@/contexts/instance-context'
import { FrontendBoxNode } from '@/data-types'
import { boxTypeStyle, defaultStyle } from '@/edtr-io/plugins/box/renderer'
import { hasOwnPropertyTs } from '@/helper/has-own-property-ts'
import { RenderNestedFunction } from '@/schema/article-renderer'

type BoxProps = FrontendBoxNode & { renderNested: RenderNestedFunction }

export function Box({
  boxType,
  title,
  anchorId,
  children,
  renderNested,
}: BoxProps) {
  const { strings } = useInstanceData()

  // @ts-expect-error just a failsave
  if (boxType == '' || !children || !children.length) return null

  const isBlank = boxType === 'blank'

  const style = boxTypeStyle[boxType]
  const borderColorClass = hasOwnPropertyTs(style, 'borderColorClass')
    ? style.borderColorClass
    : defaultStyle.borderColorClass
  const colorClass = hasOwnPropertyTs(style, 'colorClass')
    ? style.colorClass
    : defaultStyle.colorClass
  const icon = hasOwnPropertyTs(style, 'icon') ? style.icon : undefined

  return (
    <figure
      id={anchorId}
      className={clsx(
        'mx-side border-3 py-side mb-6 rounded-xl relative',
        borderColorClass
      )}
    >
      {renderHeader()}
      <div className="">{renderNested(children, 'children')}</div>
    </figure>
  )

  function renderHeader() {
    return (
      <figcaption className="px-side pb-4 pt-1 font-bold">
        <a className="no-underline" href={'#' + anchorId}>
          {isBlank ? null : (
            <>
              <span className={colorClass}>
                {renderIcon()}
                {strings.content.boxTypes[boxType]}
              </span>
            </>
          )}
          {title && !isBlank ? ' | ' : null}
          {title ? renderNested(title, 'title') : null}
        </a>
      </figcaption>
    )
  }

  function renderIcon() {
    return icon ? (
      <>
        <FontAwesomeIcon icon={icon} />{' '}
      </>
    ) : null
  }
}
