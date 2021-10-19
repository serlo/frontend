import {
  useScopedDispatch,
  useScopedSelector,
  useScopedStore,
  PluginToolbarButton,
} from '@edtr-io/core'
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
} from '@edtr-io/plugin'
import {
  getDocument,
  redo,
  serializeRootDocument,
  undo,
  hasRedoActions,
  hasUndoActions,
  getPendingChanges,
} from '@edtr-io/store'
import { Icon, faTrashAlt, styled } from '@edtr-io/ui'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faRedo, faSave, faUndo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import * as R from 'ramda'
import * as React from 'react'
import { createPortal } from 'react-dom'

import { SaveModal } from '../../components/save-modal'
import { CsrfContext } from '../../csrf-context'
import { SaveContext, storeState } from '../../serlo-editor'

export const licenseState = object({
  id: number(),
  title: string(),
  url: string(),
  agreement: string(),
  iconHref: string(),
})

export const uuid = {
  id: number(),
}

export const license = {
  license: licenseState,
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

interface ControlsProps {
  changes?: StateTypeReturnType<typeof entity['changes']>
  license?: StateTypeReturnType<typeof entity['license']>
  subscriptions?: boolean
}

export function Controls(props: ControlsProps) {
  const store = useScopedStore()
  const dispatch = useScopedDispatch()
  const undoable = useScopedSelector(hasUndoActions())
  const redoable = useScopedSelector(hasRedoActions())
  const pendingChanges = useScopedSelector(getPendingChanges())
  const hasPendingChanges = pendingChanges !== 0
  const getCsrfToken = React.useContext(CsrfContext)

  const [visible, setVisibility] = React.useState(false)
  const [pending, setPending] = React.useState(false)
  const [hasError, setHasError] = React.useState(false)
  const [savedToLocalstorage, setSavedToLocalstorage] = React.useState(false)
  const { onSave, mayCheckout } = React.useContext(SaveContext)
  const [agreement, setAgreement] = React.useState(false)
  const [emailSubscription, setEmailSubscription] = React.useState(true)
  const [notificationSubscription, setNotificationSubscription] =
    React.useState(true)
  const [autoCheckout, setAutoCheckout] = React.useState(false)

  React.useEffect(() => {
    if (visible) {
      // Reset license agreement
      setPending(false)
      setHasError(false)
      setSavedToLocalstorage(false)
      setAgreement(false)
    }
  }, [visible])

  React.useEffect(() => {
    window.onbeforeunload = hasPendingChanges && !pending ? () => '' : null
  }, [hasPendingChanges, pending])

  return (
    <>
      {createPortal(
        <nav
          className={clsx('w-full flex justify-between', 'h-12 pt-4 pl-5 pr-3')}
        >
          <div>
            {renderUndoRedoButton('Undo', faUndo, undo, !undoable)}
            {renderUndoRedoButton('Redo', faRedo, redo, !redoable)}
          </div>
          <div>{renderSaveButton()}</div>
        </nav>,
        document.getElementsByClassName('controls-portal')[0]
      )}
      {/* omg this needs some refactoring, but splitting seems like a good first step */}
      <SaveModal
        visible={visible}
        setVisibility={setVisibility}
        savedToLocalstorage={savedToLocalstorage}
        maySave={maySave}
        handleSave={handleSave}
        pending={pending}
        setHasError={setHasError}
        licenseAccepted={licenseAccepted}
        changesFilledIn={changesFilledIn}
        setSavedToLocalstorage={setSavedToLocalstorage}
        changes={props.changes}
        hasError={hasError}
        mayCheckout={mayCheckout}
        autoCheckout={autoCheckout}
        setAutoCheckout={setAutoCheckout}
        license={props.license}
        agreement={agreement}
        setAgreement={setAgreement}
        subscriptions={props.subscriptions}
        setEmailSubscription={setEmailSubscription}
        setNotificationSubscription={setNotificationSubscription}
        emailSubscription={emailSubscription}
        notificationSubscription={notificationSubscription}
      />
    </>
  )

  function renderUndoRedoButton(
    title: string,
    icon: IconProp,
    action: typeof undo | typeof redo,
    disabled: boolean
  ) {
    return (
      <button
        className={clsx(
          'serlo-button',
          disabled
            ? 'text-gray-300 cursor-default'
            : 'serlo-make-interactive-light'
        )}
        onClick={() => {
          dispatch(action())
        }}
        disabled={!undoable}
        title={title}
      >
        <FontAwesomeIcon icon={icon} />
      </button>
    )
  }

  function renderSaveButton() {
    const useOverlay = props.changes || props.license || props.subscriptions
    const action = useOverlay ? () => setVisibility(true) : () => handleSave()
    const isDisabled = useOverlay
      ? !hasPendingChanges
      : !hasPendingChanges || !maySave() || pending

    return (
      <button
        className={clsx(
          'serlo-button ml-2',
          isDisabled
            ? 'text-gray-300 cursor-default'
            : 'serlo-make-interactive-green'
        )}
        onClick={action}
        disabled={isDisabled}
      >
        <FontAwesomeIcon icon={faSave} title="Save" />
      </button>
    )
  }

  function licenseAccepted() {
    return !props.license || agreement
  }
  function changesFilledIn() {
    return !props.changes || props.changes.value
  }
  function maySave() {
    return licenseAccepted() && changesFilledIn()
  }

  function handleSave() {
    if (!maySave()) return
    const serializedRoot = serializeRootDocument()(store.getState())
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const serialized = R.has('state', serializedRoot)
      ? serializedRoot.state
      : null

    if (
      serialized !== null &&
      serializedRoot?.plugin === 'type-text-exercise-group' &&
      R.has('cohesive', serialized)
    ) {
      // legacy server can only handle string attributes
      serialized.cohesive = String(serialized.cohesive)
    }

    setPending(true)
    onSave({
      ...serialized,
      csrf: getCsrfToken(),
      controls: {
        ...(props.subscriptions
          ? {
              subscription: {
                subscribe: notificationSubscription ? 1 : 0,
                mailman: emailSubscription ? 1 : 0,
              },
            }
          : {}),
        ...(mayCheckout
          ? {
              checkout: autoCheckout,
            }
          : {}),
      },
    })
      .then(() => {
        storeState(undefined)
        setPending(false)
        setHasError(false)
      })
      .catch(() => {
        setPending(false)
        setHasError(true)
      })
  }
}

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
            return R.mapObjIndexed((_value, key) => {
              if (key in ownTypes) {
                // TODO: fix eslint
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
      // TODO: fix eslint
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
  const document = useScopedSelector(getDocument(props.state.id)) as {
    state: StateTypeValueType<typeof expectedStateType>
  }
  const children = props.state.render({
    renderToolbar(children) {
      if (document.state.id !== 0) return children

      return (
        <>
          <PluginToolbarButton
            icon={<Icon icon={faTrashAlt} />}
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
      <hr />
      {children}
    </>
  )
}

export const HeaderInput = styled.input({
  border: 'none',
  width: '100%',
  borderBottom: '2px solid transparent',
  '&:focus': {
    outline: 'none',
    borderColor: '#007ec1',
  },
})
