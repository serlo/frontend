import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import {
  EditorExerciseDocument,
  EditorRowsDocument,
  EditorTemplateExerciseGroupDocument,
} from '@editor/types/editor-plugins'
import { isBoxDocument, isRowsDocument } from '@editor/types/plugin-type-guards'
import { useAuthentication } from '@serlo/frontend/src/auth/use-authentication'
import type { MoreAuthorToolsProps } from '@serlo/frontend/src/components/user-tools/foldout-author-menus/more-author-tools'
import { ExerciseInlineType } from '@serlo/frontend/src/data-types'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

import { TextExerciseGroupTypeRenderer } from './renderer'

const AuthorToolsExercises = dynamic<MoreAuthorToolsProps>(() =>
  import(
    '@serlo/frontend/src/components/user-tools/foldout-author-menus/author-tools-exercises'
  ).then((mod) => mod.AuthorToolsExercises)
)

export function TextExerciseGroupTypeStaticRenderer(
  props: EditorTemplateExerciseGroupDocument
) {
  const { state, serloContext: context } = props
  const auth = useAuthentication()
  const [loaded, setLoaded] = useState(false)
  useEffect(() => setLoaded(true), [])

  const { content, exercises } = state
  if (!exercises) return null

  const renderedExercises = exercises.map((exercise, index) => {
    const id = `${exercise.id ?? exercise.serloContext?.uuid ?? index}`

    const { document, beforeContent } = extraExamsTasksHack(exercise)

    return {
      id,
      element: <StaticRenderer document={document} />,
      beforeContent,
    }
  })

  const rowsContent = content as unknown as EditorRowsDocument
  return (
    <div className="relative">
      {loaded && auth && context?.uuid ? (
        <div className="absolute -right-8">
          <AuthorToolsExercises
            data={{
              type: ExerciseInlineType.ExerciseGroup,
              id: context?.uuid,
              trashed: context?.trashed,
              unrevisedRevisions: context?.unrevisedRevisions,
            }}
          />
        </div>
      ) : null}
      <TextExerciseGroupTypeRenderer
        content={<StaticRenderer document={rowsContent} />}
        exercises={renderedExercises}
      />
    </div>
  )
}

// quick and ugly hack to give authors a way to add intermediate task in exercise groups
// if you add a box with the title "Aufgabenstellung" in a grouped exercise it's content
// will be displayed before the exercise
function extraExamsTasksHack(exercise: EditorExerciseDocument) {
  if (
    isRowsDocument(exercise.state.content) &&
    isBoxDocument(exercise.state.content.state[0])
  ) {
    const boxPlugin = exercise.state.content.state[0]

    if (JSON.stringify(boxPlugin.state.title).includes('Aufgabenstellung')) {
      // remove box from exercise document and insert it before the task
      return {
        document: {
          ...exercise,
          state: {
            ...exercise.state,
            content: {
              ...exercise.state.content,
              state: exercise.state.content.state.slice(1),
            },
          },
        },
        beforeContent: (
          <div className="-ml-14">
            <StaticRenderer document={boxPlugin.state.content} />
          </div>
        ),
      }
    }
  }
  return { document: exercise, beforeContent: undefined }
}
