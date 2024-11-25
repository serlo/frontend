import { SerloOnlyFeaturesContext } from '@editor/utils/serlo-extra-context'
import { useContext } from 'react'

export function useIsSerlo(): boolean {
  const isSerlo = useContext(SerloOnlyFeaturesContext).isSerlo
  return isSerlo ?? false
}
