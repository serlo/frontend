import {
  EditorWebComponent,
  pluginMenuDe,
  pluginMenuEn,
} from '../../../editor-web-component/src'
import { LitElement, html } from 'lit'

console.log('plugins', { pluginMenuEn, pluginMenuDe })
customElements.define('serlo-editor', EditorWebComponent)

const initialExampleState = {
  plugin: 'rows',
  state: [
    {
      plugin: 'text',
      state: [
        {
          type: 'h',
          level: 1,
          children: [{ text: 'Hello Web Component 🎉' }],
        },
      ],
    },
  ],
}

class SerloEditorDemo extends LitElement {
  static properties = {
    editing: { type: Boolean },
    isRenderedInShadowRoot: false,
    editorState: { type: Object },
    selectedPlugin: { type: String },
  }

  constructor() {
    super()
    this.editing = false
    this.editorState = initialExampleState
    this.selectedPlugin = Plugin.Text
  }

  // Render in light mode. Override this if you want to render the lit component
  // and the editor within the Shadow DOM.
  createRenderRoot() {
    this.isRenderedInShadowRoot = false
    return this
  }

  getEditor() {
    return this.isRenderedInShadowRoot
      ? this.shadowRoot.querySelector('serlo-editor')
      : this.querySelector('serlo-editor')
  }

  writeCurrentEditorState() {
    const editor = this.getEditor()
    if (editor) {
      console.log('Current state:', editor.currentState)
      this.editorState = editor.currentState
    }
  }

  handleStateChange(event) {
    console.log('Editor state updated:', event.detail)
  }

  handlePluginChange(event) {
    this.selectedPlugin = event.target.value
    this.editing = true
    this.updateEditorStateWithInitialPlugin()
  }

  updateEditorStateWithInitialPlugin() {
    const selectedPluginConfig = pluginMenuDe[this.selectedPlugin]

    // Fallback if initialState is not defined for the selected plugin
    const pluginInitialState = selectedPluginConfig?.initialState || {
      plugin: this.selectedPlugin,
      state: [],
    }

    this.editorState = pluginInitialState
  }

  undo() {
    const editor = this.getEditor()
    if (editor && editor.history) {
      editor.history.dispatchUndo()
    }
  }

  redo() {
    const editor = this.getEditor()
    if (editor && editor.history) {
      editor.history.dispatchRedo()
    }
  }

  render() {
    return html`
      <button @click=${() => (this.editing = !this.editing)}>
        ${this.editing ? 'READ' : 'EDIT'}
      </button>
      <button @click=${this.writeCurrentEditorState.bind(this)}>
        Write current State
      </button>
      <button @click=${this.undo.bind(this)}>Undo</button>
      <button @click=${this.redo.bind(this)}>Redo</button>
      <select @change=${this.handlePluginChange.bind(this)}>
        ${Object.values(pluginMenuDe).map(
          ({ type, title }) => html`
            <option value="${type}" ?selected=${type === this.selectedPlugin}>
              ${title}
            </option>
          `
        )}
      </select>
      <div style="margin-top: 20px;">
        <serlo-editor
          use-shadow-dom=${!this.isRenderedInShadowRoot}
          mode=${this.editing ? 'write' : 'read'}
          initial-state=${JSON.stringify(this.editorState)}
          @state-changed=${this.handleStateChange.bind(this)}
        ></serlo-editor>
      </div>
    `
  }
}

customElements.define('serlo-editor-demo', SerloEditorDemo)
