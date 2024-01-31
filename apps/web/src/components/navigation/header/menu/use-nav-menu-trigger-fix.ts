import { MouseEventHandler, PointerEventHandler, useMemo } from 'react'

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
      onPointerEnter: () => {
        if (isSmallScreen()) return
        if (clickDisabled) clearTimeout(clickDisabled)
        clickDisabled = setTimeout(() => (clickDisabled = false), 1000)
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
