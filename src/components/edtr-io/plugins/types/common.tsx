/* eslint-disable import/no-internal-modules */
/**
 * This file is part of Serlo.org.
 *
 * Copyright (c) 2013-2021 Serlo Education e.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @copyright Copyright (c) 2013-2021 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/serlo.org for the canonical source repository
 */
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
import BSAlert from 'react-bootstrap/lib/Alert'
import BSButton from 'react-bootstrap/lib/Button'
import BSCheckbox from 'react-bootstrap/lib/Checkbox'
import BSControlLabel from 'react-bootstrap/lib/ControlLabel'
import BSFormControl from 'react-bootstrap/lib/FormControl'
import BSFormGroup from 'react-bootstrap/lib/FormGroup'
import BSModal from 'react-bootstrap/lib/Modal'
import { createPortal } from 'react-dom'

import { CsrfContext } from '../../csrf-context'
import { SaveContext, storeState } from '../../editor'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

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

export const HeaderInput = styled.input({
  border: 'none',
  width: '100%',
  borderBottom: '2px solid transparent',
  '&:focus': {
    outline: 'none',
    borderColor: '#007ec1',
  },
})

export function Controls(props: OwnProps) {
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

  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const editorStrings = loggedInData.strings.editor

  return (
    <>
      {createPortal(
        <div className="btn-group btn-group-community text-right w-full pr-2">
          {renderUndoRedoButton('Undo', faUndo, undo, !undoable)}
          {renderUndoRedoButton('Redo', faRedo, redo, !redoable)}
          {renderSaveButton()}
        </div>,
        document.getElementsByClassName('controls')[0]
      )}
      <ModalWithCloseButton
        isOpen={visible}
        onCloseClick={() => {
          setVisibility(false)
        }}
      >
        <h1 className="serlo-h1">{editorStrings.edtrIo.save}</h1>
        <BSModal.Body>
          {renderAlert()}
          {renderChanges()}
          {renderLicense()}
          {renderSubscription()}
          {renderCheckout()}
        </BSModal.Body>
        <BSModal.Footer>
          <button
            onClick={() => {
              setVisibility(false)
            }}
          >
            {editorStrings.edtrIo.cancel}
          </button>
          <button
            onClick={() => {
              handleSave()
            }}
            className="serlo-button serlo-make-interactive-green"
            disabled={!maySave() || pending}
            title={getSaveHint()}
          >
            {pending ? editorStrings.edtrIo.saving : editorStrings.edtrIo.save}
          </button>
        </BSModal.Footer>
      </ModalWithCloseButton>
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
        className="serlo-button serlo-make-interactive-green ml-2"
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

  function getSaveHint() {
    // TODO: fix i18n
    if (maySave()) return undefined
    if (licenseAccepted() && !changesFilledIn()) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return editorStrings.edtrIo.missingChanges
    } else if (!licenseAccepted() && changesFilledIn()) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return editorStrings.edtrIo.missingLicenseTerms
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return editorStrings.edtrIo.missingChangesAndLicenseTerms
    }
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

  function renderAlert() {
    if (!hasError) return null
    return (
      <>
        <BSAlert
          bsStyle="danger"
          onDismiss={() => {
            setHasError(false)
          }}
        >
          {editorStrings.edtrIo.errorSaving}
          <br />
          {editorStrings.edtrIo.saveLocallyAndRefresh}
        </BSAlert>
        <BSModal.Footer>
          <BSButton
            bsStyle="success"
            onClick={() => {
              const serializedRoot = serializeRootDocument()(store.getState())
              storeState(serializedRoot)
              setSavedToLocalstorage(true)
            }}
          >
            {savedToLocalstorage
              ? editorStrings.edtrIo.revisionSaved
              : editorStrings.edtrIo.saveRevision}
          </BSButton>
        </BSModal.Footer>
      </>
    )
  }

  function renderChanges() {
    const { changes } = props
    if (!changes) return null
    return (
      <BSFormGroup controlId="changes">
        <BSControlLabel>{editorStrings.edtrIo.changes}</BSControlLabel>
        <BSFormControl
          componentClass="textarea"
          value={changes.value}
          onChange={(e) => {
            const { value } = e.target as HTMLTextAreaElement
            changes.set(value)
          }}
        />
      </BSFormGroup>
    )
  }

  function renderCheckout() {
    if (!mayCheckout) return null
    return (
      <BSCheckbox
        checked={autoCheckout}
        onChange={(e) => {
          const { checked } = e.target as HTMLInputElement
          setAutoCheckout(checked)
        }}
      >
        {editorStrings.edtrIo.skipReview}
      </BSCheckbox>
    )
  }

  function renderLicense() {
    const { license } = props
    if (!license) return null
    return (
      <BSCheckbox
        checked={agreement}
        onChange={(e) => {
          const { checked } = e.target as HTMLInputElement
          setAgreement(checked)
        }}
      >
        <span dangerouslySetInnerHTML={{ __html: license.agreement.value }} />
      </BSCheckbox>
    )
  }

  function renderSubscription() {
    const { subscriptions } = props
    if (!subscriptions) return null
    return (
      <>
        <BSCheckbox
          checked={notificationSubscription}
          onChange={(e) => {
            const { checked } = e.target as HTMLInputElement
            setNotificationSubscription(checked)
          }}
        >
          {editorStrings.edtrIo.enableNotifs}
        </BSCheckbox>
        <BSCheckbox
          checked={emailSubscription}
          onChange={(e) => {
            const { checked } = e.target as HTMLInputElement
            setEmailSubscription(checked)
          }}
        >
          {editorStrings.edtrIo.enableNotifsMail}
        </BSCheckbox>
      </>
    )
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

interface OwnProps {
  changes?: StateTypeReturnType<typeof entity['changes']>
  license?: StateTypeReturnType<typeof entity['license']>
  subscriptions?: boolean
}
