import {
  StateType,
  StateTypeReturnType,
  StateTypeStaticType,
} from './internal__plugin-state'

// A Serlo Editor plugin
export interface EditorPlugin<
  S extends StateType = StateType,
  Config extends object = object,
> {
  /**
   * React component that will be used to render the plugin. It accepts [[PluginEditorProps]] and `Props`.
   */
  Component: React.ComponentType<EditorPluginProps<S, Config>>

  /**
   * Plugin configuration
   */
  config: Config | (() => Config)

  /**
   * [[StateType]] of the plugin
   */
  state: S

  /**
   * May be provided to let the plugin respond to text [`paste` events](https://developer.mozilla.org/docs/Web/API/Element/paste_event)
   * or drop events
   *
   * @param text - The pasted text
   */
  onText?(
    text: string
  ):
    | void
    | { state?: StateTypeStaticType<S> }
    | Promise<void | { state?: StateTypeStaticType<S> }>

  /**
   * May be provided to let the plugin respond to file [`paste` events](https://developer.mozilla.org/docs/Web/API/Element/paste_event)
   * or drop events
   *
   * @param files - The [FileList](https://developer.mozilla.org/en-US/docs/Web/API/FileList)
   */
  onFiles?(files: File[]): void | { state?: StateTypeStaticType<S> }

  /**
   * May be provided to prevent the default Serlo Editor keyboard shortcuts
   *
   * @param e - the [KeyboardEvent](https://developer.mozilla.org/docs/Web/API/KeyboardEvent)
   * @returns `false` if the keyboard shortcut should be prevented
   */
  onKeyDown?(e: KeyboardEvent): boolean

  /**
   * Will be used to decide if the plugin is empty (e.g. to decide whether we can safely delete the plugin). If not provided, we consider a plugin empty iff its state equals its initial state.
   *
   * @param state - the current state
   * @returns `true` if the plugin is empty
   */
  isEmpty?(state: StateTypeReturnType<S>): boolean

  /**
   * May be provided if the plugin is able to insert additional children
   *
   * @param state - The current state
   * @param previousSibling - The id of the child after the new document should be inserted (or `undefined` if the document should be inserted at the front)
   * @param document - The document to insert
   */
  insertChild?(
    state: StateTypeReturnType<S>,
    {
      previousSibling,
      document,
    }: {
      previousSibling?: string
      document?: { plugin: string; state?: unknown; id: string }
    }
  ): void

  /**
   * May be provided if the plugin is able to remove its child
   *
   * @param state - The current state
   * @param id - The id of the child that should be removed
   */
  removeChild?(state: StateTypeReturnType<S>, id: string): void

  //optional metadata, mostly for edusharing integration
  defaultTitle?: string
  defaultDescription?: string
}

/**
 * Props for the component of an [[EditorPlugin]]
 *
 */
export interface EditorPluginProps<
  S extends StateType = StateType,
  // eslint-disable-next-line @typescript-eslint/ban-types
  Config extends {} = {},
> {
  /**
   * Plugin configuration
   */
  config: Config

  /**
   * Current state of the document
   */
  state: StateTypeReturnType<S>

  /**
   * ID of the document
   */
  id: string

  /**
   * `true` if the document is currently focused
   */
  focused: boolean

  // Ref for the wrapping SubDocument div
  containerRef?: React.RefObject<HTMLDivElement>
}
