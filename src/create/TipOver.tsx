import Tippy from '@tippyjs/react'

export default function TipOver(props) {
  return (
    <Tippy
      interactive
      zIndex={50}
      appendTo={typeof document !== 'undefined' ? document.body : undefined}
      {...props}
    />
  )
}
