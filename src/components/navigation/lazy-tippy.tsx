import { TippyProps } from '@tippyjs/react'
import { useState, useEffect } from 'react'

type TippyJSX = (props: TippyProps) => JSX.Element

export function LazyTippy({
  children,
  onLoaded,
  ...props
}: TippyProps & { onLoaded?: () => void }) {
  const [Tippy, setTippy] = useState<TippyJSX | null>(null)
  useEffect(() => {
    void import('@tippyjs/react').then((value) => {
      setTippy((value as { default: TippyJSX }).default)
      setTimeout(() => onLoaded && onLoaded(), 0)
    })
  }, [onLoaded])

  if (!Tippy) return children ?? null
  else return <Tippy {...props}>{children}</Tippy>
}
