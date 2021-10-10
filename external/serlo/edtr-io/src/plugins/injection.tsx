/**
 * This file is part of Serlo.org.
 *
 * Copyright (c) 2013-2021 Serlo Education e.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @copyright Copyright (c) 2013-2021 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/serlo.org for the canonical source repository
 */
import { OverlayInput } from '@edtr-io/core'
import { EditorInlineSettings, EditorInput, styled } from '@edtr-io/editor-ui'
import { PreviewOverlay } from '@edtr-io/editor-ui/internal'
import { EditorPluginProps, string, EditorPlugin } from '@edtr-io/plugin'
import { Icon, faNewspaper } from '@edtr-io/ui'
import { useI18n } from '@serlo/i18n'
import * as React from 'react'
import fetch from 'unfetch'

/* global */
declare const Common: {
  trigger: (type: string, context?: HTMLDivElement | null) => void
}

export const injectionState = string()

export type InjectionPluginState = typeof injectionState

export const injectionPlugin: EditorPlugin<InjectionPluginState> = {
  Component: InjectionEditor,
  state: injectionState,
  config: {},
}

export function InjectionRenderer(props: { src: string }) {
  const [loaded, setLoaded] = React.useState('')
  const ref = React.useRef<HTMLDivElement>(null)
  const i18n = useI18n()

  React.useEffect(() => {
    const src = createURL(props.src)

    fetch(src, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-From': 'legacy-serlo.org',
      },
    })
      .then((response) => response.json())
      .then((data: { response: string }) => {
        setLoaded(data.response)
        setTimeout(() => {
          if (ref.current) {
            Common.trigger('new context', ref.current)
          }
        })
      })
      .catch(() => {
        setLoaded(
          `<div class="alert alert-info">${i18n.t(
            'injection::Illegal injection found'
          )}</div>`
        )
      })
  }, [props.src])

  if (loaded) {
    return (
      <div className="panel panel-default">
        <div
          className="panel-body"
          ref={ref}
          dangerouslySetInnerHTML={{ __html: loaded }}
        />
      </div>
    )
  }

  const src = createURL(props.src)
  return (
    <div>
      <a href={src}>{i18n.t('injection::Serlo entity {{src}}', { src })}</a>
    </div>
  )
}

function createURL(id: string) {
  if (id.startsWith('/') || id.startsWith('\\')) {
    return '/' + id.substring(1, id.length)
  }
  const match = id.match(/^https?:\/\/[^./]+\.serlo\.[^./]+\/(.+)$/g)
  if (match) {
    return '/' + match[1]
  }
  return '/' + id
}

const PlaceholderWrapper = styled.div({
  position: 'relative',
  width: '100%',
  textAlign: 'center',
})

function InjectionEditor(props: EditorPluginProps<typeof injectionState>) {
  const [cache, setCache] = React.useState(props.state.value)
  const [preview, setPreview] = React.useState(false)
  const i18n = useI18n()

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setCache(props.state.value)
    }, 2000)
    return () => {
      clearTimeout(timeout)
    }
  }, [props.focused, props.state.value])

  if (!props.editable) {
    return <InjectionRenderer src={props.state.value} />
  }

  return (
    <React.Fragment>
      {cache ? (
        <PreviewOverlay
          focused={props.focused || false}
          onChange={(nextActive) => {
            setPreview(nextActive)
            if (nextActive) {
              setCache(props.state.value)
            }
          }}
        >
          <InjectionRenderer src={cache} />
        </PreviewOverlay>
      ) : (
        <PlaceholderWrapper>
          <Icon icon={faNewspaper} size="5x" />
        </PlaceholderWrapper>
      )}
      {props.focused && !preview ? (
        <EditorInlineSettings>
          <EditorInput
            label={i18n.t('injection::Serlo ID:')}
            placeholder="123456"
            value={props.state.value}
            onChange={(e) => {
              props.state.set(e.target.value)
            }}
            width="30%"
            inputWidth="100%"
            ref={props.autofocusRef}
          />
        </EditorInlineSettings>
      ) : null}
      {props.renderIntoSettings(
        <React.Fragment>
          <OverlayInput
            label={i18n.t('injection::Serlo ID:')}
            placeholder="123456"
            value={props.state.value}
            onChange={(e) => {
              props.state.set(e.target.value)
            }}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  )
}
