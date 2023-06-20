import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { mapObjIndexed } from 'ramda'

import { FaIcon } from '@/components/fa-icon'
import { tw } from '@/helper/tw'
import {
  StateType,
  StateTypesSerializedType,
  StateTypeSerializedType,
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
import { PluginToolbarButton } from '@/serlo-editor/plugin/plugin-toolbar'
import { selectDocument, useAppSelector } from '@/serlo-editor/store'

export const licenseState = object({
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

export type Uuid = StateTypesSerializedType<typeof uuid>
export type License = StateTypesSerializedType<typeof license>
export type Entity = Uuid & License & { revision: number; changes?: string }

export function entityType<
  Ds extends Record<string, StateType>,
  Childs extends Record<string, StateType>
>(
  ownTypes: Ds,
  children: Childs,
  getFocusableChildren?: (children: { [K in keyof Ds]: { id: string }[] }) => {
    id: string
  }[]
): StateType<
  StateTypesSerializedType<Ds & Childs>,
  StateTypesValueType<Ds & Childs>,
  StateTypesReturnType<Ds & Childs> & {
    replaceOwnState: (newValue: StateTypesSerializedType<Ds>) => void
  }
> {
  const objectType = object<Ds & Childs>(
    { ...ownTypes, ...children },
    getFocusableChildren
  )
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
                return ownTypes[key].deserialize(newValue[key], helpers)
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
    serialize(...args: Parameters<typeof type.serialize>) {
      return JSON.stringify(type.serialize(...args))
    },
    deserialize(
      serialized: string,
      helpers: Parameters<typeof type.deserialize>[1]
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return type.deserialize(JSON.parse(serialized), helpers)
    },
  }
}

export function editorContent(
  plugin: string = 'rows'
): StateType<
  string,
  StateTypeValueType<ReturnType<typeof child>>,
  StateTypeReturnType<ReturnType<typeof child>>
> {
  const originalChild = child<string>({ plugin })
  return {
    ...originalChild,
    serialize(...args: Parameters<typeof originalChild.serialize>) {
      return JSON.stringify(originalChild.serialize(...args))
    },
    deserialize(
      serialized: string,
      helpers: Parameters<typeof originalChild.deserialize>[1]
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return originalChild.deserialize(JSON.parse(serialized), helpers)
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
    serialize(...args: Parameters<typeof originalChild.serialize>) {
      return originalChild.serialize(...args).state
    },
    deserialize(
      serialized: string,
      helpers: Parameters<typeof originalChild.deserialize>[1]
    ) {
      return originalChild.deserialize(
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
  StateTypeSerializedType<ReturnType<typeof serializedChild>> | null,
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
              return child.deserialize(state, helpers)
            }
            return child.createInitialState(helpers)
          })
        },
        remove() {
          onChange(() => null)
        },
      }
    },
    serialize(
      deserialized: string | null,
      helpers: Parameters<typeof child.serialize>[1]
    ) {
      if (!deserialized) return null
      return child.serialize(deserialized, helpers)
    },
    deserialize(
      serialized: string | null,
      helpers: Parameters<typeof child.deserialize>[1]
    ) {
      if (!serialized) return null
      return child.deserialize(serialized, helpers)
    },
    createInitialState() {
      return null
    },
    getFocusableChildren(child) {
      return child ? [{ id: child }] : []
    },
  }
}

export function OptionalChild(props: {
  removeLabel: string
  state: StateTypeReturnType<ReturnType<typeof serializedChild>>
  onRemove: () => void
}) {
  const expectedStateType = object(entity)
  const document = useAppSelector((state) =>
    selectDocument(state, props.state.id)
  ) as {
    state: StateTypeValueType<typeof expectedStateType>
  }
  const children = props.state.render({
    renderToolbar(children) {
      if (document.state.id !== 0) return children

      return (
        <>
          <PluginToolbarButton
            icon={<FaIcon icon={faTrashAlt} />}
            label={props.removeLabel}
            onClick={() => {
              props.onRemove()
            }}
          />
          {children}
        </>
      )
    },
  })
  return (
    <>
      <hr className="my-12" />
      {children}
    </>
  )
}

export const headerInputClasses = tw`w-full border-b-2 border-none border-transparent focus:border-brand focus:outline-none`
