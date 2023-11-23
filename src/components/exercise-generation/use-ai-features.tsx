import { Ai } from '@serlo/authorization'

import { useCanDo } from '@/auth/use-can-do'
import { isProduction } from '@/helper/is-production'

export function useAiFeatures() {
  const canDo = useCanDo()
  const canUseAiFeatures = canDo(Ai.executePrompt)

  // To be deleted when enabling AI features in production
  const canUseAiFeaturesOutsideProduction = canUseAiFeatures && !isProduction
  return { canUseAiFeatures, canUseAiFeaturesOutsideProduction }
}
