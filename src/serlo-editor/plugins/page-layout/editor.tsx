import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { useState } from 'react'

import { PageLayoutPluginProps } from '.'
import { PageLayoutRenderer } from './renderer'
import { FaIcon } from '@/components/fa-icon'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { tw } from '@/helper/tw'
import { PluginToolbar } from '@/serlo-editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@/serlo-editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

const firstColumsSizes = [50, 66, 33]

export const PageLayoutEditor: React.FunctionComponent<
  PageLayoutPluginProps
> = (props) => {
  const editorStrings = useEditorStrings()
  const { column1, column2, widthPercent } = props.state
  const { id, focused } = props
  const percent = widthPercent.value
  const [showSettingsModal, setShowSettingsModal] = useState(false)

  return (
    <>
      {renderPluginToolbar()}
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

  function renderPluginToolbar() {
    if (!focused) return null

    const layoutStrings = editorStrings.plugins.layout

    return (
      <PluginToolbar
        pluginType={EditorPluginType.PageLayout}
        pluginControls={<PluginDefaultTools pluginId={id} />}
        pluginSettings={
          <>
            <button
              onClick={() => setShowSettingsModal(true)}
              className="mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
            >
              {layoutStrings.chooseLayout} <FaIcon icon={faPencilAlt} />
            </button>
            {showSettingsModal ? (
              <ModalWithCloseButton
                isOpen={showSettingsModal}
                onCloseClick={() => setShowSettingsModal(false)}
                className="!top-1/3 !max-w-xl"
              >
                {renderInlineSettings()}
              </ModalWithCloseButton>
            ) : null}
          </>
        }
      />
    )
  }

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
