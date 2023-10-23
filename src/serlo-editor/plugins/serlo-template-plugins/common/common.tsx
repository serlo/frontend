import { mapObjIndexed } from 'ramda'

import { tw } from '@/helper/tw'
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
} from '@/serlo-editor/plugin'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

const licenseState = object({
  id: number(),
  title: string(),
  shortTitle: string(),
  url: string(),
  agreement: string(),
})

export const uuid = {
  id: number(),
}

export const license = {
  license: optional(licenseState),
}

export const entity = {
  ...uuid,
  ...license,
  revision: number(),
  changes: string(),
}

export type Uuid = StateTypesStaticType<typeof uuid>
export type License = StateTypesStaticType<typeof license>
export type Entity = Uuid & License & { revision: number; changes?: string }

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
                return ownTypes[key].toStoreDocument(newValue[key], helpers)
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
    serialize(...args: Parameters<typeof type.toStaticDocument>) {
      return JSON.stringify(type.toStaticDocument(...args))
    },
    deserialize(
      serialized: string,
      helpers: Parameters<typeof type.toStoreDocument>[1]
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return type.toStoreDocument(JSON.parse(serialized), helpers)
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
    toStaticDocument(
      ...args: Parameters<typeof originalChild.toStaticDocument>
    ) {
      return JSON.stringify(originalChild.toStaticDocument(...args))
    },
    toStoreDocument(
      serialized: string,
      helpers: Parameters<typeof originalChild.toStoreDocument>[1]
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return originalChild.toStoreDocument(JSON.parse(serialized), helpers)
    },
  }
}

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
    toStaticDocument(
      ...args: Parameters<typeof originalChild.toStaticDocument>
    ) {
      return originalChild.toStaticDocument(...args).state
    },
    toStoreDocument(
      serialized: string,
      helpers: Parameters<typeof originalChild.toStoreDocument>[1]
    ) {
      return originalChild.toStoreDocument(
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
              return child.toStoreDocument(state, helpers)
            }
            return child.createInitialState(helpers)
          })
        },
        remove() {
          onChange(() => null)
        },
      }
    },
    toStaticDocument(
      storeDocument: string | null,
      helpers: Parameters<typeof child.toStaticDocument>[1]
    ) {
      if (!storeDocument) return null
      return child.toStaticDocument(storeDocument, helpers)
    },
    toStoreDocument(
      staticDocument: string | null,
      helpers: Parameters<typeof child.toStoreDocument>[1]
    ) {
      if (!staticDocument) return null
      return child.toStoreDocument(staticDocument, helpers)
    },
    createInitialState() {
      return null
    },
    getFocusableChildren(child) {
      return child ? [{ id: child }] : []
    },
  }
}

export const headerInputClasses = tw`mt-4 w-full border-b-2 border-none border-transparent focus:border-brand focus:outline-none`
