// eslint-disable-next-line import/no-internal-modules
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

import { Renderer, RendererProps } from '../renderer'

/**
 * @param props - The {@link @edtr-io/renderer#RendererProps | renderer props}
 */
export function render<K extends string = string>(props: RendererProps<K>) {
  const sheet = new ServerStyleSheet()

  const html = renderToString(
    <StyleSheetManager sheet={sheet.instance}>
      <Renderer {...props} />
    </StyleSheetManager>
  )

  return {
    styles: sheet.getStyleTags(),
    html,
  }
}

export type { RendererProps }
