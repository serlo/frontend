import { SerloEditorProps, SerloEditor } from '@serlo/editor'
import React, { ReactNode } from 'react'
import * as ReactDOM from 'react-dom/client'

// Let's import and bundle it from within the editor package!
// import '@/assets-webkit/styles/serlo-tailwind.css'

type InitialState = SerloEditorProps['initialState']

function isInitialState(obj: any): obj is InitialState {
  return (
    obj !== null &&
    obj !== undefined &&
    typeof obj === 'object' &&
    'plugin' in obj
  )
}

const exampleInitialState: InitialState = {
  plugin: 'rows',
  state: [
    {
      plugin: 'text',
      state: [
        {
          type: 'h',
          level: 2,
          children: [
            {
              text: 'Beispiel',
            },
          ],
        },
        {
          type: 'p',
          children: [
            {
              text: 'Bestimme den Differenzenquotient der Funktion ',
            },
            {
              type: 'math',
              src: 'f(x)=x^2',
              inline: true,
              children: [
                {
                  text: 'f(x)=x^2',
                },
              ],
            },
            {
              text: ' im Intervall  ',
            },
            {
              type: 'math',
              src: '\\\\left[1;3\\\\right]',
              inline: true,
              children: [
                {
                  text: '\\\\left[1;3\\\\right]',
                },
              ],
            },
            {
              text: ' ',
            },
            {
              type: 'math',
              src: '\\\\Rightarrow x_1=1',
              inline: true,
              children: [
                {
                  text: '\\\\Rightarrow x_1=1\\\\;x_2=3',
                },
              ],
            },
            {
              text: ' und ',
            },
            {
              type: 'math',
              src: 'x_2=3',
              inline: true,
              children: [
                {
                  text: '',
                },
              ],
            },
            {
              text: '.',
            },
          ],
        },
      ],
    },
    {
      plugin: 'equations',
      state: {
        transformationTarget: 'equation',
        firstExplanation: {
          plugin: 'text',
          state: [
            {
              type: 'p',
              children: [{}],
            },
          ],
        },
        steps: [
          {
            left: 'm',
            sign: 'equals',
            right: '\\\\frac{f(3)-f(1)}{3-1}',
            transform: '',
            explanation: {
              plugin: 'text',
              state: [
                {
                  type: 'p',
                  children: [
                    {
                      text: 'Ausrechnen',
                    },
                  ],
                },
              ],
            },
          },
          {
            left: '',
            sign: 'equals',
            right: '4',
            transform: '',
            explanation: {
              plugin: 'text',
              state: [
                {
                  type: 'p',
                  children: [{}],
                },
              ],
            },
          },
        ],
      },
    },
    {
      plugin: 'text',
      state: [
        {
          type: 'h',
          level: 2,
          children: [
            {
              text: 'Applet',
            },
          ],
        },
      ],
    },
    {
      plugin: 'text',
      state: [
        {
          type: 'p',
          children: [
            {
              text: 'Im folgenden Applet kannst du dir für eine beliebige Funktion ',
            },
            {
              type: 'math',
              src: 'f',
              inline: true,
              children: [
                {
                  text: 'f',
                },
              ],
            },
            {
              text: ' den Differenzenquotienten anschauen und berechnen lassen. Außerdem kannst du die Lage der Stellen ',
            },
            {
              type: 'math',
              src: 'x_1',
              inline: true,
              children: [
                {
                  text: 'x_1',
                },
              ],
            },
            {
              text: ' und ',
            },
            {
              type: 'math',
              src: 'x_2',
              inline: true,
              children: [
                {
                  text: 'x_2',
                },
              ],
            },
            {
              text: ' frei wählen.',
            },
          ],
        },
      ],
    },
    {
      plugin: 'geogebra',
      state: 'nnrmthf4',
    },
  ],
}

// Could probably remove the export entirely, as the customElement is registered
// below.
export class EditorWebComponent extends HTMLElement {
  private reactRoot: ReactDOM.Root | null = null
  private container: HTMLDivElement

  constructor() {
    super()
    // Create a shadow root for encapsulation. Right now, the css does not work
    // with the shadow DOM.
    // const shadowRoot = this.attachShadow({ mode: 'open' })
    this.container = document.createElement('div')
    // this.appendChild(container)
    // shadowRoot.appendChild(container)

    // fetch(cssUrl as string)
    //   .then((response) => response.text())
    //   .then((css) => {
    //     const styleEl = document.createElement('style')
    //     styleEl.textContent = css
    //     shadowRoot.appendChild(styleEl)
    //   })
    //   .catch((error) =>
    //     console.error('Error when trying to attach CSS string!', error)
    //   )

    // if (cssString && typeof cssString === 'string') {
    //   const styleEl = document.createElement('style')
    //   styleEl.textContent = cssString
    //   shadowRoot.appendChild(styleEl)
    // } else {
    //   console.error('No CSS string could be found!', error)
    // }

    // this.reactRoot = ReactDOM.createRoot(container)
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
      : // TODO throw error here instead?
        exampleInitialState

    if (!isInitialState(initialState)) {
      throw new Error('Initial state is not of type InitialState')
    }

    console.log('Mounting React Component', initialState)

    // const instanceData = this.getAttribute('instance-data')
    // const loggedInData = this.getAttribute('logged-in-data')

    if (this.reactRoot) {
      this.reactRoot.render(
        <React.StrictMode>
          <SerloEditor
            initialState={initialState}
            pluginsConfig={{
              basicPluginsConfig: {
                allowImageInTableCells: true,
                exerciseVisibleInSuggestion: true,
              },
            }}
          >
            {(editor) => {
              return <div>{editor.element}</div>
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

  updateProps(/*newProps: any*/) {
    // Method to update props if necessary, calling this.mountReactComponent() again with new props
  }
}

customElements.define('editor-web-component', EditorWebComponent)
