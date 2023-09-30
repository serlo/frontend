import type { ComponentType } from 'react'

import type { MathElement } from '@/serlo-editor/plugins/text'

export interface PluginStaticRenderer {
  type: string
  renderer: React.FunctionComponent<any>
}

export type MathRenderer = ComponentType<MathElement>
export type LinkRenderer = React.FunctionComponent<{
  href: string
  children: JSX.Element | null
}>

export type PluginStaticRenderers = PluginStaticRenderer[]

const errorMsg = 'init static editor renderers first'

export const editorRenderers = (function () {
  let allRenderers: PluginStaticRenderers | null = null
  let mathRenderer: MathRenderer | null = null
  let linkRenderer: LinkRenderer | null = null

  function init({
    pluginRenderers,
    mathRenderer: mathRendererIn,
    linkRenderer: linkRendererIn,
  }: {
    pluginRenderers: PluginStaticRenderers
    mathRenderer: MathRenderer
    linkRenderer: LinkRenderer
  }) {
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
