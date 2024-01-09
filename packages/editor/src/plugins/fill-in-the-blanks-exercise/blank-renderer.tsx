import { ChangeEventHandler, useContext } from 'react'

import { BlankRendererInput } from './components/blank-renderer-input'
import { FillInTheBlanksContext } from './context/blank-context'

interface BlankRendererProps {
  blankId: string
  onChange?: ChangeEventHandler<HTMLInputElement>
}

export function BlankRenderer(props: BlankRendererProps) {
  const { blankId, onChange } = props

  const context = useContext(FillInTheBlanksContext)
  if (context === null) return null

  return (
    <BlankRendererInput
      blankId={blankId}
      context={context}
      onChange={onChange}
    />
  )
}
