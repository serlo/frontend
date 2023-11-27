import { Ai } from '@serlo/authorization'
import { useRouter } from 'next/router'

import { useCanDo } from '@/auth/use-can-do'
import { isProduction } from '@/helper/is-production'

export function useAiFeatures() {
  const canDo = useCanDo()
  const { lang } = useInstanceData()
  // For now, we only allow the ai feature in the German locale
  const canUseAiFeatures = canDo(Ai.executePrompt) && locale === 'de'

  // To be deleted when enabling AI features in production
  const canUseAiFeaturesOutsideProduction = canUseAiFeatures && !isProduction
  return { canUseAiFeatures, canUseAiFeaturesOutsideProduction }
}
