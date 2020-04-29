const excludeLicense = ['Exercise', 'GroupedExercise', 'ExerciseGroup']

export function createLicense(uuid) {
  if (!excludeLicense.includes(uuid.__typename) && uuid.license) {
    return uuid.license
  }
}
