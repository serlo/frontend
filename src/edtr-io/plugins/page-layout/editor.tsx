import clsx from 'clsx'

import { PageLayoutPluginProps } from '.'
import { PageLayoutRenderer } from './renderer'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

const firstColumsSizes = [50, 66, 33]

export const PageLayoutEditor: React.FunctionComponent<
  PageLayoutPluginProps
> = (props) => {
  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const editorStrings = loggedInData.strings.editor
  const { column1, column2, widthPercent } = props.state
  const percent = widthPercent.value

  return (
    <>
      {percent === 0 ? (
        renderInlineSettings()
      ) : (
        <div className="page-layout-plugin">
          <PageLayoutRenderer
            widthPercent={percent}
            column1={column1.render()}
            column2={column2.render()}
          />
        </div>
      )}
      {props.renderIntoSettings(renderInlineSettings())}
      {/* Obviously a hack, good enough for now. */}
      <style jsx global>
        {`
          .page-layout-plugin span[contenteditable='false'] {
            overflow: hidden;
            width: 100% !important;
          }
        `}
      </style>
    </>
  )

  function renderInlineSettings() {
    return (
      <>
        <b className="serlo-h4 block mt-6 ml-0 mb-4">
          {editorStrings.pageLayoutColums.chooseRatio}:
        </b>
        <ul className="pb-8 unstyled-list flex">
          {firstColumsSizes.map(renderLi)}
        </ul>
      </>
    )
  }

  function renderLi(percent: number) {
    const childClassName =
      'm-1 bg-amber-200 group-hover:bg-amber-300 group-focus:bg-amber-300 rounded-sm h-20'
    const active = percent === widthPercent.value

    return (
      <li key={percent}>
        <button
          onClick={(event) => {
            event.preventDefault()
            widthPercent.set(percent)
          }}
          className={clsx(
            'bg-amber-100 rounded-lg flex flex-row w-24 h-24 opacity-75 mr-2 p-1',
            'hover:bg-amber-200 focus:bg-amber-200 group',
            active && 'bg-brand'
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
