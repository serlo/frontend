import { TippyProps } from '@tippyjs/react'
import { useState, useEffect } from 'react'

export function LazyTippy({ children, ...props }: TippyProps) {
  const [Tippy, setTippy] = useState<any>(null)
  useEffect(() => {
    void import('@tippyjs/react').then((value) => setTippy(value.default))
  }, [])

  if (!Tippy) {
    //console.log('return children', props)
    return children ?? null
  } else {
    //console.log('rendering tippy with', props)
    return <Tippy {...props}>{children}</Tippy>
  }
}
