import { SerloEditor } from '@serlo/editor'
import React from 'react'
import * as ReactDOM from 'react-dom/client'

import {
  exampleInitialState,
  isInitialState,
  type InitialState,
} from './initial-state'

// Could probably remove the export entirely, as the customElement is registered
// below.
export class EditorWebComponent extends HTMLElement {
  private reactRoot: ReactDOM.Root | null = null
  private container: HTMLDivElement

  private _initialState: InitialState = exampleInitialState

  constructor() {
    super()

    this.container = document.createElement('div')
  }

  static get observedAttributes() {
    return ['initial-state']
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'initial-state' && oldValue !== newValue) {
      try {
        this.initialState = JSON.parse(newValue) as InitialState
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Could not parse initialState:', e)
      }
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

  connectedCallback() {
    this.appendChild(this.container)

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

    if (!isInitialState(initialState)) {
      throw new Error('Initial state is not of type InitialState')
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    console.log('Mounting React Component with state:', initialState)

    if (!this.reactRoot) {
      return null
    }

    this.reactRoot.render(
      <React.StrictMode>
        <SerloEditor
          initialState={initialState}
          onChange={({ changed, getDocument }) => {
            if (changed) {
              const newState = getDocument()
              this.broadcastNewState(newState)
            }
          }}
        >
          {(editor) => {
            return <div>{editor.element}</div>
          }}
        </SerloEditor>
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

customElements.define('serlo-editor', EditorWebComponent)
