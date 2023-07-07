/**
 * This file and import is needed to communicate with the parent window that is rendering
 * Serlo content within an iframe. See the file lazy-iframe-resizer.tsx on how it can be
 * dynamically & lazily imported only when needed.
 */

// eslint-disable-next-line import/no-internal-modules, import/no-unassigned-import
import 'iframe-resizer/js/iframeResizer.contentWindow'

export const IFrameResizer = () => {
  return null
}
