export const dummy = 123

/*import { ExerciseProps } from '@/components/content/exercise'
import { FrontendContentNode } from '@/data-types'

export function walkIdNodes(
  content: FrontendContentNode[] | undefined,
  callback: (node: FrontendContentNode, id: number) => void
) {
  if (content === undefined) return
  content.forEach((obj) => {
    if (obj.type === 'a' || obj.type === 'img') {
      // We know that href might exists
      const href = (obj as { href?: string }).href
      if (href) {
        if (/^\/[\d]+$/.test(href)) {
          // hit
          const id = parseInt(href.substring(1))
          callback(obj, id)
        }
      }
    }
    // recursion
    if (obj.children) {
      walkIdNodes(obj.children, callback)
    }
    if (obj.type === 'exercise') {
      // domain knowledge
      const exercise = obj as ExerciseProps
      if (exercise.solution?.children) {
        walkIdNodes(exercise.solution.children, callback)
      }
      if (exercise.task.children) {
        walkIdNodes(exercise.task.children, callback)
      }
    }
    if (obj.type === '@edtr-io/exercise') {
      walkIdNodes(obj.state.content, callback)
    }
    if (obj.type === '@edtr-io/solution') {
      walkIdNodes(obj.state.strategy, callback)
      walkIdNodes(obj.state.steps, callback)
    }
  })
}
*/
