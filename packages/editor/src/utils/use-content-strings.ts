import { InstanceDataContext } from '@serlo/frontend/src/contexts/instance-context'
import { useContext } from 'react'

export function useContentStrings() {
  const data = useContext(InstanceDataContext)
  if (!data) {
    throw new Error('Attempt to use instance data outside of provider!')
  }
  return data.strings.content
}
