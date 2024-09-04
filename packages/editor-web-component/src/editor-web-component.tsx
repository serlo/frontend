/// <reference types="vite/client" />

import { SerloRenderer, BaseEditor } from '@serlo/editor'
import styles from '@serlo/editor/style.css?raw'
import React, { Suspense, lazy } from 'react'
import * as ReactDOM from 'react-dom/client'

import {
  exampleInitialState,
  type InitialState,
  type EditorVariant,
} from './initial-state'

const LazySerloEditor = lazy(() =>
  import('@serlo/editor').then((module) => ({ default: module.SerloEditor }))
)

type Mode = 'read' | 'write'

type EditorHistory = BaseEditor['history']

export class EditorWebComponent extends HTMLElement {
  private reactRoot: ReactDOM.Root | null = null
  private container: HTMLDivElement

  private _mode: Mode = 'read'

  private _history: EditorHistory | null = null

  private _initialState: InitialState = exampleInitialState
  private _currentState: unknown

  private _testingSecret: string | null = null

  // Default to Moodle for now
  private _editorVariant: EditorVariant = 'moodle'

  // By default, we are NOT attaching it to the shadow DOM
  private _useShadowDOM: boolean = false

  constructor() {
    super()

    this.container = document.createElement('div')

    // Shadow DOM will be attached in connectedCallback if needed
  }

  static get observedAttributes() {
    return [
      'initial-state',
      'mode',
      'testing-secret',
      'use-shadow-dom',
      'editor-variant',
    ]
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
    } else if (name === 'use-shadow-dom') {
      this._useShadowDOM = newValue !== 'false'
    } else if (name === 'editor-variant' && oldValue !== newValue) {
      this.editorVariant = newValue as EditorVariant
    }
  }

  get initialState() {
    return this._initialState
  }

  set initialState(newState) {
    this._initialState = newState
    this._currentState = newState
    // Update the attribute
    this.setAttribute('initial-state', JSON.stringify(newState))
    this.mountReactComponent()
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

  get history(): EditorHistory | null {
    return this._history
  }

  get testingSecret(): string | null {
    return this._testingSecret
  }

  set testingSecret(newTestingSecret) {
    if (newTestingSecret) this.setAttribute('testing-secret', newTestingSecret)
  }

  get editorVariant(): EditorVariant {
    return this._editorVariant
  }

  set editorVariant(newVariant: EditorVariant) {
    this._editorVariant = newVariant
    this.setAttribute('editor-variant', newVariant)
    this.mountReactComponent()
  }

  connectedCallback() {
    if (this._useShadowDOM && !this.shadowRoot) {
      this.attachShadow({ mode: 'open' })
      this.shadowRoot!.appendChild(this.container)
    } else if (!this._useShadowDOM) {
      this.appendChild(this.container)
    }

    this.loadAndApplyStyles()

    if (!this.reactRoot) {
      this.reactRoot = ReactDOM.createRoot(this.container)
    }

    this.mountReactComponent()
  }

  loadAndApplyStyles() {
    const styleEl = document.createElement('style')
    styleEl.textContent = styles
    if (this._useShadowDOM) {
      this.shadowRoot!.appendChild(styleEl)
    } else {
      this.appendChild(styleEl)
    }
  }

  broadcastNewState(newState: unknown): void {
    const event = new CustomEvent('state-changed', {
      detail: { newState },
    })
    this.dispatchEvent(event)
  }

  mountReactComponent() {
    const initialStateAttr = this.getAttribute('initial-state')
    const testingSecretAttr = this.getAttribute('testing-secret')

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const initialState: InitialState = initialStateAttr
      ? (JSON.parse(initialStateAttr) as unknown as any)
      : exampleInitialState

    // This works even with subsequent mounts and renders because the
    // currentState is only null upon first render. Even if you delete all the
    // contents of the editor, there is an empty text plugin or similar present.
    if (!this._currentState && initialState) {
      this._currentState = initialState
    }

    if (!this.reactRoot) {
      return null
    }

    this.reactRoot.render(
      <React.StrictMode>
        <div id="serlo-root" className="relative">
          {this._mode === 'write' ? (
            <Suspense fallback={<div>Loading editor...</div>}>
              <LazySerloEditor
                editorVariant="moodle"
                initialState={this.initialState}
                _testingSecret={testingSecretAttr}
                onChange={(newState) => {
                  this._currentState = newState
                  this.broadcastNewState(newState)
                }}
              >
                {(editor) => {
                  this._history = editor.history
                  return <div>{editor.element}</div>
                }}
              </LazySerloEditor>
            </Suspense>
          ) : (
            <SerloRenderer state={this.initialState} editorVariant="moodle" />
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
