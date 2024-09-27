import { useContext } from 'react'

import { InstanceDataContext } from '@/contexts/instance-context'

export function useContentStrings() {
  const data = useContext(InstanceDataContext)
  if (!data) {
    throw new Error('Attempt to use instance data outside of provider!')
  }
  return data.strings.content
}
