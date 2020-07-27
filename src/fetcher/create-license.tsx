import { QueryResponse, QueryResponseWithLicense } from './query'

const excludeLicense = ['Exercise', 'GroupedExercise', 'ExerciseGroup']

export function createLicense(uuid: QueryResponse) {
  if (!excludeLicense.includes(uuid.__typename)) {
    const _uuid = uuid as QueryResponseWithLicense
    if (_uuid.license) {
      return _uuid.license
    }
  }
}
