import {
  StateType,
  StateTypeValueType,
  StateTypeReturnType,
  child,
} from '@editor/plugin'

/** jup it's basically a string – and only used by type-applet */
export function serializedChild(
  plugin: string
): StateType<
  unknown,
  StateTypeValueType<ReturnType<typeof child>>,
  StateTypeReturnType<ReturnType<typeof child>>
> {
  const originalChild = child({ plugin })
  return {
    ...originalChild,
    toStaticState(...args: Parameters<typeof originalChild.toStaticState>) {
      return originalChild.toStaticState(...args).state
    },
    toStoreState(
      serialized: string,
      helpers: Parameters<typeof originalChild.toStoreState>[1]
    ) {
      return originalChild.toStoreState(
        {
          plugin,
          state: serialized,
        },
        helpers
      )
    },
  }
}
