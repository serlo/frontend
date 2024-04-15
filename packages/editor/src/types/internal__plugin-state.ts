/**
 * Describes the states of a [[Plugin]]. Please note that a state type will be recreated in every render.
 *
 * @example the built-in [[boolean]], [[number]], [[string]], [[scalar]] and [[serializedScalar]], [[list]], [[object]], and [[child]] state types
 */
export interface StateType<S = any, T = any, R = any> {
  /**
   * Initializes the public API for usage in plugin components
   *
   * @param state - current state
   * @param onChange - callback to set the state, accepts a [[StateUpdater]] and an optional [[StateExecutor]]
   */
  init(
    state: T,
    onChange: (
      initial: StateUpdater<T>,
      additional?: {
        executor?: StateExecutor<StateUpdater<T>>
        reverse?: (previousState: T) => T
      }
    ) => void
  ): R

  /**
   * Creates the initial state
   *
   * @param helpers - helpers (e.g. to insert a document in the store)
   * @returns initial state
   */
  createInitialState(helpers: ToStoreHelpers): T

  /**
   * Converts a static state into a store state
   *
   * @param staticState - static state or document to convert
   * @param helpers - helpers (e.g. to insert an document in the store)
   * @returns store state
   */
  toStoreState(staticState: S, helpers: ToStoreHelpers): T

  /**
   * Converts a store state to a static state
   *
   * @param storeState - state to convert
   * @param helpers - helpers (e.g. to convert a state)
   * @returns static state
   */
  toStaticState(storeState: T, helpers: ToStaticHelpers): S

  /**
   * Gives the editor information about the children of the plugin (e.g. to build the document tree)
   *
   * @param state - current state
   * @returns an array of children, each described by an object with an `id`
   */
  getFocusableChildren(state: T): FocusableChild[]
}

/**
 * An updater will get called with the current state and helpers and should return the new state
 *
 * @param previousState - current state at the time the change is applied
 * @param helpers - helpers (e.g. to insert an document in the store)
 * @returns new state
 */
export type StateUpdater<T> = (previousState: T, helpers: ToStoreHelpers) => T

/**
 * Describes an asynchronous state update
 *
 * @param resolve - Callback to set the state after the asynchronous process has been completed successfully. Should only be called at most once.
 * @param reject - Callback to set the state after the asynchronous process has been completed unsuccessfully. Should only be called at most once.
 * @param next - Callback to update the state while it is still pending
 */
export type StateExecutor<T> = (
  resolve: (value: T) => void,
  reject: (value: T) => void
) => void

/**
 * Describes a child document
 *
 */
export interface FocusableChild {
  /**
   * Id of the document
   */
  id: string
}

/**
 * Maps a [[StateType]] to the type of its static state
 *
 */
export type StateTypeStaticType<D extends StateType> =
  D extends StateType<infer S> ? S : never

export type StateTypesStaticType<Ds extends Record<string, StateType>> = {
  [K in keyof Ds]: StateTypeStaticType<Ds[K]>
}

/**
 * Maps a [[StateType]] to the type of its store state
 *
 */
export type StateTypeValueType<D extends StateType> =
  D extends StateType<any, infer T> ? T : never

export type StateTypesValueType<Ds extends Record<string, StateType>> = {
  [K in keyof Ds]: StateTypeValueType<Ds[K]>
}

/**
 * Maps a [[StateType]] to the type of its public API for usage in plugin components
 *
 */
export type StateTypeReturnType<D extends StateType> =
  D extends StateType<any, any, infer R> ? R : never

export type StateTypesReturnType<Ds extends Record<string, StateType>> = {
  [K in keyof Ds]: StateTypeReturnType<Ds[K]>
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * Helpers to be used by a [[StateType]] when working with a static state
 *
 */
export interface ToStoreHelpers<K extends string = string, S = unknown> {
  /**
   * Inserts a document into the store
   *
   * @param document - document to insert
   */
  createDocument(document: { id: string; plugin: K; state?: S }): void
}

/**
 * Helpers to be used by a [[StateType]] when working with a store state
 *
 */
export interface ToStaticHelpers<K extends string = string, S = unknown> {
  /**
   * Retrieves a document from the store
   *
   * @param id - id of the document
   * @returns the document if it exists, `null` otherwise
   */
  getStoreDocument(id: string): { plugin: K; state?: S } | null
  omitId?: boolean
}

export interface PluginProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  config?: {}
}
