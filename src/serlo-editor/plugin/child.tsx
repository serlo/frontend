import { mergeDeepRight, omit } from 'ramda'
import { v4 } from 'uuid'

import type {
  StoreSerializeHelpers,
  StateType,
  PluginProps,
} from './internal-plugin-state'
import { SubDocument } from '../core'

export function child<K extends string, S = unknown>(
  params: ChildStateTypeConfig
): ChildStateType<K, S> {
  const { plugin, initialState, config } = params

  return {
    init(id, onChange) {
      return {
        get() {
          return id
        },
        id,
        render: function Child(props: PluginProps = {}) {
          const pluginProps = {
            ...props,
            config: mergeDeepRight(config || {}, props.config || {}),
          }
          return <SubDocument key={id} pluginProps={pluginProps} id={id} />
        },
        replace: (plugin, state) => {
          onChange((_id, helpers) => {
            helpers.createDocument({ id, plugin, state })
            return id
          })
        },
      }
    },
    createInitialState({ createDocument }) {
      const id = v4()
      createDocument({ id, plugin, state: initialState })
      return id
    },
    deserialize(serialized, { createDocument }) {
      const id = serialized.id ?? v4()
      createDocument({ id, ...serialized })
      return id
    },
    serialize(id, { getDocument, omitId }: StoreSerializeHelpers<K, S>) {
      const document = getDocument(id)
      if (document === null) {
        throw new Error('No document with this id exists')
      }
      // make sure we use new ids when duplicating content
      if (omitId) return omit(['id'], document)
      // making sure existing plugins store `id` in state as well
      if (Object.hasOwn(document, 'id')) return document
      return { ...document, id }
    },
    getFocusableChildren(id) {
      return [{ id }]
    },
  }
}

export type ChildStateType<K extends string = string, S = unknown> = StateType<
  { plugin: K; state?: S; id?: string },
  string,
  {
    get(): string
    id: string
    render: (props?: PluginProps) => React.ReactElement
    replace: (plugin: K, state?: S, id?: string) => void
  }
>

export interface ChildStateTypeConfig<K extends string = string, S = unknown> {
  plugin: K
  initialState?: S
  // eslint-disable-next-line @typescript-eslint/ban-types
  config?: {}
}
