import clsx from 'clsx'
import { useState } from 'react'

import { MultimediaProps } from '.'
import {
  selectDocument,
  selectSerializedDocument,
  store,
  useAppSelector,
} from '../../store'
import { MultimediaRenderer } from './renderer'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { tw } from '@/helper/tw'

const mediaColumsSizes = [50, 25]

export function MultimediaEditor({
  state,
  config,
  editable,
  renderIntoSettings,
}: MultimediaProps) {
  const pluginsStrings = useEditorStrings().plugins
  const multimediaStrings = pluginsStrings.multimedia

  const { allowedPlugins } = config
  const { explanation, multimedia, width } = state

  const currentPluginType = useAppSelector((state) =>
    selectDocument(state, multimedia.id)
  )?.plugin

  const [multimediaStateCache, setMultimediaStateCache] = useState<
    Record<string, unknown>
  >({})

  return (
    <>
      <div className="focus-within:[&>div]:border-editor-primary-100">
        <MultimediaRenderer
          media={<>{multimedia.render()}</>}
          explanation={<>{explanation.render()}</>}
          mediaWidth={width.value}
        />
      </div>
      {editable ? renderIntoSettings(renderSettings()) : null}
    </>
  )

  function renderSettings() {
    return (
      <>
        <hr />
        <div className="mt-8">
          <b className="mt-6 ml-0 mb-4 block text-lg font-bold">
            {multimediaStrings.chooseSize}
          </b>
          <ul className="flex pb-8">
            {mediaColumsSizes.map(renderColumnSizeLi)}
          </ul>
        </div>
        {allowedPlugins.length > 1 ? (
          <div className="mt-3 mb-8">
            <strong>{multimediaStrings.changeType}</strong>
            <span className="mr-4">:</span>
            <select
              value={currentPluginType ?? allowedPlugins[0]}
              onChange={(e) => handlePluginTypeChange(e.target.value)}
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
    )
  }

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
