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
import { serializer } from '@edtr-io/plugin-text'
import {
  SplishBlockquoteState,
  SplishCodeState,
  SplishGeogebraState,
  SplishImageState,
  SplishInjectionState,
  SplishSpoilerState,
  SplishTableState,
  SplishTextState,
} from '../legacyToSplish/createPlugin'
import { convertOldSlate, htmlToSlate } from './convertSlate'
import { ContentCell, OtherPlugin, Plugin } from './types'
import { convertSplishToEdtrIO } from '..'

export function convertPlugin(cell: ContentCell): OtherPlugin {
  const { plugin, state } = cell.content
  switch (plugin.name) {
    case Plugin.Blockquote:
      const blockquoteState = state as SplishBlockquoteState
      return {
        plugin: 'important',
        state: convertSplishToEdtrIO(blockquoteState.child.state),
      }
    case Plugin.Image:
      const imageState = state as SplishImageState
      return {
        plugin: 'image',
        state: {
          alt: imageState.description,
          link: imageState.href
            ? {
                href: imageState.href,
                openInNewTab: false,
              }
            : undefined,
          src: imageState.src,
          maxWidth: undefined,
        },
      }
    case Plugin.Injection:
      const injectionState = state as SplishInjectionState
      return {
        plugin: 'injection',
        state: injectionState.src,
      }
    case Plugin.Spoiler:
      const spoilerState = state as SplishSpoilerState
      return {
        plugin: 'spoiler',
        state: {
          title: spoilerState.title,
          content: convertSplishToEdtrIO(spoilerState.content.state),
        },
      }
    case Plugin.Text:
      const textState = state as SplishTextState
      if (textState.editorState) {
        return {
          plugin: 'text',
          state: serializer.serialize(convertOldSlate(textState.editorState)),
        }
      } else {
        return {
          plugin: 'text',
          state: serializer.serialize(
            htmlToSlate(textState.importFromHtml || '')
          ),
        }
      }
    case Plugin.Table:
      const tableState = state as SplishTableState
      return {
        plugin: 'table',
        state: tableState.src,
      }
    case Plugin.Geogebra:
      const geogebraState = state as SplishGeogebraState
      return {
        plugin: 'geogebra',
        state: geogebraState.src,
      }
    case 'code':
      const code = state as SplishCodeState
      return {
        plugin: 'highlight',
        state: {
          language: code.language,
          code: code.src,
          showLineNumbers: false,
        },
      }
    default:
      return {
        plugin: 'error',
        state: {
          plugin: plugin.name,
          state: state,
        },
      }
  }
}
