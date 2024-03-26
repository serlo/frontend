import { ROOT } from '@editor/store/root/constants'
import React from 'react'
import * as ReactDOM from 'react-dom/client'

import { SerloEditor, SerloEditorProps } from './editor'
import { editorData } from './editor-data'
import { editorPlugins } from '../plugin/helpers/editor-plugins'
import { editorRenderers } from '../plugin/helpers/editor-renderer'
import '@/assets-webkit/styles/serlo-tailwind.css'
import { createPlugins } from '@/serlo-editor-integration/create-plugins'
import { createRenderers } from '@/serlo-editor-integration/create-renderers'
// import '@/assets-webkit/styles/serlo-tailwind.css'
// Need to import with the raw loader for the shadow DOM
// import cssString from 'raw-loader!@/assets-webkit/styles/serlo-tailwind.css'
// import cssUrl from '@/assets-webkit/styles/serlo-tailwind.css?url'
// import cssUrl from '../../../../apps/web/src/assets-webkit/styles/serlo-tailwind.css'

// const exampleInitialState: SerloEditorProps['initialState'] = {
const exampleInitialState: SerloEditorProps['initialState'] = {
  plugin: 'type-article',
  state: {
    id: 234583,
    licenseId: 1,
    revision: 235091,
    changes: '',
    title: 'Differenzenquotient',
    content:
      '{"plugin":"article","state":{"introduction":{"plugin":"articleIntroduction","state":{"explanation":{"plugin":"text","state":[{"type":"p","children":[{"text":"Der Differenzenquotient zwischen zwei Stellen "},{"type":"math","src":"x_1","inline":true,"children":[{"text":"x_1"}]},{"text":" und "},{"type":"math","src":"x_2","inline":true,"children":[{"text":"x_2"}]},{"text":" beschreibt die "},{"type":"a","href":"/1785","children":[{"text":"Steigung"}]},{"text":" der "},{"type":"a","href":"/1637","children":[{"text":"Sekanten"}]},{"text":" zwischen den Punkten "},{"type":"math","src":"P\\\\left(x_1 \\\\mid f(x_1)\\\\right)","inline":true,"children":[{"text":"P\\\\left(x_1 \\\\mid f(x_1)\\\\right)"}]},{"text":" und "},{"type":"math","src":"Q\\\\left(x_2 \\\\mid f(x_2)\\\\right)","inline":true,"children":[{"text":"Q\\\\left(x_2 \\\\mid f(x_2)\\\\right)"}]},{"text":":"}]},{"type":"p","children":[{"type":"math","src":"\\\\frac{f(x_2)-f(x_1)}{x_2-x_1}.","inline":false,"children":[{"text":"\\\\frac{f(x_2)-f(x_1)}{x_2 - x_1}."}]}]},{"type":"p","children":[{"text":""}]}]},"multimedia":{"plugin":"image","state":{"src":"https://assets.serlo.org/legacy/2734_Aw2Z6Xj7BZ.png","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}},"illustrating":true,"width":50}},"content":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"h","level":2,"children":[{"text":"Beispiel"}]},{"type":"p","children":[{"text":"Bestimme den Differenzenquotient der Funktion "},{"type":"math","src":"f(x)=x^2","inline":true,"children":[{"text":"f(x)=x^2"}]},{"text":" im Intervall  "},{"type":"math","src":"\\\\left[1;3\\\\right]","inline":true,"children":[{"text":"\\\\left[1;3\\\\right]"}]},{"text":" "},{"type":"math","src":"\\\\Rightarrow x_1=1","inline":true,"children":[{"text":"\\\\Rightarrow x_1=1\\\\;x_2=3"}]},{"text":" und "},{"type":"math","src":"x_2=3","inline":true,"children":[{"text":""}]},{"text":"."}]}]},{"plugin":"equations","state":{"transformationTarget":"equation","firstExplanation":{"plugin":"text","state":[{"type":"p","children":[{}]}]},"steps":[{"left":"m","sign":"equals","right":"\\\\frac{f(3)-f(1)}{3-1}","transform":"","explanation":{"plugin":"text","state":[{"type":"p","children":[{"text":"Ausrechnen"}]}]}},{"left":"","sign":"equals","right":"4","transform":"","explanation":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}]}},{"plugin":"text","state":[{"type":"h","level":2,"children":[{"text":"Applet"}]}]},{"plugin":"text","state":[{"type":"p","children":[{"text":"Im folgenden Applet kannst du dir für eine beliebige Funktion "},{"type":"math","src":"f","inline":true,"children":[{"text":"f"}]},{"text":" den Differenzenquotienten anschauen und berechnen lassen. Außerdem kannst du die Lage der Stellen "},{"type":"math","src":"x_1","inline":true,"children":[{"text":"x_1"}]},{"text":" und "},{"type":"math","src":"x_2","inline":true,"children":[{"text":"x_2"}]},{"text":" frei wählen."}]}]},{"plugin":"geogebra","state":"nnrmthf4"}]},"exercises":[{"plugin":"injection","state":"/91322"}],"exerciseFolder":{"id":"","title":""},"relatedContent":{"articles":[],"courses":[],"videos":[]},"sources":[]}}',
    meta_title: 'Differenzenquotient',
    meta_description:
      'Der Differenzenquotient beschreibt die Steigung einer Funktion zwischen zwei Punkten.',
  },
}

