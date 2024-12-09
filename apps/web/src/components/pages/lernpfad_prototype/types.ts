export type MapItemId = string

export type ExerciseLabel = 'solo' | 'group' | 'ai'

interface Position {
  x: number
  y: number
}

export interface Exercise {
  type:
    | 'start'
    | 'info'
    | 'recap'
    | 'write'
    | 'feedback'
    | 'reflection'
    | 'excursion'
  done: boolean
  time?: number
  title: string
  labels: Array<ExerciseLabel>
  contentType: 'Inhalt' | 'Übung' | 'Methode'
  isMacroadaptive?: boolean
  nextExercises: MapItemId[] | null
  dependsOn: MapItemId[] | null
  position: Position
}

export interface Fork {
  type: 'fork'
  done: boolean
  dependsOn: MapItemId[]
  nextExercises: MapItemId[]
  position: Position
}

export type MapItem = Exercise | Fork

export type MapItemsRecord = Record<MapItemId, MapItem>

export interface ExerciseProps {
  id: MapItemId | null
  data: Exercise
  onBackToMapClick: () => void
  onSubmitClick: (id: MapItemId) => void
}
