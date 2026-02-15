/// <reference types="vite/client" />

import {
  SerloRenderer,
  type BaseEditor,
  defaultPlugins,
  EditorPluginType,
  type SupportedLanguage,
} from '@serlo/editor'
import styles from '@serlo/editor/dist/style.css?raw'
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

  // Deprecated and ignored
  private _testingSecret: string | null = null

  private _editorVariant: EditorVariant = 'unknown'

  private _plugins = defaultPlugins

  private _isProductionEnvironment: boolean = false

  private _disableMediaUpload: boolean | null = null

  private _language: SupportedLanguage = 'de' as const

  private _fileUploadHandler: ((file: File) => Promise<string>) | null = null
  private _presignedUrlEndpoint: string | null = null
  private _allowedImageDomains: string[] = []

  constructor() {
    super()

    this.container = document.createElement('div')
  }

  static get observedAttributes() {
    return [
      'initial-state',
      'mode',
      'testing-secret',
      'editor-variant',
      'plugins',
      'is-production-environment',
      'disable-media-upload',
      'language',
      'presigned-url-endpoint',
      'allowed-image-domains',
    ]
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ) {
    if (oldValue === newValue) return

    if (name === 'initial-state') {
      this.initialState =
        newValue === null ? null : (JSON.parse(newValue) as InitialState)
    } else if (
      name === 'mode' &&
      (newValue === 'read' || newValue === 'write')
    ) {
      this.mode = newValue
    } else if (name === 'editor-variant') {
      this.editorVariant =
        newValue === null ? 'unknown' : (newValue as EditorVariant)
    } else if (name === 'plugins') {
      this.plugins =
        newValue === null
          ? defaultPlugins
          : (JSON.parse(newValue) as EditorPluginType[])
    } else if (name === 'is-production-environment') {
      this.isProductionEnvironment = newValue === 'true'
    } else if (name === 'disable-media-upload') {
      this.disableMediaUpload =
        newValue === 'true' ? true : newValue === 'false' ? false : null
    } else if (name === 'testing-secret') {
      this.testingSecret = newValue
    } else if (name === 'language') {
      // Validates the language attribute. Will need to keep this in sync with
      // the SupportedLanguage type, if we add more language support!
      const validatedLanguage = newValue === 'en' ? 'en' : 'de'
      this.language = validatedLanguage
    } else if (name === 'presigned-url-endpoint') {
      this.presignedUrlEndpoint = newValue
    } else if (name === 'allowed-image-domains') {
      if (newValue === null) {
        this.allowedImageDomains = []
      } else {
        try {
          this.allowedImageDomains = JSON.parse(newValue) as string[]
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(
            `Invalid JSON for allowed-image-domains attribute: ${newValue}`,
            error
          )
          this.allowedImageDomains = []
        }
      }
    }
  }

  get testingSecret(): string | null {
    return this._testingSecret
  }

  // Deprecated and ignored
  set testingSecret(value) {
    this._testingSecret = value
    if (value === null) {
      this.removeAttribute('testing-secret')
    } else {
      this.setAttribute('testing-secret', String(value))
    }
    this.mountReactComponent()
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

  get editorVariant(): EditorVariant {
    return this._editorVariant
  }

  set editorVariant(newVariant: EditorVariant) {
    this._editorVariant = newVariant
    this.setAttribute('editor-variant', newVariant)
    this.mountReactComponent()
  }

  get plugins(): typeof defaultPlugins {
    return this._plugins
  }

  set plugins(newPlugins) {
    this._plugins = newPlugins
    if (newPlugins) {
      this.setAttribute('plugins', JSON.stringify(newPlugins))
    }
    this.mountReactComponent()
  }

  get isProductionEnvironment(): boolean {
    return this._isProductionEnvironment
  }

  set isProductionEnvironment(value: boolean) {
    this._isProductionEnvironment = value
    this.setAttribute('is-production-environment', String(value))
    this.mountReactComponent()
  }

  get disableMediaUpload(): boolean | null {
    return this._disableMediaUpload
  }

  set disableMediaUpload(value: boolean | null) {
    this._disableMediaUpload = value
    if (value === null) {
      this.removeAttribute('disable-media-upload')
    } else {
      this.setAttribute('disable-media-upload', String(value))
    }
    this.mountReactComponent()
  }

  get language(): SupportedLanguage {
    return this._language
  }

  set language(value: SupportedLanguage) {
    if (value !== 'en' && value !== 'de') {
      throw new Error(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `Invalid language value: ${value}. Supported values are 'en' or 'de'.`
      )
    }

    this._language = value
    this.setAttribute('language', value)
    this.mountReactComponent()
  }

  /**
   * Sets a custom upload handler function. This function will be called when
   * a file needs to be uploaded. It should return a Promise that resolves to
   * the URL of the uploaded file.
   */
  setFileUploadHandler(handler: (file: File) => Promise<string>) {
    this._fileUploadHandler = handler
    this.mountReactComponent()
  }

  get presignedUrlEndpoint(): string | null {
    return this._presignedUrlEndpoint
  }

  set presignedUrlEndpoint(value: string | null) {
    this._presignedUrlEndpoint = value
    if (value === null) {
      this.removeAttribute('presigned-url-endpoint')
    } else {
      this.setAttribute('presigned-url-endpoint', value)
    }
    this.mountReactComponent()
  }

  get allowedImageDomains(): string[] {
    return this._allowedImageDomains
  }

  set allowedImageDomains(value: string[]) {
    this._allowedImageDomains = value
    if (value.length === 0) {
      this.removeAttribute('allowed-image-domains')
    } else {
      this.setAttribute('allowed-image-domains', JSON.stringify(value))
    }
    this.mountReactComponent()
  }

  connectedCallback() {
    this.appendChild(this.container)
    this.loadAndApplyStyles()

    if (!this.reactRoot) {
      this.reactRoot = ReactDOM.createRoot(this.container)
    }

    this.mountReactComponent()
  }

  loadAndApplyStyles() {
    const styleEl = document.createElement('style')
    styleEl.textContent = styles
    this.appendChild(styleEl)
  }

  broadcastNewState(newState: unknown): void {
    const event = new CustomEvent('state-changed', {
      detail: { newState },
    })
    this.dispatchEvent(event)
  }

  mountReactComponent() {
    const initialStateAttr = this.getAttribute('initial-state')

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

    // Build fileUploadConfig from the component properties
    const fileUploadConfig =
      this._fileUploadHandler ||
      this._presignedUrlEndpoint ||
      this._allowedImageDomains.length > 0
        ? {
            uploadHandler: this._fileUploadHandler ?? undefined,
            presignedUrlEndpoint: this._presignedUrlEndpoint ?? undefined,
            allowedImageDomains:
              this._allowedImageDomains.length > 0
                ? this._allowedImageDomains
                : undefined,
          }
        : undefined

    this.reactRoot.render(
      <React.StrictMode>
        <div id="serlo-root" className="relative">
          {this._mode === 'write' ? (
            <Suspense fallback={<div>Loading editor...</div>}>
              <LazySerloEditor
                editorVariant={this.editorVariant}
                initialState={this.initialState}
                plugins={this.plugins}
                isProductionEnvironment={this.isProductionEnvironment}
                disableMediaUpload={
                  this._disableMediaUpload === null
                    ? undefined
                    : this._disableMediaUpload
                }
                fileUploadConfig={fileUploadConfig}
                onChange={(newState) => {
                  this._currentState = newState
                  this.broadcastNewState(newState)
                }}
                language={this.language}
              >
                {(editor) => {
                  this._history = editor.history
                  return <div>{editor.element}</div>
                }}
              </LazySerloEditor>
            </Suspense>
          ) : (
            <SerloRenderer
              state={this.initialState}
              editorVariant={this.editorVariant}
              language={this.language}
            />
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
