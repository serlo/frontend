import * as R from 'ramda'

import {
  StateType,
  StateTypesStaticType,
  StateTypesValueType,
  StateTypesReturnType,
  StateTypeReturnType,
  FocusableChild,
  StateUpdater,
  StateExecutor,
} from './internal-plugin-state'

/**
 * @param types - The {@link @edtr-io/internal__plugin-state#StateType | state types} of the properties of the object
 * @param getFocusableChildren - Allows to override the default order of focusable children
 */
export function object<Ds extends Record<string, StateType>>(
  types: Ds
): ObjectStateType<Ds> {
  type S = StateTypesStaticType<Ds>
  type T = StateTypesValueType<Ds>
  type U = StateTypesReturnType<Ds>

  const getObjectChildIds = (children: {
    [K in keyof Ds]: { id: string }[]
  }) => R.flatten<readonly FocusableChild[][]>(R.values(children))

  return {
    init(state, onChange) {
      return R.mapObjIndexed((type, key) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return type.init(state[key], innerOnChange)

        function innerOnChange(
          initial: StateUpdater<StateTypeReturnType<typeof type>>,
          {
            executor,
            reverse,
          }: {
            executor?: StateExecutor<
              StateUpdater<StateTypeReturnType<typeof type>>
            >
            reverse?: (
              previousState: StateTypeReturnType<typeof type>
            ) => StateTypeReturnType<typeof type>
          } = {}
        ): void {
          function wrapReverse(
            reverse: (
              previousState: StateTypeReturnType<typeof type>
            ) => StateTypeReturnType<typeof type>
          ): (
            previousState: StateTypesValueType<Ds>
          ) => StateTypesValueType<Ds> {
            return (oldObj) => {
              return R.set(R.lensProp(key), reverse(oldObj[key]), oldObj)
            }
          }

          function wrapUpdater(
            initial: StateUpdater<StateTypeReturnType<typeof type>>
          ): StateUpdater<StateTypesValueType<Ds>> {
            return (oldObj, helpers) => {
              return R.set(
                R.lensProp(key),
                initial(oldObj[key], helpers),
                oldObj
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
      }, types) as U
    },
    createInitialState(helpers) {
      return R.map((type) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return type.createInitialState(helpers)
      }, types) as T
    },
    toStoreState(staticState, helpers) {
      return R.mapObjIndexed((type, key) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return type.toStoreState(staticState[key], helpers)
      }, types) as T
    },
    toStaticState(storeState, helpers) {
      return R.mapObjIndexed((type, key) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return type.toStaticState(storeState[key], helpers)
      }, types) as S
    },
    getFocusableChildren(state) {
      const children = R.mapObjIndexed((type, key) => {
        return type.getFocusableChildren(state[key])
      }, types) as { [K in keyof Ds]: { id: string }[] }
      return getObjectChildIds(children)
    },
  }
}

export type ObjectStateType<Ds extends Record<string, StateType>> = StateType<
  StateTypesStaticType<Ds>,
  StateTypesValueType<Ds>,
  StateTypesReturnType<Ds>
>
