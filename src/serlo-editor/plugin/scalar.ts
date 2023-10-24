import { StateExecutor, StateType, StateUpdater } from './internal-plugin-state'

/**
 * @param initialValue - The initial value
 */
export function boolean(initialValue?: boolean): BooleanStateType {
  return scalar<boolean>(initialValue || false)
}
export type BooleanStateType = ScalarStateType<boolean>

/**
 * @param initialValue - The initial value
 */
export function number(initialValue?: number): NumberStateType {
  return scalar<number>(initialValue || 0)
}
export type NumberStateType = ScalarStateType<number>

/**
 * @param initialValue - The initial value
 */
export function string(initialValue?: string): StringStateType {
  return scalar<string>(initialValue || '')
}
export type StringStateType = ScalarStateType<string>

/**
 * @param initialState - The initial value
 */
export function scalar<S>(initialState: S): ScalarStateType<S> {
  return serializedScalar<S, S>(initialState, {
    toStoreState(state) {
      return state
    },
    toStaticState(state) {
      return state
    },
  })
}
export type ScalarStateType<S> = SerializedScalarStateType<S, S>

/**
 * @param initialState - The initial state
 * @param toStaticConverter - The {@link ToStaticConverter}
 */
export function serializedScalar<S, T>(
  initialState: T,
  toStaticConverter: ToStaticConverter<S, T>
): SerializedScalarStateType<S, T> {
  return {
    init(state, onChange) {
      class SerializedScalarType {
        public get value(): T {
          return state
        }
        public set value(param: T) {
          this.set(param)
        }
        public get() {
          return state
        }
        public set(
          param: T | ((previousValue: T) => T),
          reverse?: (previousValue: T) => T
        ) {
          onChange(
            (previousValue) => {
              if (typeof param === 'function') {
                const updater = param as (currentValue: T) => T
                return updater(previousValue)
              }
              return param
            },
            {
              reverse,
            }
          )
        }
      }
      return new SerializedScalarType()
    },
    createInitialState() {
      return initialState
    },
    getFocusableChildren() {
      return []
    },
    ...toStaticConverter,
  }
}
export type SerializedScalarStateType<S, T> = StateType<
  S,
  T,
  {
    value: T
    get(): T
    set(
      value: T | ((currentValue: T) => T),
      reverse?: (previousValue: T) => T
    ): void
  }
>
export interface ToStaticConverter<S, T> {
  toStoreState(state: S): T
  toStaticState(state: T): S
}

/**
 * @param initial - The initialValue
 * @param isTemporaryValue - Checks whether the given value is temporary
 */
export function asyncScalar<T, Temp>(
  initial: T,
  isTemporaryValue: (field: T | Temp) => boolean
): AsyncScalarStateType<T, Temp> {
  // warp boolean to typeguard
  function isTemporary(field: T | Temp): field is Temp {
    return isTemporaryValue(field)
  }

  return {
    init(state, onChange) {
      return {
        value: state,
        get() {
          return state
        },
        set(initial, executor) {
          onChange(
            (previousState) => {
              if (typeof initial === 'function') {
                const f = initial as (previous: T | Temp) => T | Temp
                return f(previousState)
              }
              return initial
            },
            {
              executor: executor
                ? (
                    resolve: (updater: StateUpdater<T | Temp>) => void,
                    reject: (updater: StateUpdater<T | Temp>) => void
                  ) => {
                    if (!executor) return

                    executor(
                      wrapResolverParam(resolve),
                      wrapResolverParam(reject)
                    )
                  }
                : undefined,
            }
          )
        },
      }
      function wrapResolverParam(
        callback: (updater: StateUpdater<T | Temp>) => void
      ): (updater: T | Temp | ((previousValue: T | Temp) => T | Temp)) => void {
        return (update) => {
          if (typeof update === 'function') {
            const f = update as (previous: T | Temp) => T | Temp
            return callback(f)
          }

          return callback(() => update)
        }
      }
    },
    createInitialState() {
      return initial
    },
    getFocusableChildren() {
      return []
    },
    toStoreState(state) {
      return state
    },
    toStaticState(state) {
      if (isTemporary(state)) {
        return initial
      }
      return state
    },
  }
}
export type AsyncScalarStateType<T, Temp> = StateType<
  T,
  T | Temp,
  {
    value: T | Temp
    get(): T | Temp
    set(
      initial: T | Temp | ((previousValue: T | Temp) => T | Temp),
      executor?: StateExecutor<
        T | Temp | ((previousValue: T | Temp) => T | Temp)
      >
    ): void
  }
>
