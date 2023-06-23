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
import { useMultimediaConfig } from './config'
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

export function MultimediaEditor(props: MultimediaProps) {
  const multimediaStrings = useEditorStrings().plugins.multimedia
  const config = useMultimediaConfig(props.config)

  function handleIllustratingChange(e: React.ChangeEvent<HTMLSelectElement>) {
    props.state.illustrating.set(e.target.value === 'illustrating')
  }
  const textFocused = useAppSelector((state) =>
    selectHasFocusedDescendant(state, props.state.explanation.id)
  )

  const multimediaFocused = useAppSelector((state) =>
    selectIsFocused(state, props.state.multimedia.id)
  )

  const hasFocus = props.focused || multimediaFocused || textFocused
  const withoutMultimedia = useAppSelector((state) =>
    selectIsDocumentEmpty(state, props.state.multimedia.id)
  )

  const multimediaDocument: MultimediaDocument | null = useAppSelector(
    (state) => selectDocument(state, props.state.multimedia.id)
  )
  const [replacedMultimediaCache, setReplacedMultimediaCache] = useState<
    Record<string, unknown>
  >({})
  function handleMultimediaChange(selected: string) {
    setReplacedMultimediaCache((current) => {
      const multimediaSerializedDocument: MultimediaDocument | null =
        selectSerializedDocument(store.getState(), props.state.multimedia.id)
      if (!multimediaSerializedDocument) return current

      return {
        ...current,
        [multimediaSerializedDocument.plugin]:
          multimediaSerializedDocument.state,
      }
    })
    props.state.multimedia.replace(selected, replacedMultimediaCache[selected])
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
      {props.config.plugins.map((type) => {
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
      {config.features.importance ? (
        <>
          <div className="flex-[1]">
            <strong>{multimediaStrings.isIllustrating}</strong>
          </div>
          <div className="flex-[1]">
            <select
              value={
                props.state.illustrating.value ? 'illustrating' : 'explaining'
              }
              onChange={handleIllustratingChange}
            >
              <option value="illustrating">
                {multimediaStrings.isIllustrating}
              </option>
              <option value="explaining">
                {multimediaStrings.isEssential}
              </option>
            </select>
          </div>
        </>
      ) : null}
      {props.config.plugins.length > 1 ? (
        <div>
          <strong>{multimediaStrings.changeType}</strong>
          {pluginSelection}
        </div>
      ) : null}
    </>
  )

  const [rowWidth, setRowWidth] = useState(0)

  const multimediaRendered = props.state.multimedia.render({
    renderToolbar(children) {
      return (
        <>
          <div
            className="relative"
            onMouseLeave={() => {
              setShowOptions(false)
            }}
          >
            {props.config.plugins.length > 1 ? (
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
                props.state.multimedia.replace(
                  multimediaDocument?.plugin ?? props.config.plugins[0]
                )
              }}
            />
            {showOptions ? (
              <InlineOptions>
                {props.config.plugins
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

  if (!props.editable && withoutMultimedia) {
    return props.state.explanation.render()
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
        {props.state.illustrating.value ? (
          <Resizable
            className="relative p-[5px]"
            enabled={
              props.editable && hasFocus && props.state.illustrating.value
            }
            responsiveBreakpoint={BREAKPOINT}
            steps={STEPS}
            onResizeEnd={(newWidth) => {
              props.state.width.set(Math.round((newWidth * 100) / STEPS))
            }}
            rowWidth={rowWidth}
            widthInSteps={(props.state.width.value * STEPS) / 100}
            floating="right"
          >
            {multimediaRendered}
          </Resizable>
        ) : (
          multimediaRendered
        )}
        {props.state.explanation.render()}
        <div className="clear-both" />
      </div>
      {props.editable ? props.renderIntoSettings(multimediaSettings) : null}
    </>
  )
}
