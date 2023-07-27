import * as InternalPluginState from '../types/internal__plugin-state'

/* eslint-disable @typescript-eslint/no-explicit-any */
export type FocusableChild = InternalPluginState.FocusableChild
export type PluginProps = InternalPluginState.PluginProps
export type StateExecutor<T> = InternalPluginState.StateExecutor<T>
export type StateType<
  S = any,
  T = any,
  R = any
> = InternalPluginState.StateType<S, T, R>
export type StateTypeReturnType<D extends StateType> =
  InternalPluginState.StateTypeReturnType<D>
export type StateTypesReturnType<Ds extends Record<string, StateType>> =
  InternalPluginState.StateTypesReturnType<Ds>
export type StateTypeSerializedType<D extends StateType> =
  InternalPluginState.StateTypeSerializedType<D>
export type StateTypesSerializedType<Ds extends Record<string, StateType>> =
  InternalPluginState.StateTypesSerializedType<Ds>
export type StateTypeValueType<D extends StateType> =
  InternalPluginState.StateTypeValueType<D>
export type StateTypesValueType<Ds extends Record<string, StateType>> =
  InternalPluginState.StateTypesValueType<Ds>
export type StateUpdater<T> = InternalPluginState.StateUpdater<T>
export type StoreDeserializeHelpers<
  K extends string = string,
  S = unknown
> = InternalPluginState.StoreDeserializeHelpers<K, S>
export type StoreSerializeHelpers<
  K extends string = string,
  S = unknown
> = InternalPluginState.StoreSerializeHelpers<K, S>
/* eslint-enable @typescript-eslint/no-explicit-any */
