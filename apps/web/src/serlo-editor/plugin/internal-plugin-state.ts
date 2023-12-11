import * as InternalPluginState from '../types/internal__plugin-state'

export type FocusableChild = InternalPluginState.FocusableChild

export type PluginProps = InternalPluginState.PluginProps

export type StateExecutor<T> = InternalPluginState.StateExecutor<T>

export type StateType<
  S = any,
  T = any,
  R = any,
> = InternalPluginState.StateType<S, T, R>

export type StateTypeReturnType<D extends StateType> =
  InternalPluginState.StateTypeReturnType<D>

export type StateTypesReturnType<Ds extends Record<string, StateType>> =
  InternalPluginState.StateTypesReturnType<Ds>

export type StateTypeStaticType<D extends StateType> =
  InternalPluginState.StateTypeStaticType<D>

export type PrettyStaticState<D extends StateType> = Prettify<
  InternalPluginState.StateTypeStaticType<D>
>

export type StateTypesStaticType<Ds extends Record<string, StateType>> =
  InternalPluginState.StateTypesStaticType<Ds>

export type StateTypeValueType<D extends StateType> =
  InternalPluginState.StateTypeValueType<D>

export type StateTypesValueType<Ds extends Record<string, StateType>> =
  InternalPluginState.StateTypesValueType<Ds>

export type StateUpdater<T> = InternalPluginState.StateUpdater<T>

export type ToStoreHelpers<
  K extends string = string,
  S = unknown,
> = InternalPluginState.ToStoreHelpers<K, S>

export type ToStaticHelpers<
  K extends string = string,
  S = unknown,
> = InternalPluginState.ToStaticHelpers<K, S>

// dark ts magic ✨
type Prettify<T> = {
  [K in keyof T]: T[K]
} & unknown
