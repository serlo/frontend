import {
  StateType,
  ToStoreHelpers,
  ToStaticHelpers,
} from './internal-plugin-state'

// this file is currently unused

/**
 * @param type - The initial {@link @edtr-io/internal__plugin-state#StateType | state type} to start the migration from
 */
export function migratable<S, T, R>(
  type: StateType<S, T, R>
): MigratableStateType<S, S, S, T, R> {
  return migrate<S, never, S, S, T, R>(
    (state) => {
      return state as S
    },
    type,
    0,
    (state) => state
  )
}

function migrate<InitialS, AllS, S, S1, T1, R1>(
  recursiveMigrate: (previousState: InitialS | Versionized<AllS>) => S,
  nextType: StateType<S1, T1, R1>,
  nextVersion: number,
  f: (previousState: S) => S1
): MigratableStateType<InitialS, AllS | S1, S1, T1, R1> {
  return {
    ...nextType,
    toStoreState(
      state: InitialS | Versionized<AllS | S1>,
      helpers: ToStoreHelpers
    ) {
      if (isVersionized<S1>(state, nextVersion)) {
        return nextType.toStoreState(state.value, helpers)
      }
      const s = state as InitialS | Versionized<AllS>
      return nextType.toStoreState(f(recursiveMigrate(s)), helpers)
    },
    toStaticState(storeState: T1, helpers: ToStaticHelpers): Versionized<S1> {
      return {
        __version__: nextVersion,
        value: nextType.toStaticState(storeState, helpers),
      }
    },
    migrate<S2, T2, R2>(
      nextNextType: StateType<S2, T2, R2>,
      f2: (previousState: S1) => S2
    ): MigratableStateType<InitialS, AllS | S1 | S2, S2, T2, R2> {
      return migrate<InitialS, AllS | S1, S1, S2, T2, R2>(
        (previousState: InitialS | Versionized<AllS | S1>) => {
          if (isVersionized<S1>(previousState, nextVersion)) {
            return previousState.value
          }
          return f(
            recursiveMigrate(previousState as InitialS | Versionized<AllS>)
          )
        },
        nextNextType,
        nextVersion + 1,
        f2
      )
    },
  }
}

function isVersionized<S>(
  state: unknown,
  version: number
): state is Versionized<S> {
  return (state as Versionized<S>).__version__ === version
}

export interface Versionized<S> {
  __version__: number
  value: S
}

export interface MigratableStateType<InitialS, AllS, S, T, R>
  extends StateType<InitialS | Versionized<AllS>, T, R> {
  migrate<S1, T1, R1>(
    nextType: StateType<S1, T1, R1>,
    migrate: (previousState: S) => S1
  ): MigratableStateType<InitialS, AllS | S1, S1, T1, R1>
}
