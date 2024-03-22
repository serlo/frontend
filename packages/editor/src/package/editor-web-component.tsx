import React from 'react'
import * as ReactDOM from 'react-dom/client'

import { SerloEditor, SerloEditorProps } from './editor'

class EditorWebComponent extends HTMLElement {
  private reactRoot: ReactDOM.Root | null = null

  constructor() {
    super()
    // Create a shadow root for encapsulation
    const shadowRoot = this.attachShadow({ mode: 'open' })
    const container = document.createElement('div')
    shadowRoot.appendChild(container)

    this.reactRoot = ReactDOM.createRoot(container)
  }

  connectedCallback() {
    this.mountReactComponent()
  }

  mountReactComponent() {
    const initialState = this.getAttribute('initial-state')
    // const instanceData = this.getAttribute('instance-data')
    // const loggedInData = this.getAttribute('logged-in-data')

    if (this.reactRoot) {
      this.reactRoot.render(
        <React.StrictMode>
          <SerloEditor
            initialState={
              JSON.parse(
                initialState || '{}'
              ) as SerloEditorProps['initialState']
            }
            // instanceData={
            //   JSON.parse(
            //     instanceData || '{}'
            //   ) as SerloEditorProps['instanceData']
            // }
            // loggedInData={
            //   JSON.parse(
            //     loggedInData || '{}'
            //   ) as SerloEditorProps['loggedInData']
            // }
          >
            {(editor) => {
              return (
                // <EditInner ltik={ltik} state={state} providerUrl={providerUrl}>
                <div>{editor}</div>
                // </EditInner>
              )
            }}
          </SerloEditor>
        </React.StrictMode>
      )
    }
  }

  disconnectedCallback() {
    if (this.reactRoot) {
      this.reactRoot.unmount()
      this.reactRoot = null
    }
  }

  // Example method to update properties, you may need to implement attributeChangedCallback or similar to react to attribute changes
  updateProps(/*newProps: any*/) {
    // Method to update props if necessary, calling this.mountReactComponent() again with new props
  }
}

customElements.define('editor-web-component', EditorWebComponent)
