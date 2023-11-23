import clsx from 'clsx'

import type { PageLayoutPluginProps } from '..'
import { useEditorStrings } from '@/contexts/logged-in-data-context'

const firstColumsSizes = [50, 66, 33]

export const LayoutChooser = ({
  widthPercent,
}: PageLayoutPluginProps['state']) => {
  const pageLayoutStrings = useEditorStrings().plugins.pageLayout

  return (
    <>
      <b className="serlo-h4 mb-4 ml-0 mt-6 block">
        {pageLayoutStrings.chooseRatio}:
      </b>
      <ul className="unstyled-list flex pb-8">
        {firstColumsSizes.map(renderLi)}
      </ul>
    </>
  )

  function renderLi(percent: number) {
    const childClassName =
      'm-1 bg-editor-primary-200 group-hover:bg-editor-primary group-focus:bg-editor-primary rounded-sm h-20'
    const active = percent === widthPercent.value

    return (
      <li key={percent}>
        <button
          onClick={(event) => {
            event.preventDefault()
            widthPercent.set(percent)
          }}
          className={clsx(
            `
              group mr-2 flex h-24 w-24 flex-row rounded-lg bg-editor-primary-100 p-1
              opacity-75 hover:bg-editor-primary-200 focus:bg-editor-primary-200
            `,
            active && 'bg-editor-primary-300'
          )}
        >
          <div className={childClassName} style={{ width: `${percent}%` }}>
            &nbsp;
          </div>
          <div
            className={childClassName}
            style={{ width: `${100 - percent}%` }}
          >
            &nbsp;
          </div>
        </button>
      </li>
    )
  }
}
