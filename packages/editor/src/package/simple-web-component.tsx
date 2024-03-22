/**
 * Test web component for testing
 */
import React, { Suspense } from 'react'
import { createRoot, type Root } from 'react-dom/client'

import { SimplestReactComponent } from './simplest-react-component'

// Note that the current version of React 18.2 has a lot of quirks with web
// components https://custom-elements-everywhere.com. Hopefully, this will be
// much easier to deal with in the future as React 19 (beta) seems to have great
// support.
export class ReactWrapper extends HTMLElement {
  private root: Root | null = null

  constructor() {
    super()
    // Use shadow DOM to encapsulate React component
    this.attachShadow({ mode: 'open' })
    this.root = null
  }

  connectedCallback() {
    const container = document.createElement('div')
    // If using shadow DOM, append container to shadowRoot instead
    this.shadowRoot?.appendChild(container)

    this.root = createRoot(container)

    const elementWithSuspense = (
      <Suspense fallback="Loading...">
        <div>
          <SimplestReactComponent />
        </div>
      </Suspense>
    )

    this.root.render(elementWithSuspense)
  }

  disconnectedCallback() {
    if (this.root) {
      this.root.unmount()
    }
  }
}

if (!customElements.get('react-wrapper')) {
  customElements.define('react-wrapper', ReactWrapper)
}
