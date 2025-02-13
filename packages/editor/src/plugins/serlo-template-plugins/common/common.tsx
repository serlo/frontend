import {
  StateType,
  StateTypeValueType,
  StateTypeReturnType,
  child,
} from '@editor/plugin'
import { EditorPluginType } from '@editor/types/editor-plugin-type'

export function editorContent(
  plugin: string = EditorPluginType.Rows
): StateType<
  string,
  StateTypeValueType<ReturnType<typeof child>>,
  StateTypeReturnType<ReturnType<typeof child>>
> {
  const originalChild = child<string>({ plugin })
  return {
    ...originalChild,
    toStaticState(...args: Parameters<typeof originalChild.toStaticState>) {
      return JSON.stringify(originalChild.toStaticState(...args))
    },
    toStoreState(
      serialized: string,
      helpers: Parameters<typeof originalChild.toStoreState>[1]
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return originalChild.toStoreState(JSON.parse(serialized), helpers)
    },
  }
}

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
