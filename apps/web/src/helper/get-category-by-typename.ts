import { UuidType } from '@/data-types'

export function getCategoryByTypename(typename?: string) {
  return typename === UuidType.Article
    ? 'articles'
    : typename === UuidType.Video
      ? 'videos'
      : typename === UuidType.Course || typename === UuidType.CoursePage
        ? 'courses'
        : typename === UuidType.Applet
          ? 'applets'
          : typename === UuidType.Exercise ||
              typename === UuidType.ExerciseGroup
            ? 'exercises'
            : typename === UuidType.Event
              ? 'events'
              : 'folders'
}
