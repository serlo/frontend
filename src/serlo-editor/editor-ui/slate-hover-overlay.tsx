import { useSlate } from 'slate-react'

import { HoverOverlay, type HoverOverlayProps } from './hover-overlay'

/**
 * The vanilla `HoverOverlay` component relies on `window.getSelection()` for positioning.
 * When Slate changes this selection, `HoverOverlay` doesn't re-render. This component is
 * a wrapper that makes sure that `HoverOverlay` re-renders on every Slate selection change.
 * Can't use `useSlate` in `HoverOverlay`, because `HoverOverlay` is also used outside of Slate.
 */
export function SlateHoverOverlay(props: HoverOverlayProps) {
  const { selection } = useSlate()

  return <HoverOverlay {...props} selection={selection} />
}
