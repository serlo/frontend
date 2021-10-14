// eslint-disable-next-line import/no-internal-modules
import { serializer, slateValueToHtml } from '@edtr-io/plugin-text/internal'
import * as R from 'ramda'
import { Value } from 'slate'

import { LooseEdtrData, LooseEdtrDataDefined } from './editor'

export function cleanEdtrState(state: LooseEdtrData) {
  // TODO: fix eslint
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
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

        // TODO: fix eslint
        // @ts-expect-error someone with more edtr-io experience should look at this :)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return cleanJson(value)
      }, jsonObj as LooseEdtrDataDefined)
    } else {
      // jsonObj is a number or string
      return jsonObj
    }
  }
  /* eslint-enable @typescript-eslint/no-explicit-any */
}
