import { faRandom, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import styled from 'styled-components'

import { MultimediaProps } from '.'
import {
  selectDocument,
  selectHasFocusedDescendant,
  selectIsDocumentEmpty,
  selectIsFocused,
  selectSerializedDocument,
  store,
  useAppSelector,
} from '../../store'
import { Resizable } from './resizable'
import { FaIcon } from '@/components/fa-icon'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { PluginToolbarButton } from '@/serlo-editor/plugin/plugin-toolbar'

interface MultimediaDocument {
  plugin: string
  state?: unknown
}

const STEPS = 4
const BREAKPOINT = 650

const InlineOptionsWrapper = styled.div({
  position: 'absolute',
  top: '-30px',
  right: '0',
  padding: '30px',
  zIndex: 95,
  whiteSpace: 'nowrap',
})

const InlineOptionsContentWrapper = styled.div({
  boxShadow: '0 2px 4px 0 rgba(0,0,0,0.50)',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  borderRadius: '4px',
})

function InlineOptions({ children }: { children: React.ReactNode }) {
  return (
    <InlineOptionsWrapper>
      <InlineOptionsContentWrapper>{children}</InlineOptionsContentWrapper>
    </InlineOptionsWrapper>
  )
}

const Option = styled.div({
  padding: '5px 10px',
  cursor: 'pointer',
  width: '100%',
  minWidth: '150px',
  '&:hover': {
    color: 'rgb(70, 155, 255)',
  },
})

export function MultimediaEditor({
  state,
  config,
  editable,
  focused,
  renderIntoSettings,
}: MultimediaProps) {
  const multimediaStrings = useEditorStrings().plugins.multimedia

  const { allowedPlugins } = config

  const { explanation, multimedia } = state

  const textFocused = useAppSelector((state) =>
    selectHasFocusedDescendant(state, explanation.id)
  )

  const multimediaFocused = useAppSelector((state) =>
    selectIsFocused(state, multimedia.id)
  )

  const hasFocus = focused || multimediaFocused || textFocused
  const withoutMultimedia = useAppSelector((state) =>
    selectIsDocumentEmpty(state, multimedia.id)
  )

  const multimediaDocument: MultimediaDocument | null = useAppSelector(
    (state) => selectDocument(state, multimedia.id)
  )
  const [replacedMultimediaCache, setReplacedMultimediaCache] = useState<
    Record<string, unknown>
  >({})
  function handleMultimediaChange(selected: string) {
    setReplacedMultimediaCache((current) => {
      const multimediaSerializedDocument: MultimediaDocument | null =
        selectSerializedDocument(store.getState(), multimedia.id)
      if (!multimediaSerializedDocument) return current

      return {
        ...current,
        [multimediaSerializedDocument.plugin]:
          multimediaSerializedDocument.state,
      }
    })
    multimedia.replace(selected, replacedMultimediaCache[selected])
  }
  const [showOptions, setShowOptions] = useState(false)

  function getPluginTitle(name: string) {
    return Object.hasOwn(multimediaStrings, name)
      ? multimediaStrings[name as keyof typeof multimediaStrings]
      : name
  }

  const pluginSelection = (
    <select
      value={multimediaDocument ? multimediaDocument.plugin : ''}
      onChange={(e) => handleMultimediaChange(e.target.value)}
    >
      {allowedPlugins.map((type) => {
        return (
          <option key={type} value={type}>
            {getPluginTitle(type)}
          </option>
        )
      })}
    </select>
  )

  const multimediaSettings = (
    <>
      <hr />
      {allowedPlugins.length > 1 ? (
        <div>
          <strong>{multimediaStrings.changeType}</strong>
          {pluginSelection}
        </div>
      ) : null}
    </>
  )

  const [rowWidth, setRowWidth] = useState(0)

  const multimediaRendered = multimedia.render({
    renderToolbar(children) {
      return (
        <>
          <div
            className="relative"
            onMouseLeave={() => {
              setShowOptions(false)
            }}
          >
            {allowedPlugins.length > 1 ? (
              <PluginToolbarButton
                icon={<FaIcon icon={faRandom} />}
                label={multimediaStrings.changeType}
                onClick={() => {
                  setShowOptions(true)
                }}
              />
            ) : null}
            <PluginToolbarButton
              icon={<FaIcon icon={faTrashAlt} />}
              label={multimediaStrings.reset}
              onClick={() => {
                multimedia.replace(
                  multimediaDocument?.plugin ?? allowedPlugins[0]
                )
              }}
            />
            {showOptions ? (
              <InlineOptions>
                {allowedPlugins
                  .filter(
                    (plugin) =>
                      !multimediaDocument ||
                      plugin !== multimediaDocument.plugin
                  )
                  .map((plugin, i) => {
                    return (
                      <Option
                        key={i}
                        onClick={() => {
                          handleMultimediaChange(plugin)
                          setShowOptions(false)
                        }}
                      >
                        {getPluginTitle(plugin)}
                      </Option>
                    )
                  })}
              </InlineOptions>
            ) : null}
          </div>
          {children}
        </>
      )
    },
    renderSettings(children) {
      return (
        <>
          {children}
          {multimediaSettings}
        </>
      )
    },
  })

  if (!editable && withoutMultimedia) {
    return explanation.render()
  }

  return (
    <>
      <div
        className={hasFocus ? 'border-2 border-gray-300' : undefined}
        ref={(el) => {
          if (!el) return
          setRowWidth(el.offsetWidth)
        }}
      >
        <Resizable
          className="relative p-[5px]"
          enabled={editable && hasFocus}
          responsiveBreakpoint={BREAKPOINT}
          steps={STEPS}
          onResizeEnd={(newWidth) => {
            state.width.set(Math.round((newWidth * 100) / STEPS))
          }}
          rowWidth={rowWidth}
          widthInSteps={(state.width.value * STEPS) / 100}
          floating="right"
        >
          {multimediaRendered}
        </Resizable>
        ){explanation.render()}
        <div className="clear-both" />
      </div>
      {editable ? renderIntoSettings(multimediaSettings) : null}
    </>
  )
}
