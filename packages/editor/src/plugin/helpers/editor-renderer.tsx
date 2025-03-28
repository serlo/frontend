import type { ComponentType } from 'react'

export interface PluginStaticRenderer {
  type: string
  renderer: ComponentType<any>
}

export type LinkRenderer = React.FunctionComponent<{
  href: string
  children: JSX.Element | string | null
}>

export interface InitRenderersArgs {
  pluginRenderers: PluginStaticRenderer[]
  linkRenderer: LinkRenderer
}

const errorMsg = 'init static editor renderers first'

export const editorRenderers = (function () {
  let allRenderers: PluginStaticRenderer[] | null = null
  let linkRenderer: LinkRenderer | null = null

  // simplest way to provide renderers to editor that can also easily be adapted by edusharing
  function init({
    pluginRenderers,
    linkRenderer: linkRendererIn,
  }: InitRenderersArgs) {
    if (allRenderers) return // only initialize once

    allRenderers = pluginRenderers
    linkRenderer = linkRendererIn

    // Ensure the highest integrity level that JS provides
    Object.freeze(allRenderers)
    Object.freeze(linkRenderer)
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

  function getLinkRenderer() {
    if (!linkRenderer) throw new Error(errorMsg)
    return linkRenderer
  }

  return { init, getAll, getByType, getLinkRenderer }
})()
