import type { MathElement } from '@editor/plugins/text'
import type { ComponentType } from 'react'

export interface PluginStaticRenderer {
  type: string
  renderer: ComponentType<any>
}

export type MathRenderer = ComponentType<MathElement>
export type LinkRenderer = React.FunctionComponent<{
  href: string
  children: JSX.Element | null
}>

export interface InitRenderersArgs {
  pluginRenderers: PluginStaticRenderer[]
  mathRenderer: MathRenderer
  linkRenderer: LinkRenderer
}

const errorMsg = 'init static editor renderers first'

export const editorRenderers = (function () {
  let allRenderers: PluginStaticRenderer[] | null = null
  let mathRenderer: MathRenderer | null = null
  let linkRenderer: LinkRenderer | null = null

  // simplest way to provide renderers to editor that can also easily be adapted by edusharing
  function init({
    pluginRenderers,
    mathRenderer: mathRendererIn,
    linkRenderer: linkRendererIn,
  }: InitRenderersArgs) {
    if (allRenderers) return // only initialize once

    allRenderers = pluginRenderers
    mathRenderer = mathRendererIn
    linkRenderer = linkRendererIn

    // Ensure the highest integrity level that JS provides
    Object.freeze(allRenderers)
    Object.freeze(mathRenderer)
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

  function getMathRenderer() {
    if (!mathRenderer) throw new Error(errorMsg)
    return mathRenderer
  }
  function getLinkRenderer() {
    if (!linkRenderer) throw new Error(errorMsg)
    return linkRenderer
  }

  return { init, getAll, getByType, getMathRenderer, getLinkRenderer }
})()
