import { useMathSkillsStorage } from './math-skills-data-context'
import { submitEvent } from '@/helper/submit-event'

export function useSubmitEvent() {
  const { data } = useMathSkillsStorage()
  if (
    data.name.toLowerCase() === 'kurti' ||
    data.name.toLowerCase() === 'tea'
  ) {
    return (_: string) => {}
  }
  return submitEvent
}
