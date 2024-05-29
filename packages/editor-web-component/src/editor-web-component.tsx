/// <reference types="vite/client" />

import { SerloRenderer } from '@serlo/editor'
import styles from '@serlo/editor/style.css?raw'
import React, { Suspense, lazy } from 'react'
import * as ReactDOM from 'react-dom/client'

import {
  exampleInitialState,
  isValidState,
  type InitialState,
} from './initial-state'

const LazySerloEditor = lazy(() =>
  import('@serlo/editor').then((module) => ({ default: module.SerloEditor }))
)

type Mode = 'read' | 'write'

export class EditorWebComponent extends HTMLElement {
  private reactRoot: ReactDOM.Root | null = null
  private container: HTMLDivElement

  private _mode: Mode = 'read'

  private _initialState: InitialState = exampleInitialState
  private _currentState: unknown

  constructor() {
    super()

    // Create a shadow root for encapsulation
    this.attachShadow({ mode: 'open' })

    this.container = document.createElement('div')

    this.shadowRoot!.appendChild(this.container)

    this.loadAndApplyStyles()
  }

  loadAndApplyStyles() {
    const styleEl = document.createElement('style')
    styleEl.textContent = styles
    this.shadowRoot!.appendChild(styleEl)
  }

  static get observedAttributes() {
    return ['initial-state', 'mode']
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'initial-state' && oldValue !== newValue) {
      this.initialState = JSON.parse(newValue) as InitialState
    } else if (
      name === 'mode' &&
      oldValue !== newValue &&
      (newValue === 'read' || newValue === 'write')
    ) {
      this.mode = newValue
    }
  }

  get initialState() {
    return this._initialState
  }

  set initialState(newState) {
    if (isValidState(newState)) {
      this._initialState = newState
      this._currentState = newState
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
    if (newMode === this._mode) {
      return
    }

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
    if (!this.reactRoot) {
      this.reactRoot = ReactDOM.createRoot(this.container)
    }

    this.mountReactComponent()
  }

  broadcastNewState(newState: unknown): void {
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

    if (!isValidState(initialState)) {
      throw new Error('Initial state is not of type InitialState')
    }

    // This works even with subsequent mounts and renders because the
    // currentState is only null upon first render. Even if you delete all the
    // contents of the editor, there is an empty text plugin or similar present.
    if (!this._currentState && initialState) {
      this._currentState = initialState
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
            <Suspense fallback={<div>Loading editor...</div>}>
              <LazySerloEditor
                initialState={this.initialState}
                _enableImagePlugin // HACK: Temporary solution to make image plugin available in Moodle & Chancenwerk integration with file upload disabled.
                onChange={({ changed, getDocument }) => {
                  if (changed) {
                    const newState = getDocument()
                    this._currentState = newState
                    this.broadcastNewState(newState)
                  }
                }}
              >
                {(editor) => {
                  return <div>{editor.element}</div>
                }}
              </LazySerloEditor>
            </Suspense>
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
