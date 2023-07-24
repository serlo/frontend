import { faCog } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { Dispatch, SetStateAction, useState } from 'react'

import { MultimediaProps } from '.'
import {
  selectDocument,
  selectSerializedDocument,
  store,
  useAppSelector,
} from '../../store'
import { FaIcon } from '@/components/fa-icon'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { tw } from '@/helper/tw'
import { PluginToolbar } from '@/serlo-editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@/serlo-editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

const mediaColumsSizes = [50, 25]

export const MultimediaToolbar = ({
  id,
  config,
  state,
  showSettingsModal,
  setShowSettingsModal,
}: MultimediaProps & {
  showSettingsModal: boolean
  setShowSettingsModal: Dispatch<SetStateAction<boolean>>
}) => {
  const editorStrings = useEditorStrings()
  const pluginsStrings = editorStrings.plugins
  const multimediaStrings = pluginsStrings.multimedia

  const { multimedia, width } = state

  const { allowedPlugins } = config

  const currentPluginType = useAppSelector((state) =>
    selectDocument(state, multimedia.id)
  )?.plugin

  const [multimediaStateCache, setMultimediaStateCache] = useState<
    Record<string, unknown>
  >({})

  return (
    <PluginToolbar
      pluginId={id}
      pluginType={EditorPluginType.Multimedia}
      pluginSettings={
        <>
          <button
            onClick={() => setShowSettingsModal(true)}
            className="mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
          >
            {editorStrings.edtrIo.settings} <FaIcon icon={faCog} />
          </button>
          {showSettingsModal ? (
            <ModalWithCloseButton
              isOpen={showSettingsModal}
              onCloseClick={() => setShowSettingsModal(false)}
              className="!top-1/3 !max-w-xl"
            >
              <h3 className="serlo-h3 mt-4">
                {editorStrings.edtrIo.settings}: {multimediaStrings.title}
              </h3>

              <div className="mx-side mb-3">
                <>
                  <div className="mt-8">
                    <b className="mb-4 ml-0 mt-6 block text-lg font-bold">
                      {multimediaStrings.chooseSize}
                    </b>
                    <ul className="flex pb-8">
                      {mediaColumsSizes.map(renderColumnSizeLi)}
                    </ul>
                  </div>
                  {allowedPlugins.length > 1 ? (
                    <div className="mb-8 mt-3">
                      <strong>{multimediaStrings.changeType}</strong>
                      <span className="mr-4">:</span>
                      <select
                        value={currentPluginType ?? allowedPlugins[0]}
                        onChange={(e) => handlePluginTypeChange(e.target.value)}
                        className={tw`
                          mr-2 cursor-pointer rounded-md !border border-gray-500
                        bg-editor-primary-100 px-1 py-[1px] text-sm transition-all
                        hover:bg-editor-primary-200 focus:bg-editor-primary-200 focus:outline-none
                        `}
                      >
                        {allowedPlugins.map((type) => (
                          <option key={type} value={type}>
                            {getPluginTitle(type)}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : null}
                </>
              </div>
            </ModalWithCloseButton>
          ) : null}
        </>
      }
      pluginControls={<PluginDefaultTools pluginId={id} />}
      className="-top-[35px] left-[21px] w-[calc(100%-37px)]"
    />
  )

  function renderColumnSizeLi(percent: number) {
    const active = percent === width.value
    const childClassName =
      'm-1 bg-editor-primary-200 group-hover:bg-editor-primary group-focus:bg-editor-primary rounded-sm h-20'

    return (
      <li key={percent}>
        <button
          onClick={(event) => {
            event.preventDefault()
            width.set(percent)
          }}
          className={clsx(
            tw`
              group mr-2 flex h-24 w-24 flex-row rounded-lg bg-editor-primary-100 p-1
              opacity-75 hover:bg-editor-primary-200 focus:bg-editor-primary-200
            `,
            active && 'bg-editor-primary-300'
          )}
        >
          <div
            className={childClassName}
            style={{ width: `${100 - percent}%` }}
          >
            &nbsp;
          </div>
          <div className={childClassName} style={{ width: `${percent}%` }}>
            &nbsp;
          </div>
        </button>
      </li>
    )
  }

  function getPluginTitle(name: string) {
    return Object.hasOwn(pluginsStrings, name)
      ? pluginsStrings[name as keyof typeof pluginsStrings].title
      : name
  }

  function handlePluginTypeChange(newPluginType: string) {
    // store old multimedia state before replacing
    setMultimediaStateCache((current) => {
      const oldDocumentSerialized = selectSerializedDocument(
        store.getState(),
        multimedia.id
      )
      return oldDocumentSerialized
        ? {
            ...current,
            [oldDocumentSerialized.plugin]:
              oldDocumentSerialized.state as unknown,
          }
        : current
    })

    // replace with new type and undefined or stored state
    multimedia.replace(newPluginType, multimediaStateCache[newPluginType])
  }
}
