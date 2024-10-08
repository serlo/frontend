import {
  MouseEventHandler,
  PointerEventHandler,
  useMemo,
  MouseEvent,
} from 'react'

// see https://github.com/radix-ui/primitives/issues/1630
// and https://github.com/radix-ui/primitives/issues/2326
// for the problem and different solutions

export function useNavMenuTriggerFix() {
  return useMemo(() => {
    let clickDisabled: NodeJS.Timeout | false

    const preventMouseClick: MouseEventHandler = (e) => {
      if (clickDisabled) e.preventDefault()
    }

    return {
      // make sure click directly after hover closes menu again
      onClick: preventMouseClick,
      onPointerEnter: (e: MouseEvent) => {
        // hack not needed for the menus in small screen layout
        if (isSmallScreen()) return
        // only prevent mouse clicks not touch events
        // if that turns out to be no safe enough we have to track the open state of the menus
        //@ts-expect-error https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/pointerType
        if (e.nativeEvent.pointerType !== 'mouse') return
        if (clickDisabled) clearTimeout(clickDisabled)
        clickDisabled = setTimeout(() => (clickDisabled = false), 500)
      },
      // disable hover completely on small screens with touch support
      onPointerLeave: preventHover,
      onPointerMove: preventHover,
    }
  }, [])
}

const isSmallScreen = () => window.innerWidth < 1024

export const preventHover: PointerEventHandler = (event) => {
  if (isSmallScreen()) event.preventDefault()
}
