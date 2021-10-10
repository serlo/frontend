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
import * as R from 'ramda'
//@ts-ignore
import unexpected from 'unexpected'
import { ContentCell, Plugin } from '../src/splishToEdtr/types'
import { SplishTextState } from '../src/legacyToSplish/createPlugin'

const expectInstance = unexpected.clone()

/**
 * Remove all specified keys from an object, no matter how deep they are.
 * This function has no limit so circular objects will probably crash the browser
 *
 * @param input The object from where you want to remove the keys
 * @param keys An array of property names (strings) to remove
 * @return the object with removed keys
 */
const deepOmitKeys = (input: any, keys: (keyof typeof input)[]): void => {
  let obj = R.clone(input)
  let index
  for (let prop in obj) {
    // important check that this is objects own property
    // not from prototype prop inherited
    if (obj.hasOwnProperty(prop)) {
      switch (typeof obj[prop]) {
        case 'string':
          index = keys.indexOf(prop)
          if (index > -1) {
            delete obj[prop]
          }
          break
        case 'object':
          index = keys.indexOf(prop)
          if (index > -1) {
            delete obj[prop]
          } else {
            obj[prop] = deepOmitKeys(obj[prop], keys)
          }
          break
      }
    }
  }
  return obj
}

const ignoreIrrelevantKeys = (obj: any) => deepOmitKeys(obj, ['id'])

export const expect = <In, Out>(input: In, method: string, output: Out) => {
  expectInstance(
    ignoreIrrelevantKeys(input),
    method,
    ignoreIrrelevantKeys(output)
  )
}

export const expectSplishSlate = (
  html: string
): ContentCell<SplishTextState> => ({
  content: {
    plugin: { name: Plugin.Text, version: '0.0.0' },
    state: {
      importFromHtml: html,
    },
  },
})

// Just so that Jest doesn't complain about an empty test suite
test('', () => {})
