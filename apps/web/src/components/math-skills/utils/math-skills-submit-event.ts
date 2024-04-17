import { useMathSkillsStorage } from './math-skills-data-context'
import { submitEvent } from '@/helper/submit-event'

export function useSubmitEvent() {
  const { data } = useMathSkillsStorage()
  if (nameIsMathSkillsReviewer(data.name)) {
    return (_: string) => {}
  }
  return submitEvent
}

export function nameIsMathSkillsReviewer(name: string) {
  return name.toLowerCase() === 'kurti' || name.toLowerCase() === 'tea'
}
