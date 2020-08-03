import { QueryResponse, QueryResponseWithLicense } from './query'
import { LicenseData } from '@/data-types'

// because of injection (license is attached to entity)
const excludeLicense = ['Exercise', 'GroupedExercise', 'ExerciseGroup']

export function createLicense(uuid: QueryResponse): LicenseData | undefined {
  if (!excludeLicense.includes(uuid.__typename)) {
    const _uuid = uuid as QueryResponseWithLicense
    if (_uuid.license) {
      return _uuid.license
    }
  }
}
