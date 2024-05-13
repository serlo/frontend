import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { cn } from '@serlo/frontend/src/helper/cn'

import type { CourseProps } from '.'
// eslint-disable-next-line import/no-cycle
import { CourseToolbar } from './toolbar/toolbar'

export function CourseEditor(props: CourseProps) {
  const { state, focused } = props
  const { content } = state
  // const isSerlo = useContext(IsSerloContext) // only on serlo

  // const templateStrings = useEditorStrings().templatePlugins
  // const exTemplateStrings = templateStrings.exercise
  const exPluginStrings = useEditorStrings().plugins.exercise

  return (
    <div
      data-qa="plugin-exercise"
      className={cn(
        'group/exercise rounded-b-xl border-3 border-transparent pb-6 focus-within:rounded-tl-xl focus-within:border-gray-100',
        focused && '!border-gray-100'
      )}
    >
      {/* {isSerlo ? (
        <SerloLicenseChooser
          licenseId={licenseId}
          className="!right-[84px] !top-[-30px]"
        />
      ) : null} */}
      {focused ? (
        <CourseToolbar {...props} />
      ) : (
        <button
          className={cn(`
            absolute right-0 top-[-23px] z-[22] hidden h-6 rounded-t-md bg-gray-100
            px-2 pt-0.5 text-sm font-bold
            hover:bg-editor-primary-100 group-focus-within/exercise:block
          `)}
          data-qa="plugin-exercise-parent-button"
        >
          {exPluginStrings.title}
        </button>
      )}
      <div className="h-10"></div>
      {content.render({
        config: {
          textPluginPlaceholder: exPluginStrings.placeholder,
        },
      })}
    </div>
  )
}
