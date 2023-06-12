import * as R from 'ramda'

import { RowsConfig, RowsPluginConfig } from '.'

export function useRowsConfig(config: RowsConfig): RowsPluginConfig {
  const { i18n = {}, plugins } = config

  return {
    plugins,
    i18n: R.mergeDeepRight(
      {
        menu: {
          searchPlaceholder: 'Search for tools…',
        },
        settings: {
          duplicateLabel: 'Duplicate',
          removeLabel: 'Remove',
          closeLabel: 'Close',
        },
        toolbar: {
          dragLabel: 'Drag the element within the document',
        },
        addLabel: 'Add an element',
      },
      i18n
    ),
  }
}
