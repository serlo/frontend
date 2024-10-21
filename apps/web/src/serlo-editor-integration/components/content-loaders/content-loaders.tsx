import { runReplaceDocumentSaga, useAppDispatch } from '@editor/store'
import { ROOT } from '@editor/store/root/constants'
import { TemplatePluginType } from '@editor/types/template-plugin-type'
import { useCallback } from 'react'

import { ExternalRevisionLoader } from './external-revision-loader'
import { UuidType } from '@/data-types'

interface ContentLoadersProps {
  templateType: TemplatePluginType
}

export function ContentLoaders({ templateType }: ContentLoadersProps) {
  const dispatch = useAppDispatch()

  const handleReplace = useCallback(
    (newState: unknown) => {
      dispatch(
        runReplaceDocumentSaga({
          id: ROOT,
          pluginType: templateType,
          state: newState,
        })
      )
    },
    [dispatch, templateType]
  )

  return (
    <div className="-mb-8 mr-6 mt-4 flex justify-end">
      <ExternalRevisionLoader
        entityType={templateTypeToUuidType[templateType]!}
        onSwitchRevision={handleReplace}
      />
    </div>
  )
}

const templateTypeToUuidType: Partial<Record<TemplatePluginType, UuidType>> = {
  [TemplatePluginType.Applet]: UuidType.Applet,
  [TemplatePluginType.Article]: UuidType.Article,
  [TemplatePluginType.Course]: UuidType.Course,
  [TemplatePluginType.Event]: UuidType.Event,
  [TemplatePluginType.TextExercise]: UuidType.Exercise,
  [TemplatePluginType.TextExerciseGroup]: UuidType.ExerciseGroup,
  [TemplatePluginType.Video]: UuidType.Video,
} as const
