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
import { useI18n } from '@serlo/i18n'
import * as R from 'ramda'
import * as React from 'react'
import BSAlert from 'react-bootstrap/lib/Alert'
import BSModal from 'react-bootstrap/lib/Modal'
import BSButton from 'react-bootstrap/lib/Button'
import BSCheckbox from 'react-bootstrap/lib/Checkbox'
import BSFormGroup from 'react-bootstrap/lib/FormGroup'
import BSControlLabel from 'react-bootstrap/lib/ControlLabel'
import BSFormControl from 'react-bootstrap/lib/FormControl'
import { createPortal } from 'react-dom'

import { CsrfContext } from '../../csrf-context'
import { SaveContext, storeState } from '../../editor'

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
  const i18n = useI18n()
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
  const [
    notificationSubscription,
    setNotificationSubscription,
  ] = React.useState(true)
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
    <React.Fragment>
      {createPortal(
        <div className="btn-group btn-group-community">
          <button
            className="btn btn-default"
            onClick={() => {
              dispatch(undo())
            }}
            disabled={!undoable}
          >
            <span className="fa fa-undo" />
          </button>
          <button
            className="btn btn-default"
            onClick={() => {
              dispatch(redo())
            }}
            disabled={!redoable}
          >
            <span className="fa fa-repeat" />
          </button>
          {renderSaveButton()}
        </div>,
        document.getElementsByClassName('controls')[0]
      )}
      <BSModal
        show={visible}
        onHide={() => {
          setVisibility(false)
        }}
      >
        <BSModal.Header closeButton>
          <BSModal.Title>{i18n.t('edtr-io::Save')}</BSModal.Title>
        </BSModal.Header>
        <BSModal.Body>
          {renderAlert()}
          {renderChanges()}
          {renderLicense()}
          {renderSubscription()}
          {renderCheckout()}
        </BSModal.Body>
        <BSModal.Footer>
          <BSButton
            onClick={() => {
              setVisibility(false)
            }}
          >
            {i18n.t('edtr-io::Cancel')}
          </BSButton>
          <BSButton
            onClick={() => {
              handleSave()
            }}
            bsStyle="success"
            disabled={!maySave() || pending}
            title={getSaveHint()}
          >
            {pending ? i18n.t('edtr-io::Saving…') : i18n.t('edtr-io::Save')}
          </BSButton>
        </BSModal.Footer>
      </BSModal>
    </React.Fragment>
  )

  function renderSaveButton() {
    const useOverlay = props.changes || props.license || props.subscriptions
    const buttonProps = useOverlay
      ? {
          onClick() {
            setVisibility(true)
          },
          disabled: !hasPendingChanges,
          children: <span className="fa fa-save" />,
        }
      : {
          onClick() {
            handleSave()
          },
          disabled: !hasPendingChanges || !maySave() || pending,
          children: pending ? (
            <span className="fa fa-spinner fa-spin" />
          ) : (
            <span className="fa fa-save" />
          ),
        }

    return <button className="btn btn-success" {...buttonProps} />
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
    if (maySave()) return undefined
    if (licenseAccepted() && !changesFilledIn()) {
      return i18n.t('edtr-io::You need to fill out the changes you made')
    } else if (!licenseAccepted() && changesFilledIn()) {
      return i18n.t('edtr-io::You need to accept the license terms')
    } else {
      return i18n.t(
        'edtr-io::You need to fill out the changes you made and accept the license terms'
      )
    }
  }

  function handleSave() {
    if (!maySave()) return
    const serializedRoot = serializeRootDocument()(store.getState())
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
      <React.Fragment>
        <BSAlert
          bsStyle="danger"
          onDismiss={() => {
            setHasError(false)
          }}
        >
          {i18n.t('edtr-io::An error occurred during saving.')}
          <br />
          {i18n.t(
            'edtr-io::You can store the revision locally, refresh the page and try to save again.'
          )}
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
              ? i18n.t('edtr-io::Revision saved')
              : i18n.t('edtr-io::Save revision')}
          </BSButton>
        </BSModal.Footer>
      </React.Fragment>
    )
  }

  function renderChanges() {
    const { changes } = props
    if (!changes) return null
    return (
      <BSFormGroup controlId="changes">
        <BSControlLabel>{i18n.t('edtr-io::Changes')}</BSControlLabel>
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
        {i18n.t('edtr-io::Skip peer review (not recommended)')}
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
      <React.Fragment>
        <BSCheckbox
          checked={notificationSubscription}
          onChange={(e) => {
            const { checked } = e.target as HTMLInputElement
            setNotificationSubscription(checked)
          }}
        >
          {i18n.t('edtr-io::Enable serlo.org notifications')}
        </BSCheckbox>
        <BSCheckbox
          checked={emailSubscription}
          onChange={(e) => {
            const { checked } = e.target as HTMLInputElement
            setEmailSubscription(checked)
          }}
        >
          {i18n.t('edtr-io::Enable notifications via e-mail')}
        </BSCheckbox>
      </React.Fragment>
    )
  }
}

export function entityType<
  Ds extends Record<string, StateType>,
  Childs extends Record<string, StateType>
>(
  ownTypes: Ds,
  children: Childs,
  getFocusableChildren?: (
    children: { [K in keyof Ds]: { id: string }[] }
  ) => { id: string }[]
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

export function optionalSerializedChild(
  plugin: string
): StateType<
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
        <React.Fragment>
          <PluginToolbarButton
            icon={<Icon icon={faTrashAlt} />}
            label={props.removeLabel}
            onClick={() => {
              props.onRemove()
            }}
          />
          {children}
        </React.Fragment>
      )
    },
  })
  return (
    <React.Fragment>
      <hr />
      {children}
    </React.Fragment>
  )
}

interface OwnProps {
  changes?: StateTypeReturnType<typeof entity['changes']>
  license?: StateTypeReturnType<typeof entity['license']>
  subscriptions?: boolean
}
