import { Ai } from '@serlo/authorization'

import { useCanDo } from '@/auth/use-can-do'
import { useInstanceData } from '@/contexts/instance-context'

export function useAiFeatures() {
  const canDo = useCanDo()
  const { lang } = useInstanceData()
  // For now, we only allow the ai feature in the German locale
  const canUseAiFeatures = canDo(Ai.executePrompt) && lang === 'de'

  return { canUseAiFeatures }
}
