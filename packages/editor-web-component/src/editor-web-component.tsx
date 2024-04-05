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

  constructor() {
    super()

    this.container = document.createElement('div')
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    console.log('AttributeChangedCallback', {
      name,
      oldValue,
      newValue,
    })
    if (oldValue !== newValue) {
      this.mountReactComponent()
    }
  }

  static get observedAttributes() {
    return ['initial-state']
  }

  connectedCallback() {
    this.appendChild(this.container)

    if (!this.reactRoot) {
      this.reactRoot = ReactDOM.createRoot(this.container)
    }

    this.mountReactComponent()
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

    console.log('Mounting React Component', initialState)

    if (!this.reactRoot) {
      return null
    }

    this.reactRoot.render(
      <React.StrictMode>
        <SerloEditor initialState={initialState}>
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

  updateProps(/*newProps: any*/) {
    // Method to update props if necessary, calling this.mountReactComponent() again with new props
  }
}

customElements.define('editor-web-component', EditorWebComponent)
