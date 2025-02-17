import {
  StateType,
  StateTypesStaticType,
  StateTypesValueType,
  StateTypeValueType,
  StateTypesReturnType,
  StateTypeReturnType,
  child,
  object,
} from '@editor/plugin'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { mapObjIndexed } from 'ramda'

export function entityType<
  Ds extends Record<string, StateType>,
  Childs extends Record<string, StateType>,
>(
  ownTypes: Ds,
  children: Childs
): StateType<
  StateTypesStaticType<Ds & Childs>,
  StateTypesValueType<Ds & Childs>,
  StateTypesReturnType<Ds & Childs> & {
    replaceOwnState: (newValue: StateTypesStaticType<Ds>) => void
  }
> {
  const objectType = object<Ds & Childs>({ ...ownTypes, ...children })
  return {
    ...objectType,
    init(state, onChange) {
      const initialisedObject = objectType.init(state, onChange)
      return {
        ...initialisedObject,
        replaceOwnState(newValue) {
          onChange((previousState, helpers) => {
            return mapObjIndexed((_value, key) => {
              if (key in ownTypes) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return ownTypes[key].toStoreState(newValue[key], helpers)
              } else {
                return previousState[key]
              }
            }, previousState) as StateTypesValueType<Ds & Childs>
          })
        },
      }
    },
  }
}

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
