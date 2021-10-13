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
// eslint-disable-next-line import/no-internal-modules
import { serializer, slateValueToHtml } from '@edtr-io/plugin-text/internal'
import * as R from 'ramda'
import { Value } from 'slate'

import { LooseEdtrData, LooseEdtrDataDefined } from './editor'

export function cleanEdtrState(state: LooseEdtrData) {
  return cleanJson(state)

  /* eslint-disable @typescript-eslint/no-explicit-any */
  function cleanJson(jsonObj: LooseEdtrData): any {
    if (!jsonObj) return jsonObj
    if (typeof jsonObj === 'object') {
      return R.map((value) => {
        if (value.plugin === 'text' && value.state) {
          const slateValue = Value.fromJSON(serializer.deserialize(value.state))
          return {
            ...value,
            state: slateValueToHtml(slateValue),
          }
        }
        // @ts-expect-error someone with more edtr-io experience should look at this :)
        return cleanJson(value)
      }, jsonObj as LooseEdtrDataDefined)
    } else {
      // jsonObj is a number or string
      return jsonObj
    }
  }
  /* eslint-enable @typescript-eslint/no-explicit-any */
}
