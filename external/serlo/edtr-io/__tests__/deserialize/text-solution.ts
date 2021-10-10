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
import { deserialize, DeserializeSuccess } from '../../src/deserialize'

test('initial', () => {
  const initialState = assertSuccessfulDeserialize(createTextSolutionState(''))
  expect(initialState.plugin).toEqual('type-text-solution')
  assertContentToMatch(initialState, {
    plugin: 'solution',
    state: {
      prerequisite: undefined,
      strategy: { plugin: 'text' },
      steps: {
        plugin: 'rows',
        state: [
          {
            plugin: 'text',
          },
        ],
      },
    },
  })
})

function createTextSolutionState(
  content: string
): Parameters<typeof deserialize>[0] {
  return {
    initialState: {
      id: 1,
      revision: 2,
      license: {
        id: 3,
        title: 'License',
        url: 'https://example.com',
        agreement: 'Agreement',
        iconHref: 'iconHref',
      },
      content,
    },
    type: 'text-solution',
  }
}

function assertSuccessfulDeserialize(...args: Parameters<typeof deserialize>) {
  const result = deserialize(...args)
  expect((result as DeserializeSuccess).success).toBeTruthy()
  return (result as DeserializeSuccess).initialState
}

function assertContentToMatch(
  result: DeserializeSuccess['initialState'],
  expected: unknown
) {
  const serializedContent = (result.state as { content: string }).content
  const content = JSON.parse(serializedContent)
  expect(content).toEqual(expected)
}
