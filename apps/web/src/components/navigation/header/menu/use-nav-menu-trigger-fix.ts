import { MouseEventHandler, PointerEventHandler, useMemo } from 'react'

// see https://github.com/radix-ui/primitives/issues/1630
// and https://github.com/radix-ui/primitives/issues/2326
//for the problem and differen solutions

export function useNavMenuTriggerFix() {
  return useMemo(() => {
    let clickDisabled: NodeJS.Timeout | false

    const preventMouseClick: MouseEventHandler = (e) => {
      if (clickDisabled) e.preventDefault()
    }

    return {
      // make sure click directly after hover closes menu again
      onClick: preventMouseClick,
      onPointerEnter: () => {
        if (hasTouchSupportAndSmallScreen()) return
        if (clickDisabled) clearTimeout(clickDisabled)
        clickDisabled = setTimeout(() => (clickDisabled = false), 1000)
      },
      // disable hover completely on small screens with touch support
      onPointerMove: preventHover,
    }
  }, [])
}

function hasTouchSupportAndSmallScreen() {
  return (
    ('ontouchstart' in window || navigator.maxTouchPoints > 0) &&
    window.innerWidth < 1024
  )
}

export const preventHover: PointerEventHandler = (event) => {
  if (hasTouchSupportAndSmallScreen()) event.preventDefault()
}
