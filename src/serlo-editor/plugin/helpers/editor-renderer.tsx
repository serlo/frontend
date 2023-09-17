export interface PluginStaticRenderer {
  type: string
  renderer: React.FunctionComponent<any>
}

export type PluginStaticRenderers = PluginStaticRenderer[]

export const editorRenderers = (function () {
  let allRenderers: PluginStaticRenderers | null = null

  function init(renderers: PluginStaticRenderers) {
    if (allRenderers) return // only initialize once

    allRenderers = renderers
    // Ensure the highest integrity level that JS provides
    Object.freeze(allRenderers)
  }

  function getAll() {
    if (!allRenderers) throw new Error('init editor plugins first')

    return allRenderers
  }

  function getByType(pluginType: string) {
    const renderers = getAll()

    const renderer =
      renderers.find((renderer) => renderer.type === pluginType) ??
      renderers.find((renderer) => renderer.type === 'unsupported')

    return renderer?.renderer ?? null
  }

  return { init, getAll, getByType }
})()
