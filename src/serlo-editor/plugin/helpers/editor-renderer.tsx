import type { ComponentType } from 'react'

import type { MathElement } from '@/serlo-editor/plugins/text'

export interface PluginStaticRenderer {
  type: string
  renderer: React.FunctionComponent<any>
}

export type MathRenderer = ComponentType<MathElement>

export type PluginStaticRenderers = PluginStaticRenderer[]

export const editorRenderers = (function () {
  let allRenderers: PluginStaticRenderers | null = null
  let mathRenderer: MathRenderer | null = null

  function init({
    pluginRenderers,
    mathRenderer: mathRendererIn,
  }: {
    pluginRenderers: PluginStaticRenderers
    mathRenderer: MathRenderer
  }) {
    if (allRenderers) return // only initialize once

    allRenderers = pluginRenderers
    mathRenderer = mathRendererIn

    // Ensure the highest integrity level that JS provides
    Object.freeze(allRenderers)
    Object.freeze(mathRenderer)
  }

  function getAll() {
    if (!allRenderers) throw new Error('init editor plugins first')

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
    if (!mathRenderer) throw new Error('init editor plugins first')
    return mathRenderer
  }

  return { init, getAll, getByType, getMathRenderer }
})()
