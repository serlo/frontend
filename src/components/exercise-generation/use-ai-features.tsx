import { Ai } from '@serlo/authorization'

import { useCanDo } from '@/auth/use-can-do'
import { useInstanceData } from '@/contexts/instance-context'
import { isProduction } from '@/helper/is-production'

export function useAiFeatures() {
  const canDo = useCanDo()
  const { lang } = useInstanceData()
  // For now, we only allow the ai feature in the German locale
  const canUseAiFeatures = canDo(Ai.executePrompt) && lang === 'de'

  // To be deleted when enabling AI features in production
  const canUseAiFeaturesOutsideProduction = canUseAiFeatures && !isProduction
  return { canUseAiFeatures, canUseAiFeaturesOutsideProduction }
}
