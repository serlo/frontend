import { useState } from 'react'

import type { PageLayoutPluginProps } from '.'
import { PageLayoutRenderer } from './renderer'
import { LayoutChooser } from './toolbar/layout-chooser'
import { PageLayoutToolbar } from './toolbar/toolbar'

export const PageLayoutEditor: React.FunctionComponent<
  PageLayoutPluginProps
> = (props) => {
  const { column1, column2, widthPercent } = props.state
  const percent = widthPercent.value
  const [showSettingsModal, setShowSettingsModal] = useState(false)

  return (
    <>
      <PageLayoutToolbar
        {...props}
        showSettingsModal={showSettingsModal}
        setShowSettingsModal={setShowSettingsModal}
      />

      {percent === 0 ? (
        <LayoutChooser {...props.state} />
      ) : (
        <div className="page-layout-plugin">
          <PageLayoutRenderer
            widthPercent={percent}
            column1={column1.render()}
            column2={column2.render()}
          />
        </div>
      )}
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
}
