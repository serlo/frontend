export function getCategoryByTypename(typename?: string) {
  return typename === 'Article'
    ? 'articles'
    : typename === 'Video'
    ? 'videos'
    : typename === 'Course' || typename === 'CoursePage'
    ? 'courses'
    : typename === 'Applets'
    ? 'applets'
    : typename === 'Exercises' ||
      typename === 'ExerciseGroup' ||
      typename === 'GroupedExercise'
    ? 'exercises'
    : typename === 'Event'
    ? 'events'
    : 'folders'
}
