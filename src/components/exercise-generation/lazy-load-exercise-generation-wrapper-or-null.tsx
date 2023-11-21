import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import { ExerciseGenerationWrapperProps } from './exercise-generation-wrapper'
import { extractTopicFromTitle } from '@/components/exercise-generation/exercise-generation-wizard/topic'
import { useAiFeatures } from '@/components/exercise-generation/use-ai-features'
import type { AllowedPluginType } from '@/pages/entity/create/[type]/[taxonomyId]'
import { TemplatePluginType } from '@/serlo-editor-integration/types/template-plugin-type'

const ExerciseGenerationWrapper = dynamic<ExerciseGenerationWrapperProps>(() =>
  import('./exercise-generation-wrapper').then(
    (mod) => mod.ExerciseGenerationWrapper
  )
)

interface LazyLoadExerciseGenerationWrapperOrNullProps {
  subject: string
  entityType: AllowedPluginType
  taxonomyTitle: string
  setEditorState: ExerciseGenerationWrapperProps['setEditorState']
}

const allowedExerciseTemplates = ['Exercise', 'ExerciseGroup']

export function LazyLoadExerciseGenerationWrapperOrNull({
  subject,
  entityType,
  taxonomyTitle,
  setEditorState,
}: LazyLoadExerciseGenerationWrapperOrNullProps) {
  const router = useRouter()
  const { canUseAiFeatures } = useAiFeatures()
  const [showWizard, setShowWizard] = useState(false)
  const topic = extractTopicFromTitle(taxonomyTitle)

  useEffect(() => {
    const shouldShow =
      allowedExerciseTemplates.includes(entityType as TemplatePluginType) &&
      router.query.showAiWizard !== undefined &&
      canUseAiFeatures
    setShowWizard(shouldShow)
  }, [showWizard, canUseAiFeatures, router.query, entityType])

  if (!showWizard) return null

  return (
    <ExerciseGenerationWrapper
      isExerciseGroup={entityType === 'ExerciseGroup'}
      closeWizard={() => {
        setShowWizard(false)

        const url = new URL(window.location.href)
        // Delete existing query param
        url.searchParams.delete('showAiWizard')
        // Update URL without reloading the page
        router
          .replace(url.pathname + url.search, undefined, {
            shallow: true,
          })
          .then(() => void null)
          .catch(() => void null)
      }}
      subject={subject}
      topic={topic || ''}
      setEditorState={setEditorState}
    />
  )
}
