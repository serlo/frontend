import { SerloEditor, SerloRenderer } from '@serlo/editor'
import React from 'react'
import * as ReactDOM from 'react-dom/client'

import {
  exampleInitialState,
  isInitialState,
  type InitialState,
} from './initial-state'

type Mode = 'read' | 'write'

export class EditorWebComponent extends HTMLElement {
  private reactRoot: ReactDOM.Root | null = null
  private container: HTMLDivElement

  private _mode: Mode = 'read'

  private _initialState: InitialState = exampleInitialState
  private _currentState: unknown

  constructor() {
    super()

    this.container = document.createElement('div')
  }

  static get observedAttributes() {
    return ['initial-state', 'mode']
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'initial-state' && oldValue !== newValue) {
      this.initialState = JSON.parse(newValue) as InitialState
    } else if (
      name === 'mode' &&
      (newValue === 'read' || newValue === 'write')
    ) {
      this.mode = newValue
    } else {
      // eslint-disable-next-line no-console
      console.warn(
        `Unhandled attribute change in Editor Web Component for '${name}' from value: ${oldValue} to value: ${newValue}`
      )
    }
  }

  get initialState() {
    return this._initialState
  }

  set initialState(newState) {
    if (isInitialState(newState)) {
      this._initialState = newState
      // Update the attribute
      this.setAttribute('initial-state', JSON.stringify(newState))
      this.mountReactComponent()
    } else {
      throw new Error('Invalid initial state provided')
    }
  }

  get mode() {
    return this._mode
  }

  set mode(newMode: Mode) {
    if (newMode === 'read' || newMode === 'write') {
      this._mode = newMode
      this.setAttribute('mode', newMode)
      this.mountReactComponent()
    }
  }

  get currentState() {
    return this._currentState
  }

  set currentState(_) {
    throw new Error(
      'currentState is a readonly property. To modify state, please change the initialState.'
    )
  }

  connectedCallback() {
    this.appendChild(this.container)

    if (!this.reactRoot) {
      this.reactRoot = ReactDOM.createRoot(this.container)
    }

    this.mountReactComponent()
  }

  broadcastNewState(newState: unknown): void {
    this._currentState = newState
    const event = new CustomEvent('state-changed', {
      detail: { newState },
    })
    this.dispatchEvent(event)
  }

  mountReactComponent() {
    const initialStateAttr = this.getAttribute('initial-state')

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const initialState: InitialState = initialStateAttr
      ? (JSON.parse(initialStateAttr) as unknown as any)
      : exampleInitialState

    if (!isInitialState(initialState)) {
      throw new Error('Initial state is not of type InitialState')
    }

    // eslint-disable-next-line no-console
    console.log('Mounting React Component with state:', initialState)

    if (!this.reactRoot) {
      return null
    }

    this.reactRoot.render(
      <React.StrictMode>
        <div id="serlo-root">
          {this._mode === 'write' ? (
            <SerloEditor
              initialState={this.initialState}
              onChange={({ changed, getDocument }) => {
                if (changed) {
                  this.broadcastNewState(getDocument())
                }
              }}
            >
              {(editor) => {
                return <div>{editor.element}</div>
              }}
            </SerloEditor>
          ) : (
            <SerloRenderer document={this.initialState} />
          )}
        </div>
      </React.StrictMode>
    )
  }

  disconnectedCallback() {
    if (this.reactRoot) {
      this.reactRoot.unmount()
      this.reactRoot = null
    }
  }
}
