import * as R from 'ramda'
import { v4 as uuidv4 } from 'uuid'

import {
  StateExecutor,
  StateType,
  StateTypeReturnType,
  StateTypeStaticType,
  StateTypeValueType,
  StateUpdater,
  ToStoreHelpers,
} from './internal-plugin-state'

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @param type - The {@link @edtr-io/internal__plugin-state#StateType | state type} of the list items
 * @param initialCount - The initial number of list items
 */
export function list<D extends StateType>(
  type: D,
  initialCount = 0
): ListStateType<D> {
  type S = StateTypeStaticType<D>
  type T = StateTypeValueType<D>

  interface WrappedValue {
    id: string
    value: T
  }

  return {
    init(rawItems, onChange) {
      const items = rawItems.map((item) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return type.init(item.value, createOnChange(item.id))
      })

      return Object.assign(items, {
        set(
          updater: (
            currentList: T[],
            staticToStore: (staticDocument: S) => T
          ) => T[]
        ) {
          onChange((wrappedItems, helpers) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            const unwrapped = R.map((wrapped) => wrapped.value, wrappedItems)
            return R.map(
              wrap,
              updater(unwrapped, (options) =>
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                type.toStoreState(options, helpers)
              )
            )
          })
        },
        insert(index?: number, options?: S) {
          onChange((items, helpers) => {
            const wrappedSubState = wrap(
              options
                ? (type.toStoreState(options, helpers) as T)
                : (type.createInitialState(helpers) as T)
            )
            return R.insert(
              index === undefined ? items.length : index,
              wrappedSubState,
              items
            )
          })
        },
        remove(index: number) {
          onChange((items) => R.remove(index, 1, items))
        },
        move(from: number, to: number) {
          onChange((items) => R.move(from, to, items))
        },
      })

      function createOnChange(id: string) {
        return (
          initial: StateUpdater<T>,
          {
            executor,
            reverse,
          }: {
            executor?: StateExecutor<StateUpdater<T>>
            reverse?: (previousState: T) => T
          } = {}
        ) => {
          function wrapReverse(
            reverse: (previousState: T) => T
          ): (previousState: WrappedValue[]) => WrappedValue[] {
            return (oldItems) => {
              const index = oldItems.findIndex((item) => item.id === id)
              return R.update(
                index,
                { value: reverse(oldItems[index].value), id: id },
                oldItems
              )
            }
          }

          function wrapUpdater(
            initial: StateUpdater<T>
          ): StateUpdater<WrappedValue[]> {
            return (oldItems: WrappedValue[], helpers: ToStoreHelpers) => {
              const index = oldItems.findIndex((item) => item.id === id)
              return R.update(
                index,
                { value: initial(oldItems[index].value, helpers), id: id },
                oldItems
              )
            }
          }
          onChange(wrapUpdater(initial), {
            executor: executor
              ? (resolve, reject) => {
                  executor(
                    (innerUpdater) => resolve(wrapUpdater(innerUpdater)),
                    (innerUpdater) => reject(wrapUpdater(innerUpdater))
                  )
                }
              : undefined,
            reverse: reverse ? wrapReverse(reverse) : undefined,
          })
        }
      }
    },
    createInitialState(helpers) {
      return R.times(() => {
        return wrap(type.createInitialState(helpers) as T)
      }, initialCount)
    },
    toStoreState(staticDocument, helpers) {
      return R.map((s) => {
        return wrap(type.toStoreState(s, helpers) as T)
      }, staticDocument)
    },
    toStaticState(storeState, helpers) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return R.map(({ value }) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return type.toStaticState(value, helpers)
      }, storeState)
    },
    getFocusableChildren(items) {
      return R.flatten(
        R.map((item) => {
          return type.getFocusableChildren(item.value)
        }, items)
      )
    },
  }

  function wrap(value: T): WrappedValue {
    return {
      id: uuidv4(),
      value,
    }
  }
}

export type ListStateType<D extends StateType> = StateType<
  StateTypeStaticType<D>[],
  {
    id: string
    value: StateTypeValueType<D>
  }[],
  StateTypeReturnType<D>[] & {
    set(
      updater: (
        currentList: StateTypeValueType<D>[],
        staticToStore: (
          staticState: StateTypeStaticType<D>
        ) => StateTypeValueType<D>
      ) => StateTypeValueType<D>[]
    ): void
    insert(index?: number, options?: StateTypeStaticType<D>): void
    remove(index: number): void
    move(from: number, to: number): void
  }
>