// {
//   plugin: 'text',
//   state: [
//     {
//       type: 'p',
//       children: [
//         {
//           text: 'Das Urnenmodell ist eine Denkhilfe ain der ',
//         },
//         {
//           type: 'a',
//           href: '/1751',
//           children: [
//             {
//               text: 'Kombinatorik',
//             },
//           ],
//         },
//         {
//           text: ', um (mehrstufige) ',
//         },
//         {
//           type: 'a',
//           href: '/1521',
//           children: [
//             {
//               text: 'Zufallsexperimente',
//             },
//           ],
//         },
//         {
//           text: ' zu modellieren. Es heißt so, weil man sich diese Experimente wie das ',
//         },
//         {
//           text: 'Ziehen von Kugeln aus einer Urne',
//           strong: true,
//         },
//         {
//           text: ' vorstellt.',
//         },
//       ],
//     },
//   ],
// } as const

// Because state is of type unknown, need to redefine the type here or find a
// way to cast it.
// type InitialState =
//   | {
//       plugin: string
//       state?: {
//         type?: UuidType
//       }[]
//     }
//   | undefined

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
    // Do we need to support i18n?
    const language = 'de'
    const { loggedInData } = editorData[language]

    const editorStrings = loggedInData.strings.editor

    const initialStateAttr = this.getAttribute('initial-state')

    const initialState = initialStateAttr
      ? (JSON.parse(initialStateAttr) as SerloEditorProps['initialState']) //  InitialState) // SerloEditorProps['initialState'])
      : // TODO throw error here instead?
        exampleInitialState

    const parentType = ROOT
    // ? How can we infer the right parentType?
    // const parentType = initialState?.state
    //   ? initialState?.state?.[0].type
    //   : UuidType.Page

    editorPlugins.init(
      createPlugins({
        editorStrings,
        parentType,
      })
    )

    editorRenderers.init(createRenderers())

    console.log('Mounting React Component', initialState)

    // const instanceData = this.getAttribute('instance-data')
    // const loggedInData = this.getAttribute('logged-in-data')

    if (this.reactRoot) {
      this.reactRoot.render(
        <React.StrictMode>
          <SerloEditor initialState={initialState}>
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

  updateProps(/*newProps: any*/) {
    // Method to update props if necessary, calling this.mountReactComponent() again with new props
  }
}

customElements.define('editor-web-component', EditorWebComponent)
