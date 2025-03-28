import type { ComponentType } from 'react'

export interface PluginStaticRenderer {
  type: string
  renderer: ComponentType<any>
}
export interface InitRenderersArgs {
  pluginRenderers: PluginStaticRenderer[]
}

const errorMsg = 'init static editor renderers first'

export const editorRenderers = (function () {
  let allRenderers: PluginStaticRenderer[] | null = null

  // simplest way to provide renderers to editor that can also easily be adapted by edusharing
  function init({ pluginRenderers }: InitRenderersArgs) {
    if (allRenderers) return // only initialize once

    allRenderers = pluginRenderers

    // Ensure the highest integrity level that JS provides
    Object.freeze(allRenderers)
  }

  function getAll() {
    if (!allRenderers) throw new Error(errorMsg)

    return allRenderers
  }

  function getByType(pluginType: string) {
    const renderers = getAll()

    const renderer = (
      renderers.find((renderer) => renderer.type === pluginType) ??
      renderers.find((renderer) => renderer.type === 'unsupported')
    )?.renderer

    return renderer ?? null
  }

  return { init, getAll, getByType }
})()
