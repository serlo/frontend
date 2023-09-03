export interface PluginPath {
  id: string
  type: string
  path: Array<string | number>
}

export type FocusPath = PluginPath[]
