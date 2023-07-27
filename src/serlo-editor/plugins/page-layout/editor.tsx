import clsx from 'clsx'

import { PageLayoutPluginProps } from '.'
import { PageLayoutRenderer } from './renderer'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { tw } from '@/helper/tw'

const firstColumsSizes = [50, 66, 33]

export const PageLayoutEditor: React.FunctionComponent<
  PageLayoutPluginProps
> = (props) => {
  const editorStrings = useEditorStrings()
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
        <b className="serlo-h4 mb-4 ml-0 mt-6 block">
          {editorStrings.plugins.pageLayout.chooseRatio}:
        </b>
        <ul className="unstyled-list flex pb-8">
          {firstColumsSizes.map(renderLi)}
        </ul>
      </>
    )
  }

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
            tw`
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
