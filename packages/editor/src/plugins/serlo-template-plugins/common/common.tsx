import {
  StateType,
  StateTypesStaticType,
  StateTypeStaticType,
  StateTypesValueType,
  StateTypeValueType,
  StateTypesReturnType,
  StateTypeReturnType,
  StateUpdater,
  child,
  number,
  object,
  string,
  optional,
  EditorPluginProps,
} from '@editor/plugin'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { cn } from '@serlo/frontend/src/helper/cn'
import { mapObjIndexed } from 'ramda'

export const uuid = {
  id: number(),
}

export const entity = {
  ...uuid,
  revision: number(),
  licenseId: optional(number()),
  changes: string(),
  meta_title: optional(string()),
  meta_description: optional(string()),
}

const entityTypeHelper = entityType(entity, {})
export type EntityStateProps = EditorPluginProps<typeof entityTypeHelper>

export type Uuid = StateTypesStaticType<typeof uuid>
export type Entity = Uuid & {
  revision: number
  changes?: string
  licenseId?: number
}

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

export function serialized<S extends StateType>(type: S) {
  return {
    ...type,
    serialize(...args: Parameters<typeof type.toStaticState>) {
      return JSON.stringify(type.toStaticState(...args))
    },
    deserialize(
      serialized: string,
      helpers: Parameters<typeof type.toStoreState>[1]
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return type.toStoreState(JSON.parse(serialized), helpers)
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

/** jup it's basically a string */
export function serializedChild(
  plugin: string
): StateType<
  unknown,
  StateTypeValueType<ReturnType<typeof child>>,
  StateTypeReturnType<ReturnType<typeof child>>
> {
  const originalChild = child({ plugin, config: { skipControls: true } })
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

export function optionalSerializedChild(plugin: string): StateType<
  StateTypeStaticType<ReturnType<typeof serializedChild>> | null,
  StateTypeValueType<ReturnType<typeof serializedChild>> | null,
  StateTypeReturnType<ReturnType<typeof serializedChild>> & {
    create: (state?: unknown) => void
    remove: () => void
  }
> {
  const child = serializedChild(plugin)
  return {
    ...child,
    init(
      state: string,
      onChange: (updater: StateUpdater<string | null>) => void
    ) {
      return {
        ...child.init(state, (updater) => {
          onChange((oldId, helpers) => {
            return updater(oldId || '', helpers)
          })
        }),
        create(state?: unknown) {
          onChange((_oldId, helpers) => {
            if (typeof state !== 'undefined') {
              return child.toStoreState(state, helpers)
            }
            return child.createInitialState(helpers)
          })
        },
        remove() {
          onChange(() => null)
        },
      }
    },
    toStaticState(
      state: string | null,
      helpers: Parameters<typeof child.toStaticState>[1]
    ) {
      if (!state) return null
      return child.toStaticState(state, helpers)
    },
    toStoreState(
      state: string | null,
      helpers: Parameters<typeof child.toStoreState>[1]
    ) {
      if (!state) return null
      return child.toStoreState(state, helpers)
    },
    createInitialState() {
      return null
    },
    getFocusableChildren(child) {
      return child ? [{ id: child }] : []
    },
  }
}

export const headerInputClasses = cn(
  `mt-4 w-full border-b-2 border-none border-transparent focus:border-brand focus:outline-none`
)
